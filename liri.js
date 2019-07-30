require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


function liriSearch() {
    var choice = process.argv[2];
    switch (choice) {
        case "do-what-it-says":
            doWhatitSays();
            break;
        case "spotify-this-song":
            var userInput = process.argv.slice(3).join(" ");
            spotifyThis(userInput);
            break;
        case "movie-this":
                var userInput = process.argv.slice(3).join(" ");
            movieThis(userInput);
            break;
        case "concert-this":
                var userInput = process.argv.slice(3).join("");
                concertThis(userInput);
            break;
        default:
            console.log("\nSomething went wrong. please check your input and try again. \n")
            console.log(`-------------------------------------------------------------------`);
            console.log(
                `First type "node liri.js" followed by any of these commands: 
            \n concert-this "the name of an artist who is touring"
            \n spotify-this-song "any song title"
            \n movie-this "any movie title"
            \n "do-what-it-says"`);
            console.log(`-------------------------------------------------------------------`);
    }
}

function doWhatitSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        var userCommand = dataArr[0];
        var userQuery = dataArr[1];
        if (userCommand === "spotify-this-song") {
            spotifyThis(userQuery);
        } else if (userCommand === "movie-this") {
            movieThis(userQuery);
        } else if (userCommand === "concert-this") {
            concertThis(userQuery);
        } else {
            console.log("Unable to process the random.txt file to get a command.")
        }
    })
}

function concertThis(userInput) {
    var userQuery = userInput;
    console.log(userQuery);

        axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("--------------------------------")
        console.log("BANDS IN TOWN DATA");
        console.log("-------------------------------- \n")
        for (var i = 0; i < response.data.length; i++) {
            console.log("Venue: " + response.data[i].venue.name);
            console.log("City: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Date of Concert: " + moment(response.data[i].datetime).format("L"));
            console.log("\n")
        }
        })
        .catch(function(error) {
        console.log("There is an error for the concert this function.")
        console.log(error);
    });
}



// The function for the "movie-this" part of the liribot.
function movieThis(userInput) {
    if (userInput === "") {
        userQuery = "Mr. Nobody";
    } else{  
        var userQuery = userInput;
    }

    axios.get("http://www.omdbapi.com/?t="+ userQuery +"&y=&plot=short&apikey=f8b737f3").then(
    function(response) {
        console.log("-----------------------");
        console.log("Your Searched Movie \n");
        console.log("The movie's title is: " + response.data.Title);
        console.log("The year of release: " + response.data.Year);
        console.log("The movie's Metascore: " + response.data.Metascore);
        console.log("The movie's imbd rating is: " + response.data.imdbRating);
        console.log("The movie was produced in: " + response.data.Country);
        console.log("The movie's language is: " + response.data.Language);
        console.log("The movie's actors: " + response.data.Actors);
        console.log("The movie's plot: " + response.data.Plot);
    })
    .catch(function(error) {
        console.log("There is an error in the axios function.")
    });
}



// function for the spotify part of the liribot
function spotifyThis(userInput) {
    if (userInput === "") {
        userQuery = "The Sign";
    } else{  
        var userQuery = userInput;
    }

    spotify.search({ type: 'track', query: userQuery }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
            for (i = 0; i < data.tracks.items.length ; i ++) {
                console.log("------------------------------------------------------")
                console.log("   ");
                console.log("The name of the Track is: " + data.tracks.items[i].name);
                console.log("The name of the Artist is: " + data.tracks.items[i].artists[0].name);
                console.log("The preview link is: " + data.tracks.items[i].external_urls.spotify);
                console.log("This song is from the album: " + data.tracks.items[i].album.name)
                console.log("   ");
            }
    });
}


liriSearch();
