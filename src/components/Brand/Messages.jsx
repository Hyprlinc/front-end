// import React, { useState } from 'react';
// import { MessageCircle, Paperclip, Search, Filter, Archive, Mail, MailOpen } from 'lucide-react';
// import { useMessages } from '../Brand/Context/MessagesContext';

// const Messages = () => {
//   const { chats, setChats } = useMessages();
//   const [filters, setFilters] = useState({
//     search: '',
//     status: 'all',
//   });

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const filteredChats = chats.filter((chat) => {
//     const matchesSearch = chat.influencer.toLowerCase().includes(filters.search.toLowerCase()) ||
//       chat.campaign.toLowerCase().includes(filters.search.toLowerCase());
//     const matchesStatus =
//       filters.status === 'all' ||
//       (filters.status === 'unread' && chat.unread) ||
//       (filters.status === 'archived' && chat.archived);
//     return matchesSearch && matchesStatus;
//   });

//   // Sort chats by most recent first
//   const sortedChats = [...filteredChats].sort((a, b) => 
//     new Date(b.updatedAt) - new Date(a.updatedAt)
//   );

//   const markAsRead = (chatId) => {
//     setChats(prevChats =>
//       prevChats.map(chat =>
//         chat.id === chatId ? { ...chat, unread: false } : chat
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 flex items-center">
//         <MessageCircle className="mr-2" /> Messages
//       </h1>

//       {/* Filters */}
//       <div className="flex space-x-4 mb-6">
//         <div className="flex items-center bg-gray-100 rounded-lg p-2 flex-1">
//           <Search className="text-gray-500" />
//           <input
//             type="text"
//             name="search"
//             placeholder="Search messages..."
//             value={filters.search}
//             onChange={handleFilterChange}
//             className="ml-2 bg-transparent outline-none w-full"
//           />
//         </div>
//         <div className="flex items-center bg-gray-100 rounded-lg p-2">
//           <Filter className="text-gray-500" />
//           <select
//             name="status"
//             value={filters.status}
//             onChange={handleFilterChange}
//             className="ml-2 bg-transparent outline-none"
//           >
//             <option value="all">All</option>
//             <option value="unread">Unread</option>
//             <option value="archived">Archived</option>
//           </select>
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="space-y-4">
//         {sortedChats.length > 0 ? (
//           sortedChats.map((chat) => (
//             <div
//               key={chat.id}
//               className={`bg-white p-4 rounded-lg shadow-md ${chat.unread ? 'border-l-4 border-blue-500' : ''}`}
//               onClick={() => markAsRead(chat.id)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   {chat.unread ? <Mail className="text-blue-500" /> : <MailOpen className="text-gray-500" />}
//                   <div>
//                     <p className="font-bold">{chat.influencer}</p>
//                     <p className="text-gray-500">{chat.platform} - {chat.campaign}</p>
//                   </div>
//                 </div>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Reply</button>
//               </div>
//               <p className="mt-4">{chat.lastMessage}</p>
//               {chat.attachments.length > 0 && (
//                 <div className="mt-4 flex items-center space-x-2">
//                   <Paperclip className="text-gray-500" />
//                   <span className="text-gray-500">Attachments: {chat.attachments.join(', ')}</span>
//                 </div>
//               )}
//               <div className="mt-4 flex space-x-2">
//                 {chat.archived ? (
//                   <button
//                     className="flex items-center bg-gray-100 px-4 py-2 rounded-lg"
//                     onClick={() =>
//                       setChats((prev) =>
//                         prev.map((c) => (c.id === chat.id ? { ...c, archived: false } : c))
//                       )
//                     }
//                   >
//                     <Archive className="mr-2" /> Unarchive
//                   </button>
//                 ) : (
//                   <button
//                     className="flex items-center bg-gray-100 px-4 py-2 rounded-lg"
//                     onClick={() =>
//                       setChats((prev) =>
//                         prev.map((c) => (c.id === chat.id ? { ...c, archived: true } : c))
//                       )
//                     }
//                   >
//                     <Archive className="mr-2" /> Archive
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-10">
//             <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
//             <p className="text-gray-500">When you start conversations with influencers, they'll appear here.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;


import React, { useState } from 'react';
import { 
  MessageCircle, 
  Paperclip, 
  Search, 
  Filter, 
  Archive, 
  Mail, 
  MailOpen, 
  ChevronDown,
  Reply,
  MoreVertical,
  Clock,
  User,
  Hash,
  CalendarDays,
  ArrowLeft
} from 'lucide-react';
import { useMessages } from '../Brand/Context/MessagesContext';
import { showSuccessToast } from '../lib/toast';

const Messages = () => {
  const { chats, setChats } = useMessages();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyContent, setReplyContent] = useState('');

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

  // Sort chats by most recent first
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

  const handleReply = (chatId) => {
    // In a real app, this would send the reply to the server
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: Date.now(),
              sender: 'brand',
              content: replyContent,
              timestamp: new Date().toISOString()
            }
          ],
          unread: false,
          updatedAt: new Date().toISOString()
        };
      }
      return chat;
    });
    setChats(updatedChats);
    setReplyContent('');
    showSuccessToast('Reply sent successfully!');
  };

  const toggleArchive = (chatId) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, archived: !chat.archived } : chat
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="mr-2 text-indigo-600" /> Messages
            </h1>
            <p className="text-gray-600 mt-1">Communicate with influencers about your campaigns</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <MoreVertical className="w-5 h-5 mr-2" />
              <span>More</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search messages by influencer or campaign..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" />
            </div>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread Only</option>
              <option value="archived">Archived</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedChat ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="border-b p-4 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1 ml-2 md:ml-0">
                  <h2 className="font-bold text-lg">{selectedChat.influencer}</h2>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Hash className="w-4 h-4 mr-1" />
                      {selectedChat.campaign}
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {new Date(selectedChat.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleArchive(selectedChat.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Archive className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                <div className="space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'brand' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'brand'
                            ? 'bg-indigo-100 text-gray-800 rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply..."
                      rows="2"
                      className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="absolute right-3 bottom-3 flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReply(selectedChat.id)}
                    disabled={!replyContent.trim()}
                    className={`p-3 rounded-lg ${
                      replyContent.trim()
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Reply className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedChats.length > 0 ? (
                sortedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${chat.unread ? 'bg-blue-50' : ''}`}
                    onClick={() => {
                      markAsRead(chat.id);
                      setSelectedChat(chat);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {chat.unread ? (
                            <Mail className="w-5 h-5 text-blue-500" />
                          ) : (
                            <MailOpen className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">{chat.influencer}</h3>
                            <span className="text-xs text-gray-500">
                              {new Date(chat.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            <span className="mr-2">{chat.platform}</span>
                            <span className="text-gray-400">•</span>
                            <span className="ml-2">{chat.campaign}</span>
                          </p>
                          <p className={`mt-2 ${chat.unread ? 'font-medium' : 'text-gray-600'}`}>
                            {chat.lastMessage.length > 100
                              ? `${chat.lastMessage.substring(0, 100)}...`
                              : chat.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                    {chat.attachments.length > 0 && (
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Paperclip className="w-4 h-4 mr-2" />
                        <span>{chat.attachments.length} attachment{chat.attachments.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="mt-3 flex space-x-2">
                      <button
                        className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleArchive(chat.id);
                        }}
                      >
                        {chat.archived ? 'Unarchive' : 'Archive'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {filters.status === 'archived'
                      ? "You don't have any archived messages."
                      : filters.search
                      ? "No messages match your search criteria."
                      : "When you start conversations with influencers, they'll appear here."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;