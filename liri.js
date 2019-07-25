require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
console.log(keys.spotify)
var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
//    for (i = 0; i < data.tracks.href.items.length ; i ++) {
//        console.log(data.tracks.href.items[i]);
//    }
  console.log(data.tracks.items[0].name); 
  });


// concert-this



// spotify-this-song



// movie-this



// do-what-it-says

