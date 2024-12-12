import React, { useState, useEffect, useRef } from 'react';
import { Home, Inbox, Search, Network, Star, MessageSquareQuote, Settings, DollarSignIcon, CreditCardIcon, Youtube, Instagram } from 'lucide-react';
import { fetchCreatorProfile } from '../services/apis';

import { useNavigate } from 'react-router-dom';




// Placeholder user data (in a real app, this would come from authentication)
const dummyUser = {
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
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    email: "",
    primaryPlatform: [],
    channelLinks: [],
    age: null,
    gender: "",
    country: "",
    city: "",
    contentLang: [],
    channelGenre: "",
    contentDesc: ""
  });

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchCreatorProfile(token)
        .then((response) => {
          setUser({
            id: response.data.id,
            fullName: response.data.full_name,
            email: response.data.email,
            primaryPlatform: response.data.primaryplatform,
            channelLinks: response.data.channel_links,
            age: response.data.age,
            gender: response.data.gender,
            country: response.data.country,
            city: response.data.city,
            contentLang: response.data.content_lang,
            contentDesc: response.data.content_desc,
            channelGenre: response.data.channel_genre
          });
          setIsLoading(false); // Stop the loader after the data is fetched
        })
        .catch((error) => {
          console.error("Failed to fetch creator profile:", error);
          navigate('/'); // Redirect to login if fetching profile fails
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  const renderSocialIcon = (link) => {
    if (link.includes('youtube.com')) {
      return <Youtube className="text-red-600 w-5 h-5 mr-2" />;
    }
    if (link.includes('instagram.com')) {
      return <Instagram className="text-pink-500 w-5 h-5 mr-2" />;
    }
    return null;
  };

  const ProfileRow = ({ label, value }) => (
    <div className="flex">
      <span className="font-medium text-gray-600 w-1/3">{label}:</span>
      <span className="text-gray-800 w-2/3">{value || 'Not provided'}</span>
    </div>
  );


  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        // return (
        //   <div className="p-6">
        //     <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        //     <div className="space-y-2">
        //       <p><strong>Name:</strong> {user.fullName}</p>
        //       <p><strong>Email:</strong> {user.email}</p>
        //     </div>
        //   </div>
        // );

        return (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Personal Details</h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                  <ProfileRow label="Name" value={user.fullName} />
                  <ProfileRow label="Email" value={user.email} />
                  <ProfileRow label="Gender" value={user.gender} />
                  <ProfileRow label="Country" value={user.country} />
                  <ProfileRow label="City" value={user.city} />
                </div>
              </div>
              
              {/* Content Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Content Profile</h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                  <ProfileRow label="Content Description" value={user.contentDesc} />
                  <ProfileRow label="Content Languages" value={user.contentLang?.join(', ')} />
                  <ProfileRow label="Content Genre" value={user.channelGenre} />
                </div>
              </div>
            </div>
      
            {/* Channel Links Section */}
            {user.channelLinks && user.channelLinks.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Channel Links</h3>
                <div className="space-y-2">
                  {user.channelLinks.map((link, index) => (
                    <div key={index} className="flex items-center">
                      {renderSocialIcon(link)}
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <p className="text-2xl font-bold text-blue-600">${dummyUser.earnings.total}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">This Month</h3>
                <p className="text-2xl font-bold text-green-600">${dummyUser.earnings.thisMonth}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Pending Payment</h3>
                <p className="text-2xl font-bold text-yellow-600">${dummyUser.earnings.pendingPayment}</p>
              </div>
            </div>
          </div>
        );

      case 'ratings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold text-yellow-500">{dummyUser.ratings.overall}</div>
              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < Math.floor(dummyUser.ratings.overall) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-gray-600">Based on {dummyUser.ratings.totalReviews} reviews</p>
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
                  <p className="text-sm text-gray-600">{user.email}</p>
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div> {/* Replace with a proper loader component */}
      </div>
    );
  }

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
            src={dummyUser.avatar}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user.fullName}</p>
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