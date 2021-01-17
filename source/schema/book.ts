import mongoose from 'mongoose';
import logging from '../config/logging';
const NAMESPACE = 'db connection';

const uri: string = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    if (err) {
        logging.error(NAMESPACE, 'Error while connectiong the mongodb', err);
    } else {
        logging.info(NAMESPACE, `Connected to MongoDB ${uri} successfully`);
    }
});

export const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', BookSchema);
export default Book;
