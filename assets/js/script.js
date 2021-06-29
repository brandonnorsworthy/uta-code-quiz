//html elements that frequently get grabbed
var timerTag = document.querySelector(`#timerTag`); //span containing timer numbers inside the paragraph tag at the top (numbers only)
var timerPTag  = document.querySelector(`header`).children[1]; //paragraph tag at the top of the screen in the nav area that displays time
var highscoreBtn = document.querySelector(`#highscoreBtn`); //submit button that shows at end of game to submit name
var viewHighscoresBtn = document.querySelector(`#viewHighscoresBtn`); //view highscore button at the front page of the quiz game
var clearHighscoreBtn = document.querySelector(`#clearHighscoreBtn`); //button in the highscore view that clears all local storage
var answerButtonLst = document.body.querySelector(`ul`); //list that will hold the dynamic answer list items
var goBackHighscoreBtn = document.querySelector(`#goBackBtn`); //go back button in the highscore view
var startBtn = document.querySelector(`#startBtn`); //button you first see when the page loads (starts game)
var titleTag = document.querySelector(`#title`) //h1 tag that gets used almost entire time for questions and titles

//question and answer object with arrays
var questionObj = { //question object that holds all the parts of questions
    questions: [ //questions can just be added to by adding on a string to end of array
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
    ] //to denote a correct answer simply add prefix `correct:` onto the correct string.
}

var globalTimerPreset = 70; // game presets to be easily accessed for balancing

//global quiz/game variables
var questionIndexNumber = 0; //keeps track of the current question number for question object
var timeLeft = globalTimerPreset; //globl time left variable
var score = 0; //score that gets calculated at end of the game
var gameEnded = true; //boolean helps some functions know if game has already ended as well as timer.

//intial setup for the game shows all the "main menu" type items like instructions and start button
function setUpGame() {
    timeLeft = globalTimerPreset; //reset the time back to 99 seconds so reusable to reset game

    //hide elements that may be visible after a previous round
    document.querySelector(`#display-highscore-div`).style.display = `none`; //this would be the last visible item after viewing highscore of a previous game

    //fills back content that gets reused for quiz questions
    titleTag.textContent = `Coding Quiz Challenge`; //this h1 tag gets reused for questions so make sure its reset

    //display items that are needed for the "main menu"
    titleTag.style.display = `block`; //show the quiz title because after 1 round it will be hidden
    document.querySelector(`#instructions`).style.display = `block`; //show instructions under h1 tag
    viewHighscoresBtn.style.display = `block`; //default view highscores button is hidden after coming from highscores of previous round
    startBtn.style.display = `block`; //show the start button

    return;
}

//gets triggered if the start button at "main menu" gets clicked
function startGame() {
    gameEnded = false; //when game starts set gameEnded back to false

    //when game starts clean up the main div
    viewHighscoresBtn.style.display = `none` //if game is in progress because being timed no stopping to view highscores sorry focus up!
    startBtn.style.display = `none`; //hide start button when game starts
    document.querySelector(`#instructions`).style.display = `none`; //hide instructions beneath h1 tag (not used in questions)
    timerPTag.style.display = `block`; //display timer at the top now that game started

    //functions that create the user experience
    showQuestions(); //start generating the questions
    startTimer(); //make sure all formatting gets sorted out before timing the user

    return;
}

//timer interval that runs while user takes quiz
function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnded === true) { //test if game ended before anything incase needs to be stopped
            clearInterval(timerInterval); //stop
            return;
        }
        if(timeLeft < 1) { //if timer is out under 1 cause wrong answers subtract 10 seconds game ends and timer stops
            clearInterval(timerInterval); //stop
            endGame(); //end game out of time scenario
        }

        timerTag.textContent = timeLeft; //update timer tag to latest time
        timeLeft--; //decrement timer after all code runs
    }, 1000); //1 second intervals

    return;
}

//uses the questionIndexNumber to show the question of the current index and its answers
function showQuestions() {
    titleTag.textContent = questionObj.questions[questionIndexNumber]; //select h1 tag and set it as the question
    createAnswerElements(); //create answers for current question

    return;
}

//creates new answer elements in the answer list will clear out previous answers
function createAnswerElements() {
    answerButtonLst.innerHTML = ''; //clears out all current answers for new epic round of answers to be dynamically loaded! Wow so epic if you ever read this please tell me there are so many comments

    for (let answerIndex = 0; answerIndex < questionObj.answers[questionIndexNumber].length; answerIndex++) { //loop over every answer (for current question) and create a list item on the page based on that content
        var currentAnswerListItem = document.createElement(`li`); //new list item
        var tempStr = questionObj.answers[questionIndexNumber][answerIndex]; //temp incase the string contains the `correct` answer tag and needs to be pulled out.

        //if the string contains `correct:` pull it out and set it as id so they cant see it on the <button>/<li>
        if (questionObj.answers[questionIndexNumber][answerIndex].includes(`correct:`)){
            tempStr = questionObj.answers[questionIndexNumber][answerIndex].substring(8, questionObj.answers[questionIndexNumber][answerIndex].length); //yoink out the string part that doesnt contain `correct:`
            currentAnswerListItem.id = `correct`; //tag correct answer with an id to look at later and see if they clicked the right one.
        }

        currentAnswerListItem.textContent = tempStr; //temp incase the string contains the `correct` answer tag and needs to be pulled out.
        answerButtonLst.appendChild(currentAnswerListItem); //adds this answer list item to the unordered list in html
    }

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
    answerButtonLst.innerHTML = ``; //clear out the
    questionIndexNumber = 0;

    gameEnded = true;
    score = timeLeft;
    answerButtonLst.innerHTML = ``;
    timerPTag.style.display = `none`; //hide timer on end screen
    document.querySelector(`#scoreSpan`).textContent = score;
    titleTag.style.display = `none`; //hide title h1
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
    score = 0;
    showHighscores();
}

function showHighscores() {
    titleTag.style.display = `none`;
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



function init() {
    timerPTag.style.display = `none`; //hide timer on start screen
    answerButtonLst.addEventListener(`click`, checkAnswer);
    highscoreBtn.addEventListener(`click`, storeScoreAndName);
    clearHighscoreBtn.addEventListener(`click`, clearHighscores);
    viewHighscoresBtn.addEventListener(`click`, showHighscores);
    goBackHighscoreBtn.addEventListener(`click`, setUpGame);
    startBtn.addEventListener(`click`, startGame);
    setUpGame();
    return;
}

init();