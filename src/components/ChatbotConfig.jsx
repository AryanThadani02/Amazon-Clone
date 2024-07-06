/* eslint-disable react-refresh/only-export-components */
// chatbotConfig.js
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  initialMessages: [createChatBotMessage("Hi! How can I help you?")],
  botName: "ChatBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
};

export default config;
export { ActionProvider, MessageParser };
