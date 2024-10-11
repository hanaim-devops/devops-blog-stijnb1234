#!/bin/bash

# Start the backend server in the background and capture its PID
echo "Starting the backend server..."
cd py-flask-backend

# Check if penv is created and has the required dependencies, otherwise create it
if [ ! -d "venv" ]; then
    echo "Creating a virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Check if user installed flask cli (apt install python3-flask), otherwise install it
if ! command -v flask &> /dev/null
then
    echo "Installing Flask..."
    sudo apt install python3-flask
fi

flask run &  # Run Flask in the background
BACKEND_PID=$!  # Store the backend process ID

# Start the frontend server in the background and capture its PID
echo "Starting the frontend server..."
cd ../react-frontend

# Check if the user has installed the required dependencies, otherwise install them
if [ ! -d "node_modules" ]; then
    echo "Installing the required dependencies..."
    npm install
fi

npm start &  # Run npm start in the background
FRONTEND_PID=$!  # Store the frontend process ID

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID

# Force kill the processes after the user presses Ctrl+C
trap 'kill $BACKEND_PID; kill $FRONTEND_PID' SIGINT