import React, { useState } from 'react';
import Navbar from './comp/Navbar';
import './Support.css';

const Support = () => {

    const defaultUser = {
        fullName: "",
        profilePicture: "https://avatar.iran.liara.run/public"
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const [messages, setMessages] = useState([
    { text: "Hello! I'm your automated support agent. How can I help you today?", isBot: true }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: userInput, isBot: false }];
    setMessages(newMessages);

    // Simulate bot response
    setTimeout(() => {
      setMessages([...newMessages, {
        text: "Thanks for your message. Our automated agent is processing your query. We'll get back to you shortly.",
        isBot: true
      }]);
    }, 1000);

    setUserInput('');
  };

  return (
    <div className="support-container">
        <Navbar
                user={defaultUser}
                onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              {message.isBot && <div className="bot-avatar">🤖</div>}
              <div className="message-content">{message.text}</div>
            </div>
          ))}
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Support;
