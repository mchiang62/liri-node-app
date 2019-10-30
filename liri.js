// to retrieve information about things

require("dotenv").config();

var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// creating a new spotify instance

var axios = require('axios');

var fs = require("fs");

var moment = require("moment");

var input = process.argv;
// it's an array that contains each word you use in the command

var command = input[2];
var artist = input[3];

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
                console.log("Sorry, this is unavailable. Please search again")
            } else {
                console.log("Name: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));

            }

        })

};

function thisSpotify(artist) {


    if (!artist) {
        artist = "Man in the Mirror";
    }
    spotify
        .search({
            type: 'track',
            query: artist
        })
        .then(function (response) {
            for (var i = 0; i < 5; i++) {

                console.log("Artist: " + response.tracks.items[i].artists[0].name)
                console.log("Song Name: " + response.tracks.items[i].name)
                console.log("Album Name: " + response.tracks.items[i].album.name)
                console.log("Preview Link: " + response.tracks.items[i].preview_url)

            }
        })
        .catch(function (error) {
            console.log(error);
        });


};

function thisMovie(artist) {
    if(!artist) {
        artist = "mr nobody";
    }

    axios.get("http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // console.log("The movie's rating is: " + response.data);
                var movieInfo = response.data;

                // console.log(JSON.stringify(movieInfo));

                console.log("Title: " + movieInfo.Title);
                console.log("Year: " + movieInfo.Year);
                console.log("IMDB Rating: " + movieInfo.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
                console.log("Country: " + movieInfo.Country);
                console.log("Language: " + movieInfo.Language);
                console.log("Plot: " + movieInfo.Plot);
                console.log("Actors: " + movieInfo.Actors);


            })
        .catch(function (error) {
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
        artist = dataArr[1];

        thisSpotify()


        console.log(dataArr);

    })


};