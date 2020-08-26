const Todo = require('../models/todo');
module.exports = (app) => {
  app.get('/todo', (req, res) => {
    Todo.find()
      .sort({ createdAt: -1 })
      .then((result) =>
        res.render('index', { title: 'All todos', todos: result })
      );
  });

  app.post('/todo', (req, res) => {
    const todo = new Todo(req.body);
    todo
      .save()
      .then((result) => res.redirect('/'))
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
};
