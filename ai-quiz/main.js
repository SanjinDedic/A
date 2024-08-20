import { fetchQuiz } from './api.js';
import { appState, MAX_QUESTIONS } from './state.js';

const updateUI = () => {
    const { currentQuestionIndex, quiz } = appState.getState();
    const questionContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextBtn');
    const resultContainer = document.getElementById('result');
    const feedbackContainer = document.getElementById('feedbackContainer');

    // Clear previous feedback
    feedbackContainer.innerHTML = '';

    if (quiz && currentQuestionIndex < quiz.questions.length) {
        const question = quiz.questions[currentQuestionIndex];
        displayQuestion(question);
        nextButton.style.display = 'block';
        resultContainer.innerHTML = '';
    } else {
        showResults();
    }
};

const displayQuestion = (question) => {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <div class="question"><b>${question.question_content}</b></div>
        ${question.options ? question.options.map((option, index) => `
            <div>
                <input type="radio" id="option${index}" name="option" class="optionInput" value="${option}">
                <label for="option${index}" class="optionLabel">${option}</label>
            </div>
        `).join('') : '<p>No options available for this question.</p>'}
    `;
};

const displayComment = (correct, index) => {
    const { quiz } = appState.getState();
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = `
        <div id="feedback" style="color: ${correct ? 'green' : 'red'}">
            ${correct ? 'Correct!' : 'Incorrect.'}
        </div>
        <div id="comment">${quiz.questions[index].comment}</div>
    `;
};

const nextQuestion = () => {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const commentDisplayed = feedbackContainer.innerHTML.trim() !== '';

    if (commentDisplayed) {
        // If a comment is displayed, move to the next question
        appState.setState({
            currentQuestionIndex: appState.getState().currentQuestionIndex + 1
        });
        updateUI();
    } else {
        // If no comment is displayed, submit the answer
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        const { currentQuestionIndex, quiz, score } = appState.getState();
        const correct = selectedOption.value === quiz.questions[currentQuestionIndex].answer;

        displayComment(correct, currentQuestionIndex);
        
        appState.setState({
            score: correct ? score + 1 : score
        });
    }
};
const showResults = () => {
    const { score, quiz } = appState.getState();
    const questionContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextBtn');
    const resultContainer = document.getElementById('result');
    const feedbackContainer = document.getElementById('feedbackContainer');

    questionContainer.style.display = 'none';
    nextButton.style.display = 'none';
    feedbackContainer.innerHTML = ''; // Clear any remaining feedback
    resultContainer.innerHTML = `Your score is ${score} out of ${quiz.questions_no}.`;
};

const startQuiz = async () => {
    document.getElementById('startContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        appState.setState({ 
            quiz: data[0],
            currentQuestionIndex: 0,
            score: 0
        });
        updateUI();
    } catch (error) {
        console.error("Failed to load quiz:", error);
    }
};

const startCustomQuiz = async () => {
    const customPrompt = document.getElementById('customQuiz').value;
    if (!customPrompt) {
        alert('Please enter a prompt for your custom quiz.');
        return;
    }

    document.getElementById('startContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizTitle').textContent = 'Waiting for custom quiz...';

    try {
        const quiz = await fetchQuiz(customPrompt, MAX_QUESTIONS);
        appState.setState({ 
            quiz,
            currentQuestionIndex: 0,
            score: 0
        });
        document.getElementById('quizTitle').textContent = quiz.title;
        updateUI();
    } catch (error) {
        console.error("Failed to fetch custom quiz:", error);
        alert('Failed to generate custom quiz. Please try again.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('startBtn').addEventListener('click', startQuiz);
    document.getElementById('startCustomBtn').addEventListener('click', startCustomQuiz);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
});