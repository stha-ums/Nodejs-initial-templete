import { Request, Response } from 'express';
import logging from '../config/logging';

import Book from '../schema/book';

const NAMESPACE = 'Book Controller';

/** GET - /books #return all the books */

const allBooks = (req: Request, res: Response) => {
    let books = Book.find((err: any, books: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(books);
        }
    });
};

/** -GET - /book/{1} #return book with id 1 */
const getBook = (req: Request, res: Response) => {
    Book.findById(req.params.id, (error: any, book: any) => {
        if (error) {
            res.send(error);
        } else {
            res.send(book);
        }
    });
};

/** -Post /book */

const addBook = (req: Request, res: Response) => {
    let book = new Book(req.body);
    book.save((err: any) => {
        if (err) {
            logging.error(NAMESPACE, `error at ${req.url} from IP ${req.socket.remoteAddress} `, err);
            res.send(err);
        } else {
            res.send(book);
        }
    });
};

/** DELETE - delete by id */

const deleteBookById = (req: Request, res: Response) => {
    Book.findByIdAndDelete(req.params.id, null, (err: any, book: any) => {
        if (err) {
            res.send(err);
            logging.error(NAMESPACE, `While ${req.url} from ${req.socket.remoteAddress}`);
        } else {
            logging.info(NAMESPACE, `Deleted Book with id: ${req.params.id}`);
            res.status(200).json({
                message: 'Deleted successfully'
            });
        }
    });
};

/** PUT - update by id */

const updateBookById = (req: Request, res: Response) => {
    Book.findByIdAndUpdate(req.params.id, req.body, null, (err: any, book: any) => {
        if (err) {
            logging.error(NAMESPACE, `Error Occured in ${req.url}`, err);
            res.status(400).json({
                message: err
            });
        } else {
            logging.info(NAMESPACE, 'Update Book from');
            res.status(200).json({
                message: 'Update Successfully'
            });
        }
    });
};

export default {
    allBooks,
    getBook,
    addBook,
    updateBookById,
    deleteBookById
};
