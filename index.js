const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.json(movieArray.find((movie) => {
    return movie.title.toLowerCase() == req.params.title.toLowerCase();
  }));
});

//app.get('/movies/:title/:genre', (req, res) => {
  //res.json(movieArray.find((movie) => {
    //return movie.genre === req.params.genre
  //}));
//});

app.get('/movies/genre/:genre', (_req, res) => {
  res.send('returns data about a genre')
});

//app.get('/movies/:title/:director', (req, res) => {
//  res.json(movieArray.find((movie) => {
//    return movie.director === req.params.director
//  }));
//});

app.get('/directors/:name', (_req, res) => {
  res.send('returns data about a director')
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/users', (_req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
$set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.put('/account/:userId', (_req, res) => {
  res.send('Ready to update user id:')
});

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.delete('/account/movies/:movieId', (_req, res) => {
  res.send('movie removed from favorites')
});

app.delete('/account/:delete', (_req, res) => {
  res.send('account deleted')
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
