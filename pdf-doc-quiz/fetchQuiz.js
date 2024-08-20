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