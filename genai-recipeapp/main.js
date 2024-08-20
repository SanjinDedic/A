import {
  ingredients,
  createIngredientsCheckboxes,
  addIngredientHandler,
} from "./javascript/ingredients.js";
import { cuisines, populateCuisines } from "./javascript/cuisines.js";
import { fetchRecipeDirectly } from "./javascript/fetchRecipeDirectly.js";
import { fetchRefinedRecipe } from "./javascript/fetchRefinedRecipe.js";
import { showLoadingAnimation, hideLoadingAnimation } from './javascript/animation.js';

createIngredientsCheckboxes(ingredients);
populateCuisines(cuisines);

// Event listeners setup
document
  .getElementById("addIngredient")
  .addEventListener("click", addIngredientHandler);
document
  .getElementById("requestRecipesDirect")
  .addEventListener("click", requestRecipesHandler);
document
  .getElementById("timeAvailable")
  .addEventListener("input", updateTimeValueDisplay);
document
  .getElementById("refineRecipeButton")
  .addEventListener("click", refineRecipeHandler);

// Handles the request for recipes
function requestRecipesHandler() {
  const data = collectFormData();
  fetchRecipeDirectly(data);
}

// Collects form data for the recipe request, including ingredients
function collectFormData() {
  const ingredients = collectIngredients();
  return {
    ingredients: ingredients,
    timeAvailable: document.getElementById("timeAvailable").value,
    cuisine: document.getElementById("cuisine").value,
  };
}

// Collects both checked and custom ingredients
function collectIngredients() {
  const checkedIngredients = Array.from(
    document.querySelectorAll('input[name="ingredient"]:checked')
  ).map((checkbox) => checkbox.value);
  const customIngredients = Array.from(
    document.querySelectorAll("#customIngredientContainer label")
  ).map((label) => label.textContent.trim());
  return checkedIngredients.concat(customIngredients);
}

// Updates the display of the selected time value
function updateTimeValueDisplay() {
  document.getElementById("timeValue").textContent = this.value;
}

function refineRecipeHandler() {
  const refineText = document.getElementById("refineText").value.trim();
  if (!refineText) {
    alert("Please enter some text to refine the recipe.");
    return;
  }

  const originalRecipeTitle =
    document.getElementById("recipeTitle").textContent;
  const originalRecipeInstructions =
    document.getElementById("recipeInstructions").innerHTML;
  const originalIngredients = collectIngredients().join(", ");

  // The refinement prompt now includes the entire recipe followed by the modification request
  const refinementPrompt = `Given the original recipe titled "${originalRecipeTitle}" with ingredients: ${originalIngredients} and instructions: ${originalRecipeInstructions}, please modify the recipe based on the following request: "${refineText}".`;

  // Assuming you have a function similar to `fetchRecipeDirectly` that can handle this new prompt
  fetchRefinedRecipe(refinementPrompt);
}
