//html elements
var timerTag = document.querySelector(`#timerTag`); //span containing timer numbers
var highscoreBtn = document.querySelector(`#highscoreBtn`); //submit button that shows at end of game
var answerButtonLst = document.body.querySelector(`ul`); //list that will hold the answer elements
var timerPTag  = document.querySelector(`header`).children[1];
var goBackBtn = document.querySelector(`#goBackBtn`);
var viewHighscoresBtn = document.querySelector(`#viewHighscoresBtn`);
var clearHighscoreBtn = document.querySelector(`#clearHighscoreBtn`);
var startBtn = document.querySelector(`#startBtn`);

//global variables
var questionObj = { //question object that holds all the parts of questions
    questions: [
        `Inside which HTML element do we put the JavaScript?`, 
        `What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>`, 
        `Where is the correct place to insert a JavaScript?`, 
        `What is the correct syntax for referring to an external script called "xxx.js"?`,
        `How do you write "Hello World" in an alert box?`,
    ],
    answers: [ //answers are in a 2d array because multiple answers for 1 questions
        [`<js>`, `correct:<script>`, `<javascript>`, `<scripting>`],
        [`document.getElement("p").innerHTML = "Hello World!";`, `#demo.innerHTML = "Hello World!";`, `correct:document.getElementById("demo").innerHTML = "Hello World!";`, `document.getElementByName("p").innerHTML = "Hello World!";`],
        [`The <head> section`, `Both the <head> section and the <body> section are correct`, `correct:The <body> section`, `The <footer> section`], //uses `correct:` so that even if answer has the word `correct` its not flagged as correct answer
        [`correct:<script src="xxx.js">`, `<script name="xxx.js">`, `<script href="xxx.js">`, `<script link="xxx.js">`],
        [`msgBox("Hello World");`, `alertBox("Hello World");`, `correct:alert("Hello World");`, `msg("Hello World");`] //to pull out correct: newStr = substring(7,questionObj.answers[index].length)
    ]
}

var questionIndexNumber = 0;
var timeLeft = 99;
var score = 0;
var gameEnded = true;

function startGame() {
    questionIndexNumber = 0;
    score = 0;
    gameEnded = false;
    //when game starts clean up the main area
    viewHighscoresBtn.style.display = `none`
    document.querySelector(`#startBtn`).style.display = `none`; //hide start button when game starts
    document.querySelector(`#instructions`).style.display = `none`; //hide instructions beneath h1 tag
    timerPTag.style.display = `block`;

    //start generating questions
    answerButtonLst.style.display = ``;

    startTimer();
    showQuestions();
    //start timer
    return;
}

//uses the current question index to show the next question and its answers
function showQuestions() {
    //loop over every possible question that was added
    document.querySelector(`#title`).textContent = questionObj.questions[questionIndexNumber]; //select h1 tag and set it as the question
    createAnswerElements(questionIndexNumber); //create answers for current question
    return;
}

//when called will iterate to the next question and show the next question content
function nextQuestion() {
    questionIndexNumber++; //increment our index by 1 so we can keep track
    if (questionIndexNumber >= questionObj.questions.length){ //if we run out of questions end the game
        endGame();
        return;
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
    return;
}

//checks the answer clicked on for correct answer
function checkAnswer(event) {
    if (event.target == answerButtonLst){
        return; //if target is just the list itself do nothing only want the list items
    }

    if (event.target.id.includes('correct')){ //check target id to see if its the correct answer
        //correct answer do nothing
    } else {
        //wrong answer dummy minus 10 seconds off timer
        timeLeft -= 10;
    }

    nextQuestion(); //go to next question after an answer has been clicked can only choose one answer per question
    return;
}

function endGame() {
    gameEnded = true;
    score = timeLeft;
    answerButtonLst.innerHTML = ``;
    timerPTag.style.display = `none`; //hide timer on end screen
    document.querySelector(`#scoreSpan`).textContent = score;
    document.querySelector(`#title`).style.display = `none`; //hide title h1
    document.querySelector(`#submit-highscore-div`).style.display = `block`;
    return;
}

function storeScoreAndName() {
    var highscoreTextbox = document.querySelector(`input`);
    var tempArrayOfObjects = [];

    if (highscoreTextbox.value === `` || highscoreTextbox.value === null) {
        return;
    }

    var tempObject = {
        names: highscoreTextbox.value,
        scores: score,
    }

    if(window.localStorage.getItem(`highscores`) == null) { //if no data exsists create a object

        tempArrayOfObjects.push(tempObject);
        window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects));
    } else {
        tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`));
        for (let index = 0; index <= tempArrayOfObjects.length; index++) {

            if (index == tempArrayOfObjects.length) {
                tempArrayOfObjects.push(tempObject)
                break;
            } else if (tempArrayOfObjects[index].scores < score) {
                tempArrayOfObjects.splice(index, 0, tempObject);
                break;
            }
        }
        window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects))
    }
    document.querySelector(`input`).value = ``;
    showHighscores();
}

function showHighscores() {
    document.querySelector(`#title`).style.display = `none`;
    document.querySelector(`#instructions`).style.display = `none`; //hide instructions beneath h1 tag
    document.querySelector(`#startBtn`).style.display = `none`; //hide start button when game starts
    document.querySelector(`#submit-highscore-div`).style.display = `none`;
    document.querySelector(`header`).children[0].style.display = `none`;
    document.querySelector(`#display-highscore-div`).style.display = `block`;

    tempOrderedList = document.querySelector(`ol`);
    tempOrderedList.innerHTML = ``
    tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`));

    if (tempArrayOfObjects != null) {
        for (let index = 0; index < tempArrayOfObjects.length; index++) {
            var newLi = document.createElement(`li`)
            newLi.textContent = tempArrayOfObjects[index].names + ` - ` + tempArrayOfObjects[index].scores;
            tempOrderedList.appendChild(newLi);
        }
    } else {
        var newLi = document.createElement(`p`)
        newLi.textContent = `No Highscores`
        tempOrderedList.appendChild(newLi);
    }
}

function clearHighscores() {
    document.querySelector(`ol`).innerHTML = ``;
    window.localStorage.clear();
    setUpGame();
}

function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnded === true){
            clearInterval(timerInterval);
            return
        }
        timeLeft--;
        timerTag.textContent = timeLeft;
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function setUpGame() {
    timeLeft = 99;
    viewHighscoresBtn.style.display = `block`
    document.querySelector(`#title`).style.display = `block`
    document.querySelector(`#display-highscore-div`).style.display = `none`;
    document.querySelector(`#title`).textContent = `Coding Quiz Challenge`;
    document.querySelector(`#instructions`).style.display = `block`; //hide instructions beneath h1 tag
    document.querySelector(`#startBtn`).style.display = `block`; //hide start button when game starts
    document.querySelector(`#submit-highscore-div`).style.display = `none`;
    answerButtonLst.innerHTML = ``;
    return;

}

function init() {
    timerPTag.style.display = `none`; //hide timer on start screen
    answerButtonLst.addEventListener(`click`, checkAnswer);
    highscoreBtn.addEventListener(`click`, storeScoreAndName);
    clearHighscoreBtn.addEventListener(`click`, clearHighscores);
    viewHighscoresBtn.addEventListener(`click`, showHighscores);
    goBackBtn.addEventListener(`click`, setUpGame);
    startBtn.addEventListener(`click`, startGame);
    setUpGame();
    return;
}

init();