const express = require('express');
const app = express();

// Port
const PORT = 3000 || process.env.PORT;

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const todos = [
    { id: 1, todo: 'Buying' },
    { id: 2, todo: 'Washing' },
  ];
  res.render('index', { title: 'All todos', todos });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => console.log(`Listening to the port : ${PORT}`));
