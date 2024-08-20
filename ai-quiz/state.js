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