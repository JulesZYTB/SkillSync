// Import necessary modules from React and React Router
import { StrictMode } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Layout from "./components/layout/layout";
import Login from "./pages/login";
import { AuthProvider } from "./services/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "admin",
        lazy: async () => ({ Component: (await import("./pages/admin/dashboard")).default }),
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin/users",
        lazy: async () => ({ Component: (await import("./pages/admin/users")).default }),
      },
      {
        path: "admin/skills",
        lazy: async () => ({ Component: (await import("./pages/admin/skills")).default }),
      },
      {
        path: "admin/projects",
        lazy: async () => ({ Component: (await import("./pages/admin/projects")).default }),
      },
      {
        path: "dashboard/collaborator",
        lazy: async () => ({ Component: (await import("./pages/dashboard/collaborator")).default }),
      },
      {
        path: "dashboard/projects",
        lazy: async () => ({ Component: (await import("./pages/dashboard/projects")).default }),
      },
      {
        path: "settings",
        lazy: async () => ({ Component: (await import("./pages/settings")).default }),
      },
    ]
  }
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
