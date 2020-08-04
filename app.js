require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const { ErrorHandler } = require('./middlewares');

app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.use(ErrorHandler);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));