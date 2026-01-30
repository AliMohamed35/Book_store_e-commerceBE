import { NextFunction, Request, Response } from "express";
import { bookService } from "./book.service";

export class BookController{
    async createBook(req: Request, res: Response, next: NextFunction){
        try {
            const bookData = req.body;
            const createdBook = await bookService.addBook(bookData);

            res.status(201).json({message:"Book added successfully", success: true, data: createdBook});
        } catch (error) {
            next(error);
        }
    }
}

export const bookController = new BookController();