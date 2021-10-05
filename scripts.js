
var questions = [{
    question: "Circle of life",
    choices: ["Aladdin", "Coco", "Frozen", "The lion King"],
    correctAnswer: 3
}, {
    question: "Let it go",
    choices: ["Dumbo", "Bambi", "Monsters, Inc.", "frozen"],
    correctAnswer: 3
}, {
    question: "You're Welcome",
    choices: ["Moana", "Zootopia", "Big hero 6","The little Mermaid"],
    correctAnswer: 0
}, {
    question: "I'll Make a Man Out of You",
    choices: ["The aristoCats", "Mulan", "Tarzan", "Peter Pan"],
    correctAnswer: 1
}, {
    question: "Under The See",
    choices: ["The little Marmaid", "Bolt", "The Emperor's New Groove", "The Jungle Book"],
    correctAnswer: 0
}, {
    question: "You've Got a Friend in Me",
    choices: ["Lilo & Stich", "Tangled", "Toy Story", "Wreck-it Ralph"],
    correctAnswer: 2	
	
}, {
    question: "Remember Me",
    choices: ["Cinderella", "Zootopia", "Coco", "Pocahontas"],
    correctAnswer: 2	
}, {
    question: "When You Wish upon a Star",
    choices: ["Pinocchio", "Bambi", "The Little Marmaid", "Cinderella"],
    correctAnswer: 0
}, {
    question: "Be Our Guest",
    choices: ["Encanto", "Beauty and the Beast", "The Princess and the Frog", "Hercules"],
    correctAnswer: 1

}, {
    question: "A Whole New World",
    choices: ["Snow White and the Seven Dwarfs", "Aladdin", "Hercules", "Cinderells"],
    correctAnswer: 1

}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();

                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}