import {CreateBook, DeleteBookById, GetAllBooks, GetBookById} from "../controllers/Book";
import express from "express";

const router = express.Router();


router.get('/all', GetAllBooks);

router.get('/:id', GetBookById);

router.post('/', CreateBook);

router.delete('/:id', DeleteBookById);



export {router as BookRouter}