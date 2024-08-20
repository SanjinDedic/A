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