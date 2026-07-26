import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  { path: "/register", Component: RegisterPage },
]);


const RouterConfig = () => {
  return <RouterProvider router={router} />;
}   

export default RouterConfig;

