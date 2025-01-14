import React, { useState } from 'react';
import { Trash2, Star, Archive, Mail, RefreshCw, Paperclip, Send } from 'lucide-react';

const EmailInbox = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  const emails = [
    {
      id: 1,
      sender: "Nike Marketing Team",
      senderEmail: "marketing@nike.com",
      subject: "Campaign Proposal: Athletic Wear Collection Launch",
      preview: "We're excited about your fitness content and would like to discuss...",
      content: `Hi Sarah,

We've been following your fitness content and are impressed with your authentic approach to wellness and your engaged community. We believe you'd be a perfect fit for our upcoming Athletic Wear Collection launch.

Campaign Details:
- 3 Instagram Posts
- 2 Instagram Stories
- 1 YouTube Try-on Haul
- Campaign Duration: 4 weeks

Proposed Compensation: $5,000 + Product Package ($1,000 value)

Let us know if you'd be interested in discussing this further.

Best regards,
Nike Marketing Team`,
      date: "10:30 AM",
      unread: true,
      starred: false,
      avatar: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg"
    },
    {
      id: 2,
      sender: "Sephora Partnerships",
      senderEmail: "partnerships@sephora.com",
      subject: "RE: Summer Beauty Campaign Details",
      preview: "Thank you for your counter-proposal. Regarding the content deliverables...",
      content: `Dear Emma,

Thank you for your counter-proposal for our Summer Beauty Campaign. We appreciate your thoughtful consideration of the deliverables.

We can agree to your suggested rate of $3,500 for:
- 2 Instagram Reels
- 3 TikTok Videos
- 1 Blog Post

Timeline: June 15 - July 15
Product Package: Full Summer Collection ($800 value)

Please let us know if these terms work for you.

Best,
Sephora Partnerships Team`,
      date: "Yesterday",
      unread: false,
      starred: true,
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png"
    },
    {
      id: 3,
      sender: "Samsung Mobile",
      senderEmail: "influencer.collab@samsung.com",
      subject: "Contract Draft - Galaxy S24 Launch Campaign",
      preview: "Please find attached the revised contract with updated terms as discussed...",
      content: `Hello Alex,

As discussed, please find the revised contract for the Galaxy S24 Launch Campaign. We've updated the terms based on our previous conversation.

Key Updates:
- Increased post frequency
- Added exclusivity clause details
- Revised payment schedule
- Updated deliverable timeline

Please review and let us know if you have any questions.

Regards,
Samsung Mobile Team`,
      date: "Dec 28",
      unread: true,
      starred: false,
      avatar: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$"
    }
  ];

  const handleSelectEmail = (emailId, e) => {
    e.stopPropagation();
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleSendReply = () => {
    alert('Reply sent successfully!');
    setReplyText('');
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <Mail className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900">Select an email</h3>
      <p className="text-sm text-gray-500">Choose from your inbox</p>
    </div>
  );

  return (
    <div className="flex h-full bg-white">
      {/* Left Side - Email List */}
      <div className="w-2/5 border-r border-gray-200 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {emails.length} messages
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div 
              key={email.id}
              className={`flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                email.unread ? 'bg-blue-50' : ''
              } ${selectedEmail?.id === email.id ? 'bg-blue-100' : ''}`}
              onClick={() => handleEmailClick(email)}
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  className="mr-3 h-4 w-4 rounded border-gray-300"
                  checked={selectedEmails.includes(email.id)}
                  onChange={(e) => handleSelectEmail(email.id, e)}
                />
                <img
                  src={email.avatar}
                  alt={email.sender}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <button 
                  className={`mr-3 ${email.starred ? 'text-yellow-400' : 'text-gray-400'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle star toggle
                  }}
                >
                  <Star className="w-5 h-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className={`text-sm ${email.unread ? 'font-semibold' : ''}`}>
                      {email.sender}
                    </div>
                    <div className="text-xs text-gray-500">
                      {email.date}
                    </div>
                  </div>
                  <div className={`text-sm ${email.unread ? 'font-semibold' : ''} truncate`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {email.preview}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Email Detail View */}
      <div className="w-3/5 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <img
                    src={selectedEmail.avatar}
                    alt={selectedEmail.sender}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="text-xl font-semibold mb-1">{selectedEmail.subject}</div>
                    <div className="text-sm">
                      <span className="font-medium">{selectedEmail.sender}</span>
                      <span className="text-gray-500"> &lt;{selectedEmail.senderEmail}&gt;</span>
                    </div>
                    <div className="text-sm text-gray-500">{selectedEmail.date}</div>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-gray-800 mb-8">
                  {selectedEmail.content}
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Reply to {selectedEmail.sender}
                  </div>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="6"
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendReply}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default EmailInbox;