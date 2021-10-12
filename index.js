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
  res.json(movies.find(title => {
    return title.name === req.params.title
  }));
});



app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
