var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// press key to start game
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// user clicked a color
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// check answer
function checkAnswer(currentLevel) {
  // if user selects correct color
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // if user entered entire sequence, start next sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // user selected incorrect color
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// next sequence
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + ++level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log("game: " + gamePattern);
  console.log("user: " + userClickedPattern);

  // display sequence to player
  displaySequence(0);
}

// animate buttons to display sequence
function displaySequence(i) {
  setTimeout(function() {
    $("#" + gamePattern[i])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[i++]);
    if (i < gamePattern.length) {
      displaySequence(i);
    }
  }, 500);
}

// play sound for color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animate button pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
