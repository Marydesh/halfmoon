var startPage = document.querySelector("#start-page")
var startButton = document.querySelector("#start-button")
var questionPage = document.querySelector("#question-page")
var questionCount = 0
var questions = [
    {
        question: "some question",
        options: ["one", "two", "three", "four"],
        correctAnswer: "two",
    },
    {
        question: "some question2 ",
        options: ["one", "two", "three", "four"],
        correctAnswer: "one",
    },
    {
        question: "some question3 ",
        options: ["one", "two", "three", "four"],
        correctAnswer: "two",
    },
    {
        question: "some question4 ",
        options: ["one", "two", "three", "four"],
        correctAnswer: "four",
    }
]

startButton.addEventListener("click", function(){
    startPage.classList.add("hide")
    questionPage.classList.remove("hide")
    showQuestion()
}) 

function showQuestion() {
    questionPage.innerHTML = "";
    var question = document.createElement ("h2")
    question.textContent = questions[questionCount].question
    questionPage.append (question)
    for (let i = 0; i < questions[questionCount].options.length; i++) {
        var button = document.createElement("button")
        button.textContent = questions[questionCount].options[i]
        button.value = questions[questionCount].options[i]
        button.addEventListener("click",checkAnswer)
        questionPage.append (button)
        
    }
}
function checkAnswer(event) {
    var feedback = document.createElement ("p")
    if (questions[questionCount].correctAnswer === event.target.value) {
feedback.textContent = "Correct!"
    }else {
        feedback.textContent = "Wrong!"
    }
    questionPage.append (feedback)
    setTimeout(function(){
        feedback.remove()
        questionCount++
        if (questionCount < questions.length) {
            showQuestion ()
        } else {
         // show in screen   
        }
    },2000)
}