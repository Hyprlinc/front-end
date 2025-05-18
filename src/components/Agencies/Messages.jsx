import React, { useState } from 'react';
import { MessageCircle, Paperclip, Search, Filter, Archive, Mail, MailOpen } from 'lucide-react';
import { useMessages } from '../Agencies/Context/MessagesContext';

const Messages = () => {
  const { chats, setChats } = useMessages();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });

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

  return (
    <div className="p-6">
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Reply</button>
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
    </div>
  );
};

export default Messages;