//alert("aha");

var myFunc = function(){console.log("aha");}

function normalFunc(callback){
    setTimeout(function(){callback();}, 1);
}
normalFunc(myFunc);

$("div").eq(1).prop("myattr", "333");
$("div").eq(1).prop("title", "335");
//alert("attribute myattr: " + $("div").eq(1).attr("myattr"));
//alert("attribute myattr: " + $("div").eq(1).attr("myattr"));
//alert("before: " + $("div").eq(1).prop("myattr"));
$("div").eq(1).prop("myattr","aha")
$("div").prop("myattr", function(i,value){return i + " " + value;});
//alert("after: " + $("div").eq(1).prop("myattr"));


function Player() {
}
Player.prototype.play = function(song) {
  this.currentlyPlayingSong = song;
  this.isPlaying = true;
};

Player.prototype.pause = function() {
  this.isPlaying = false;
};

Player.prototype.resume = function() {
  if (this.isPlaying) {
    throw new Error("song is already playing");
  }

  this.isPlaying = true;
};

Player.prototype.makeFavorite = function() {
  this.currentlyPlayingSong.persistFavoriteStatus(true);
};

function Song() {
}

Song.prototype.persistFavoriteStatus = function(value) {
  // something complicated
  throw new Error("not yet implemented");
};