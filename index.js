const express = require('express'),
  morgan = require('morgan');

const app = express();

const movieArray = [
  {Title: 'Tropic Thunder', Director: 'Ben Stiller', Genre: 'Comedy/Action'},
  {Title: 'Happy Gilmore', Director: 'Dennis Dugan', Genre: 'Comedy/Romance'},
  {Title: 'Iron Man', Director: 'Jon Favreau', Genre: 'Action/Adventure'},
  {Title: 'Thor: Ragnarok', Director: 'Taika Waititi', Genre: 'Action/Adventure'},
  {Title: 'Grown Ups', Director: 'Dennis Dugan', Genre: 'Comedy/Buddy'},
  {Title: 'The Fast and The Furious', Director: 'Rob Cohen', Genre: 'Action/Crime'},
  {Title: 'Avengers: Endgame', Director: 'Anthony & Joe Russo', Genre: 'Action/Sci-fi'},
  {Title: 'Avengers: Infinity War', Director: 'Anthony & Joe Russo', Genre: 'Action/Sci-fi'},
  {Title: 'Step Brothers', Director: 'Adam McKay', Genre: 'Comedy'},
  {Title: 'The Other Guys', Director: 'Adam McKay', Genre: 'Comedy/Action'}
];

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/movies', function(_req, res) {
  res.json(movieArray)
});

app.get('/', function(_req, res) {
  res.send('Welcome to my app!');
});

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
