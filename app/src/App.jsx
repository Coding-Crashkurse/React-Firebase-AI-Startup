// App.js
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Chat from "./Chat";
import "./App.css";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleRegistration = () => {
    setShowLoginForm(true);
  };

  const handleLogin = (user, userData) => {
    setUser(user);
    setUserData(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(null);
  };

  return (
    <div className="App">
      <h1>AI Training</h1>
      {user ? (
        <>
          <p>Welcome, {userData.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          <Chat userData={userData}></Chat>
        </>
      ) : (
        <>
          <button
            className="toggleLogin"
            onClick={() => setShowLoginForm(!showLoginForm)}
          >
            {showLoginForm ? "Register" : "Login"}
          </button>
          {showLoginForm ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegistrationForm onRegistration={handleRegistration} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
