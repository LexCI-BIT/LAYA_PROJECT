// Title, description, canonical URL and preview image for every page.
// Fixed pages are written by hand below; offerings, projects, design ideas and calculators
// are built from their data files, so new entries get sensible tags automatically.
import { matchPath } from 'react-router-dom';
import { SITE_URL, SITE_NAME } from './site';
import { offeringsData } from '../data/offeringsData';
import { projectsData } from '../data/projectsData';
import { categories, designIdeas } from '../data/DesignIdeasData';
import { calculatorConfigs } from '../data/calculatorConfig';

const DEFAULT_IMAGE = '/images/hero/living1.jpg';

// Google shows roughly 155 characters of a description. Keep whole sentences when they say enough,
// otherwise cut at the last whole word.
const shorten = (text = '', max = 155) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  let sentences = '';
  for (const sentence of clean.match(/[^.!?]+[.!?]+/g) ?? []) {
    if ((sentences + sentence).trim().length > max) break;
    sentences += sentence;
  }
  if (sentences.trim().length >= 70) return sentences.trim();
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1))}…`;
};

// Every title is the page's own name followed by the brand
const withBrand = (pageName) => `${pageName} | ${SITE_NAME}`;

// Pages with their own fixed route in App.jsx
const STATIC_PAGES = {
  '/': {
    title: SITE_NAME,
    // Square logo, so it stays clear when WhatsApp shows a small square thumbnail
    image: '/images/social/home-logo.png',
    description:
      'Aluminium interiors, windows, doors and partitions for homes and offices in Hyderabad, Warangal, Karimnagar and Andhra Pradesh, with 35+ years of experience.',
  },
  '/about-us': {
    title: withBrand('About Us'),
    description:
      'Thoughtful design, quality aluminium and precise fabrication for homes and commercial spaces across Telangana and Andhra Pradesh. Meet Laya Space Design.',
  },
  '/aluminium-manufacturing': {
    title: withBrand('Aluminium Manufacturing'),
    description:
      'Precision aluminium profiles and custom fabrication for doors, windows, partitions and architectural projects, with dependable project-based supply.',
    image: '/images/manufacturing/aluminium-manufacturing-hero.jpg',
  },
  '/projects': {
    title: withBrand('Projects'),
    description:
      'Explore our portfolio of aluminium kitchens, wardrobes, TV units, partitions, wall panelling and exterior cladding by Laya Space Design.',
  },
  '/price-calculator': {
    title: withBrand('Price Calculator'),
    description:
      'Get an approximate cost for your kitchen, wardrobe, living room or full home interiors in a few quick steps with our free price calculator.',
  },
  '/windows-doors': {
    title: withBrand('Windows & Doors'),
    description:
      'Sliding, casement and French windows plus sliding, bi-fold and entrance doors in premium aluminium, made for light, durability and sound insulation.',
    image: '/images/offerings/windowsanddoors.png',
  },
  '/glass-aluminium-partitions': {
    title: withBrand('Glass & Aluminium Partitions'),
    description:
      'Glass and aluminium partitions for offices, meeting rooms and homes that define spaces while keeping them open, bright and low-maintenance.',
    image: '/images/offerings/partition_full.png',
  },
};

// Hand-written descriptions for offerings shown on the site; any other offering uses its data
const OFFERING_DESCRIPTIONS = {
  'aluminium-interiors':
    'Eco-friendly aluminium interiors that are termite-proof, fire-resistant and moisture-resistant: wardrobes, kitchen cabinets, TV units, partitions and storage.',
  'modular-cupboards':
    'Sliding, hinged, mirror, walk-in and floor-to-ceiling aluminium wardrobes with organised, space-saving storage, designed for the modern home.',
  'exterior-works':
    'Weather-resistant aluminium balcony railings, doors, windows, partitions and facade cladding that stay durable and low-maintenance outdoors.',
  'custom-designs':
    'Personalised aluminium wardrobes, kitchens, storage units, TV units and partitions, designed around your space, style and needs.',
  renovation:
    'Replace old wardrobes, outdated kitchens, storage units and partitions with modern, durable aluminium for a fresh, contemporary home.',
};

// Hand-written from each project's own description and materials in projectsData.js;
// a new project without an entry here uses its description from the data
const PROJECT_DESCRIPTIONS = {
  'sliding-aluminium-wardrobe':
    'A sliding aluminium wardrobe with frosted glass and soft-close tracks, giving compact urban homes maximum storage without using extra floor space.',
  'modern-l-shaped-kitchen':
    'An L-shaped modular kitchen in powder-coated aluminium with a quartz countertop, built to resist moisture and pests for a hygienic, long-lasting home.',
  'architectural-louvers':
    'Weather-resistant aluminium louvers that add privacy, ventilation and sun control while giving the building facade a sharp, modern profile.',
  'walk-in-glass-wardrobe':
    'A walk-in wardrobe with slim aluminium profiles, tempered glass and integrated LED lighting that keeps your collection on display and dust-free.',
  'straight-modular-kitchen':
    'A straight-line aluminium kitchen for compact apartments, with high-capacity cabinets, ergonomic pull-outs and integrated appliance modules.',
  'custom-tv-unit':
    'A wall-mounted aluminium TV unit with matte panels, integrated storage and built-in cable channels for a clean, wire-free feature wall.',
  'minimalist-partition':
    'Slimline aluminium room dividers with fluted glass that separate spaces visually and acoustically while keeping interiors bright and airy.',
  'island-modular-kitchen':
    'An island kitchen with aluminium carcasses, wood-finish shutters and a quartz countertop: the warmth of timber with moisture and termite resistance.',
  'open-shelf-wardrobe':
    'A floor-to-ceiling aluminium wardrobe with hanging zones, drawers, shoe racks and LED-lit open shelves behind colour-accented sliding shutters.',
  'bedroom-wall-paneling':
    'A bedroom built around a backlit geometric headboard wall of aluminium-framed fabric and wood panels, with matching floating side tables.',
  'glass-staircase-foyer':
    'A double-height foyer with a floating staircase, frameless toughened-glass railings on concealed aluminium channels and full-height glazing.',
};

// Offerings whose real page lives at a different URL
const OFFERING_CANONICAL = {
  'glass-aluminium-partitions': '/glass-aluminium-partitions',
};

const calculatorName = (config) =>
  config.intro?.title?.match(/What is the (.+?)\?/)?.[1] ?? 'Price Calculator';

const NOT_FOUND = {
  title: withBrand('Page Not Found'),
  description: STATIC_PAGES['/'].description,
  noindex: true,
};

const findPage = (pathname) => {
  if (STATIC_PAGES[pathname]) return { ...STATIC_PAGES[pathname], path: pathname };

  let match = matchPath('/offerings/:slug', pathname);
  if (match) {
    const { slug } = match.params;
    const data = offeringsData[slug];
    if (!data) return null;
    const canonical = OFFERING_CANONICAL[slug];
    if (canonical) return { ...STATIC_PAGES[canonical], path: canonical };
    return {
      title: withBrand(data.title),
      description: OFFERING_DESCRIPTIONS[slug] ?? shorten(data.about),
      image: data.heroImage,
      path: pathname,
    };
  }

  match = matchPath('/projects/:projectId', pathname);
  if (match) {
    const project = projectsData.find((p) => p.id === match.params.projectId);
    if (!project) return null;
    return {
      title: withBrand(project.title),
      description: PROJECT_DESCRIPTIONS[project.id] ?? shorten(project.fullDesc || project.shortDesc),
      image: project.image,
      path: pathname,
    };
  }

  match = matchPath('/design-ideas/:category/:id', pathname);
  if (match) {
    const idea = designIdeas[match.params.category]?.find((i) => i.id === match.params.id);
    if (!idea) return null;
    return { title: withBrand(idea.title), description: shorten(idea.desc), image: idea.image, path: pathname };
  }

  match = matchPath('/design-ideas/:category', pathname);
  if (match) {
    const category = categories.find((c) => c.id === match.params.category);
    if (!category) return null;
    const count = designIdeas[category.id]?.length ?? 0;
    return {
      title: withBrand(category.title),
      description: `${category.desc} Browse ${count} design ideas and book a free consultation with ${SITE_NAME}.`,
      image: category.image,
      path: pathname,
    };
  }

  // Calculator intro, form and result steps all point search engines at the intro page
  match = matchPath('/price-calculator/:type/*', pathname);
  if (match) {
    const config = calculatorConfigs[match.params.type];
    if (!config) return null;
    return {
      title: withBrand(calculatorName(config)),
      description: shorten(config.intro?.subtitle),
      image: config.intro?.heroImage,
      path: `/price-calculator/${match.params.type}`,
    };
  }

  return null;
};

const absolute = (path) => encodeURI(`${SITE_URL}${path}`);

export const getPageMeta = (pathname) => {
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const page = findPage(cleanPath);
  if (!page) return { ...NOT_FOUND, image: absolute(DEFAULT_IMAGE), canonical: null };

  return {
    title: page.title,
    description: page.description,
    image: absolute(page.image || DEFAULT_IMAGE),
    canonical: absolute(page.path),
    noindex: false,
  };
};
