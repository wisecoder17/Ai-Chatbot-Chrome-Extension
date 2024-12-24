For Root package.json

{
  "name": "ai-copilot-extension",
  "version": "1.0.0",
  "description": "AI Copilot Extension with backend support for prompts and responses",
  "main": "index.js",
  "scripts": {
    "start": "node backend/server.js",  // Start the backend server
    "dev": "nodemon backend/server.js", // Start the backend server with automatic restart
    "install-backend": "cd backend && npm install",  // Install backend dependencies
    "install-all": "npm install && npm run install-backend"  // Install dependencies for both backend and root level
  },
  "dependencies": {},
  "devDependencies": {
    "nodemon": "^2.0.22", // Tool for automatic server restarts during development
    "eslint": "^8.15.0",   // Optionally for linting the code to ensure code quality
    "webpack": "^5.0.0",    // Optionally for bundling if you plan to use it
    "webpack-cli": "^4.0.0" // Optionally for Webpack CLI tools
  },
  "engines": {
    "node": ">=16.0.0" // Specify the Node.js version compatibility
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/ai-copilot-extension.git"
  },
  "keywords": [
    "ai",
    "chrome-extension",
    "backend",
    "prompts",
    "node"
  ],
  "author": "Richard Ogunwole",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/yourusername/ai-copilot-extension/issues"
  },
  "homepage": "https://github.com/yourusername/ai-copilot-extension#readme"
}
