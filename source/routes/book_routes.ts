import express from 'express';
import bookController from '../controllers/bookController';

const router = express.Router();

router.get('/all', bookController.allBooks);
router.get('/:id', bookController.getBook);
router.delete('/delete/:id', bookController.deleteBookById);
router.put('/update/:id', bookController.updateBookById);
router.post('/add', bookController.addBook);

export = router;
