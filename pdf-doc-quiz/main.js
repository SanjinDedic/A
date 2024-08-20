// main.js

import { appState } from './state.js';
import { fetchQuiz } from './fetchQuiz.js';
import { displayQuestion, nextQuestion } from './quiz.js';
import { 
  initializePdfLib, 
  loadPdf, 
  renderPage, 
  goToPrevPage, 
  goToNextPage 
} from './pdfHandler.js';

const setupEventListeners = () => {
  document.getElementById('loadPdf').addEventListener('click', loadPdf);
  document.getElementById('prevPage').addEventListener('click', goToPrevPage);
  document.getElementById('nextPage').addEventListener('click', goToNextPage);
  document.getElementById('generateQuiz').addEventListener('click', generateQuiz);

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
  });
};

const generateQuiz = async () => {
  const { globalPdfText } = appState.getState();
  if (!globalPdfText) {
    alert("Please load a PDF file before generating a quiz.");
    return;
  }
  const numQuestions = document.getElementById('numQuestions').value;

  document.getElementById('loading-animation').style.display = 'flex';

  try {
    const quiz = await fetchQuiz(globalPdfText, numQuestions);
    appState.setState({ quiz });
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-title').innerText = quiz.title;
    displayQuestion(quiz.questions[0]);
  } catch (error) {
    console.error('Error generating quiz:', error);
    alert('Failed to generate quiz. Please try again.');
  } finally {
    document.getElementById('loading-animation').style.display = 'none';
  }
};

// Initialize the application
const init = () => {
  initializePdfLib();
  setupEventListeners();
};

init();