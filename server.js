const express = require('express');
const app = express();
const mongoose = require('mongoose');

const todoController = require('./controllers/todoController');

const dbURL =
  'mongodb+srv://todos:rZwUlDcJRX5MiIy0@todos.lva32.mongodb.net/todos?retryWrites=true&w=majority';

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/todo');
});

todoController(app);
