//Packeges
const express = require("express");
const chalk = require("chalk");

//Middlewares
const { queryMiddleware } = require("@abujude/sgs-khadamati");
const authMiddleware = require('./middlewares/auth.middleware');

//database
const sequelize = require('./database/db-client');
require('./database/models/Item.model');

//Routers
const booksRouter = require('./routers/books.router');
const reportsRouter = require('./routers/reports.router');
const mapsRouter = require('./routers/maps.router');


const errorsController = require('./controllers/errors.controller');


const app = express();
app.use(express.json());

app.use(queryMiddleware.setLanguage('A', 'lang'));
app.use((req, res, next) => {

    next();
});

// app.use(authMiddleware);

app.use('/books' ,booksRouter);
app.use('/reports' ,reportsRouter);
app.use('/maps' ,mapsRouter);

app.use('/500', errorsController.get500);
app.use(errorsController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message = error.httpStatusCode !== 404 ? 
        error.message || '' : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message , data: error.errorsData || {} });
});

const port = process.env.PORT || 7000;

sequelize
    .sync({ force: true, match: /-test$/ }) //sync only if db name end with test keyword.
    .then(result => {
        
            app.listen(port,() =>{

                switch(process.env.API_SERVER_TYPE)
                {
                    case 'DEVELOPMENT':
                        console.log(chalk.yellowBright
                            .inverse(`MAKTABATI API ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
                        break;
                    case 'QUALITY':
                        console.log(chalk.cyan
                            .inverse(`MAKTABATI API ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
                        break;
                    default :
                        console.log(chalk.greenBright
                            .inverse(`MAKTABATI API ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
                }

            });
    })
    .catch(error => {
        console.log(chalk.red.inverse('Db Error!'));
        console.error(error);
    });