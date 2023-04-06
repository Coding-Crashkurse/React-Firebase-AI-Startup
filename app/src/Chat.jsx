import React, { useState } from "react";

const Chat = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUserMessage = { role: "user", content: inputMessage };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setIsFetchingResponse(true);

    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInfo: {
          level: userData.level,
          username: userData.username,
          interests: userData.interests,
          age: userData.age,
        },
        messages: [...messages, newUserMessage],
      }),
    });

    const data = await response.json();

    setIsFetchingResponse(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: data.aiMessage },
    ]);

    setInputMessage("");
  };

  return (
    <div>
      <h2>Chat for {userData.username}</h2>

      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.role === "assistant" ? "left  " : "right",
            }}
          >
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}

        {isFetchingResponse && (
          <div>
            <strong>assistant:</strong> ...waiting
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
