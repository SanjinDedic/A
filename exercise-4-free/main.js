// Attach event listeners after loading the DOM
document.addEventListener("DOMContentLoaded", () => {
    // Your event listener setup
    document.getElementById('addItem').addEventListener('click', addIngredientHandler);
    document.getElementById('requestWorkouts').addEventListener('click', requestWorkoutsHandler); 
    document.getElementById('timeAvailable').addEventListener('input', updateTimeValueDisplay); 
});


// Handles adding a custom item
function addIngredientHandler() { 
    const customItem = document.getElementById('customItem').value.trim();
    if (customItem) {
        appendIngredientLabel(customItem); 
        document.getElementById('customItem').value = ''; 
    }
}

// Appends the item label to the container 
function appendIngredientLabel(customItem) {
    const container = document.getElementById('customItemContainer');
    const label = document.createElement('label');
    label.textContent = customItem;
    container.appendChild(label);
}

// Handles request for workouts
function requestWorkoutsHandler() {
    const data = collectFormData();
    fetchWorkoutDirectly(data); 
}

// Collects data for workout request
function collectFormData() {
    const items = collectItems(); 
    return {
        items: items,
        timeAvailable: document.getElementById('timeAvailable').value,
        intensity: document.getElementById('intensity').value 
    };
}

// Collects used fitness items
function collectItems() { 
    const checkedItems = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(checkbox => checkbox.value);
    const customItems = Array.from(document.querySelectorAll('#customItemContainer label')).map(label => label.textContent.trim());
    return checkedItems.concat(customItems);
}

// Updates the display of the time value
function updateTimeValueDisplay() {
    document.getElementById('timeValue').textContent = this.value;
}

// Fetches workout using OpenAI API
async function fetchWorkoutDirectly(data) {
    console.log("Fetching workout from API");
    const apiKeyResponse = await fetch('./apikey.txt');
    const OPENAI_API_KEY = await apiKeyResponse.text();

    const systemPrompt = `You are a fitness instructor. Respond to the user in JSON format with the following fields - 
    workout_title: <text>, items_used: list of strings, workout_instructions: <text in HTML format>.`

    const promptText = `Given the available items: ${data.items.join(', ')}, time available: ${data.timeAvailable} minutes, and intensity
     level: ${data.intensity}, generate a workout routine with a title (string), items_used (list of strings) and workout_instructions (in HTML format).`;

    const payload = {
        model: "gpt-4-turbo-preview", 
        temperature: 0.5, 
        max_tokens: 500, // Adjust if needed
        messages: [{
                "role": "system",
                "content": systemPrompt
            },
            {
                "role": "user",
                "content": promptText
            }
        ],
        response_format: {
            "type": "json_object"
        }
    };

    fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const firstChoice = data.choices[0];
            const workoutDetails = JSON.parse(firstChoice.message.content); 
            displayWorkout(workoutDetails);
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
}
 
function displayWorkout(workout) {
    document.getElementById('workoutTitle').textContent = workout.workout_title;
      // 2. Create 'Items Used' section
  const itemsElement = document.getElementById('workoutItems');
  itemsElement.innerHTML = '<h3>Items Used:</h3>';
  const itemsList = document.createElement('ul');
  workout.items_used.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    itemsList.appendChild(listItem);
  });
  itemsElement.appendChild(itemsList);
    document.getElementById('workoutInstructions').innerHTML = workout.workout_instructions; 
    fetchWorkoutImage(workout.workout_title, workout.items_used.join(', '));
}


// Fetches an image (adjust if needed)
async function fetchWorkoutImage(title, itemsUsed) {
    const apiKeyResponse = await fetch('./apikey.txt');
    const OPENAI_API_KEY = await apiKeyResponse.text();
    const payload = {
        model: "dall-e-3",
        prompt: `A photrealistic image related to: ${title} featuring only one person exercising. The image must feature at 
        least one and at most 3 of the following ${itemsUsed}`, // Adjust to your liking
        n: 1,
        size: "1024x1024"
    };

    fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const imageUrl = data.data[0].url; 
                displayWorkoutImage(imageUrl);
            }
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
}

// Displays the workout image
function displayWorkoutImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Generated Workout Image";
    img.style.width = "100%"; 
    const workoutImageDiv = document.getElementById('workoutImage');
    workoutImageDiv.innerHTML = ''; 
    workoutImageDiv.appendChild(img);
}