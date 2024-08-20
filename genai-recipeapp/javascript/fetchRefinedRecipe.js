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
