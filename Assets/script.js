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

// The startTimer function starts and stops the timer and triggers passGame() and failGame()
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.innerHTML = timerCount;
        if (timerCount >= 0) {
            if (isPass && timerCount > 0){
                clearInterval(timer);
                passGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            failGame();
        }
    }, 1000);
}
function setNextQuestion() {
    resetGame()
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){ 
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button) 
    })
}

function resetGame() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
        }
       
} 
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        } 
    }
    
    // Adds colored background depending on user's answer
    function setStatusClass (element, correct) {
        clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }
    
    // Resets wrong or correct color on the screen
    function clearStatusClass(element){
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }
    
    // Adds pass count to screen and stores in client storage
    function setPasses() {
        pass.innerHTML = passCounter;
        localStorage.setItem("passCount", passCounter);
    }
    
    // Adds fail count to screen and stores in client storage
    function setFails() {
        fail.innerHTML = failCounter;
        localStorage.setItem("failCount", failCounter);
    }
    