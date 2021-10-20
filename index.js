const express = require('express'),
  morgan = require('morgan');

const app = express();

const movieArray = [
  {title: 'Tropic Thunder', director: 'Ben Stiller', genre: 'Comedy/Action'},
  {title: 'Happy Gilmore', director: 'Dennis Dugan', genre: 'Comedy/Romance'},
  {title: 'Iron Man', director: 'Jon Favreau', genre: 'Action/Adventure'},
  {title: 'Thor: Ragnarok', director: 'Taika Waititi', genre: 'Action/Adventure'},
  {title: 'Grown Ups', director: 'Dennis Dugan', genre: 'Comedy/Buddy'},
  {title: 'The Fast and The Furious', director: 'Rob Cohen', genre: 'Action/Crime'},
  {title: 'Avengers: Endgame', director: 'Anthony & Joe Russo', genre: 'Action/Sci-fi'},
  {title: 'Avengers: Infinity War', director: 'Anthony & Joe Russo', genre: 'Action/Sci-fi'},
  {title: 'Step Brothers', director: 'Adam McKay', genre: 'Comedy'},
  {title: 'The Other Guys', director: 'Adam McKay', genre: 'Comedy/Action'}
];

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function(_req, res) {
  res.send('Welcome to my app!');
});

app.get('/movies', function(_req, res) {
  res.json(movieArray)
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find(movie => {
    return movie.title === req.params.title
  }));
});

app.get('/movies/:genre', (req, res) => {
  res.json(movies.find(movie => {
    return movie.genre === req.params.genre
  }));
});

app.get('/movies/:director', (req, res) => {
  res.json(movies.find(movie => {
    return movie.director === req.params.director
  }));
});

app.post('/register', (req, res) => {
  let newAccount = req.body;

  if (!newAccount.username) {
    const message = 'missing title in request body';
    res.status(400).send(newAccount);
  } else {
      newUser.id = uuid.v4();
      user.push(newAccount);
      res.status(201).send(newAccount);
  }
});

app.put('/account/:information/:update', (req, res) => {
  let account = account.find((user) => {
    return user.name === req.params.name
  });

  if (user) {
    user.information[req.params.information] = parseInt(req.params.update);
    res.status(201).send('account information ' + req.params.name + ' username was updated.')
  } else {
      res.status(404).send('account with username ' + req.params.name + ' was not found')
  }
});

app.put('/account/:favorite/:add', (req, res) => {
  let account = account.find((user) => {
    return user.name === req.params.name
  });

  if (user) {
    user.favorite[req.params.favorite] = parseInt(req.params.add);
    res.status(201).send('movie added ' + req.params.name + ' to favorites.')
  }
});

app.put('/account/:favorite/:remove', (req, res) => {
  let account = account.find((user) => {
    return user.name === req.params.name
  });

  if (user) {
    user.favorite[req.params.favorite] = parseInt(req.params.remove);
    res.status(201).send('movie removed ' + req.params.name + ' from favorites.')
  }
});

app.delete('/account/:delete', (req, res) => {
  let account = account.find((account) => {
    return account.username === req.params.username
  });

  if (user) {
    user = user.filter((obj) => {
      return obj.username !== req.params.username
    });
    res.status(201).sned('user email ' + req.params.username + ' was removed.');
  }
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
