const questions = shuffleArray([
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        answer: 2
    }
]);

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timePerQuestion = 30;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const progressBar = document.getElementById('progress-bar');

const scoreElement = document.getElementById('score');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    loadQuestion();
}

function loadQuestion() {
    updateProgressBar();

    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    let timeLeft = timePerQuestion;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.classList.remove('hidden');
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }
    clearInterval(timer);
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showScore() {

    questionContainer.classList.add('hidden');
    scoreElement.innerText = score;
    scoreContainer.classList.remove('hidden');
    localStorage.setItem('quizScore', score);
}

startQuiz();
