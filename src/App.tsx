import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import BaseLayout from "./components/Layout/BaseLayout/BaseLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

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
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
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
