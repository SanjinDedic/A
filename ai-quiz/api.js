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