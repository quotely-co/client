// index.js or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Make sure index.css includes the @import for the font
import App from './App';

// Render the App inside a div with the `font-sans` class for DM Sans font globally
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="font-sans">
      <App />
    </div>
  </React.StrictMode>
);
