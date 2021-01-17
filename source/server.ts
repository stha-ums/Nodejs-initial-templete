import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book_routes';

const NAMESPACE = 'Server';
const app = express();

/** Loggin the request **/

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS -[${res.statusCode}]`);
    });
    next();
});

/** Parse the request **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Rules of an API **/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept,Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.use('/books', bookRoutes);
/** Error Handling */

app.use((req, res, _) => {
    const error = new Error('Route Not Found');
    return res.status(404).json({
        message: error.message
    });
});

/** Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
