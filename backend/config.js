//change ../pkg.json npm start function
// port number
const config = {
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000/',
  },
  development: {
    API_BASE_URL: process.env.BASE_URL || 'http://localhost:3000/',
  },
  production: {
    BASE_URL: process.env.BASE_URL 
  },
};

const ENV = process.env.NODE_ENV || 'development';  // Set default to 'development'

export default config;
