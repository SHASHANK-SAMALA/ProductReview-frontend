// Configuration for the application
const config = {
  // Backend URL - Update this with your deployed backend URL
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://productreview-backend-ky26.onrender.com',

  
  // App settings
  APP_NAME: 'Product Review Sentiment Analyzer',
  VERSION: '1.0.0'
};

// Log configuration for debugging
console.log('🔧 Frontend Configuration:', {
  BACKEND_URL: config.BACKEND_URL,
  ENVIRONMENT: import.meta.env.MODE,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL
});

export default config; 