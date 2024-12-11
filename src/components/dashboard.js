import React, { useState, useEffect } from 'react';
import { Home, Inbox, Search, Network, Star, MessageSquareQuote, Settings, DollarSignIcon, CreditCardIcon } from 'lucide-react';
import { fetchCreatorProfile } from '../services/apis';

import { useNavigate } from 'react-router-dom';




// Placeholder user data (in a real app, this would come from authentication)
const user = {
  name: 'Alex Rodriguez',
  email: 'alex.rodriguez@example.com',
  avatar: 'https://avatar.iran.liara.run/public/68',
  earnings: {
    total: 12500,
    thisMonth: 3200,
    pendingPayment: 1850
  },
  ratings: {
    overall: 4.7,
    totalReviews: 142
  }
};

const CreatorDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAvailable, setIsAvailable] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token){
      fetchCreatorProfile(token);
    }else{
      navigate('/')
    }
  })
  
  


  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        );

      case 'inbox':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Inbox</h2>
            <div className="text-gray-500">
              No new messages
            </div>
          </div>
        );

      case 'collabs':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Ongoing Collaborations</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold">Brand Collaboration with TechCorp</h3>
                <p className="text-sm text-gray-600">Status: In Progress</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold">Instagram Campaign with FashionHub</h3>
                <p className="text-sm text-gray-600">Status: Negotiation</p>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Earnings</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Total Earnings</h3>
                <p className="text-2xl font-bold text-blue-600">${user.earnings.total}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">This Month</h3>
                <p className="text-2xl font-bold text-green-600">${user.earnings.thisMonth}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Pending Payment</h3>
                <p className="text-2xl font-bold text-yellow-600">${user.earnings.pendingPayment}</p>
              </div>
            </div>
          </div>
        );

      case 'ratings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold text-yellow-500">{user.ratings.overall}</div>
              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < Math.floor(user.ratings.overall) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-gray-600">Based on {user.ratings.totalReviews} reviews</p>
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <p className="italic">"Amazing work and professionalism!"</p>
                <p className="text-sm text-gray-600">- TechCorp Marketing Team</p>
              </div>
              <div className="border p-4 rounded-lg">
                <p className="italic">"Exceeded our expectations in every way."</p>
                <p className="text-sm text-gray-600">- FashionHub Creative Director</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Profile Information</h3>
                <p>Manage your personal details and account preferences</p>
              </div>
              <div>
                <h3 className="font-semibold">Notification Preferences</h3>
                <p>Control how and when you receive notifications</p>
              </div>
              <div>
                <h3 className="font-semibold">Privacy Settings</h3>
                <p>Manage your data sharing and visibility</p>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">PayPal</h3>
                  <p className="text-sm text-gray-600">alex.rodriguez@example.com</p>
                </div>
                <span className="text-green-600">Primary</span>
              </div>
              <div className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Bank Transfer</h3>
                  <p className="text-sm text-gray-600">**** **** **** 4321</p>
                </div>
                <span className="text-gray-600">Secondary</span>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold">FAQs</h3>
                <p>Find answers to commonly asked questions</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold">Contact Support</h3>
                <p>Reach out to our support team for assistance</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold">Community Forum</h3>
                <p>Connect with other creators and get help</p>
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Search Collaborations</h2>
            <input
              type="text"
              placeholder="Search for collaborations..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
            <p>This is your creator dashboard. Navigate through the options on the left to manage your profile, messages, and collaborations.</p>
          </div>
        );
    }
  };


  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-100 border-r p-4 flex flex-col">
        {/* User Avatar and Profile */}
        <div
          className="flex items-center space-x-4 mb-6 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
          onClick={() => setActiveSection('profile')}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">View Profile</p>
          </div>
        </div>

        {/* Navigation Options */}
        <nav className="space-y-2">
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'home' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('home')}
          >
            <Home className="w-5 h-5" />
            <span>HOME</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'inbox' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('inbox')}
          >
            <Inbox className="w-5 h-5" />
            <span>Inbox</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'collabs' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('collabs')}
          >
            <Network className="w-5 h-5" />
            <span>Ongoing Collabs</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'search' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('search')}
          >
            <Search className="w-5 h-5" />
            <span>Search Collabs</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'earnings' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('earnings')}
          >
            <DollarSignIcon className="w-5 h-5" />
            <span>Earnings</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'ratings' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('ratings')}
          >
            <Star className="w-5 h-5" />
            <span>Ratings</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'testimonials' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('testimonials')}
          >
            <MessageSquareQuote className="w-5 h-5" />
            <span>Testimonials</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'settings' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('settings')}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${activeSection === 'payments' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveSection('payments')}
          >
            <CreditCardIcon className="w-5 h-5" />
            <span>Payments</span>
          </div>
        </nav>

        {/* Availability Toggle */}
        <div className="mt-auto p-4">
          <button
            className={`w-full p-2 rounded-lg font-semibold ${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            {isAvailable ? 'Available for Collab' : 'Unavailable'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default CreatorDashboard;