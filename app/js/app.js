var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var matrix = [];
var usersCorrectAnswers = [];


function findSurroundingLetters(alphabet, letter) {
    var rowOfLetters = [];
    var indexOfLetter = alphabet.indexOf(letter);

    var first = alphabet[indexOfLetter - 2];
    var second = alphabet[indexOfLetter - 1];

    var third = letter;

    var fourth = alphabet[indexOfLetter + 1];
    var fifth = alphabet[indexOfLetter + 2];

    if (second === undefined) {
        second = "z";
        first = "y"
    }

    if (first === undefined) {
        first = "z"
    }

    if (fourth === undefined) {
        fourth = "a";
        fifth = "b";
    }

    if (fifth === undefined) {
        fifth = "a"
    }

    rowOfLetters.push(first, second, third, fourth, fifth)
    console.log(rowOfLetters);



    return rowOfLetters

}


function createInterface(arr) {
    var numberOfRows = arr.length;
    $("#letter-containers").empty();

    arr.forEach(function(val, index, arr) {

        $("#letter-containers").append("<ul class ='letter-column'> </ul>")

        $("#letter-containers").sortable({
            axis: 'x',
            containment: "parent"
        });
        val.forEach(function(val2, index2, arr2) {


            $(".letter-column").eq(index).append("<li class='letter'>" + val2 + "</li>");

            $(".letter-column").sortable({
                axis: 'y',
                containment: "parent"
            });

        })

    });


}



function checkForPreviousAnswer(word, arr) {


    if (arr.includes(word)) {
        console.log("You already guessed " + word + " silly");
        return true
    } else {
        return false
    }
}




function checkAnswer(arr, word, index) {
    var correct = false;
    arr[index].answers.forEach(function(val) {
        if (val === word) {
            correct = true;
        }
    });

    return correct;
}

function displayUsersAnswers() {
    $(".correct-answers").empty();
    usersCorrectAnswers.forEach(function(val) {
        $(".correct-answers").append("<li>" + val + "</li>")
    })

}



$(function() {

    var questionCount = 0;

    function createWord(count) {
        var selectedWordArr = gameWordList[0].word.split("");
        selectedWordArr.forEach(function(val, index, arr) {
            matrix.push(findSurroundingLetters(alphabet, val))
        });
        createInterface(matrix)
        console.log(getAnswers(matrix));
        $(".total-number-of-answers").text(gameWordList[0].answers.length);

    }

    createWord(questionCount);

    function checkUserAnswer(arr, indexVal, word) {
        var correct = false;
        arr[indexVal].answers.forEach(function(val) {
            if (val === word) {
                correct = true;
            }
        });

        return correct
    }



    $("#answer-submit-button").on("click", function() {
        var word = "";
        for (var i = 0; i <= 5; i += 1) {

            var x = $("#letter-containers").children().eq(i).children().eq(2).text();
            word += x;
        }
        console.log(word);

        var answer = checkAnswer(gameWordList, word, questionCount);
        var isPreviousAnswer = checkForPreviousAnswer(word, usersCorrectAnswers)

        if (answer && (!isPreviousAnswer)) {
            usersCorrectAnswers.push(word);



            var y = $("#letter-containers > ul > li:nth-child(3) ");
            y.effect("bounce", {
                times: 2
            }, 1200);




        } else {
            var y = $("#letter-containers ");

            y.effect("shake", {
                times: 1
            }, 500);

        }
        console.log(usersCorrectAnswers.length);
        displayUsersAnswers()
        $(".correct-answer-count").text(usersCorrectAnswers.length);

        if (usersCorrectAnswers.length === 5) {
            $("body").empty();
            $("body").append("<h1> YOU WIN </h1>");
        }
    })









});