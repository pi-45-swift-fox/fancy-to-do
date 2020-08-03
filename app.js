const express = require('express');
const todoRouter = require('./router');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World');
})
app.use('/todos', todoRouter);

app.listen(port, () => console.log(`at porrt ${port}`));
