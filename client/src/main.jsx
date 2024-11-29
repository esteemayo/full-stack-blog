import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import Register from './routes/Register';
import Login from './routes/Login';
import PostLists from './routes/PostLists';
import Write from './routes/Write';
import SinglePost from './routes/SinglePost';
import Home from './routes/Home.jsx';

import QueryProvider from './providers/QueryProvider.jsx';
import ToasterProvider from './providers/ToasterProvider.jsx';

import MainLayout from './layouts/MainLayout.jsx';

import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'posts',
        element: <PostLists />,
      },
      {
        path: ':slug',
        element: <SinglePost />,
      },
      {
        path: 'write',
        element: <Write />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryProvider>
        <RouterProvider router={router} />
        <ToasterProvider />
      </QueryProvider>
    </ClerkProvider>
  </StrictMode>
);
