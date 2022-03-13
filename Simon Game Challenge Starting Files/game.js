var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickPattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Game Started");
    nextSequence();
    started = true;
  }
})

$(".btn").on("click", function() {
   var userChosenColour = $(this).attr("id");
   userclickPattern.push(userChosenColour);
   playsound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userclickPattern.length-1);
})

function nextSequence() {
  level++;
  $("#level-title").text("Level"+level);
  var x = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[x];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout (function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentlevel) {
  if (userclickPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("Sucess");
    if (userclickPattern.length === gamePattern.length){
      setTimeout( function() {
        nextSequence();
      }, 100);
    }
  }
  else {
    console.log("Failed");
    $("h1").text("Game Over, Press any key to restart");
    var aud = new Audio("sounds/" + "wrong.mp3");
    aud.play();
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    }, 100);
    startover();
  }
}

function startover(){
  level = 0;
  gamePattern = [];
  started = false;
}
