import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { H } from 'highlight.run';
import { ErrorBoundary } from '@highlight-run/react';  // Import H and ErrorBoundary from Highlight.io

// Initialize Highlight.io
H.init('0dq8zjqd', {
    serviceName: "fullstack",
    version: "1.0.0",
    environment: "development",
    tracingOrigins: ['localhost'],
    networkRecording: {
        enabled: true,
        recordHeadersAndBody: true,
    },
});

// Login function to authenticate users
function Login(username, password) {
    // Simulated login logic - Replace this with your actual authentication logic
    const isAuthenticated = simulateLogin(username, password);

    if (isAuthenticated) {
        // Simulate getting user details from your auth provider after successful login
        const userDetails = {
            email: username,
            id: 'very-secure-id', // Replace with actual user ID from your auth provider
            phone: '867-5309', // Replace with actual phone number from your auth provider
            bestFriend: 'jenny', // Replace with actual information as needed
        };

        // Identify the user in Highlight.io
        H.identify(userDetails.email, {
            id: userDetails.id,
            phone: userDetails.phone,
            bestFriend: userDetails.bestFriend,
        });

        console.log('User identified:', userDetails);
    } else {
        console.error('Login failed: Invalid credentials');
    }
}

// Simulated login function (replace with actual API call)
function simulateLogin(username, password) {
    // Placeholder logic for user authentication
    return username === 'validUser' && password === 'validPassword';
}

function App() {
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password

    useEffect(() => {
        // Fetch the message from the Flask API
        fetch('http://localhost:5000/')
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => {
                console.error('Error fetching message:', error);
                H.consumeError(error);  // Log error to Highlight.io
            });

        // Fetch the message from the Flask API
        fetch('http://localhost:5000/hello')
            .then((response) => response.json())
            .then((data) => setMessage2(data.message))
            .catch((error) => {
                console.error('Error fetching message:', error);
                H.consumeError(error);  // Log error to Highlight.io
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        Login(username, password); // Call the Login function
    };

    return (
        <div className="App">
            <h1>/ endpoint:</h1>
            <p>{message}</p>
            <h1>/hello endpoint:</h1>
            <p>{message2}</p>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// Use createRoot to render your app
const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

export default App;
