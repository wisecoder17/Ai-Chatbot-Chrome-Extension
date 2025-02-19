For Root nodemon.json
{
    "watch": ["backend"],                 # Watch the backend folder for changes
    "ext": "js,json",                      # Monitor JavaScript and JSON files for changes
    "exec": "node backend/server.js",     # Command to run the backend (entry point file)
    "ignore": ["backend/node_modules"],    # Ignore changes in the backend's node_modules folder
    "env": {
      "NODE_ENV": "development"            # Set the environment to development
    },
    "legacyWatch": true                    # This option is useful for some environments (especially on Windows)
  }
  