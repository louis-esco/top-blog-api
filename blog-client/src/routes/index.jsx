import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoutes />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <div>Logged User Home Page</div>,
        },
        {
          path: "/login",
          element: <Navigate to="/" replace={true} />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Navigate to="/login" replace={true} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter(
    [
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  // Provide the router configuration using RouterProvider
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default Routes;
