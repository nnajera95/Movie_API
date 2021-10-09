const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/movies', function(_req, _res) {
  next();
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
