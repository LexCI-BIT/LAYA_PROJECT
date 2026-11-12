import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '../seo/pageMeta';

// Sets (or removes, when value is null) one tag in <head>, reusing the one index.html starts with
const setHeadTag = (tag, keyAttr, key, valueAttr, value) => {
  let element = document.head.querySelector(`${tag}[${keyAttr}="${key}"]`);
  if (value == null) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(keyAttr, key);
    document.head.appendChild(element);
  }
  element.setAttribute(valueAttr, value);
};

// Sets (or removes, when data is null) the page's hidden schema.org details, e.g. Service on offering pages
const setStructuredData = (data) => {
  let element = document.head.querySelector('script#page-structured-data');
  if (!data) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = 'page-structured-data';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

// Gives every page its own title, description, canonical URL and link-preview tags
const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    setHeadTag('meta', 'name', 'description', 'content', meta.description);
    setHeadTag('meta', 'name', 'robots', 'content', meta.noindex ? 'noindex' : null);
    setHeadTag('link', 'rel', 'canonical', 'href', meta.canonical);
    setHeadTag('meta', 'property', 'og:title', 'content', meta.title);
    setHeadTag('meta', 'property', 'og:description', 'content', meta.description);
    setHeadTag('meta', 'property', 'og:url', 'content', meta.canonical);
    setHeadTag('meta', 'property', 'og:image', 'content', meta.image);
    setStructuredData(meta.structuredData);
  }, [pathname]);

  return null;
};

export default PageMeta;
