const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = 
document.getElementById('answer-buttons');
var notify = document.getElementById(".notify");
var timerElement = document.getElementById(".timer-count");
var pass = document.querySelector(".pass");
var fail = document.querySelector(".fail");
var isPass = false;
var passCounter = 0;
var failCounter = 0;
var timer;
var timerCount;

let shuffledQuestions, currentQuestionIndex

// Init function is called when page loads
function init() {
    setPasses();
    setFails();
}

// Start button and next button are activated
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// startGame function is called when the start button is clicked
function startGame(){
isPass = false;
timerCount = 30;
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
startTimer()
}
// This function is called when answers are correct within timeframe
function passGame() {
    notify.textContent = "YOU PASSED!!"
    passCounter++
    setPasses()
    }
    
 // This function is called when the answers are false and timer runs out
function failGame() {
     notify.innerHTML = "you failed..."
    failCounter++
    setFails()
    }
    