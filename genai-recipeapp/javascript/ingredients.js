// This file contains the list of ingredients and functions to create ingredient checkboxes and handle adding a custom ingredient

// Define your list of ingredients
export const ingredients = [
  "Flour",
  "Salt",
  "Pepper",
  "Olive Oil",
  "Sugar",
  "Eggs",
  "Milk",
  "Butter",
  "Vanilla Extract",
  "Baking Soda",
  "Baking Powder",
  "Cocoa Powder",
  "Yeast",
  "Water",
  "Honey",
  "Garlic",
  "Rice",
  "Pasta",
  "Canned Tomatoes",
  "Canned Beans",
  "Canned Tuna",
  "Soy Sauce",
  "Vinegar",
  "Chicken Broth",
  "Coconut Oil",
];

// Function to create ingredient checkboxes
export function createIngredientsCheckboxes(ingredients) {
  // Get the container where you want to add the checkboxes
  const container = document.querySelector(".pantryIngredients");

  // Loop through the ingredients
  ingredients.forEach((ingredient) => {
    // Create a new label
    const label = document.createElement("label");

    // Create a new checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "ingredient";
    checkbox.value = ingredient;
    checkbox.checked = true;

    // Add the checkbox and the ingredient name to the label
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + ingredient));

    // Add the label to the container
    container.appendChild(label);
  });
}

// Handles adding a custom ingredient
export function addIngredientHandler() {
  const customIngredient = document
    .getElementById("customIngredient")
    .value.trim();
  if (customIngredient) {
    appendIngredientLabel(customIngredient);
    document.getElementById("customIngredient").value = ""; // Clear the input field directly here
  }
}

// Appends the ingredient label to the container
export function appendIngredientLabel(customIngredient) {
  const container = document.getElementById("customIngredientContainer");
  const label = document.createElement("label");
  label.textContent = customIngredient;
  container.appendChild(label);
}
