// This file contains the list of cuisines and a function to populate the select element with the cuisines

// List of cuisines - you can add more cuisines if you want
export const cuisines = [
    "Italian", "Chinese", "Indian", "Mexican", "French", "Thai", "Japanese", "Greek", "Fusion"
];

// Function to populate the select element with the cuisines
export function populateCuisines(cuisines) {
    // Get the select element where you want to add the options
    const select = document.querySelector('#cuisine');

    // Loop through the cuisines
    cuisines.forEach(cuisine => {
        // Create a new option
        const option = document.createElement('option');
        option.value = cuisine;
        option.text = cuisine;

        // Add the option to the select
        select.appendChild(option);
    });
}