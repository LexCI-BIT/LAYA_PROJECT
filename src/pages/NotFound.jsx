import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// Shown for any address that isn't a page; PageMeta marks it "noindex" so search engines skip it
const NotFound = () => (
  <section className="not-found">
    <div className="not-found-content">
      <span className="not-found-code">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="not-found-primary">Go to Home</Link>
        <Link to="/projects" className="not-found-secondary">View Projects</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
