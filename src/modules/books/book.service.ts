import Book from "../../DB/models/book.model";
import { BookCreatingResponseDTO, CreateBookDTO } from "./book.dto";

export class BookService{
    async addBook(bookData: CreateBookDTO): Promise<BookCreatingResponseDTO>{
        const createdBook = await Book.create({
            ...bookData
        });

        return {
            book_name: bookData.book_name,
            price: bookData.price,
            stock: bookData.stock,
        }
    }
}

export const bookService = new BookService();