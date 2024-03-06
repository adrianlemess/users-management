import { Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { AnimatedBaseLayout } from "@/components/Layout/AnimatedBaseLayout/AnimatedBaseLayout";
import { BaseLayout } from "@/components/Layout/BaseLayout/BaseLayout";
import { ErrorBoundaryLayout } from "@/components/Layout/ErrorBoundaryLayout/ErrorBoundaryLayout";

import { useAuthStore } from "./state";

// Import the pages using lazy loading
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const SignIn = React.lazy(() => import("@/pages/SignIn/SignIn"));
const SignUp = React.lazy(() => import("@/pages/SignUp/SignUp"));

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
            element: (
              <Suspense fallback={<Spinner color="red.500" />}>
                <Dashboard />
              </Suspense>
            ),
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
            element: (
              <Suspense fallback={<Spinner color="red.500" />}>
                <SignIn />
              </Suspense>
            ),
            index: true,
          },
        ],
      },
      {
        path: "signup",
        element: <AnimatedBaseLayout />,
        children: [
          {
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            ),
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
