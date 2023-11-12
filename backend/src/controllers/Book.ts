import { Request, Response } from 'express';
import {QueryBookByAttr, QueryBookById, QueryCreateBook, QueryDeleteBookById, QueryListOfBooks} from '../services/Book';
import {CreateBookType, GetBookType, ServerResponse} from '../types';

export const GetAllBooks = async (req: Request, res: Response<ServerResponse<GetBookType[]>>) => {
    try {
        const books = await QueryListOfBooks();
        res.status(200).json({ status: 200, data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'An error occurred while retrieving the books.' });
    }
};

export const GetBookById = async (req: Request, res: Response<ServerResponse<GetBookType>>) => {
    try {
        const bookId = Number(req.params.id)
        const book = await QueryBookById(bookId);
        if (!book) {
            res.status(404).json({ status: 404, message: 'Book not found.' });
        } else {
            res.status(200).json({ status: 200, data: book });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'An error occurred while retrieving the book.' });
    }
}

export const CreateBook = async (req: Request<CreateBookType>, res: Response<ServerResponse<CreateBookType>>) => {

    try {

        const BookExists = await QueryBookByAttr(req.body.title, req.body.author);

        if (BookExists) {
            res.status(409).json({ status: 409, message: 'Book already exists.' })
        }
        const book = await QueryCreateBook(req.body);
        res.status(201).json({ status: 201, data: book });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'An error occurred while creating the book.' });
    }
}

export const DeleteBookById = async (req: Request, res: Response<ServerResponse<GetBookType>>) => {
    try {
        const bookId = Number(req.params.id)
        const book = await QueryDeleteBookById(bookId);
        if (!book) {
            res.status(404).json({ status: 404, message: 'Book not found.' });
        } else {
            res.status(200).json({ status: 200, data: book });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'An error occurred while retrieving the book.' });
    }
}