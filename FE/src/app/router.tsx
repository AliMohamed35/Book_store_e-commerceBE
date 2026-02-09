import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// We'll add these as we create them:
// import LoginPage from '../features/auth/pages/LoginPage';
// import RegisterPage from '../features/auth/pages/RegisterPage';
// import BooksPage from '../features/books/pages/BooksPage';
// import BookDetailPage from '../features/books/pages/BookDetailPage';
// import CartPage from '../features/cart/pages/CartPage';
// import OrdersPage from '../features/orders/pages/OrdersPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // Auth routes
  // { path: '/login', element: <LoginPage /> },
  // { path: '/register', element: <RegisterPage /> },

  // Books routes
  // { path: '/books', element: <BooksPage /> },
  // { path: '/books/:id', element: <BookDetailPage /> },

  // Cart & Orders
  // { path: '/cart', element: <CartPage /> },
  // { path: '/orders', element: <OrdersPage /> },

  // 404 catch-all (must be last)
   {
    path: '*',
    element: <NotFoundPage />,
  },
]);
