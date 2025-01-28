import React, { useState } from 'react';
import { MessageCircle, Paperclip, Search, Filter, Archive, Mail, MailOpen } from 'lucide-react';

const Messages = () => {
  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      influencer: 'John Doe',
      platform: 'Instagram',
      campaign: 'Campaign XYZ',
      lastMessage: 'Hey, I’ve submitted the content draft.',
      unread: true,
      archived: false,
      attachments: ['draft.pdf'],
    },
    {
      id: 2,
      influencer: 'Jane Smith',
      platform: 'YouTube',
      campaign: 'Campaign ABC',
      lastMessage: 'Can you share the campaign brief?',
      unread: false,
      archived: false,
      attachments: [],
    },
    {
      id: 3,
      influencer: 'Alice Johnson',
      platform: 'TikTok',
      campaign: 'Campaign DEF',
      lastMessage: 'Here’s the final video for review.',
      unread: false,
      archived: true,
      attachments: ['video.mp4'],
    },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all', // all, unread, archived
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.influencer.toLowerCase().includes(filters.search.toLowerCase()) ||
      chat.campaign.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'unread' && chat.unread) ||
      (filters.status === 'archived' && chat.archived);
    return matchesSearch && matchesStatus;
  });

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
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`bg-white p-4 rounded-lg shadow-md ${chat.unread ? 'border-l-4 border-blue-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {chat.unread ? <Mail className="text-blue-500" /> : <MailOpen className="text-gray-500" />}
                <div>
                  <p className="font-bold">{chat.influencer}</p>
                  <p className="text-gray-500">{chat.platform} - {chat.campaign}</p>
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
        ))}
      </div>
    </div>
  );
};

export default Messages;