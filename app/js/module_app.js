var MODULE = (function Module() {

    var app = {
        alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        letterPoints: {
            a: 1,
            b: 5,
            c: 3,
            d: 3,
            e: 1,
            f: 5,
            g: 4,
            h: 4,
            i: 1,
            j: 7,
            k: 6,
            l: 2,
            m: 4,
            n: 2,
            o: 1,
            p: 3,
            q: 7,
            r: 1,
            s: 2,
            t: 2,
            u: 3,
            v: 6,
            w: 6,
            x: 7,
            y: 5,
            z: 7
        },
        questionCount: 0,
        levelWordList: [],
        currentWord: undefined,
        userSubmittedAnswer: undefined,
        matrix: [],
        wordLength: undefined,
        usersCorrectAnswers: [],
        totalPoints: 0,

        createMatchArray: function(wordLength) {
            var data = [];
            var length = wordLength; // user defined length

            for (var i = 0; i < length; i++) {
                data.push(i);
            }

            return data;

        },

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
                        items: ".letter",
                        containment: "parent",

                    });


                })
            });

            $(".letter-column").append("<img class = 'arrow-image' src='images/arrow.png' alt='two way arrow'/>")

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





        displayUsersAnswers: function() {
            $(".correct-answers").empty();
            app.usersCorrectAnswers.forEach(function(val) {
                $(".correct-answers").append("<li class='correct-word'>" + val + "   </li>");
            });
        },

        createWord: function(count) {
            var selectedWordArr = app.levelWordList[0].word.split("");
            selectedWordArr.forEach(function(val, index, arr) {
                app.matrix.push(app.findSurroundingLetters(app.alphabet, val))
            });
            app.createInterface(app.matrix)
            $(".total-number-of-answers").text(app.levelWordList[0].answers.length);

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
        pointCheck_checkIfColumnsHaveNotMoved: function() {
            var orderOfIds = [];



            var matchArr = app.createMatchArray(app.wordLength);

            $(".letter-column").each(function(index) {
                orderOfIds.push(+$(this).attr('id'));
            });



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



        pointCheck_getLettersThatHaveChanged: function(userSubmittedWord) {

            function getDifferentValues(levelWord, userAnswer) {

                var differingLetters = [];
                var originalGameWord = levelWord.split('')
                if (originalGameWord.length !== userAnswer.length)
                    return false;
                for (var i = originalGameWord.length; i--;) {
                    if (originalGameWord[i] !== userAnswer[i]) {
                        differingLetters.push(userAnswer[i])
                    }
                }

                return differingLetters;
            }

            var differingLetters = getDifferentValues(app.currentWord, userSubmittedWord);

            return differingLetters;

        },


        pointCheck_getNumberOfDifferentLetters: function() {
            var arr = app.pointCheck_getLettersThatHaveChanged(app.userSubmittedAnswer);
            var answer = arr.length;
            console.log("You have changed " + arr.length + " number of letters.+" + arr.length + " points");
            return answer;
        },

        pointCheck_scoreLetters: function(arr) {

            var total = arr.reduce(function(start, val) {
                start += app.letterPoints[val];

                return start
            }, 0)

            console.log("Letter points : " + total);

            return total;

        },

        tallyPoints: function(userSubmittedWord) {

            if (app.pointCheck_checkIfColumnsHaveNotMoved()) {
                app.totalPoints += 2;
                console.log("Columns have not moved. +2 points ");
            }

            app.totalPoints += app.pointCheck_getNumberOfDifferentLetters()

            var changedLetters = app.pointCheck_getLettersThatHaveChanged(userSubmittedWord);

            app.totalPoints += app.pointCheck_scoreLetters(changedLetters);

            console.log("total points so far: " + app.totalPoints);

        },

        //______________________________________END Check how many columns moved on user submission
        userSubmit: function() {
            $("#answer-submit-button").on("click", function() {

                var word = "";

                for (var i = 0; i <= 5; i += 1) {

                    var x = $("#letter-containers").children().eq(i).children().eq(2).text();
                    word += x;
                }
                app.userSubmittedAnswer = word;
                var answer = app.checkAnswer(app.levelWordList, word, app.questionCount);
                var isPreviousAnswer = app.checkForPreviousAnswer(word, app.usersCorrectAnswers)

                if (answer && (!isPreviousAnswer)) {
                    app.usersCorrectAnswers.push(word);
                    app.tallyPoints(word)


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


                app.displayUsersAnswers()
                $(".correct-answer-count").text(app.usersCorrectAnswers.length);

                if (app.usersCorrectAnswers.length === 5) {
                    $("body").empty();
                    $("body").append("<h1> YOU WIN </h1>");
                }




            })

        },


        run: function(wordLength, wordData) {

            app.userSubmit();
            app.levelWordList = wordData;
            app.currentWord = app.levelWordList[app.questionCount].word
            app.wordLength = wordLength;
            app.createWord(app.questionCount);

        }
    }


    return app;


}());

var app = MODULE;
app.run(5, gameWordList);