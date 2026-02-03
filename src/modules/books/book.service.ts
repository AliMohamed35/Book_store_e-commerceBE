import Book, { BookAttributes } from "../../DB/models/book.model";
import { ResourceNotFoundError } from "../../ExceptionHandler/customError";
import {
  BookCreatingResponseDTO,
  BookResponseDTO,
  CreateBookDTO,
  UpdateBookDTO,
} from "./book.dto";

export class BookService {
  async addBook(bookData: CreateBookDTO): Promise<BookCreatingResponseDTO> {
    const createdBook = await Book.create({
      ...bookData,
    });

    return {
      book_name: bookData.book_name,
      price: bookData.price,
      stock: bookData.stock,
    };
  }

  async deleteBook(id: number): Promise<number> {
    const existingBook = await Book.findByPk(id);

    if (!existingBook) throw new ResourceNotFoundError("Book doesn't exist!");

    await Book.destroy({ where: { id } });

    return id;
  }

  async getBookById(id: number): Promise<BookResponseDTO> {
    const existingBook = await Book.findByPk(id);

    if (!existingBook) throw new ResourceNotFoundError("Book doesn't exist!");

    return {
      book_name: existingBook.getDataValue("bookName"),
      description: existingBook.getDataValue("description"),
      price: existingBook.getDataValue("price"),
      stock: existingBook.getDataValue("stock"),
    };
  }

  async getAllBooks(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Book.findAndCountAll({
      limit: limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    if (rows.length === 0) {
      throw new ResourceNotFoundError("No books found in database!");
    }

    return {
      data: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async updateAllBook(
    id: number,
    bookData: Partial<UpdateBookDTO>,
  ): Promise<UpdateBookDTO> {
    const existingBook = await Book.findByPk(id);

    if (!existingBook) throw new ResourceNotFoundError("Book doesn't exist!");

    await existingBook.update({ ...bookData });

    return {
      book_name: existingBook.getDataValue("bookName"),
      description: existingBook.getDataValue("description"),
      price: existingBook.getDataValue("price"),
      stock: existingBook.getDataValue("stock"),
    };
  }
}

export const bookService = new BookService();
