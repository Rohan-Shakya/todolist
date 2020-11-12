const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render('index', { title: 'All todos', todos: result })
    );
});

router.post('/', (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/todo' });
    })
    .catch((err) => res.status(404).render('404', { title: '404' }));
});

module.exports = router;
