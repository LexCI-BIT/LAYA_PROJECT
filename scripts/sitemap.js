// Vite build step that writes sitemap.xml from the site's data files,
// so new offerings, projects, design ideas and calculators are listed automatically on every build.
import { offeringsData } from '../src/data/offeringsData.js';
import { projectsData } from '../src/data/projectsData.js';
import { categories, designIdeas } from '../src/data/DesignIdeasData.js';
import { calculatorConfigs } from '../src/data/calculatorConfig.js';
import { SITE_URL } from '../src/seo/site.js';

// Pages with their own fixed route in App.jsx
const STATIC_PAGES = [
  '/',
  '/about-us',
  '/aluminium-manufacturing',
  '/projects',
  '/price-calculator',
  '/windows-doors',
  '/glass-aluminium-partitions',
];

// Entries in offeringsData that should not be listed as /offerings/<slug>
const EXCLUDED_OFFERINGS = [
  'glass-aluminium-partitions', // has its own page at /glass-aluminium-partitions
];

// Also used by scripts/head-tags.js, which writes an HTML file for each of these pages
export const sitemapPaths = () => [
  ...STATIC_PAGES,
  ...Object.keys(offeringsData)
    .filter((slug) => !EXCLUDED_OFFERINGS.includes(slug))
    .map((slug) => `/offerings/${slug}`),
  ...projectsData.map((project) => `/projects/${project.id}`),
  ...categories.flatMap((category) => [
    `/design-ideas/${category.id}`,
    ...(designIdeas[category.id] || []).map((idea) => `/design-ideas/${category.id}/${idea.id}`),
  ]),
  // Calculator intro pages only; robots.txt keeps the form and result steps out of search
  ...Object.keys(calculatorConfigs).map((type) => `/price-calculator/${type}`),
];

const toXml = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${encodeURI(SITE_URL + path).replace(/&/g, '&amp;')}</loc></url>`).join('\n')}
</urlset>
`;

export default function sitemap() {
  return {
    name: 'laya-sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: toXml(sitemapPaths()) });
    },
  };
}
