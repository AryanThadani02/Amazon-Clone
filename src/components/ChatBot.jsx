/* eslint-disable no-unused-vars */
import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./ChatbotConfig";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import 'react-chatbot-kit/build/main.css';

const ChatBotComponent = () => {
  const chatbotStyle = {
    maxWidth: "100%",
    width: "300px", // Adjust width for small screens
    margin: "0 auto",
  };

  return (
    <div style={chatbotStyle} >
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatBotComponent;
