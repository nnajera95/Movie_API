const mongoose = require('mongoose');

let movieSchema = mongoos.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref:
  'Movie'}]
});

let Movie = mongoos.model('Movie', movieSchema);
let user = mongoos.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
