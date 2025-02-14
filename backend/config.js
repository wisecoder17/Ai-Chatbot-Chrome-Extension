//change ../pkg.json npm start function
// port number
const CONFIG = {
  development: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/',
  },
  production: {
    API_BASE_URL: process.env.API_BASE_URL 
  },
};

const ENV = process.env.NODE_ENV || 'development';  // Set default to 'development'

export const API_BASE_URL = CONFIG[ENV].API_BASE_URL;
