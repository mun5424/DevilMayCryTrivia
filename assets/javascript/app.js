var startgame = 0; 

var triviaQuestions = [
    {
      question: "What year was Devil May Cry 1 released? " , 
      choices: ["2000", "2001", "2002", "2003"],
      answer: "2001"
    },
    {
      question: "In Devil May Cry 3's last mission, what does Dante say before killing the bonus monsters at the ending credits?  " , 
      choices: ["I'm absolutely crazy about it!", "Jackpot! ", "This just keeps getting better and better!", "This is what I live for!"],
      answer: "I'm absolutely crazy about it!"
    },
    {
      question: "In Devil May Cry 4, what is the name of the weapon that is said to have 666 different variations? " , 
      choices: ["Pandora", "Ebony&Ivory", "Blue Rose", "Lucifer"],
      answer: "Pandora"
    },
    {
      question: "What is the name of the clown that repeatedly appears in Devil May Cry 3?" , 
      choices: ["Joker", "Jester", "Clown", "Arkham"],
      answer: "Jester"
    },
    {
      question: "Name the style in which allows Vergil to instantly teleport to enemies. " , 
      choices: ["Royalguard", "Quiksilver", "Trickster", "Darkslayer"],
      answer: "Darkslayer" 
    },
]
    
$(document).ready(function(){
    var wins = 0;
    var losses = 0;
    var clockRunning = false; 
    var timer = 20; 
    var timerID; 
    var triviaIndex = 0; 


    startClock = function () {
        if (!clockRunning) {
            timerID = setInterval(timertick, 1000);
            clockRunning = true;
        }
    }

    stopClock = function () {
        clearInterval(timerID); 
        timer = 20; 
    }

    
    $("#button-start").on("click", function() {
        $("#button-start").hide(); 
        triviaQuestions = shuffle(triviaQuestions); 
        getNextQuestion();
    });

    getNextQuestion = function(){
        var game = $("#game");
        var timer = $("<p>");
        timer.attr("id", "timer");
        game.append(timer); 

        
        var tQ = triviaQuestions[triviaIndex];
        var questionDiv = $("<p>");
        questionDiv.attr("id", "question");
        questionDiv.text("id", tQ["question"]);
        game.append(questionDiv); 

        for(var i = 0; i < tQ[choices.length]; i++) 
        {
            var button = $("<btn>");
            button.attr("id", "question");
            button.text("id", tQ["question"]);

        }

        startClock(); 

        
    }

    timertick = function() {
        $("#timer").text("Time Remaining: " + timer-- + " Seconds" ); 
    }

    //helper method to shuffle an array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

});




