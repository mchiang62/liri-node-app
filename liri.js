// to retrieve information about things

require("dotenv").config();

var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// creating a new spotify instance
// review instance

var axios = require('axios');

var fs = require("fs");

var moment = require("moment");

var input = process.argv;
// it's an array, each word you use is stored in the command
// array that contains each word you use in the command

var command = input[2];
var artist = input[3];

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (command) {
    case "concert-this":
        thisConcert(artist);
        break;

    case "spotify-this-song":
        thisSpotify(artist);
        break;

    case "movie-this":
        thisMovie(artist);
        break;

    case "do-what-it-says":
        thisSays(artist);
        break;

};

function thisConcert(artist) {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data[0] === undefined) {
                console.log("Sorry")
            } else {
                console.log("Name: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));

            }

        })

};

function thisSpotify(artist) {

    spotify.search({ type: 'track', query: artist }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      })


};

function thisMovie(artist) {
    axios.get("http://www.omdbapi.com/?t=" + artist + "y=&plot=short&apikey=trilogy").then(
  function(response) {
    // console.log("The movie's rating is: " + response.data);
    console.log(response)
  })
  .catch(function(error) {
    if (error.response) {
      
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      
      console.log(error.request);
    } else {
     
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


};


function thisSays(artist) {
    fs.readFile("random.txt", "utf8", function (error, data) {


        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");
        command = dataArr[0];
        artist = dataArr[1]

        thisSpotify()


        console.log(dataArr);

    })

    // for loop or for each statement

};