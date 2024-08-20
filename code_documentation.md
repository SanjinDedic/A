# Project Sitemap

## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC

[STYLE_GUIDE.md](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/STYLE_GUIDE.md)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/STYLE_GUIDE.md
```
# Updated General JavaScript Style Guide

## Table of Contents
1. [File Structure and Naming](#file-structure-and-naming)
2. [General Coding Style](#general-coding-style)
3. [Variables and Data Types](#variables-and-data-types)
4. [Functions](#functions)
5. [Modules and Imports](#modules-and-imports)
6. [Asynchronous Code](#asynchronous-code)
7. [Error Handling](#error-handling)
8. [State Management](#state-management)
9. [DOM Manipulation](#dom-manipulation)
10. [Comments and Documentation](#comments-and-documentation)
11. [CSS Styling](#css-styling)
12. [API Key Management](#api-key-management)
13. [API Calls Structure](#api-calls-structure)

## File Structure and Naming

- Use descriptive, camelCase filenames.
- Standardized file names:
  - `index.html`: Main HTML file
  - `style.css`: Main CSS file
  - `main.js`: Entry point for JavaScript
  - `state.js`: State management
  - `apiKey.js`: API key management
  - `api.js`: API call structure
- Group related functionality into separate files.
- Keep configuration files (e.g., `.vscode/settings.json`) in appropriate folders.

## General Coding Style

- Use 2 spaces for indentation.
- Use semicolons at the end of statements.
- Use single quotes for strings, except when using template literals.
- Limit line length to 80 characters where possible.
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Use UPPERCASE_SNAKE_CASE for constants.

## Variables and Data Types

```javascript
const API_KEY = 'your-api-key';
let currentIndex = 0;
const MAX_ITEMS = 20;
```

- Use `const` for variables that won't be reassigned.
- Use `let` for variables that will be reassigned.
- Avoid using `var`.
- Use meaningful and descriptive variable names.

## Functions

```javascript
const loadData = () => {
  // Function body
};

const handleDataLoad = async (event) => {
  // Async function body
};
```

- Use arrow functions for consistency.
- Keep functions small and focused on a single task.
- Use async/await for asynchronous functions.

## Modules and Imports

```javascript
import { appState } from './state.js';
import { fetchData } from './api.js';
import { displayItem, nextItem } from './main.js';
```

- Use ES6 module syntax for imports and exports.
- Import only what you need from modules.

## Asynchronous Code

```javascript
const generateData = async () => {
  try {
    const data = await fetchData(params);
    // Handle successful data generation
  } catch (error) {
    console.error('Error generating data:', error);
    // Handle error
  }
};
```

- Use async/await for asynchronous operations.
- Wrap async operations in try/catch blocks for error handling.

## Error Handling

```javascript
.catch(error => {
  console.error('There was an error:', error);
  // Optionally, display user-friendly error message
});
```

- Use try/catch blocks for error handling in async functions.
- Log errors to the console.
- Consider showing user-friendly error messages in the UI.

## State Management in Vanilla JavaScript

```javascript
// state.js
export const createState = (initialState) => {
  let state = initialState;

  const getState = () => state;

  const setState = (newState) => {
    state = { ...state, ...newState };
    updateUI(); // Call a function to update the UI
  };

  return { getState, setState };
};

export const appState = createState({
  items: [],
  currentIndex: 0,
  isActive: true,
  // ... other state variables
});

// Constants
export const MAX_ITEMS = 100;
export const INTERVAL = 5000;
```

### Usage in other files

```javascript
import { appState, MAX_ITEMS, INTERVAL } from './state.js';

// Setting state
appState.setState({ currentIndex: 5 });

// Getting state
const { items, isActive } = appState.getState();

// Using constants
if (appState.getState().items.length >= MAX_ITEMS) {
  someFunction();
}

// Update UI function
function updateUI() {
  // Update DOM elements based on current state
  document.getElementById('someElement').textContent = appState.getState().currentIndex;
}

// Call updateUI initially
updateUI();
```

### Best Practices for Vanilla JS State Management

1. Keep state centralized in a single object.
2. Use getter and setter methods to access and modify state.
3. Trigger UI updates manually after state changes.
4. Use meaningful names for state properties and update functions.
5. Avoid directly modifying the state object; always use the setter method.

## DOM Manipulation

```javascript
const container = document.getElementById('container');
container.innerHTML = `<div class="item"><b>${item.content}</b></div>`;
```

- Cache DOM selections when possible.
- Use template literals for complex HTML insertions.
- Consider using DocumentFragment for better performance when adding multiple elements.

## Comments and Documentation

```javascript
/**
 * Displays an item in the UI.
 * @param {Object} item - The item object to display.
 */
const displayItem = (item) => {
  // Function implementation
};
```

- Use JSDoc comments for functions to describe parameters and return values.
- Add comments to explain complex logic or non-obvious code.
- Keep comments up-to-date with code changes.

## CSS Styling

```css
/* Use camelCase for class names */
.buttonContainer {
  display: flex;
  justify-content: space-between;
}

/* Group related styles */
#mainContainer {
  display: block;
  border-radius: 8px;
  text-align: left;
}

/* Use variables for repeated values */
:root {
  --primaryColor: #00c498;
  --secondaryColor: #9938cb;
}
```

- Use camelCase for class names in CSS to match JavaScript conventions.
- Group related styles together.
- Use CSS variables for colors and repeated values.
- Comment sections of CSS for better organization.

## API Key Management

Create a separate file (`apiKey.js`) to handle API key retrieval and storage:

```javascript
// apiKey.js

// Function to get the API key from apikey.txt
const getApiKeyFromFile = async () => {
    try {
        const response = await fetch('apikey.txt');
        if (response.ok) {
            const apiKey = await response.text();
            return apiKey.trim();
        }
    } catch (error) {
        console.error('Error reading apikey.txt:', error);
    }
    return null;
};

// Function to get the API key from local storage
const getApiKeyFromStorage = () => {
    return localStorage.getItem('apiKey');
};

// Function to set the API key in local storage
const setApiKeyInStorage = (apiKey) => {
    localStorage.setItem('apiKey', apiKey);
};

// Function to prompt the user for the API key
const promptForApiKey = () => {
    return new Promise((resolve) => {
        const apiKey = prompt("Please enter your API key:");
        if (apiKey) {
            setApiKeyInStorage(apiKey);
        }
        resolve(apiKey);
    });
};

// Main function to get the API key
export const getApiKey = async () => {
    // Try to get the key from apikey.txt
    let apiKey = await getApiKeyFromFile();
    
    // If not found, try to get from local storage
    if (!apiKey) {
        apiKey = getApiKeyFromStorage();
    }
    
    // If still not found, prompt the user
    if (!apiKey) {
        apiKey = await promptForApiKey();
    }
    
    return apiKey;
};

