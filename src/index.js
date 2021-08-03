const express = require("express");
const chalk = require("chalk");

//Middlewares
const langMiddleware = require('./middlewares/lang.middlewares');
const authMiddleware = require('./middlewares/auth.middleware');

//Routers
const booksRouter = require('./routers/books.router');

const app = express();

app.use((req, res, next)  => {
    console.log(req.body);

    next();
});

// app.use(langMiddleware);
// app.use(authMiddleware);

app.use('/books' ,booksRouter);

app.listen(7000,() => {
    console.log( chalk.green.inverse.bold("Server is up and runung on port 7000"));
});