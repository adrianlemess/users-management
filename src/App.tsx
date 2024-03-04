import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import AnimatedBaseLayout from "@/components/Layout/AnimatedBaseLayout/AnimatedBaseLayout";
import BaseLayout from "@/components/Layout/BaseLayout/BaseLayout";
import { ErrorBoundaryLayout } from "@/components/Layout/ErrorBoundaryLayout/ErrorBoundaryLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";

import { useAuthStore } from "./state";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/dashboard",
        element: <BaseLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            loader: async () => {
              const isAuthenticated = useAuthStore.getState().isAuthenticated();
              if (!isAuthenticated) {
                return redirect("/signin");
              }
              return null;
            },
          },
        ],
      },

      {
        path: "signin",
        element: <AnimatedBaseLayout />,
        children: [
          {
            element: <SignIn />,
            index: true,
          },
        ],
      },
      {
        path: "signup",
        element: <AnimatedBaseLayout />,
        children: [
          {
            element: <SignUp />,
            index: true,
          },
        ],
      },
      {
        path: "/",
        loader: async () => {
          const isAuthenticated = useAuthStore.getState().isAuthenticated();
          if (isAuthenticated) {
            return redirect("/dashboard");
          }
          return redirect("/signup");
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