// Function to validate the API key format
export const isValidApiKey = (apiKey) => {
    // Implement your validation logic here
    return typeof apiKey === 'string' && apiKey.length > 0;
};
```

## API Calls Structure

Create a separate file (`api.js`) to handle API calls:

```javascript
// api.js

import { getApiKey, isValidApiKey } from './apiKey.js';

const getHeaders = async () => {
    const apiKey = await getApiKey();
    if (!apiKey || !isValidApiKey(apiKey)) {
        throw new Error('Invalid or missing API key');
    }
    return {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };
};

const createPrompt = (data) => {
    // Create and return the prompt based on the data
};

const createPayload = (systemPrompt, userPrompt) => {
    return {
        model: "gpt-4o",
        temperature: 0.5,
        max_tokens: 4096,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        response_format: {
            type: "json_object",
        },
    };
};

export const fetchFromAPI = async (data) => {
    try {
        const headers = await getHeaders();
        const userPrompt = createPrompt(data);
        const systemPrompt = "Your system prompt here";
        const payload = createPayload(systemPrompt, userPrompt);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return JSON.parse(responseData.choices[0].message.content);
    } catch (error) {
        console.error('Error fetching from API:', error);
        // Handle error appropriately
    }
};
```

### Best Practices for API Key Management and API Calls

1. Keep API key retrieval logic separate from other code.
2. Use multiple methods to retrieve the API key (file, local storage, user prompt).
3. Store the API key securely in local storage after user input.
4. Validate the API key before using it.
5. Handle API call errors gracefully and provide user feedback when appropriate.
6. Use a consistent structure for all API calls in your application.
7. Separate the logic for creating prompts and payloads from the main API call function.
8. Use environment variables for API endpoints and other configuration when possible.

By following this updated style guide, you'll maintain consistency across your project, improve code readability, and make it easier for you (and potentially others) to work on and maintain your codebase.
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz

[style.css](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/style.css)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/style.css
```
body {
    font-family: Arial, sans-serif; /* Use Arial as the default font */
    background-color: #f4f4f4; /* Light grey background for contrast */
    color: #333; /* Dark grey text for readability */
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove default padding */
}


#controlsContainer, #quizContainer {
    width: 900px; /* Match the PDF content width */
    margin: 20px auto;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.buttonContainerLoad, .buttonContainerBrowse {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
}

.sliderContainer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

input[type="range"] {
    flex-grow: 1; /* Make slider stretch to the width of the container */
}

output#numQuestionsOutput {
    padding: 0 10px;
}

#quiz-container, #pdfContent {
    width: 90%; /* Use the full width of the controls container */
    margin-top: 5%;
    padding: 5%;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    max-width: 1000px;
}

/* Rest of the CSS remains the same */


button {
    background-color: #00c498; /* Teal background for buttons */
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #008f76; /* Darker teal on hover */
}

#pageInfo {
    color: #9938cb; /* Purple for page information */
}

input[type="file"] {
    border: 2px dashed #cf9f13; /* Gold border for the file input */
    padding: 10px;
    background-color: #fafafa; /* Very light grey for contrast */
    margin-bottom: 15px;
}

#quizContent {
    background-color: #ffffff; /* White background for quiz content */
    padding: 15px;
    margin-top: 15px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1); /* Soft shadow for depth */
}

/* Additional styling for improved aesthetics */
h1, h2, h3, h4, h5, h6 {
    color: #9938cb; /* Purple for headings */
}


.quiz-question {
    margin-bottom: 20px;
}

.quiz-question label {
    display: block;
    margin-bottom: 5px;
}

.quiz-choices {
    margin-top: 10px; 
}


/* Quiz Container Styles */
#quiz-container {
    display: block; /* Changes display to make it visible */
    border-radius: 8px; /* Adds rounded corners for consistency */
    text-align: left; /* Aligns text to the left for readability */
}

#quiz-title {
    margin-bottom: 20px; /* Adds space below the title for separation */
}

#question-container {
    margin-bottom: 20px; /* Adds space between questions */
}

#next-btn {
    display: inline-block; /* Allows the button to size according to its content */
    width: auto; /* Auto width to fit content plus padding */
}

#result {
    font-weight: bold; /* Makes the result text bold for emphasis */
    color: #008f76; /* Teal color for a consistent scheme */
    margin-top: 20px; /* Adds space above the result for separation */
}

/* Enhancements for Interactive Elements */
input[type="file"]:hover, button:hover {
    opacity: 0.9; /* Slightly lowers opacity on hover for a feedback effect */
}



#loading-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


#pdfContent {
    width: 100%;
    overflow: auto;
    max-width: 900px; /* or whatever maximum width you prefer */
    margin: 0 auto;
}
```
[main.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/main.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/main.js
```
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
```
[pdfHandler.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/pdfHandler.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/pdfHandler.js
```
// pdfHandler.js

import { appState } from './state.js';

let canvas, ctx;

export const initializePdfLib = () => {
  if (pdfjsLib && pdfjsLib.getDocument) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  }
  
  // Initialize canvas
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  document.getElementById('pdfContent').appendChild(canvas);
};

export const loadPdf = () => {
  const fileInput = document.getElementById('pdfUploader');
  const file = fileInput.files[0];
  if (file && file.type === "application/pdf") {
    const fileReader = new FileReader();
    fileReader.onload = handleFileLoad;
    fileReader.readAsArrayBuffer(file);
  } else {
    alert("Please select a valid PDF file before loading.");
  }
};

const handleFileLoad = async (event) => {
  const typedarray = new Uint8Array(event.target.result);
  try {
    const loadedPdfDoc = await pdfjsLib.getDocument({ data: typedarray }).promise;
    initializePdfDoc(loadedPdfDoc);
  } catch (error) {
    console.error('Error loading PDF:', error);
    alert('Failed to load PDF. Please try again.');
  }
};

const initializePdfDoc = async (pdfDoc) => {
  appState.setState({ pdfDoc });
  updatePageInfo(1);
  resetGlobalPdfText();
  try {
    const extractedText = await extractTextFromAllPages(pdfDoc);
    updateGlobalPdfText(extractedText);
    await renderPage(1); // Start with the first page
  } catch (error) {
    console.error('Error initializing PDF:', error);
    alert('Failed to initialize PDF. Please try again.');
  }
};

export const updatePageInfo = (num) => {
  const { pdfDoc } = appState.getState();
  document.getElementById('pageInfo').textContent = `Page ${num} of ${pdfDoc.numPages}`;
};

const resetGlobalPdfText = () => {
  appState.setState({ globalPdfText: "" });
};

