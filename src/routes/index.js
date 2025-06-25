import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import VerifyEmail from "../pages/VerifyEmailPage/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import CartPage from "../pages/CartPage/CartPage";
import ProductListPage from "../pages/ProductListPage/ProductListPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/cartpage",
    page: CartPage,
    isShowHeader: true,
  },

  {
    path: "/verify-email/:token",
    page: VerifyEmail,
    isShowHeader: false,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/chat",
    page: ChatPage,
  },

  {
    path: "/ProductList",
    page: ProductListPage,
    isShowFooter: true,
    isShowHeader: true,
  },

  {
    path: "/admin",
    page: AdminPage,
    isShowFooter: false,
    isShowHeader: false,
    isPrivate: true
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
