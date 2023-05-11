//click on start reset button
//are we playing
//yes
//reload page
//no
//show trails left
//change button text to reset game
//1. create a random fruit
//define a random step
//2. move fruit down one step every 30s
//is fruit too low?
//no ->repeat no2
//yes-> any trials left
//yes: repeat no 1
//no: show game over,button text: start game
//slice a fruit 
//play a sound
//explode fruit
var playing = false;
var score = 0;
var trialsLeft;
var step;
var action;//used for set interval
var fruits = ['apple', 'orange', 'mango', 'banana'];
$(function () {
    $("#startreset").click(function () {
        if (playing == true) {
            location.reload();
        }
        else {
            playing = true;
            score = 0;
            $("#scoreValue").html(score);
            $("#trialsLeft").show();
            $("#gameOver").hide();
            trialsLeft = 3;
            addHeart();
            $("#startreset").html("reset Game");
            startAction();
        }
    });
    $("#fruit1").mouseover(function () {
        score++;
        $("#scoreValue").html(score);
        $("#sliceSound")[0].play();
        clearInterval(action);
        $("#fruit1").hide("explode",500);
        setTimeout(startAction,800);
    });
    function addHeart() {
        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append('<img src="heart.jpg" class="life">');
        }
    }
    function startAction() {
        // $("#fruitsContainer").append('<img src="Screenshot 2023-05-03 194223.png" class="fruit">');
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });
        step = 1 + Math.round(5 * Math.random());
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                if (trialsLeft > 1) {
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });
                    step = 1 + Math.round(5 * Math.random());
                    trialsLeft--;
                    addHeart();
                } else {
                    playing = false;
                    $("#startreset").html("start Game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>game over</p><p>your score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);

    }
    function chooseFruit() {
        $("#fruit1").attr('src', fruits[Math.round(Math.random() * 3)] + '.png');
    }
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
})