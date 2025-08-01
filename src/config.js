// Configuration for the application
const config = {
  // Backend URL - Update this with your deployed backend URL
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000',
  
  // App settings
  APP_NAME: 'Product Review Sentiment Analyzer',
  VERSION: '1.0.0'
};

export default config; 