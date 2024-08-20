// quiz.js

import { appState } from './state.js';

export const displayQuestion = (question) => {
  console.log(question);
  removeOldFeedback();
  const nextButton = document.getElementById('next-btn');
  const questionsContainer = document.getElementById('question-container');
  questionsContainer.innerHTML = `<div class="question"><b>${question.question_content}</b></div>`;
  
  if (question.options) {
    question.options.forEach((option, index) => {
      questionsContainer.innerHTML += `
        <div>
          <input type="radio" id="option${index}" name="option" class="option-input" value="${option}">
          <label for="option${index}" class="option-label">${option}</label>
        </div>
      `;
    });
  } else {
    questionsContainer.innerHTML += '<p>No options available for this question.</p>'; 
  }
  nextButton.style.display = 'block';
  console.log("Displaying question");
};

const removeOldFeedback = () => {
  const oldFeedbackContainer = document.getElementById('feedback');
  const oldCommentContainer = document.querySelector('#comment');
  console.log("Removing old feedback elements");
  if (oldFeedbackContainer) oldFeedbackContainer.remove();
  if (oldCommentContainer) oldCommentContainer.remove();
};

const displayComment = (correct, index) => {
  const { quiz } = appState.getState();
  const comment = quiz.questions[index].comment;
  const questionsContainer = document.getElementById('question-container');
  removeOldFeedback();

  console.log("Creating feedback elements");
  const feedbackContainer = document.createElement('div');
  feedbackContainer.id = 'feedback';
  feedbackContainer.textContent = correct ? "Correct!" : "Incorrect.";
  feedbackContainer.style.color = correct ? "green" : "red";
  
  const commentContainer = document.createElement('div');
  commentContainer.id = "comment";
  commentContainer.textContent = comment;
  console.log(comment);

  questionsContainer.appendChild(feedbackContainer);
  questionsContainer.appendChild(commentContainer);
};

export const nextQuestion = () => {
  console.log("Next question called");
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert('Please select an option');
    return;
  }

  const { currentQuestionIndex, score, quiz } = appState.getState();
  console.log("User chose", selectedOption.value, "index is ", currentQuestionIndex);
  console.log("Correct answer is", quiz.questions[currentQuestionIndex].answer);
  const answer = quiz.questions[currentQuestionIndex].answer;
  const correct = selectedOption.value === answer;
  
  if (document.getElementById('feedback')) {
    const newScore = correct ? score + 1 : score;
    const newIndex = currentQuestionIndex + 1;
    appState.setState({ score: newScore, currentQuestionIndex: newIndex });
    
    if (newIndex < quiz.questions.length) {
      displayQuestion(quiz.questions[newIndex]);
    } else {
      showResults();
    }
  } else {
    displayComment(correct, currentQuestionIndex);
  }
};

const showResults = () => {
  const { score, quiz } = appState.getState();
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result').innerHTML = `Your score is ${score} out of ${quiz.questions_no}.`;
};