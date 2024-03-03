import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import AnimatedBaseLayout from "@/components/Layout/AnimatedBaseLayout/AnimatedBaseLayout";
import BaseLayout from "@/components/Layout/BaseLayout/BaseLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";

// @TODO refactor with user logic
const getUser = () => {
  // get user from localStorage
  return localStorage.getItem("user") || false;
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Dashboard msg="Hello Adrian" />,
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
      const user = getUser();
      if (user) {
        return redirect("/dashboard");
      }
      return redirect("/signup");
    },
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
