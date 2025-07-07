import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import VerifyEmail from "../pages/VerifyEmailPage/VerifyEmailPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import CartPage from "../pages/CartPage/CartPage";
import ProductListPageUniform from "../pages/ProductListPage/ProductListPageUniform";
import ProductListPageElectronics from "../pages/ProductListPage/ProductListPageElectronics";
import ProductListPageInterior from "../pages/ProductListPage/ProductListPageInterior";
import ProductListPageTool from "../pages/ProductListPage/ProductListPageTool";
import ProductListPageDocument from "../pages/ProductListPage/ProductListPageDocument";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PushProductPage from "../pages/PushProductPage/PushProductPage";
import Digital from "../pages/ProductDigital/Digital";
import SearchPage from "../pages/SearchPage/SearchPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
    isPrivate: false,
  },
  {
    path: "/digital/:id",
    page: Digital,
    isShowHeader: true,
    isShowFooter: true,
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
    path: "/ProductListUniform",
    page: ProductListPageUniform,
    isShowFooter: true,
    isShowHeader: true,
    isPrivate: false,
  },

  {
    path: "/ProductListElectronics",
    page: ProductListPageElectronics,
    isShowFooter: true,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/ProductListInterior",
    page: ProductListPageInterior,
    isShowFooter: true,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/ProductListTool",
    page: ProductListPageTool,
    isShowFooter: true,
    isShowHeader: true,
    isPrivate: false,
  },
  {
    path: "/ProductListDocument",
    page: ProductListPageDocument,
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
    path: "/push-product",
    page: PushProductPage,
    isShowFooter: true,
    isShowHeader: true,
  },

  {
    path: "/digital",
    page: Digital,
    isShowFooter: true,
    isShowHeader: true,
  },

  {
    path: "/search",
    page: SearchPage,
    isShowFooter: true,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isPrivate: false,
  },
];
