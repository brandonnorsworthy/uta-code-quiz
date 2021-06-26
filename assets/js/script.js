//html elements
timerTag = document.querySelector("#timerTag"); //span containing timer numbers
answerButtonLst = document.body.querySelector("ul"); //list that will hold the answer elements

//global variables
questionObj = { //question object that holds all the parts of questions
    questions: [`click yes`, `click no`, `first answer`, `answers of question 1 and question 2`],
    answers: [ //answers are in a 2d array because multiple answers for 1 questions
        [`no`, `no`, `correct:yes`, `no`],
        [`correct:no`, `yes`, `maybe`, `click this`],
        [`correct:incorrect`, `maybe`, `yes`, `😀`],
        [`no yes`, `correct:yes no`, `wawawewa`, `no no`]
    ]
}
questionIndexNumber = 0;

function startGame() {
    //when game starts clean up the main area
    document.querySelector("#startBtn").style.display = "none"; //hide start button when game starts
    document.querySelector("#instructions").style.display = "none"; //hide instructions beneath h1 tag
    //start generating questions
    showQuestions();
    //start timer
}

function showQuestions() {

    //loop over every possible question that was added
    document.body.querySelector("h1").textContent = questionObj.questions[questionIndexNumber];
    createAnswerElements(questionIndexNumber);

}

function createAnswerElements(questionIndex) {
    for (let answerIndex = 0; answerIndex < questionObj.answers[questionIndex].length; answerIndex++) {
        //loop over every answer and create a list item on the page
        var currentAnswerListItem = document.createElement("li");
        currentAnswerListItem.textContent = questionObj.answers[questionIndex][answerIndex];
        document.body.querySelector("ul").appendChild(currentAnswerListItem)
    }
}

function endGame() {

}

function init() {
}

startBtn.addEventListener("click", startGame);
init();

/*
1. list of questions with answers
2. test input against answer
3a.show new question with its own answers
3. add timer
4. if out of questions game over
5. if timer 0 game over
5. if correct do nothing if incorrect subtract time
*/