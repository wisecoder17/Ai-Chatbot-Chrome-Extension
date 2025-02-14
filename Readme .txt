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
  }
}