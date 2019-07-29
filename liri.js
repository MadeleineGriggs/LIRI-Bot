require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "movie-this"){

    var userQuery = "Mr. Nobody";
    var nodeArg = process.argv;
    console.log("process argv at 3: " + process.argv[3]);
    if (process.argv[3] !== "undefined") {
        for ( i = 3 ; i < nodeArg.length ; i++ ) {
            userQuery += (nodeArg[i] + " ");
        };
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

if (process.argv[2] === "spotify-this-song") {
    var userQuery = "";
    var nodeArg = process.argv;
    for ( i = 3 ; i < nodeArg.length ; i++ ) {
        userQuery += (nodeArg[i] + " ");
    };

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




// concert-this



// spotify-this-song



// movie-this



// do-what-it-says

