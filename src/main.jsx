import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PostList from './routes/PostList';
import Login from './routes/Login';
import Register from './routes/Register';
import Write from './routes/Write';
import SinglePost from './routes/SinglePost';
import Home from './routes/Home.jsx';

import './index.css';

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
