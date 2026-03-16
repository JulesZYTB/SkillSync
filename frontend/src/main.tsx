import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/layout';
import Errors from './components/error/errors';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errors />,
    /* children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Form />,
      },
      {
        path: "products/:id",
        element: <Product />,
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <User />,
            loader: usersLoader,
          },
          {
            path: ":id",
            element: <UserDetails />,
          },
        ],
      },
    ], */
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