const updateGlobalPdfText = (text) => {
  appState.setState({ globalPdfText: text });
};

export const renderPage = async (num) => {
  const { pdfDoc } = appState.getState();
  if (!pdfDoc) return;

  appState.setState({ pageRendering: true, pageNum: num });

  try {
    const page = await pdfDoc.getPage(num);
    const containerWidth = document.getElementById('pdfContent').clientWidth;
    const originalViewport = page.getViewport({ scale: 1 });
    
    // Calculate scale to fit the page width to the container
    const scale = containerWidth / originalViewport.width;
    const viewport = page.getViewport({ scale });

    // Set canvas dimensions to match the scaled viewport
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Ensure the canvas doesn't exceed the container width
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    appState.setState({ pageRendering: false });

    // Handle pending page
    const { pageNumPending } = appState.getState();
    if (pageNumPending !== null) {
      renderPage(pageNumPending);
      appState.setState({ pageNumPending: null });
    }
  } catch (error) {
    console.error('Error rendering page:', error);
    appState.setState({ pageRendering: false });
  }

  updatePageInfo(num);
};

export const extractTextFromAllPages = async (pdf) => {
  const pagePromises = Array.from(
    { length: pdf.numPages },
    (_, i) => pdf.getPage(i + 1)
      .then(page => page.getTextContent())
      .then(content => content.items.map(item => item.str).join(' '))
  );

  try {
    const pageTexts = await Promise.all(pagePromises);
    return pageTexts.join('\n\n');
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

export const goToPrevPage = () => {
  const { pageNum } = appState.getState();
  if (pageNum <= 1) return;
  renderPage(pageNum - 1);
};

export const goToNextPage = () => {
  const { pdfDoc, pageNum } = appState.getState();
  if (pageNum >= pdfDoc.numPages) return;
  renderPage(pageNum + 1);
};
```
[fetchQuiz.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/fetchQuiz.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/fetchQuiz.js
```
// fetchQuiz.js

const fetchApiKey = async () => {
  try {
    const response = await fetch('./apikey.txt');
    return await response.text();
  } catch (error) {
    console.error('Error fetching API key:', error);
    throw new Error('Failed to fetch API key');
  }
};

const createPrompt = (quizData, numQuestions) => {
  return `Given this text: ${quizData}, create a quiz in the following JSON format:

{
"title": "Quiz Title",
"questions_no": ${numQuestions},
"question_type": "mcq",
"questions": [
    {
    "question_content": "Question 1 goes here",
    "options": [ 
        "Option A",
        "Option B", 
        "Option C", 
        "Option D" 
    ],
    "answer": "Correct answer",
    "comment": "Explanation for the correct answer (optional)" 
    },
    // ... More questions (structure repeated)
]
}
`;
};

const createPayload = (systemPrompt, userPrompt) => {
  return {
    model: "gpt-4o",
    temperature: 0.5,
    max_tokens: 4096,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_object",
    },
  };
};

const fetchQuizFromApi = async (apiKey, payload) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const quizDetails = JSON.parse(data.choices[0].message.content);
    console.log("Quiz details:", quizDetails);
    return quizDetails;
  } catch (error) {
    console.error('Error fetching quiz from API:', error);
    throw error;
  }
};

