require('dotenv').config();
const express = require('express');
const todoRouter = require('./router');
const usersRouter = require('./router/usersRouter.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World');
})
app.use('/', usersRouter);
app.use('/todos', todoRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`at porrt ${port}`));
