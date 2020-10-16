var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var begin = false, level = 0;

//decide the next sequence for user
function nextSequence() {
    level++;
    var random = Math.random();
    randomChosenColor = buttonColors[Math.floor(random*4)];
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#level-title").text("Level " + level);
}

//button click listener
$(".btn").on("click",function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//rspective sound is played for each button
function playSound(soundName) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', "sounds/"+soundName+".mp3");
    audioElement.play();
}

//visual animation appears on button press
function animatePress(btnColor) {
    $("." + btnColor).addClass("pressed");
    setTimeout(function() {
       $("." + btnColor).removeClass("pressed");
    }, 100);
}

//starts th game when keyboard key is pressed
$("body").on("keydown",function() {
    if(begin == 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
        begin = true;
    }
});

//Check Answer of user
function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      $("#level-title").text("Wrong!");
      playSound("wrong");
      level = 0;
      begin = false;
      gamePattern = [];
      userClickedPattern = [];
    }
}
