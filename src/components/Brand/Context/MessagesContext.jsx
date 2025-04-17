import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const addMessage = (chatId, message) => {
    setChats(prevChats => {
      const existingChat = prevChats.find(chat => chat.id === chatId);
      
      if (existingChat) {
        // Update existing chat
        return prevChats.map(chat => 
          chat.id === chatId 
            ? { ...chat, lastMessage: message.text, unread: true }
            : chat
        );
      } else {
        // Create new chat
        return [...prevChats, {
          id: chatId,
          influencer: message.influencerName,
          platform: message.platform || 'Instagram',
          campaign: message.campaignTitle,
          lastMessage: message.text,
          unread: true,
          archived: false,
          attachments: message.attachments || [],
          updatedAt: new Date().toISOString()
        }];
      }
    });
  };

  return (
    <MessageContext.Provider value={{ chats, setChats, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);