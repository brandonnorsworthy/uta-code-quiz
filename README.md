# Coding Quiz Challenge

deployment: https://brandonnorsworthy.github.io/uta-code-quiz/

## About
Timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface.

## Demo
![gif of demo](/assets/images/demo_desktop.gif)

## Functionality
- Dynamically creates ```<li>``` tags from a supplied array and assigns ```id="correct"``` to the correct answer for event calls
- Question and 2D Answer arrays can easily be added to without any hassle just simply mark the correct answer by adding the prefix ```correct:``` to the string
- Locally stores highscore array of objects to be recalled
- Highscore array is sorted before storing so can be easily injected into with new values obtimally
- Timer function decrements if wrong answers are chosen and final time is turned into a score for the highscore board
- Can easily start the quiz over and view highscores from the main page