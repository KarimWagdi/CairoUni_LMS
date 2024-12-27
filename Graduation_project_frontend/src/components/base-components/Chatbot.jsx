import React, { useState } from 'react';
import styles from './Chatbot.module.css';
import axios from 'axios';
import chatIcon from '../../assets/R.png'; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      const userInput = input;
      setInput('');
      const url = 'http://209.38.216.189:8000/api/chat/JTPQTSQAAAAJ';
      const headers = {
        'Content-Type': 'application/json'
      };
      const data = {
        question: userInput
      };
      
      try {
        const response = await axios.post(url, data, { headers });

        console.log("res",response)
        if (response.status === 200) {
          const botMessage = response.data.answer;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botMessage, sender: "bot" },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },
        ]);
      }
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatIcon} onClick={toggleChat}>
        <img src={chatIcon} alt="Chat Icon" />
      </div>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chat</h3>
            <button onClick={toggleChat} className={styles.closeButton}>×</button>
          </div>
          <div className={styles.chatBody}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.chatMessage} ${msg.sender === "bot" ? styles.bot : ""}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Type a message..."
              className={styles.chatInput}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;