import Home from "../../pages/Home";
import AdminDashboard from "../../pages/AdminDashboard";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Category from "../../pages/Category";

const routes = [
  {
    path: ["/", "/home"],
    component: Home,
    isPrivate: false,
  },
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    component: SignUp,
    isPrivate: false,
  },
  {
    path: "/admin",
    component: AdminDashboard,
    isPrivate: true,
  },
  {
    path: "/category/:categoryId",
    component: Category,
    isPrivate: false,
  },
];

export default routes;
