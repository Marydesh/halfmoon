var startPage = document.querySelector("#start-page")
var startButton = document.querySelector("#start-button")
var questionPage = document.querySelector("#question-page")
var hiScoreTable = document.querySelector("#hi-score table")
var timerElement = document.querySelector("#timer")
var score = 0
var questionCount = 0
var time = 60
var timer
var questions = [ /*source for questions - https://www.interviewbit.com/javascript-mcq/ and https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS.
Created an array of questions with options for answers and a correct answer for each question */
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "?", "-", "="],
        correctAnswer: "=",
    },
    {
        question: "How do we write a comment in javascript?",
        options: ["*", "//", "#", "$$"],
        correctAnswer: "//",
    },
    {
        question: "How to stop an interval timer in Javascript? ",
        options: ["stopInterval", "clearInterval", "intervalClear", "inervalOver"],
        correctAnswer: "clearInterval",
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: ["stringify()", "convert()", "parseInt()", "string()"],
        correctAnswer: "stringify()",
    }
]
/* Added an event listener to the start button, when the button is clicked, first start page becomes invisible and the question page with the question appears, then the function to show a quetsion is calles/executed */

startButton.addEventListener("click", function () {
    startPage.classList.add("hide")
    questionPage.classList.remove("hide")
    showQuestion()
    startTimer()
})
// function to show quetsions and the answer options as buttons
function showQuestion() {
    questionPage.innerHTML = "";
    var questionElement = document.createElement("h2")
    var currentQuestion = questions[questionCount]
    questionElement.textContent = currentQuestion.question
    questionPage.append(questionElement)
    for (let i = 0; i < currentQuestion.options.length; i++) {
        var button = document.createElement("button")
        button.textContent = currentQuestion.options[i]
        button.value = currentQuestion.options[i]
        button.addEventListener("click", checkAnswer)
        button.style.margin = "2px"
        button.style.width = "150px"
        button.style.height = "40px"
        button.style.borderRadius = "15px"
        button.style.backgroundColor = "rgb(148, 91, 148)"
        questionPage.append(button)
    }
}
//function to check the answer  - correct or wrong and display the right
function checkAnswer(event) {
    var feedback = document.createElement("p")
    if (questions[questionCount].correctAnswer === event.target.value) {
        // To Handle correct answer
        feedback.textContent = "Correct!"
        score++;
    } else {
        // To Handle wrong answer
        feedback.textContent = "Wrong!"
        time -= 5
    }
    questionPage.append(feedback)
    setTimeout(function () {
        feedback.remove()
        questionCount++
        if (questionCount < questions.length) {
            showQuestion()
        } else {
            showFinalScore() //calling a function to display a final score when no questions left
        }
    }, 1000)
}
//function to show the final score > calling create a form function and stopping the timer > show high scores
function showFinalScore() {
    questionPage.innerHTML = "";
    var quizCompletedMessage = document.createElement("h2");
    quizCompletedMessage.textContent = "All done!";
    var scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Your final score is " + score;
    questionPage.append(quizCompletedMessage, scoreDisplay);
    createScoreForm()
    stopTimer()
    var highScoresSection = document.querySelector("#hi-score");
    highScoresSection.classList.remove("hide");
    showHighScores();
}
// function to creating a form to input the initials
function createScoreForm() {
    var form = document.createElement("form")
    form.insertAdjacentHTML("beforeend", "<h2>Enter your intials</h2>") // beforeend - inserting the element inside the element, after its last child.
    var input = document.createElement("input")
    input.setAttribute('name', 'initials')
    var button = document.createElement("button")
    button.textContent = "Submit"
    form.addEventListener('submit', submitInitials)
    form.append(input, button)
    questionPage.append(form)
}
// a function to submit this form 
function submitInitials(event) {
    event.preventDefault()
    let initials = event.target.initials.value
    let scores = getHighScores()
    scores.push([initials, score])
    localStorage.setItem('high-scores', JSON.stringify(scores))
    window.location.reload()
}
// getting a high score form the local storage, if no scores , nothing will be returned
function getHighScores() {
    let scores = localStorage.getItem('high-scores')
    // if scores doesn't exist
    if (!scores) {
        return []
    } else {
        return JSON.parse(scores)
    }
}
// Function to display a score. Creates a table and inserts the players score and their name, initials into ${x[0]} and ${x[1]}//
function showHighScores() {
    let scores = getHighScores()
    scores.forEach(x => {
        hiScoreTable.insertAdjacentHTML('beforeend', ` 
            <tr>
                <td>${x[0]}</td>
                <td>${x[1]}</td>
            </tr>
        `)
    })
}
//timer function
function startTimer() {
    time = 60
    timer = setInterval(() => {
        time--
        checkTime()
        renderTimer()
    }, 1000)
}
//  if there is no time left - show final score, stop the timer
function checkTime() {
    if (time <= 0) {
        showFinalScore()
        stopTimer()
    }
}

function stopTimer() {
    clearInterval(timer)
}

function renderTimer() {
    timerElement.textContent = ":" + (time < 10 ? "0" : "") + time
}

showHighScores()

//AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers


// Acceptance Criteria

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score