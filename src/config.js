// src/config.js

const config = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://productreview-backend-ky26.onrender.com',
  APP_NAME: 'Product Review Sentiment Analyzer',
  VERSION: '1.0.0'
};

console.log('🔧 Frontend Configuration:', {
  BACKEND_URL: config.BACKEND_URL,
  ENVIRONMENT: import.meta.env.MODE,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL
});

export default config;
