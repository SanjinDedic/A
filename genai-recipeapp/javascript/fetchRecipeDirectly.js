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
