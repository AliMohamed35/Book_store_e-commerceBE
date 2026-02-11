import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import BooksPage from "../features/books/pages/Books";

export const router = createBrowserRouter([
  // Auth routes - NO header/layout
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  
  // Main routes - WITH header/layout
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      // Add other protected routes here
      { path: "books", element: <BooksPage /> },
      // { path: "books/:id", element: <BookDetailsPage /> },
    ],
  },
  
  // 404 (can be with or without layout)
  { path: "*", element: <NotFoundPage /> },
]);