export const fetchQuiz = async (quizData, numQuestions = 10) => {
  console.log("Fetching quiz");
  try {
    const OPENAI_API_KEY = await fetchApiKey();
    const userPrompt = createPrompt(quizData, numQuestions);
    const systemPrompt = "You are a helpful study assistant. Respond in JSON format with a quiz based on the supplied information. Follow the provided JSON structure for your response.";
    const payload = createPayload(systemPrompt, userPrompt);
    return await fetchQuizFromApi(OPENAI_API_KEY, payload);
  } catch (error) {
    console.error('Error in fetchQuiz:', error);
    throw error;
  }
};
```
[index.html](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/index.html)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Study Quiz Generator</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js"></script>
</head>
<body>
    <div id="controlsContainer">
        <h1>AI Study Quiz Generator</h1>
        <div class="buttonContainerLoad">
            <input type="file" id="pdfUploader" accept="application/pdf" />
            <button id="loadPdf">Load PDF</button>
        </div>

        <div id="pdfContent"></div>
        <div id="pageInfo"></div>

        <div class="buttonContainerBrowse">
            <button id="prevPage">Previous Page</button>
            <button id="nextPage">Next Page</button>
        </div>

        <div class="sliderContainer">
            <label for="numQuestions">Number of Questions:</label>
            <input type="range" id="numQuestions" min="1" max="20" value="10" oninput="this.nextElementSibling.value = this.value">
            <output id="numQuestionsOutput">10</output>
        </div>

        <button id="generateQuiz">Generate Quiz</button>

        <div id="loading-animation" style="display: none;">
            <div class="spinner"></div>
            <p>Generating quiz...</p>
        </div>

        <div id="quiz-container" style="display: none;">
            <h1 id="quiz-title">MODIFY THIS TITLE</h1>
            <div id="question-container"></div>
            <button id="next-btn">Next</button>
            <div id="result"></div>
        </div>
    </div>

    <script type="module" src="main.js"></script>
</body>
</html>
```
[quiz.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/quiz.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/quiz.js
```
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
```
[state.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/state.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/state.js
```
// state.js

const createState = (initialState) => {
    let state = initialState;
    const listeners = new Set();
  
    const getState = () => state;
  
    const setState = (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    };
  
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
  
    return { getState, setState, subscribe };
  };
  
  export const appState = createState({
    currentQuestionIndex: 0,
    score: 0,
    quiz: null,
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.5,
    globalPdfText: "",
  });
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/.vscode

[settings.json](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/.vscode/settings.json)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/pdf-doc-quiz/.vscode/settings.json
```
{
    "liveServer.settings.port": 5502
}
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free

[style.css](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/style.css)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/style.css
```
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    background-color: #f0f0f0; /* A light background for the fitness theme */
}

/* Container Styling */
.container {
    width: 900px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: white; /* White container on light background */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle box shadow */
}

/* Default Fieldset Styling */
fieldset {
    margin-bottom: 20px;
    border: 1px solid #ddd; /* Light border */
    padding: 15px;
}


/* Specific styling for Pantry Ingredients to apply grid layout */
.pantryIngredients {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Creates a responsive grid layout for ingredients */
    gap: 10px; /* Gap between grid items */
}

/* Label Styling */
label {
    display: block; /* Ensures labels are displayed one after another vertically */
    margin-top: 5px;
}

/* Button Styling */
button {
    cursor: pointer;
    margin-top: 10px;
}

/* Range Input Styling */
#timeAvailable {
    width: 100%;
}

/* Text Input Styling */
input[type="text"] {
    margin-right: 5px;
}
```
[main.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/main.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/main.js
```
// Attach event listeners after loading the DOM
document.addEventListener("DOMContentLoaded", () => {
    // Your event listener setup
    document.getElementById('addItem').addEventListener('click', addIngredientHandler);
    document.getElementById('requestWorkouts').addEventListener('click', requestWorkoutsHandler); 
    document.getElementById('timeAvailable').addEventListener('input', updateTimeValueDisplay); 
});


// Handles adding a custom item
function addIngredientHandler() { 
    const customItem = document.getElementById('customItem').value.trim();
    if (customItem) {
        appendIngredientLabel(customItem); 
        document.getElementById('customItem').value = ''; 
    }
}

// Appends the item label to the container 
function appendIngredientLabel(customItem) {
    const container = document.getElementById('customItemContainer');
    const label = document.createElement('label');
    label.textContent = customItem;
    container.appendChild(label);
}

// Handles request for workouts
function requestWorkoutsHandler() {
    const data = collectFormData();
    fetchWorkoutDirectly(data); 
}

// Collects data for workout request
function collectFormData() {
    const items = collectItems(); 
    return {
        items: items,
        timeAvailable: document.getElementById('timeAvailable').value,
        intensity: document.getElementById('intensity').value 
    };
}

// Collects used fitness items
function collectItems() { 
    const checkedItems = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(checkbox => checkbox.value);
    const customItems = Array.from(document.querySelectorAll('#customItemContainer label')).map(label => label.textContent.trim());
    return checkedItems.concat(customItems);
}

// Updates the display of the time value
function updateTimeValueDisplay() {
    document.getElementById('timeValue').textContent = this.value;
}

// Fetches workout using OpenAI API
async function fetchWorkoutDirectly(data) {
    console.log("Fetching workout from API");
    const apiKeyResponse = await fetch('./apikey.txt');
    const OPENAI_API_KEY = await apiKeyResponse.text();

    const systemPrompt = `You are a fitness instructor. Respond to the user in JSON format with the following fields - 
    workout_title: <text>, items_used: list of strings, workout_instructions: <text in HTML format>.`

    const promptText = `Given the available items: ${data.items.join(', ')}, time available: ${data.timeAvailable} minutes, and intensity
     level: ${data.intensity}, generate a workout routine with a title (string), items_used (list of strings) and workout_instructions (in HTML format).`;

    const payload = {
        model: "gpt-4-turbo-preview", 
        temperature: 0.5, 
        max_tokens: 500, // Adjust if needed
        messages: [{
                "role": "system",
                "content": systemPrompt
            },
            {
                "role": "user",
                "content": promptText
            }
        ],
        response_format: {
            "type": "json_object"
        }
    };

    fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const firstChoice = data.choices[0];
            const workoutDetails = JSON.parse(firstChoice.message.content); 
            displayWorkout(workoutDetails);
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
}
 
function displayWorkout(workout) {
    document.getElementById('workoutTitle').textContent = workout.workout_title;
      // 2. Create 'Items Used' section
  const itemsElement = document.getElementById('workoutItems');
  itemsElement.innerHTML = '<h3>Items Used:</h3>';
  const itemsList = document.createElement('ul');
  workout.items_used.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    itemsList.appendChild(listItem);
  });
  itemsElement.appendChild(itemsList);
    document.getElementById('workoutInstructions').innerHTML = workout.workout_instructions; 
    fetchWorkoutImage(workout.workout_title, workout.items_used.join(', '));
}


// Fetches an image (adjust if needed)
async function fetchWorkoutImage(title, itemsUsed) {
    const apiKeyResponse = await fetch('./apikey.txt');
    const OPENAI_API_KEY = await apiKeyResponse.text();
    const payload = {
        model: "dall-e-3",
        prompt: `A photrealistic image related to: ${title} featuring only one person exercising. The image must feature at 
        least one and at most 3 of the following ${itemsUsed}`, // Adjust to your liking
        n: 1,
        size: "1024x1024"
    };

    fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const imageUrl = data.data[0].url; 
                displayWorkoutImage(imageUrl);
            }
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
}

// Displays the workout image
function displayWorkoutImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Generated Workout Image";
    img.style.width = "100%"; 
    const workoutImageDiv = document.getElementById('workoutImage');
    workoutImageDiv.innerHTML = ''; 
    workoutImageDiv.appendChild(img);
}
```
[index.html](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/index.html)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fitness For Free</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Fitness For Free</h1>
    <form id="fitnessForm">
        <fieldset class="environmentItems">
            <legend>Environment Items</legend>
            <label><input type="checkbox" name="item" value="Walking Track" checked> Walking Track</label>
            <label><input type="checkbox" name="item" value="Exercise Mat" checked> Exercise Mat</label>
            <label><input type="checkbox" name="item" value="Stairs" checked> Stairs</label>
            <label><input type="checkbox" name="item" value="Heavy Backpack" checked> Heavy Backpack</label>
            <label><input type="checkbox" name="item" value="Monkey Bars" checked> Monkey Bars</label>
            <label><input type="checkbox" name="item" value="Hills" checked> Hills to run up</label>
            <label><input type="checkbox" name="item" value="Park Bench" checked> Park Bench</label>
        </fieldset>
        
        <fieldset class="additionalItems">
            <legend>Additional Items</legend>
            <div id="customItemContainer">
                <input type="text" id="customItem" placeholder="Add your item" />
                <button type="button" id="addItem">+</button>
            </div>
        </fieldset>
        <label for="timeAvailable">Time Available:
            <input type="range" id="timeAvailable" name="timeAvailable" min="10" max="120" value="60">
            <span id="timeValue">60</span> minutes
        </label>

        <label for="intensity">Choose an intensity:
            <select id="intensity" name="intensity">
                <option value="low">Low Intensity</option>
                <option value="medium">Medium Intensity</option>
                <option value="high">High Intensity</option>
            </select>
        </label>
        <button type="button" id="requestWorkouts">Request Workouts</button>
    </form>


<div id="workoutResult" style="margin-top: 20px;">
    <h2 id="workoutTitle"></h2>
    <div id="workoutItems"></div>
    <div id="workoutInstructions"></div>

    <div id="refineWorkout" style="display:none;">
        <input type="text" id="refineText" placeholder="Request changes" />
        <button type="button" id="refineWorkoutButton">Refine Workout</button>
    </div>
</div>

<div id="workoutImage" style="margin-top: 20px;"></div>

</div>

<script src="main.js"></script>
</body>
</html>
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/.vscode

[settings.json](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/.vscode/settings.json)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/exercise-4-free/.vscode/settings.json
```
{
    "liveServer.settings.port": 5502
}
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp

[style.css](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/style.css)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/style.css
```
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Container Styling */
.container {
  width: 900px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* Default Fieldset Styling */
fieldset {
  margin-bottom: 20px;
}

/* Specific styling for Pantry Ingredients to apply grid layout */
.pantryIngredients {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Creates a responsive grid layout for ingredients */
  gap: 10px; /* Gap between grid items */
}

/* Label Styling */
label {
  display: block; /* Ensures labels are displayed one after another vertically */
  margin-top: 5px;
}

/* Button Styling */
button {
  cursor: pointer;
  margin-top: 10px;
}

/* Range Input Styling */
#timeAvailable {
  width: 100%;
}

/* Text Input Styling */
input[type="text"] {
  margin-right: 5px;
}

.loading {
    position: relative; 
    margin: 40px auto;
    width: 50px;
    height: 50px;
  }
  
  .loading::before { /* Add styles for the spinning element */
    content: ''; 
    display: block;
    width: 32px; /* Adjust slightly smaller than container */
    height: 32px;
    margin: 4px; /* To visually center within container */
    border-radius: 50%;
    border: 4px solid #3498db; /* Use desired border color */
    border-color: #3498db transparent #3498db transparent; /* Color only top & right */
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .hidden {
    display: none; 
}
```
[main.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/main.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/main.js
```
import {
  ingredients,
  createIngredientsCheckboxes,
  addIngredientHandler,
} from "./javascript/ingredients.js";
import { cuisines, populateCuisines } from "./javascript/cuisines.js";
import { fetchRecipeDirectly } from "./javascript/fetchRecipeDirectly.js";
import { fetchRefinedRecipe } from "./javascript/fetchRefinedRecipe.js";
import { showLoadingAnimation, hideLoadingAnimation } from './javascript/animation.js';

createIngredientsCheckboxes(ingredients);
populateCuisines(cuisines);

// Event listeners setup
document
  .getElementById("addIngredient")
  .addEventListener("click", addIngredientHandler);
document
  .getElementById("requestRecipesDirect")
  .addEventListener("click", requestRecipesHandler);
document
  .getElementById("timeAvailable")
  .addEventListener("input", updateTimeValueDisplay);
document
  .getElementById("refineRecipeButton")
  .addEventListener("click", refineRecipeHandler);

// Handles the request for recipes
function requestRecipesHandler() {
  const data = collectFormData();
  fetchRecipeDirectly(data);
}

// Collects form data for the recipe request, including ingredients
function collectFormData() {
  const ingredients = collectIngredients();
  return {
    ingredients: ingredients,
    timeAvailable: document.getElementById("timeAvailable").value,
    cuisine: document.getElementById("cuisine").value,
  };
}

// Collects both checked and custom ingredients
function collectIngredients() {
  const checkedIngredients = Array.from(
    document.querySelectorAll('input[name="ingredient"]:checked')
  ).map((checkbox) => checkbox.value);
  const customIngredients = Array.from(
    document.querySelectorAll("#customIngredientContainer label")
  ).map((label) => label.textContent.trim());
  return checkedIngredients.concat(customIngredients);
}

// Updates the display of the selected time value
function updateTimeValueDisplay() {
  document.getElementById("timeValue").textContent = this.value;
}

function refineRecipeHandler() {
  const refineText = document.getElementById("refineText").value.trim();
  if (!refineText) {
    alert("Please enter some text to refine the recipe.");
    return;
  }

  const originalRecipeTitle =
    document.getElementById("recipeTitle").textContent;
  const originalRecipeInstructions =
    document.getElementById("recipeInstructions").innerHTML;
  const originalIngredients = collectIngredients().join(", ");

  // The refinement prompt now includes the entire recipe followed by the modification request
  const refinementPrompt = `Given the original recipe titled "${originalRecipeTitle}" with ingredients: ${originalIngredients} and instructions: ${originalRecipeInstructions}, please modify the recipe based on the following request: "${refineText}".`;

  // Assuming you have a function similar to `fetchRecipeDirectly` that can handle this new prompt
  fetchRefinedRecipe(refinementPrompt);
}

```
[index.html](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/index.html)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A.I. Recipe Generator</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <h1>A.I. Recipe Generator</h1>
        <form id="ingredientsForm">
            <fieldset class="pantryIngredients">
                <legend>Pantry Ingredients</legend>
                <!-- Using JS to dynamically add pantry ingredients - see pantry-ingredients.js -->
            </fieldset>

            <fieldset class="additionalIngredients">
                <legend>Additional Ingredients</legend>
                <div id="customIngredientContainer">
                    <input type="text" id="customIngredient" placeholder="Add your ingredient" />
                    <button type="button" id="addIngredient">+</button>
                </div>
            </fieldset>
            <label for="timeAvailable">Time Available:
                <input type="range" id="timeAvailable" name="timeAvailable" min="10" max="120" value="60">
                <span id="timeValue">60</span> minutes
            </label>

            <label for="cuisine">Choose a cuisine:
                <select id="cuisine" name="cuisine"></select>
                <!-- Using JS to dynamically add cuisine - see cuisines.js -->
            </label>
            <button type="button" id="requestRecipes">Request Recipes</button>
            <button type="button" id="requestRecipesFake">Request Recipes Fake</button>
            <button type="button" id="requestRecipesDirect">Request Recipes Direct API</button>
        </form>


        <div id="recipeResult" style="margin-top: 20px;">
            <h2 id="recipeTitle"></h2>
            <div id="recipeIngredients"></div>
            <div id="recipeInstructions"></div>

            <div id="refineRecipe" style="display:none;">
                <input type="text" id="refineText" placeholder="Request changes" />
                <button type="button" id="refineRecipeButton">Refine Recipe</button>
            </div>
        </div>

        <div id="spinner-container"></div>
        
        <div id="recipeImage" style="margin-top: 20px;"></div>

    </div>

    <script type="module" src="main.js"></script>


</body>

</html>
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript

[displayRecipe.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/displayRecipe.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/displayRecipe.js
```
import { fetchAndDisplayRecipeImage } from "./fetchAndDisplayRecipeImage.js";

// This function is responsible for displaying a recipe on the page
// It also fetches and displays the recipe image
// It is assumed that the `fetchAndDisplayRecipeImage` function is available - line 21
// This function is used in fetchRecipeDirectly.js and fetchRefinedRecipe.js
export function displayRecipe(recipe) {
    document.getElementById("recipeTitle").textContent = recipe.title;
  
    const ingredientsList = document.createElement("ul");
    (recipe.ingredients || []).forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    const recipeIngredientsDiv = document.getElementById("recipeIngredients");
    recipeIngredientsDiv.innerHTML = ""; // Clear previous content
    recipeIngredientsDiv.appendChild(ingredientsList);
  
    document.getElementById("recipeInstructions").innerHTML = recipe.recipe;
    // Fetch and display the recipe image
    fetchAndDisplayRecipeImage(recipe.title);
    document.getElementById("refineRecipe").style.display = "block";
  }
```
[fetchRecipeDirectly.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchRecipeDirectly.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchRecipeDirectly.js
```
// This file contains the code to fetch a recipe directly from the OpenAI API using the chat/completions endpoint.
import { displayRecipe } from "./displayRecipe.js";
import { showLoadingAnimation, hideLoadingAnimation } from "./animation.js";

// This function generates the prompt text based on the user's input
function generatePromptText(data) {
  const promptText = `Given the ingredients: ${data.ingredients.join(", ")}, 
    time available: ${data.timeAvailable} minutes, and desired cuisine: ${
    data.cuisine
  }, 
    generate a recipe that uses these ingredients effectively. Please format the response as a detailed recipe.`;
  return promptText;
}

// The content for the system message
const systemPrompt = `You are a helpful chef and you respond to the user in JSON format with the following fields 
- recipe_title: <text>, recipe: <text made up of steps with html formatting>, ingredients: list, time_minutes: integer, cuisine: <cuisine>.`;


// This function fetches a recipe directly from the OpenAI API
export async function fetchRecipeDirectly(data) {

  // Fetch and read the API key
  const apiKeyResponse = await fetch('./apikey.txt');
  const OPENAI_API_KEY = await apiKeyResponse.text();
  console.log("fetching recipe directly");
  showLoadingAnimation(); // Show loading animation at the start of the fetch

  const userPrompt = generatePromptText(data);

  const payload = {
    model: "gpt-4o", // Adjust based on available models and your specific needs
    temperature: 0.5,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const firstChoice = data.choices[0];
    const recipeDetails = JSON.parse(firstChoice.message.content); // Parse the JSON content

    displayRecipe({
      title: recipeDetails.recipe_title,
      ingredients: recipeDetails.ingredients,
      recipe: recipeDetails.recipe,
    });
    console.log("recipe displayed");
  } catch (error) {
    console.error("There was an error:", error);
  } finally {
    hideLoadingAnimation(); // Hide loading animation after image display
    document.getElementById('recipeResult').classList.remove('hidden');
  }
}

```
[ingredients.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/ingredients.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/ingredients.js
```
// This file contains the list of ingredients and functions to create ingredient checkboxes and handle adding a custom ingredient

// Define your list of ingredients
export const ingredients = [
  "Flour",
  "Salt",
  "Pepper",
  "Olive Oil",
  "Sugar",
  "Eggs",
  "Milk",
  "Butter",
  "Vanilla Extract",
  "Baking Soda",
  "Baking Powder",
  "Cocoa Powder",
  "Yeast",
  "Water",
  "Honey",
  "Garlic",
  "Rice",
  "Pasta",
  "Canned Tomatoes",
  "Canned Beans",
  "Canned Tuna",
  "Soy Sauce",
  "Vinegar",
  "Chicken Broth",
  "Coconut Oil",
];

// Function to create ingredient checkboxes
export function createIngredientsCheckboxes(ingredients) {
  // Get the container where you want to add the checkboxes
  const container = document.querySelector(".pantryIngredients");

  // Loop through the ingredients
  ingredients.forEach((ingredient) => {
    // Create a new label
    const label = document.createElement("label");

    // Create a new checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "ingredient";
    checkbox.value = ingredient;
    checkbox.checked = true;

    // Add the checkbox and the ingredient name to the label
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + ingredient));

    // Add the label to the container
    container.appendChild(label);
  });
}

// Handles adding a custom ingredient
export function addIngredientHandler() {
  const customIngredient = document
    .getElementById("customIngredient")
    .value.trim();
  if (customIngredient) {
    appendIngredientLabel(customIngredient);
    document.getElementById("customIngredient").value = ""; // Clear the input field directly here
  }
}

// Appends the ingredient label to the container
export function appendIngredientLabel(customIngredient) {
  const container = document.getElementById("customIngredientContainer");
  const label = document.createElement("label");
  label.textContent = customIngredient;
  container.appendChild(label);
}

```
[fetchRefinedRecipe.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchRefinedRecipe.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchRefinedRecipe.js
```
// This file contains the function to fetch a refined recipe from OpenAI's GPT-3 API
// It also contains the event handler for refining a recipe
// It is assumed that the `displayRecipe` function is available
import { displayRecipe } from "./displayRecipe.js";
import { showLoadingAnimation, hideLoadingAnimation } from "./animation.js";

// This function is similar to `fetchRecipeDirectly` but tailored for refining recipes
export async function fetchRefinedRecipe(refinementPrompt) {
  showLoadingAnimation(); // Show loading animation at the start of the fetch
  // Assuming the same API endpoint and headers
  const apiKeyResponse = await fetch("./apikey.txt");
  const OPENAI_API_KEY = await apiKeyResponse.text();
  const payload = {
    model: "gpt-4o", // Adjust based on available models
    temperature: 0.5,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful chef and you respond to the user in JSON format with the following fields - recipe_title: <text>, recipe: <text made up of steps with html formatting>, ingredients: list , time_minutes: integer, cuisine: <cuisine>.",
      },
      {
        role: "user",
        content: refinementPrompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const firstChoice = data.choices[0];
    const recipeDetails = JSON.parse(firstChoice.message.content);

    // Display the refined recipe
    displayRecipe({
      title: recipeDetails.recipe_title,
      ingredients: recipeDetails.ingredients,
      recipe: recipeDetails.recipe,
    });
  } catch (error) {
    console.error("There was an error:", error);
  } finally {
    hideLoadingAnimation(); // Hide loading animation regardless of success/failure
    document.getElementById("recipeResult").classList.remove("hidden");
  }
}

```
[fetchAndDisplayRecipeImage.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchAndDisplayRecipeImage.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/fetchAndDisplayRecipeImage.js
```
// This file contains the functions to fetch a recipe image based on the recipe title and to display it on the page

// This function fetches and display a recipe image based on the recipe title
import { showLoadingAnimation, hideLoadingAnimation } from './animation.js';

export async function fetchAndDisplayRecipeImage(title) {
    showLoadingAnimation(); // Show loading animation at the start of the fetch
    const apiKeyResponse = await fetch('./apikey.txt');
    const OPENAI_API_KEY = await apiKeyResponse.text();
    const payload = {
      model: "dall-e-3",
      prompt: title,
      n: 1,
      size: "1024x1024",
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })
      const image = await response.json();
      if (image && image.data && image.data.length > 0) {
          const imageUrl = image.data[0].url; // Assuming the API returns a 'url' field
          displayRecipeImage(imageUrl);
      }
      } catch (error) {
          console.error("There was an error:", error);
      } finally {
        hideLoadingAnimation(); // Hide loading animation regardless of success/failure
        document.getElementById('recipeImage').classList.remove('hidden');
      }
  }
  // This function displays the recipe image on the page
  function displayRecipeImage(imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Generated Recipe Image";
    img.style.width = "100%"; // Ensure the image fits within the container
    const recipeImageDiv = document.getElementById("recipeImage");
    recipeImageDiv.innerHTML = ""; // Clear previous content
    recipeImageDiv.appendChild(img);
  }
