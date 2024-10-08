#!/bin/bash

# Start the backend server in the background and capture its PID
echo "Starting the backend server..."
cd py-flask-backend
flask run &  # Run Flask in the background
BACKEND_PID=$!  # Store the backend process ID

# Start the frontend server in the background and capture its PID
echo "Starting the frontend server..."
cd ../react-frontend
npm start &  # Run npm start in the background
FRONTEND_PID=$!  # Store the frontend process ID

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID