import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import './responsive.css'

// If any image fails to load, show a neutral placeholder instead of a broken-image icon
const FALLBACK_IMAGE = '/images/placeholder.svg';
window.addEventListener(
  'error',
  (event) => {
    const img = event.target;
    if (img instanceof HTMLImageElement && !img.dataset.fallback) {
      img.dataset.fallback = 'true';
      img.removeAttribute('srcset');
      img.src = FALLBACK_IMAGE;
    }
  },
  true // image errors don't bubble, so listen in the capture phase
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
