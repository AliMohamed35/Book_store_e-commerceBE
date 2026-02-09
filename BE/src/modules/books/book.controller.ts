import { NextFunction, Request, Response } from "express";
import { bookService } from "./book.service";
import { parseId } from "../../utils/parse/parseId";

export class BookController {
  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const createdBook = await bookService.addBook(bookData);

      res.status(201).json({
        message: "Book added successfully",
        success: true,
        data: createdBook,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedBook = await bookService.deleteBook(parseId(id));

      return res.status(200).json({
        message: "Book deleted successfully!",
        success: true,
        data: deletedBook,
      });
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const fetchedBook = await bookService.getBookById(parseId(id));

      return res.status(200).json({
        message: "Book retrieved successfully!",
        success: true,
        data: fetchedBook,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await bookService.getAllBooks(page, limit);
      return res.status(200).json({
        message: "Books retrieved successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const bookData = req.body;
      const updatedBook = await bookService.updateAllBook(
        parseId(id),
        bookData,
      );

      return res.status(200).json({
        message: "Book updated successfully!",
        success: true,
        data: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const bookController = new BookController();
