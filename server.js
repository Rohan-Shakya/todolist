const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/todo');

// database connector
const dbURL = `mongodb+srv://todo:QKV76isGEW9GW7Ra@todo.v0zv3.mongodb.net/todo?retryWrites=true&w=majority`;

// Port
const PORT = 3000 || process.env.PORT;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
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

app.get('/todo', (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render('index', { title: 'All todos', todos: result })
    );
  console.log(req.url, req.method);
});

app.post('/todo', (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((result) => res.redirect('/todo'))
    .catch((err) => console.log(err));
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/todo' });
    })
    .catch((err) => res.status(404).render('404', { title: '404' }));
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
