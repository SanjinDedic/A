// animations.js
function showLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-animation';
    loadingDiv.classList.add('loading');
    document.getElementById('spinner-container').appendChild(loadingDiv); 
    console.log('spinner added')

    document.getElementById('recipeResult').classList.add('hidden');
    document.getElementById('recipeImage').classList.add('hidden');
  }
  
  function hideLoadingAnimation() {
    const loadingDiv = document.getElementById('loading-animation');
    if (loadingDiv && loadingDiv.parentNode) { // Check if it exists and has a parent
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
  }
  
  export { showLoadingAnimation, hideLoadingAnimation }; 