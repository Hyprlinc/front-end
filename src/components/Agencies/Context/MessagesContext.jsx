import React, { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

// Changed from MessagesProvider to AgenciesMessagesProvider to match usage
export const AgenciesMessagesProvider = ({ children }) => {
  const [chats, setChats] = useState([
    {
      id: 1,
      brandName: 'Nike',
      campaign: 'Summer Collection 2025',
      lastMessage: 'Lets discuss the campaign requirements in detail.',
      unread: true,
      archived: false,
      attachments: ['brief.pdf', 'budget.xlsx'],
      updatedAt: '2025-05-19T10:30:00Z'
    },
    {
      id: 2,
      brandName: 'Adidas',
      campaign: 'Sports Edition',
      lastMessage: 'The influencer selections look great! Moving forward with the top 5.',
      unread: false,
      archived: false,
      attachments: [],
      updatedAt: '2025-05-18T15:45:00Z'
    },
    {
      id: 3,
      brandName: 'Puma',
      campaign: 'Fitness Series',
      lastMessage: 'Contract has been signed. Ready to proceed with the campaign.',
      unread: true,
      archived: false,
      attachments: ['contract.pdf'],
      updatedAt: '2025-05-17T09:20:00Z'
    }
  ]);

  const value = {
    chats,
    setChats,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};