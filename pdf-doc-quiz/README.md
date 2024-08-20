# AI Study Quiz Generator

The AI Study Quiz Generator is a web application that allows users to generate multiple-choice quizzes based on the content of PDF files. It leverages the power of artificial intelligence to create relevant and engaging quizzes to aid in study and revision.

## Features

- Upload PDF files and extract text content
- Navigate through PDF pages
- Generate quizzes with a specified number of questions
- Multiple-choice questions with options and answers
- Feedback on correct and incorrect answers
- Explanations for correct answers (if provided)
- Score tracking and display of final results

## Technologies Used

- HTML, CSS, and JavaScript for the frontend
- PDF.js library for rendering and extracting text from PDF files
- OpenAI API for generating quizzes using the extracted text

## Setup and Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Obtain an API key from OpenAI and create an `apikey.txt` file in the project root directory. Paste your API key into this file.

4. Open the `index.html` file in a web browser.

## Usage

1. Click on the "Choose File" button to select a PDF file from your local machine.

2. Click on the "Load PDF" button to load the selected PDF file.

3. Use the "Previous Page" and "Next Page" buttons to navigate through the pages of the loaded PDF.

4. Adjust the slider to set the desired number of questions for the quiz.

5. Click on the "Generate Quiz" button to generate a quiz based on the content of the loaded PDF.

6. The generated quiz will be displayed with the quiz title and multiple-choice questions.

7. Select an answer for each question and click the "Next" button to proceed to the next question.

8. After answering all the questions, the final score will be displayed.

## File Structure

- `index.html`: The main HTML file that serves as the entry point of the application.
- `style.css`: The CSS file that contains the styles for the application.
- `main.js`: The main JavaScript file that handles the application logic.
- `fetchQuiz.js`: The JavaScript file responsible for fetching the quiz from the OpenAI API.
- `quiz.js`: The JavaScript file that handles the quiz display and user interactions.
- `apikey.txt`: The file where you should paste your OpenAI API key.


## Acknowledgements

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering and text extraction library.
- [OpenAI](https://openai.com/) - Artificial intelligence platform for generating quizzes.