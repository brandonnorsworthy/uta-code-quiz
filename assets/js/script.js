//html elements
timerTag = document.querySelector(`#timerTag`); //span containing timer numbers
answerButtonLst = document.body.querySelector(`ul`); //list that will hold the answer elements

//global variables
questionObj = { //question object that holds all the parts of questions
    questions: [`click yes`, `click no`, `first answer`, `answers of question 1 and question 2`],
    answers: [ //answers are in a 2d array because multiple answers for 1 questions
        [`no`, `no`, `correct:yes`, `no`],
        [`correct:no`, `yes`, `maybe`, `click this`],
        [`correct:maybe`, `incorrect`, `yes`, `😀`], //uses `correct:` so that even if answer has the word `correct` its not flagged as correct answer
        [`no yes`, `correct:yes no`, `wawawewa`, `no no`] //to pull out correct: newStr = substring(7,questionObj.answers[index].length)
    ]
}
questionIndexNumber = 0;

function startGame() {
    //when game starts clean up the main area
    document.querySelector(`#startBtn`).style.display = `none`; //hide start button when game starts
    document.querySelector(`#instructions`).style.display = `none`; //hide instructions beneath h1 tag
    //start generating questions
    showQuestions();
    //start timer
}

//uses the current question index to show the next question and its answers
function showQuestions() {
    //loop over every possible question that was added
    document.body.querySelector(`h1`).textContent = questionObj.questions[questionIndexNumber]; //select h1 tag and set it as the question
    createAnswerElements(questionIndexNumber); //create answers for current question
}

//when called will iterate to the next question and show the next question content
function nextQuestion() {
    questionIndexNumber++; //increment our index by 1 so we can keep track
    if (questionIndexNumber >= questionObj.questions.length){ //if we run out of questions end the game
        endGame();
    }
    showQuestions();
}

//creates new answer elements in the list will clear out previous answers
function createAnswerElements(questionIndex) {
    answerButtonLst.innerHTML = ''; //clears out all current answers
    for (let answerIndex = 0; answerIndex < questionObj.answers[questionIndex].length; answerIndex++) {//loop over every answer and create a list item on the page
        var currentAnswerListItem = document.createElement(`li`);
        var tempStr = questionObj.answers[questionIndex][answerIndex];

        //if the string contains `correct:` pull it out and set it as id so they cant see it be we know the correct
        if (questionObj.answers[questionIndex][answerIndex].includes(`correct:`)){
            tempStr = questionObj.answers[questionIndex][answerIndex].substring(8, questionObj.answers[questionIndex][answerIndex].length); //yoink out the string part that doesnt contain the word correct
            currentAnswerListItem.id = `correct`; //tag correct answer with an id to look at later
        }

        currentAnswerListItem.textContent = tempStr; //set textcontent as tempStr because if couldve changed if it was the correct answer
        document.body.querySelector(`ul`).appendChild(currentAnswerListItem); //adds this answer list item to the unordered list in html
    }
}

//checks the answer clicked on for correct answer
function checkAnswer(event) {
    if (event.target == answerButtonLst){
        return; //if target is just the list itself do nothing only want the list items
    }

    if (event.target.id.includes('correct:')){ //check target id to see if its the correct answer
        //correct answer do nothing
    } else {
        //wrong answer dummy minus 10 seconds off timer
    }

    nextQuestion(); //go to next question after an answer has been clicked can only choose one answer per question
    return;
}

function endGame() {
    return;
}

function init() {
    document.addEventListener(`keydown`, nextQuestion);
    answerButtonLst.addEventListener(`click`, checkAnswer);
    startBtn.addEventListener(`click`, startGame);
    return;
}

init();