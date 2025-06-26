import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import VerifyEmail from "../pages/VerifyEmailPage/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import CartPage from "../pages/CartPage/CartPage";
import ProductListPage from "../pages/ProductListPage/ProductListPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Digital from "../pages/ProductDigital/Digital";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
    isPrivate: false,
  },
  {
    path: "/digital",
    page: Digital,
    isShowHeader: true,
    isPrivate: false,
  },

  {
    path: "/cartpage",
    page: CartPage,
    isShowHeader: true,
    isPrivate: false,
  },

  {
    path: "/verify-email/:token",
    page: VerifyEmail,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
    isPrivate: false,
  },

  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
    isShowFooter: true,
    isPrivate: false,
  },

  {
    path: "/chat",
    page: ChatPage,
    isPrivate: false,
  },

  {
    path: "/ProductList",
    page: ProductListPage,
    isShowFooter: true,
    isShowHeader: true,
    isPrivate: false,
  },

  {
    path: "/admin",
    page: AdminPage,
    isShowFooter: false,
    isShowHeader: false,
    isPrivate: true,
  },

  {
    path: "/Profile",
    page: ProfilePage,
    isShowFooter: true,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isPrivate: false,
  },
];
