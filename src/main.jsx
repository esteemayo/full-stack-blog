import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PostList from './routes/PostList';
import Login from './routes/Login';
import Register from './routes/Register';
import Write from './routes/Write';
import SinglePost from './routes/SinglePost';
import Home from './routes/Home.jsx';

import MainLayout from './layouts/MainLayout.jsx';

import './index.css';

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
        element: <PostList />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
