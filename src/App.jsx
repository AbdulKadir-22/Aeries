import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './router/router';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      if (favicon) favicon.href = '/AA_dark.png';
    } else {
      document.documentElement.classList.remove('dark');
      if (favicon) favicon.href = '/AA_light.png';
    }
  }, [darkMode]);

  const router = createRouter(darkMode, setDarkMode);

  return <RouterProvider router={router} />;
}

export default App;