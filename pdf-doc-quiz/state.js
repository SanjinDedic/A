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