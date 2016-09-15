var MODULE = (function Module() {

    var app = {
        alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        matrix: [],
        wordLength: undefined,
        usersCorrectAnswers: [],
        questionCount: 0,
        totalPoints: 0,
        currentWord: app.matrix[app.questionsCount],
        findSurroundingLetters: function(alphabet, letter) {
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

        },

        createInterface: function(arr) {
            var numberOfRows = arr.length;
            $("#letter-containers").empty();

            arr.forEach(function(val, index, arr) {

                $("#letter-containers").append("<ul class ='letter-column'id='" + index + "'> </ul>")

                $("#letter-containers").sortable({
                    axis: 'x',
                    containment: $('#letter-containers').parent().parent()
                });
                val.forEach(function(val2, index2, arr2) {

                    $(".letter-column").eq(index).append("<li class='letter'>" + val2 + "</li>");

                    $(".letter-column").sortable({
                        axis: 'y',
                        containment: "parent",

                    });
                })
            });
        },

        checkForPreviousAnswer: function(word, arr) {
            if (arr.includes(word)) {
                console.log("You already guessed " + word + " silly");
                return true
            } else {
                return false
            }
        },

        checkAnswer: function(arr, word, index) {
            var correct = false;
            arr[index].answers.forEach(function(val) {
                if (val === word) {
                    correct = true;
                }
            });
            return correct;
        },

        checkPointsForAnswer: function(correctAnswer, currentWord) {




        },



        displayUsersAnswers: function() {
            $(".correct-answers").empty();
            app.usersCorrectAnswers.forEach(function(val) {
                $(".correct-answers").append("<li>" + val + "</li>")
            });
        },

        createWord: function(count) {
            var selectedWordArr = gameWordList[0].word.split("");
            selectedWordArr.forEach(function(val, index, arr) {
                app.matrix.push(app.findSurroundingLetters(app.alphabet, val))
            });
            app.createInterface(app.matrix)
            console.log(getAnswers(app.matrix));
            $(".total-number-of-answers").text(gameWordList[0].answers.length);

        },

        checkUserAnswer: function(arr, indexVal, word) {
            var correct = false;
            arr[indexVal].answers.forEach(function(val) {
                if (val === word) {
                    correct = true;
                }
            });

            return correct
        },
        //______________________________________BEGIN Check how many columns moved on user submission
        pointCheck_checkIfAnyColumnsMoved: function() {
            var orderOfIds = [];


            function createMatchArray(wordLength) {
                var data = [];
                var length = wordLength; // user defined length

                for (var i = 0; i < length; i++) {
                    data.push(i);
                }
                console.log(data);
                return data;

            }

            var matchArr = createMatchArray(app.wordLength);

            $(".letter-column").each(function(index) {
                orderOfIds.push(+$(this).attr('id'));
            });

            console.log(orderOfIds);

            function checkArrayEquality(arr1, arr2) {

                if (arr1.length !== arr2.length)
                    return false;
                for (var i = arr1.length; i--;) {
                    if (arr1[i] !== arr2[i])
                        return false
                }

                return true
            }



            var answer = checkArrayEquality(matchArr, orderOfIds);

            return answer;

            // https://jsfiddle.net/z55334xo/

        },

        pointCheck_getNumberOfDifferingLetters: function() {

        },

        pointCheck_getLettersThatHaveChanged: function() {

        },


        tallyPoints: function() {
            var points = 0;
            if (app.checkIfAnyColumnsMoved()) {
                points += 2;
            }
        },

        //______________________________________END Check how many columns moved on user submission
        userSubmit: function() {
            $("#answer-submit-button").on("click", function() {
                var word = "";

                for (var i = 0; i <= 5; i += 1) {

                    var x = $("#letter-containers").children().eq(i).children().eq(2).text();
                    word += x;
                }
                console.log(word);

                var answer = app.checkAnswer(gameWordList, word, app.questionCount);
                var isPreviousAnswer = app.checkForPreviousAnswer(word, app.usersCorrectAnswers)

                if (answer && (!isPreviousAnswer)) {
                    app.usersCorrectAnswers.push(word);

                    var centerRow = $("#letter-containers > ul > li:nth-child(3) ");
                    centerRow.effect("bounce", {
                        times: 2
                    }, 1200, function() {

                        $("#letter-containers").fadeOut(700, function() {
                            app.createInterface(app.matrix)
                            $(this).fadeIn(700)

                        })
                    });


                } else {
                    var centerRow = $("#letter-containers ");

                    // centerRow.effect("shake", {
                    //     times: 1
                    // }, 500);
                    $('.letter').animate({
                        backgroundColor: "#EC4040"
                    }, 200, function() {

                    }).animate({
                        backgroundColor: "hsla(231, 48%, 48%, 0.34)"
                    }, 100, function() {
                        $('.letter:nth-child(3)').css("background-color", 'rgba(255, 235, 59, 0.51)');
                        app.createInterface(app.matrix)
                    });


                }

                console.log(app.usersCorrectAnswers.length);
                app.displayUsersAnswers()
                $(".correct-answer-count").text(app.usersCorrectAnswers.length);

                if (app.usersCorrectAnswers.length === 5) {
                    $("body").empty();
                    $("body").append("<h1> YOU WIN </h1>");
                }
            })

        },


        run: function(wordLength) {
            app.userSubmit();
            app.createWord(app.questionCount);
            app.wordLength = wordLength

        }
    }


    return app;


}());

var app = MODULE;

app.run(5);