```
[animation.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/animation.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/animation.js
```
// animations.js
function showLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-animation';
    loadingDiv.classList.add('loading');
    document.getElementById('spinner-container').appendChild(loadingDiv); 
    console.log('spinner added')

    document.getElementById('recipeResult').classList.add('hidden');
    document.getElementById('recipeImage').classList.add('hidden');
  }
  
  function hideLoadingAnimation() {
    const loadingDiv = document.getElementById('loading-animation');
    if (loadingDiv && loadingDiv.parentNode) { // Check if it exists and has a parent
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
  }
  
  export { showLoadingAnimation, hideLoadingAnimation }; 
```
[cuisines.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/cuisines.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/genai-recipeapp/javascript/cuisines.js
```
// This file contains the list of cuisines and a function to populate the select element with the cuisines

// List of cuisines - you can add more cuisines if you want
export const cuisines = [
    "Italian", "Chinese", "Indian", "Mexican", "French", "Thai", "Japanese", "Greek", "Fusion"
];

// Function to populate the select element with the cuisines
export function populateCuisines(cuisines) {
    // Get the select element where you want to add the options
    const select = document.querySelector('#cuisine');

    // Loop through the cuisines
    cuisines.forEach(cuisine => {
        // Create a new option
        const option = document.createElement('option');
        option.value = cuisine;
        option.text = cuisine;

        // Add the option to the select
        select.appendChild(option);
    });
}
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz

[prompt_gen.py](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/prompt_gen.py)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/prompt_gen.py
```
import os
import re

# Configuration
EXCLUDE_PATTERNS = [
    r"\.pyc$",  # Exclude Python bytecode files
    r"__pycache__",  # Exclude Python cache directories 
    r"\.git",  # Exclude Git directory
    r"\.txt$",  # Exclude text files
    "gen_prompt.py",  # Replace with the name of this script
    "README.md",
    "./apikey.txt"
]

# Function to generate a Markdown link for a file
def create_markdown_link(filepath, filename):
    relative_path = filepath.replace("\\", "/")  # Normalize path separators
    return f"[{filename}]({relative_path})"

# Function to process a single file
def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()
        if "api" in filepath: 
            return ''
    return f"### {filepath}\n`\n{content}\n`\n"

# Main function
def generate_markdown():
    markdown_content = "# Project Sitemap\n\n"

    for root, dirs, files in os.walk("."):
        # Skip excluded directories and files
        dirs[:] = [d for d in dirs if not any(re.match(p, d) for p in EXCLUDE_PATTERNS)]
        files[:] = [f for f in files if not any(re.match(p, f) for p in EXCLUDE_PATTERNS)]

        if files:
            markdown_content += f"## {root}\n\n"
            for filename in files:
                filepath = os.path.join(root, filename)
                markdown_content += create_markdown_link(filepath, filename) + "\n"
                markdown_content += process_file(filepath)
    #Check if the file exists
    if os.path.exists("code_documentation.md"):
        os.remove("code_documentation.md")

    with open("code_documentation.md", "w") as f:
        f.write(markdown_content)

if __name__ == "__main__":
    generate_markdown()

```
[style.css](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/style.css)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/style.css
```
:root {
    --primary-color: #007bff;
    --secondary-color: #0056b3;
    --background-color: #f9f9f9;
    --text-color: #333;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: var(--background-color);
    color: var(--text-color);
}

#appContainer {
    width: 80%;
    max-width: 600px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#questionContainer {
    margin-bottom: 20px;
}

.question {
    margin: 10px 0;
}

#nextBtn {
    display: none;
    padding: 10px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#nextBtn:hover {
    background-color: var(--secondary-color);
}

.optionInput {
    margin-right: 10px;
}

.optionLabel {
    cursor: pointer;
}

#feedback {
    margin-top: 10px;
    font-weight: bold;
}

#startBtn, #startCustomBtn {
    margin-bottom: 10px;
    padding: 10px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#startBtn:hover, #startCustomBtn:hover {
    background-color: var(--secondary-color);
}

#customQuiz {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
```
[apiKey.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/apiKey.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/apiKey.js
```
const getApiKeyFromFile = async () => {
  try {
      const response = await fetch('apikey.txt');
      if (response.ok) {
          const apiKey = await response.text();
          return apiKey.trim();
      }
  } catch (error) {
      console.error('Error reading apikey.txt:', error);
  }
  return null;
};

const getApiKeyFromStorage = () => {
  return localStorage.getItem('apiKey');
};

const setApiKeyInStorage = (apiKey) => {
  localStorage.setItem('apiKey', apiKey);
};

const promptForApiKey = () => {
  return new Promise((resolve) => {
      const apiKey = prompt("Please enter your API key:");
      if (apiKey) {
          setApiKeyInStorage(apiKey);
      }
      resolve(apiKey);
  });
};

export const getApiKey = async () => {
  let apiKey = await getApiKeyFromFile();
  
  if (!apiKey) {
      apiKey = getApiKeyFromStorage();
  }
  
  if (!apiKey) {
      apiKey = await promptForApiKey();
  }
  
  return apiKey;
};

export const isValidApiKey = (apiKey) => {
  // Implement your validation logic here
  return typeof apiKey === 'string' && apiKey.length > 0;
};
```
[main.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/main.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/main.js
```
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
```
[questions.json](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/questions.json)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/questions.json
```
[
{
    "questions_no": 10,
    "question_type": "mcq",
    "questions": [
      {
        "question_content": "What is the first step in creating a budget?",
        "options": [
          "Estimating monthly expenses",
          "Tracking past spending",
          "Setting financial goals",
          "Choosing a budgeting app"
        ],
        "answer": "Setting financial goals",
        "comment": "Setting financial goals is crucial as it provides a target for your budgeting efforts. Knowing what you're saving for—whether it's retirement, a vacation, or an emergency fund—helps guide how you allocate your resources."
      },
      {
        "question_content": "Which of the following is a benefit of using a budget?",
        "options": [
          "It eliminates the need to save",
          "It increases your expenses",
          "It helps manage your money",
          "It complicates financial decisions"
        ],
        "answer": "It helps manage your money",
        "comment": "A budget is a tool for managing your money more effectively. It helps you keep track of how much money you have, where it goes, and how much you need to save for future expenses."
      },
      {
        "question_content": "What percentage of your income is recommended to save according to the 50/30/20 budgeting rule?",
        "options": [
          "20%",
          "30%",
          "50%",
          "60%"
        ],
        "answer": "20%",
        "comment": "According to the 50/30/20 rule, it's recommended to save 20% of your income. This rule suggests allocating 50% of your income to necessities, 30% to wants, and 20% to savings."
      },
      {
        "question_content": "Which type of expense should be prioritized in your budget?",
        "options": [ 
          "Entertainment",
          "Dining out",
          "Essentials like rent and groceries",
          "Vacations"
        ],
        "answer": "Essentials like rent and groceries",
        "comment": "Prioritizing essential expenses ensures that your basic needs, such as housing and food, are covered before spending on non-essential items."
      },
      {
        "question_content": "What is a flexible expense?",
        "options": [
          "Mortgage or rent payments",
          "Grocery shopping",
          "Insurance premiums",
          "Dining out"
        ],
        "answer": "Dining out",
        "comment": "Flexible expenses, like dining out, vary from month to month and can be adjusted based on your financial situation. Unlike fixed expenses, they are not mandatory and can be minimized to save money."
      },
      {
        "question_content": "How can you track your spending effectively?",
        "options": [
          "Checking your bank balance once a month",
          "Using only cash for all purchases",
          "Keeping a written or digital record of every purchase",
          "Estimating expenses at the end of the month"
        ],
        "answer": "Keeping a written or digital record of every purchase",
        "comment": "Tracking every purchase helps you understand where your money goes and identifies areas where you can cut back. It's essential for sticking to a budget and achieving financial goals."
      },
      {
        "question_content": "Why is it important to have a category for savings in your budget?",
        "options": [
          "To prepare for unexpected expenses",
          "To ensure you can afford luxury items",
          "To make budgeting more complex",
          "To impress others with your financial savvy"
        ],
        "answer": "To prepare for unexpected expenses",
        "comment": "Having a savings category helps you build an emergency fund to cover unexpected expenses, reducing the need for debt and providing financial security."
      },
      {
        "question_content": "What should you do if your expenses exceed your income?",
        "options": [
          "Ignore the problem and continue spending",
          "Borrow money to cover the difference",
          "Adjust your budget to reduce unnecessary expenses",
          "Increase your income by taking on more debt"
        ],
        "answer": "Adjust your budget to reduce unnecessary expenses",
        "comment": "If your expenses exceed your income, it's important to adjust your budget by reducing unnecessary expenses. This may involve cutting back on discretionary spending to balance your budget."
      },
      {
        "question_content": "Which app feature is most useful for budgeting?",
        "options": [
          "Social media integration",
          "Real-time spending alerts",
          "Game-like challenges",
          "Celebrity endorsements"
        ],
        "answer": "Real-time spending alerts",
        "comment": "Real-time spending alerts can help you stay on top of your budget by notifying you when you're about to exceed your limits, encouraging mindful spending."
      },
      {
        "question_content": "Why might it be helpful to review and adjust your budget regularly?",
        "options": [
          "Your financial situation and goals never change",
          "It's a requirement by financial institutions",
          "To ensure it reflects changes in income and expenses",
          "To make it more complicated over time"
        ],
        "answer": "To ensure it reflects changes in income and expenses",
        "comment": "Regular reviews and adjustments to your budget are necessary because your financial situation and goals can change over time. This ensures your budget remains effective and aligned with your current needs."
      }
    ]
  }
]
```
[index.html](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/index.html)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Powered Quiz Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="appContainer">
        <div id="startContainer">
            <h1>AI-Powered Quiz Generator</h1>
            <button id="startBtn">Start Financial Literacy Quiz</button>
            <button id="startCustomBtn">Start Custom Quiz</button>
            <input type="text" id="customQuiz" placeholder="Enter prompt for your custom quiz">
        </div>
        <div id="quizContainer">
            <h1 id="quizTitle">Financial Literacy Quiz</h1>
            <div id="questionContainer"></div>
            <button id="nextBtn">Next</button>
            <div id="result"></div>
        </div>
        <div id="feedbackContainer"></div>
    </div>
    <script type="module" src="main.js"></script>
</body>
</html>
```
[api.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/api.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/api.js
```
import { getApiKey, isValidApiKey } from './apiKey.js';

const createPrompt = (data, numQuestions) => {
    return `Given this text: ${data}, create a quiz in the following JSON format:
  
    {
    "title": "Quiz Title",
    "questions_no": ${numQuestions},
    "question_type": "mcq",
    "questions": [
        {
        "question_content": "Question 1 goes here",
        "options": [ 
            "Option A",
            "Option B", 
            "Option C", 
            "Option D" 
        ],
        "answer": "Correct answer",
        "comment": "Explanation for the correct answer (optional)" 
        },
        // ... More questions (structure repeated)
    ]
    }
    `;
};

const createPayload = (systemPrompt, userPrompt) => {
    return {
        model: "gpt-4o",
        temperature: 0.5,
        max_tokens: 4096,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        response_format: {
            type: "json_object",
        },
    };
};

export const fetchQuiz = async (quizData, numQuestions = 10) => {
    try {
        const apiKey = await getApiKey();
        if (!apiKey || !isValidApiKey(apiKey)) {
            throw new Error('Invalid or missing API key');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const userPrompt = createPrompt(quizData, numQuestions);
        const systemPrompt = "You are a helpful study assistant. Respond in JSON format with a quiz based on the supplied information. Follow the provided JSON structure for your response.";
        const payload = createPayload(systemPrompt, userPrompt);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const quizDetails = JSON.parse(data.choices[0].message.content);
        return quizDetails;
    } catch (error) {
        console.error('There was an error:', error);
        throw error;
    }
};
```
[state.js](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/state.js)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/state.js
```
export const createState = (initialState) => {
    let state = initialState;

    const getState = () => state;

    const setState = (newState) => {
        state = { ...state, ...newState };
        updateUI();
    };

    return { getState, setState };
};

export const appState = createState({
    quiz: null,
    currentQuestionIndex: 0,
    score: 0,
});

// Constants
export const MAX_QUESTIONS = 10;
export const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// This function should be implemented in main.js
function updateUI() {
    // This will be called after every state change
    // Implement the UI update logic in main.js
}
```
## /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/.vscode

[settings.json](/home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/.vscode/settings.json)
### /home/slowturing/Dropbox/CODE_PROJECTS/AI_POC/ai-quiz/.vscode/settings.json
```
{
    "liveServer.settings.port": 5501
}
```
