const getApiKeyFromFile = async () => {
  try {
      const response = await fetch('apikey.txt');
      if (response.ok) {
          const apiKey = await response.text();
          return apiKey.trim();
      }
  } catch (error) {
      console.error('Error reading apikey.txt:', error);
  }
  return null;
};

const getApiKeyFromStorage = () => {
  return localStorage.getItem('apiKey');
};

const setApiKeyInStorage = (apiKey) => {
  localStorage.setItem('apiKey', apiKey);
};

const promptForApiKey = () => {
  return new Promise((resolve) => {
      const apiKey = prompt("Please enter your API key:");
      if (apiKey) {
          setApiKeyInStorage(apiKey);
      }
      resolve(apiKey);
  });
};

export const getApiKey = async () => {
  let apiKey = await getApiKeyFromFile();
  
  if (!apiKey) {
      apiKey = getApiKeyFromStorage();
  }
  
  if (!apiKey) {
      apiKey = await promptForApiKey();
  }
  
  return apiKey;
};

export const isValidApiKey = (apiKey) => {
  // Implement your validation logic here
  return typeof apiKey === 'string' && apiKey.length > 0;
};