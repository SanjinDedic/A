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