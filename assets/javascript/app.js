//"use strict";

var triviaQuestions = [
    {
        question: "What year was Devil May Cry 1 released? ",
        choices: ["2000", "2001", "2002", "2003"],
        answer: "2001"
    },
    {
        question: "In Devil May Cry 3's last mission, what does Dante say before killing the bonus monsters at the ending credits?  ",
        choices: ["I'm absolutely crazy about it!", "Jackpot! ", "This just keeps getting better and better!", "This is what I live for!"],
        answer: "I'm absolutely crazy about it!"
    },
    {
        question: "In Devil May Cry 4, what is the name of the weapon that is said to have 666 different variations? ",
        choices: ["Pandora", "Ebony&Ivory", "Blue Rose", "Lucifer"],
        answer: "Pandora"
    },
    {
        question: "What is the name of the clown that repeatedly appears in Devil May Cry 3?",
        choices: ["Joker", "Jester", "Clown", "Arkham"],
        answer: "Jester"
    },
    {
        question: "Name the style in which allows Vergil to instantly teleport to enemies. ",
        choices: ["Royalguard", "Quiksilver", "Trickster", "Darkslayer"],
        answer: "Darkslayer"
    },
]

$(document).ready(function () {
    var wins = 0;
    var losses = 0;
    var TIMER_VALUE = 30;
    var timer;
    var timerID;
    var triviaIndex = 0;
    var answer = "";
    var clockRunning = false;

    resetTimer = function () {
        timer = TIMER_VALUE;
    }

    startClock = function () {
        resetTimer();
        if (!clockRunning) {
            timerID = setInterval(timertick, 1000);
            clockRunning = true;
        }
    }

    stopClock = function () {
        resetTimer();
        clearInterval(timerID);
        clockRunning = false;
    }

    $(document).on("click", "#button-start", function () {
        $("#button-start").hide();
        wins = 0;
        losses = 0;
        triviaQuestions = shuffle(triviaQuestions);
        triviaIndex = 0;
        startClock();
        getNextQuestion();
    });

    getNextQuestion = function () {
        stopClock();

        if (triviaIndex == triviaQuestions.length) {
            displayEndResults();
        }
        else {
            var game = $("#game");
            game.empty();
            var timediv = $("<p>");
            timediv.attr("id", "timer");
            timediv.text("Time Remaining: " + timer + " Seconds");
            game.append(timediv);

            var TQ = triviaQuestions[triviaIndex++];
            var questionDiv = $("<p>");
            questionDiv.attr("id", "question");
            questionDiv.text(TQ["question"]);
            game.append(questionDiv);
            answer = TQ.answer;

            for (var i = 0; i < TQ.choices.length; i++) {
                var button = $("<button>");
                button.addClass("btn btn-secondary choice");
                if (TQ.answer == TQ[i])
                    button.attr("id", "answer");
                else
                    button.attr("id", "choice" + (i + 1));
                button.text(TQ.choices[i]);
                game.append(button);
            }
            startClock();
        }
    }


    displayEndResults = function () {
        var game = $("#game");
        game.empty();

        var status = $("<p>");
        status.attr("id", "result");
        status.addClass("ptext");
        status.text("All done, heres how you did! ");
        game.append(status);

        status = $("<p>");
        status.addClass("ptext");
        status.html("Correct Answers: " + wins + "<br>" +
            "Incorrect Answers: " + losses + "<br>" +
            "Unanswered: " + (triviaQuestions.length - wins - losses));
        game.append(status);

        var button = $("<button>");
        button.addClass("btn btn-primary");
        button.attr("id", "button-start");
        button.text("Start Over!");
        game.append(button);

    }

    timertick = function () {
        $("#timer").text("Time Remaining: " + --timer + " Seconds");
        if (timer === 0) {
            outOfTime();
        }
    }

    //when clock ticks out of time
    outOfTime = function () {
        $("#game").empty();
        var status = $("<p>");
        status.addClass("ptext");
        status.text("Out of Time!");
        $("#game").append(status);
        var text = $("<p>");
        text.addClass("ptext");
        text.text("The Correct Answer Was: ");
        $("#game").append(text);
        var rightAnswer = $("<p>");
        rightAnswer.addClass("ptext");
        rightAnswer.text(answer);
        $("#game").append(rightAnswer);
        displayGif();
        setTimeout(getNextQuestion, 5000);
    }

    //mcq choice button handlers
    $(document).on("click", ".choice", function () {
        stopClock();
        $("#game").empty();
        var status = $("<p>");
        status.addClass("ptext");
        if ($(this).text() == answer) {
            wins++;
            status.text("Correct!");
            $("#game").append(status);
        }
        else {
            losses++;
            status.text("Wrong!");
            $("#game").append(status);
            status = $("<p>");
            status.addClass("ptext");
            status.text("The Correct Answer Was: " + answer); 
            $("#game").append(status);
        }
        displayGif();
        setTimeout(getNextQuestion, 4000);
    });

    displayGif = function () {
        var gif = $("<img>");
        gif.addClass("gifs");
        gif.attr("src", "assets/images/trivia" + triviaIndex + ".gif");
        $("#game").append(gif);
    }

    //helper function to shuffle an array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

});




