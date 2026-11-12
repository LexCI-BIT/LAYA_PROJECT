// Vite build step: writes a copy of index.html for every page in the sitemap, with that page's own
// title, description, canonical URL and link-preview tags already in <head>. WhatsApp, Facebook and
// search engines then see the right tags without running JavaScript. The page content still loads
// with JavaScript as before. Vercel serves /about-us from about-us.html (cleanUrls in vercel.json).
import fs from 'node:fs';
import path from 'node:path';
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
  // Offering pages also get hidden Service details for Google (same id PageMeta.jsx updates in the browser)
  const service = meta.structuredData
    ? `  <script type="application/ld+json" id="page-structured-data">${JSON.stringify(meta.structuredData).replace(/</g, '\\u003c')}</script>\n`
    : '';
  return replaceTag(page, /<\/head>/, `  <link rel="canonical" href="${escapeHtml(meta.canonical)}" />\n${service}  </head>`);
};

export default function headTags() {
  let outDir;
  return {
    name: 'laya-head-tags',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      for (const pagePath of sitemapPaths()) {
        // index.html is also what Vercel serves for unknown URLs, so it keeps the Home defaults without a canonical
        if (pagePath === '/') continue;
        const file = path.join(outDir, `${pagePath.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, withPageTags(template, getPageMeta(pagePath)));
      }
    },
  };
}
