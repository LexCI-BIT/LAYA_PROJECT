// Vite build step: writes a copy of index.html for every page in the sitemap, with that page's own
// title, description, canonical URL and link-preview tags already in <head>, and the page's real
// content (headings and text) already in <div id="root">. WhatsApp, Facebook, search engines and SEO
// audit tools then see the right tags and text without running JavaScript. When the JavaScript loads,
// React replaces that content with the live page, exactly as before. Vercel serves /about-us from about-us.html (cleanUrls in vercel.json).
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import { sitemapPaths } from './sitemap.js';
import { getPageMeta } from '../src/seo/pageMeta.js';

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Fails the build if index.html no longer has the tag, rather than silently writing wrong pages
const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`head-tags: index.html is missing ${pattern}`);
  return html.replace(pattern, replacement);
};

const withPageTags = (html, meta) => {
  let page = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  page = replaceTag(page, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(meta.description)}"`);
  page = replaceTag(page, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(meta.title)}"`);
  page = replaceTag(page, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(meta.description)}"`);
  page = replaceTag(page, /<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeHtml(meta.image)}"`);
  page = replaceTag(page, /<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escapeHtml(meta.image)}"`);
  page = replaceTag(page, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeHtml(meta.canonical)}"`);
  // The width/height in index.html describe the Home banner card, not this page's image
  page = replaceTag(page, /\s*<meta property="og:image:width" content="[^"]*" \/>/, '');
  page = replaceTag(page, /\s*<meta property="og:image:height" content="[^"]*" \/>/, '');
  // The business details (Organization, WebSite) belong on the Home page only; other pages carry just their own details
  page = replaceTag(page, /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  // Offering pages also get hidden Service details for Google (same id PageMeta.jsx updates in the browser)
  const service = meta.structuredData
    ? `  <script type="application/ld+json" id="page-structured-data">${JSON.stringify(meta.structuredData).replace(/</g, '\\u003c')}</script>\n`
    : '';
  return replaceTag(page, /<\/head>/, `  <link rel="canonical" href="${escapeHtml(meta.canonical)}" />\n${service}  </head>`);
};

const EMPTY_ROOT = '<div id="root"></div>';

// Renders each page's content once, using the same App the browser runs (see src/entry-server.jsx)
const renderPages = async (paths) => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  try {
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
    return Object.fromEntries(paths.map((pagePath) => [pagePath, render(pagePath)]));
  } finally {
    await server.close();
  }
};

const withContent = (html, content) => {
  if (!html.includes(EMPTY_ROOT)) throw new Error('head-tags: index.html is missing <div id="root"></div>');
  return html.replace(EMPTY_ROOT, () => `<div id="root">${content}</div>`);
};

export default function headTags() {
  let outDir;
  return {
    name: 'laya-head-tags',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const indexFile = path.join(outDir, 'index.html');
      const template = fs.readFileSync(indexFile, 'utf8');
      const paths = sitemapPaths();
      const content = await renderPages(paths);
      for (const pagePath of paths) {
        // index.html is also what Vercel serves for unknown URLs, so it keeps the Home defaults without a canonical
        if (pagePath === '/') {
          fs.writeFileSync(indexFile, withContent(template, content['/']));
          continue;
        }
        const file = path.join(outDir, `${pagePath.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, withContent(withPageTags(template, getPageMeta(pagePath)), content[pagePath]));
      }
    },
  };
}
