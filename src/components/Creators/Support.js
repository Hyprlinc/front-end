import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Support = () => {
  const [isSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1,
      text: "Hello! I'm your automated support agent. How can I help you today?", 
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const newMessage = { 
      id: messages.length + 1,
      text: userInput, 
      isBot: false,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand your concern. Let me check that for you.",
        "Thanks for your message. I'm looking into this now.",
        "That's a good question! Here's what I found...",
        "Our team has been notified and will respond shortly.",
        "I can help with that. Here are some possible solutions:"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prev => [
        ...prev, 
        { 
          id: prev.length + 1,
          text: randomResponse, 
          isBot: true,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  // Format time as HH:MM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col h-full ${isSidebarOpen ? 'ml-80' : ''}`}
    >
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Support header */}
        <div className=" bg-gradient-to-br from-slate-100 to-slate-100 border-b border-gray-200 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Support Center</h2>
                <p className="text-sm text-gray-500">
                  {isTyping ? 'Agent is typing...' : 'Typically replies in a few minutes'}
                </p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              View tickets <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.isBot ? 
                    'bg-white border border-gray-200' : 
                    'bg-blue-600 text-white'}`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot ? (
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="bg-blue-700 p-1 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Smile className="h-5 w-5" />
            </button>
            <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className={`p-2 rounded-full ${userInput.trim() ? 
                'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              disabled={!userInput.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;