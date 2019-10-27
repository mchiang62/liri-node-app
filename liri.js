require("dotenv").config();

var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: 'Man in the Mirror' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
