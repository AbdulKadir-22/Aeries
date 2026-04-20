import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Home from '../pages/Home/Home';
import Paintings from '../pages/Paintings/Paintings';
import Shelf from '../pages/Shelf/Shelf';
import Contact from '../pages/Contact/Contact';
import ComingSoon from '../pages/ComingSoon/ComingSoon'; // Updated path

export const createRouter = (darkMode, setDarkMode) => createBrowserRouter([
  {
    path: "/",
    element: <Layout darkMode={darkMode} setDarkMode={setDarkMode} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <ComingSoon title="Projects" />,
      },
      {
        path: "paintings",
        element: <Paintings />,
      },
      {
        path: "skills",
        element: <ComingSoon title="Skills" />,
      },
      {
        path: "shelf",
        element: <Shelf />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
