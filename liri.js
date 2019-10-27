require("dotenv").config();

var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');

var fs = require("fs");

var input = process.argv;

var command = input[2];
var artist = input[3];

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (command) {
    case "concert-this":
        // concert function
        break;

    case "spotify-this-song":
        // spotifiy function
        break;

    case "movie-this":
        // movie function
        break;

    case "do-what-it-says":
        // do function
        break;

};








// spotify
//   .search({ type: 'track', query: 'Man in the Mirror' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });