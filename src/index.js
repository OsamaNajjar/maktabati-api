const express = require("express");
const chalk = require("chalk");
const { queryMiddleware } = require("@abujude/sgs-khadamati");

//Middlewares
const authMiddleware = require('./middlewares/auth.middleware');

//Routers
const booksRouter = require('./routers/books.router');


const errorsController = require('./controllers/errors.controller');

const app = express();
app.use(express.json());

app.use(queryMiddleware.setLanguage('A', 'lang'));
app.use((req, res, next) => {

    next();
});

// app.use(authMiddleware);

app.use('/books' ,booksRouter);













app.use(errorsController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message = error.httpStatusCode !== 404 ? 
        error.message || '' : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message });
});

const port = process.env.PORT || 7000;
app.listen(port,() => {
    console.log( chalk.green.inverse.bold(`Server is up and runung on port ${port}`));
});