import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Home from '../pages/Home/Home';
import Paintings from '../pages/Paintings/Paintings';
import Shelf from '../pages/Shelf/Shelf';
import Skills from '../pages/Skills/Skills';
import Projects from '../pages/Projects/Projects';
import ProjectDetails from '../pages/Projects/ProjectDetails';
import Contact from '../pages/Contact/Contact';
import ComingSoon from '../pages/ComingSoon/ComingSoon'; // Updated path
import AdminPanel from '../pages/Admin/AdminPanel';

export const createRouter = (darkMode, setDarkMode) => createBrowserRouter([
  {
    path: "/alfisha/admin/:password",
    element: <AdminPanel />,
  },
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
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "paintings",
        element: <Paintings />,
      },
      {
        path: "skills",
        element: <Skills />,
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
