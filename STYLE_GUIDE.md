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