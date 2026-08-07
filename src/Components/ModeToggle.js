import React, { useState, useEffect } from 'react';
import './ModeToggle.css'; // Import the CSS styles for the button's looks and animations

/**
 * ModeToggle Component
 * This component renders a premium, interactive light/dark mode switch.
 * 
 * How to reuse this component:
 * 1. Copy both `ModeToggle.js` and `ModeToggle.css` into your project's components folder.
 * 2. Import it anywhere in your React tree: `import ModeToggle from './path/to/ModeToggle';`
 * 3. Render it inside your JSX: `<ModeToggle />`
 * 4. Make sure your project loads Bootstrap 5.3+ (or uses standard CSS theme variables responding to `data-bs-theme`).
 */
export default function ModeToggle() {
  
  // 1. STATE INITIALIZATION (useState Hook)
  // We initialize the theme state. We check if the user has already visited the site 
  // and set a preference in localStorage. If they haven't, we default to 'light'.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 2. SIDE EFFECTS (useEffect Hook)
  // Whenever the `theme` state changes (light -> dark or dark -> light), this effect runs:
  // - It sets `data-bs-theme="dark"` or `data-bs-theme="light"` on the <html> tag.
  // - Bootstrap 5.3 automatically watches this attribute and applies its dark/light stylesheets globally.
  // - It saves the theme in `localStorage` so the setting persists when the page is refreshed.
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. TOGGLE HANDLER FUNCTION
  // A helper function that toggles the state between 'light' and 'dark'.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-toggle-container">
      {/* 
        The button className changes dynamically between:
        - "theme-toggle-btn light" (applies light-mode styles, puts thumb on the left)
        - "theme-toggle-btn dark" (applies dark-mode styles, moves thumb to the right)
      */}
      <button 
        className={`theme-toggle-btn ${theme}`} 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className="theme-toggle-track">
          
          {/* A. SUN ICON (Visible in dark mode so user can click to go back to light mode) */}
          <div className="theme-toggle-icon sun">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          
          {/* B. THE SLIDING THUMB (The circle that moves from left to right) */}
          <div className="theme-toggle-thumb"></div>
          
          {/* C. MOON ICON (Visible in light mode so user can click to go to dark mode) */}
          <div className="theme-toggle-icon moon">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
          
        </div>
      </button>
    </div>
  );
}
