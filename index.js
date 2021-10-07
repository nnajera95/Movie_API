const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/movies', function(req, res, next) {
  next();
});

app.get('/', function(req, res, next) {
  res.send('Welcome to my app!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
