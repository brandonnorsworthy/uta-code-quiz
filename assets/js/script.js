//html elements


//global variables
questionObj = { //question object that holds all the parts of questions
    questions: [`click yes`, `click no`, `first answer`, `answers of question 1 and question 2`],
    correctAnswers: [`yes`, `no`, `incorrect`, `yes no`],
    answers: [ //answers are in a 2d array because multiple answers for 1 questions
        [`no`, `no`, `yes`, `no`],
        [`no`, `yes`, `maybe`, `click this`],
        [`incorrect`, `maybe`, `yes`, `😀`],
        [`no yes`, `yes no`, `wawawewa`, `no no`]
    ]
}

function init() {

}

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