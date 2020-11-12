const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

// PORT
const PORT = process.env.PORT || 3000;

const todoController = require('./controllers/todoController');

const dbURL = config.mongoURL;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
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

// todoController(app);
app.use('/todo', todoController);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
