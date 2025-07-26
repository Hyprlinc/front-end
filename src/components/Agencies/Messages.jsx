import React, { useState } from 'react';
import { 
  MessageCircle, 
  Paperclip, 
  Search, 
  Filter, 
  Archive, 
  Mail, 
  MailOpen,
  Send,
  X as CloseIcon,
  Image as ImageIcon,
  Smile
} from 'lucide-react';
import { useMessages } from '../Agencies/Context/MessagesContext';
import { 
  Dialog,
  DialogContent,
} from '@mui/material';

const Messages = () => {
  const { chats, setChats } = useMessages();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [activeChatId, setActiveChatId] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.brandName.toLowerCase().includes(filters.search.toLowerCase()) ||
      chat.campaign.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'unread' && chat.unread) ||
      (filters.status === 'archived' && chat.archived);
    return matchesSearch && matchesStatus;
  });

  const sortedChats = [...filteredChats].sort((a, b) => 
    new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const markAsRead = (chatId) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, unread: false } : chat
      )
    );
  };

  const handleReply = (chatId, e) => {
    e.stopPropagation(); // Prevent chat marking as read
    setActiveChatId(chatId);
  };

  return (
    <div className="md:p-6 relative">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <MessageCircle className="mr-2" /> Messages
      </h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-2 flex-1">
          <Search className="text-gray-500" />
          <input
            type="text"
            name="search"
            placeholder="Search messages..."
            value={filters.search}
            onChange={handleFilterChange}
            className="ml-2 bg-transparent outline-none w-full"
          />
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Filter className="text-gray-500" />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="ml-2 bg-transparent outline-none"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Chat List */}
      <div className="space-y-4">
        {sortedChats.length > 0 ? (
          sortedChats.map((chat) => (
            <div
              key={chat.id}
              className={`bg-white p-4 rounded-lg shadow-md ${chat.unread ? 'border-l-4 border-blue-500' : ''}`}
              onClick={() => markAsRead(chat.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {chat.unread ? <Mail className="text-blue-500" /> : <MailOpen className="text-gray-500" />}
                  <div>
                    <p className="font-bold">{chat.brandName}</p>
                    <p className="text-gray-500">{chat.campaign}</p>
                  </div>
                </div>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={(e) => handleReply(chat.id, e)}
                >
                  Reply
                </button>
              </div>
              <p className="mt-4">{chat.lastMessage}</p>
              {chat.attachments.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <Paperclip className="text-gray-500" />
                  <span className="text-gray-500">Attachments: {chat.attachments.join(', ')}</span>
                </div>
              )}
              <div className="mt-4 flex space-x-2">
                {chat.archived ? (
                  <button
                    className="flex items-center bg-gray-100 px-4 py-2 rounded-lg"
                    onClick={() =>
                      setChats((prev) =>
                        prev.map((c) => (c.id === chat.id ? { ...c, archived: false } : c))
                      )
                    }
                  >
                    <Archive className="mr-2" /> Unarchive
                  </button>
                ) : (
                  <button
                    className="flex items-center bg-gray-100 px-4 py-2 rounded-lg"
                    onClick={() =>
                      setChats((prev) =>
                        prev.map((c) => (c.id === chat.id ? { ...c, archived: true } : c))
                      )
                    }
                  >
                    <Archive className="mr-2" /> Archive
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
            <p className="text-gray-500">When you start conversations with brands, they'll appear here.</p>
          </div>
        )}
      </div>

      {/* Add ChatWindow component */}
      {activeChatId && (
        <ChatWindow
          chat={chats.find(chat => chat.id === activeChatId)}
          onClose={() => setActiveChatId(null)}
        />
      )}
    </div>
  );
};

// Replace the existing ChatWindow component with this updated version
const ChatWindow = ({ chat, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // Dummy messages - replace with actual chat history
    { id: 1, text: 'Hello! I m interested in your campaign.', sender: 'user', timestamp: new Date() },
    { id: 2, text: 'Great! Let s discuss the details.', sender: 'brand', timestamp: new Date() }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    // Add API call to send message here
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <div className="flex flex-col" style={{ height: '80vh' }}>
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-blue-500 text-white">
          <div>
            <h3 className="font-bold text-xl">{chat.brandName}</h3>
            <p className="text-sm opacity-90">{chat.campaign}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-blue-600 rounded">
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <DialogContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[60%] p-4 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-base">{msg.text}</p>
                <span className="text-xs opacity-75 mt-2 block">
                  {msg.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            </div>
          ))}
        </DialogContent>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Add attachment"
            >
              <Paperclip size={22} className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Add image"
            >
              <ImageIcon size={22} className="text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Add emoji"
            >
              <Smile size={22} className="text-gray-600" />
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <Send size={22} />
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default Messages;