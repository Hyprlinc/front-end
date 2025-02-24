import React, { useState, useEffect, useRef } from 'react';
import { Home, Inbox, Search, Network, Star, MessageSquareQuote, Settings, DollarSignIcon, CreditCardIcon, Youtube, Instagram, User, Globe, Mail, MapPin, Award, Link as LinkIcon, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Plus, Eye, Edit } from 'lucide-react';
import { fetchCreatorProfile, fetchCreatorsChannelData } from '../services/creators/CreatorsServices';

import { useNavigate } from 'react-router-dom';
import UserProfileComponent from './profile';
import CreatorDashboardHome from './home/homePage';
import EmailInbox from './Creators/EmailInbox';
import RatingsAndReviews from './Creators/RatingsAndTestimonials';
import EarningsDashboard from './Creators/Earnings';

import logo from '../assets/logo.png';
import homeIcon from '../assets/icons/Home.png';
import inboxIcon from '../assets/icons/messages.png';
import collabsIcon from '../assets/icons/collaborations.png';
import earningsIcon from '../assets/icons/profile_management.png';
import portfolioIcon from '../assets/icons/portfolio.png';
import settingsIcon from '../assets/icons/settings.png';
import supportIcon from '../assets/icons/support.png';

import homeAcive from '../assets/icons/homeblue.png';
import inboxActive from '../assets/icons/messagesblue.png';
import collabsActive from '../assets/icons/collabotationsblue.png';
import earningsActive from '../assets/icons/earningsblue.png';
import earnings from '../assets/icons/earnings.png';
import portfolioActive from '../assets/icons/portfolioblue.png';
import settingsActive from '../assets/icons/settingsblue.png';
import supportActive from '../assets/icons/supportblue.png';
import profileManagementActive from '../assets/icons/profileblue.png';
import profileManagemnt from '../assets/icons/profile_management.png';
import ProfileManagement from './Creators/ProfileManagement';
import Collab from './Creators/Collaborations/Collab';




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
    channelNiche: "",
    contentDesc: "",
    channelAgeYoutube: "",
    channelAgeIg: "",
    subscribers: "",
    averageViews: "",
    contentType: "",
    postingFrequency: "",
    liveStreaming: "",
    collabType: "",
    accountName: "",
    followers: "",
    avgReelViews: "",
    avgComments: "",
    avgLikes: "",
    engagementRate: "",
  });

  const navigate = useNavigate()

  const populateFields = async (token) => {
    Promise.all([fetchCreatorProfile(token), fetchCreatorsChannelData(token)])
      .then(([profileResponse, channelDataResponse]) => {
        setUser((prevUser) => ({
          ...prevUser,
          id: profileResponse.data.id,
          fullName: profileResponse.data.full_name,
          email: profileResponse.data.email,
          primaryPlatform: profileResponse.data.primaryplatform,
          channelLinks: profileResponse.data.channel_links,
          age: profileResponse.data.age,
          gender: profileResponse.data.gender,
          country: profileResponse.data.country,
          city: profileResponse.data.city,
          contentLang: profileResponse.data.content_lang,
          contentDesc: profileResponse.data.content_desc,
          channelNiche: profileResponse.data.niches,
          channelAgeYoutub: channelDataResponse.data.channelDetails.channel_age_youtube,
          channelAgeIg: channelDataResponse.data.channelDetails.ig_account_age,
          subscribers: channelDataResponse.data.channelDetails.subscribers_count_youtube,
          averageViews: channelDataResponse.data.channelDetails.avg_views_youtube,
          contentType: channelDataResponse.data.channelDetails.content_type_youtube,
          postingFrequency: channelDataResponse.data.channelDetails.posts_freq_youtube,
          liveStreaming: channelDataResponse.data.channelDetails.live_streaming_youtube,
          collabType: channelDataResponse.data.channelDetails.collab_type,
          followers: channelDataResponse.data.channelDetails.ig_followers_count,
          avgReelViews: channelDataResponse.data.channelDetails.avg_ig_reel_views,
          avgComments: channelDataResponse.data.channelDetails.avg_ig_comment_count,
          avgLikes: channelDataResponse.data.channelDetails.avg_ig_likes_count,
          engagementRate: channelDataResponse.data.channelDetails.eng_rate_ig,
        }));
        setIsLoading(false); // Stop the loader after the data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch creator profile:", error);
        navigate('/'); // Redirect to login if fetching profile fails
      });

  }

  const mockStats = {
    ongoingCampaigns: 3,
    lastMonthEarnings: 1250,
    campaignsCompleted: 5
  };

  const mockSocialStats = {
    instagramFollowers: 5420,
    youtubeViews: 125000
  };

  const mockCampaigns = [
    {
      id: 1,
      brandName: 'Rangraze.in',
      type: 'Product Review',
      budgetRange: '$500 - $750',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      brandName: 'Boat LifeStyle',
      type: 'Sponsored Content',
      budgetRange: '$350 - $500',
      deadline: '2024-02-20'
    },
    {
      id: 3,
      brandName: 'Louis Philippe',
      type: 'Sponsored Content',
      budgetRange: '$120 - $567',
      deadline: '2024-02-20'
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      populateFields(token);
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

  const ProfileRow = ({ label, value, onEdit, editable = true }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleEditToggle = () => {
      if (isEditing) {
        onEdit(editedValue);
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    };

    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 font-medium">{label}</span>
          {isEditing ? (
            <input
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="text-base text-gray-900 mt-1">{value}</span>
          )}
        </div>
        {editable && (
          <button
            onClick={handleEditToggle}
            className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"
          >
            {isEditing ? 'Save' : <Edit size={20} />}
          </button>
        )}
      </div>
    );
  };


  // Connected Status Indicator
  const ConnectedStatus = ({ isConnected }) => (
    <div className="flex items-center">
      <span
        className={`inline-block w-3 h-3 rounded-full mr-2 ${isConnected
          ? 'bg-green-500 animate-pulse'
          : 'bg-gray-300'
          }`}
      />
      <span className="text-sm">
        {isConnected ? 'Connected' : 'Not Connected'}
      </span>
    </div>
  );

  const [expandedLink, setExpandedLink] = useState(null); 

  // Toggle expand/collapse for a specific link
  const toggleExpand = (index) => {
    setExpandedLink(expandedLink === index ? null : index);
  };

  // Render additional information for YouTube or Instagram
  // const renderAdditionalInfo = (link) => {
  //   if (link.includes("youtube")) {
  //     return (
  //       <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
  //         <ProfileRow label="Channel Age (YouTube)" value={user.channelAgeYoutub} />
  //         <ProfileRow label="Subscribers" value={user.subscribers} />
  //         <ProfileRow label="Average Views" value={user.averageViews} />
  //         <ProfileRow label="Content Type" value={user.contentType} />
  //         <ProfileRow label="Posting Frequency" value={user.postingFrequency} />
  //         <ProfileRow label="Live Streaming" value={user.liveStreaming ? "Yes" : "No"} />
  //       </div>
  //     );
  //   } else if (link.includes("instagram")) {
  //     return (
  //       <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
  //         <ProfileRow label="Account Age (Instagram)" value={user.channelAgeIg} />
  //         <ProfileRow label="Followers" value={user.followers} />
  //         <ProfileRow label="Average Reel Views" value={user.avgReelViews} />
  //         <ProfileRow label="Average Comments" value={user.avgComments} />
  //         <ProfileRow label="Average Likes" value={user.avgLikes} />
  //         <ProfileRow label="Engagement Rate" value={`${user.engagementRate}%`} />
  //       </div>
  //     );
  //   }
  //   return null; // Default for unsupported links
  // };

  const handleUpdateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const renderAdditionalInfo = (link, user, onUpdateUser) => {
    if (link.includes("youtube")) {
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">YouTube Profile</h3>
          </div>
          <div className="p-6 space-y-4">
            <ProfileRow
              label="Channel Age"
              value={user.channelAgeYoutube}
              onEdit={(newValue) => onUpdateUser('channelAgeYoutube', newValue)}
            />
            <ProfileRow
              label="Subscribers"
              value={user.subscribers}
              onEdit={(newValue) => onUpdateUser('subscribers', newValue)}
            />
            <ProfileRow
              label="Average Views"
              value={user.averageViews}
              onEdit={(newValue) => onUpdateUser('averageViews', newValue)}
            />
            <ProfileRow
              label="Content Type"
              value={user.contentType}
              onEdit={(newValue) => onUpdateUser('contentType', newValue)}
            />
            <ProfileRow
              label="Posting Frequency"
              value={user.postingFrequency}
              onEdit={(newValue) => onUpdateUser('postingFrequency', newValue)}
            />
            <ProfileRow
              label="Live Streaming"
              value={user.liveStreaming ? "Yes" : "No"}
              onEdit={(newValue) => onUpdateUser('liveStreaming', newValue === 'Yes')}
              editable={true}
            />
          </div>
        </div>
      );
    } else if (link.includes("instagram")) {
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-pink-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Instagram Profile</h3>
          </div>
          <div className="p-6 space-y-4">
            <ProfileRow
              label="Account Age"
              value={user.channelAgeIg}
              onEdit={(newValue) => onUpdateUser('channelAgeIg', newValue)}
            />
            <ProfileRow
              label="Followers"
              value={user.followers}
              onEdit={(newValue) => onUpdateUser('followers', newValue)}
            />
            <ProfileRow
              label="Average Reel Views"
              value={user.avgReelViews}
              onEdit={(newValue) => onUpdateUser('avgReelViews', newValue)}
            />
            <ProfileRow
              label="Average Comments"
              value={user.avgComments}
              onEdit={(newValue) => onUpdateUser('avgComments', newValue)}
            />
            <ProfileRow
              label="Average Likes"
              value={user.avgLikes}
              onEdit={(newValue) => onUpdateUser('avgLikes', newValue)}
            />
            <ProfileRow
              label="Engagement Rate"
              value={`${user.engagementRate}%`}
              onEdit={(newValue) => onUpdateUser('engagementRate', parseFloat(newValue))}
            />
          </div>
        </div>
      );
    }
    return null; // Default for unsupported links
  };



  const renderContent = () => {
    switch (activeSection) {
      case 'profile-mngm':

      return <ProfileManagement name={user.fullName} email={user.email} location={user.country} phoneNumber={user.phoneNumber} bio={user.bio} niches={user.channelNiche} />

      case 'inbox':
        return <EmailInbox />;

      // (
      //   <div className="p-6">
      //     <h2 className="text-2xl font-bold mb-4">Inbox</h2>
      //     <div className="text-gray-500">
      //       No new messages
      //     </div>
      //   </div>
      // );

      case 'collabs':
        return <Collab />;
             

      case 'earnings':
        return <EarningsDashboard />;

      case 'ratings':
        return < RatingsAndReviews />;

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

      // case 'search':
      //   return (
      //     <div className="p-6">
      //       <h2 className="text-2xl font-bold mb-4">Search Collaborations</h2>
      //       <input
      //         type="text"
      //         placeholder="Search for collaborations..."
      //         className="w-full p-2 border rounded-lg"
      //       />
      //     </div>
      //   );

      default:
        return <CreatorDashboardHome user={user} stats={mockStats} socialStats={mockSocialStats} campaigns={mockCampaigns} />
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
      <div className="w-64 bg-[#007AFF] border-r p-4 flex flex-col text-white font-['Roboto']">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            style={{ height: '5rem', width: 'auto' }}
            src={logo}
            alt="Hyperlinc Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* User Avatar and Profile */}
        {/* <div
          className="flex items-center space-x-4 mb-6 cursor-pointer hover:bg-[#1a88ff] p-2 rounded-lg"
          onClick={() => setActiveSection('profile')}
        >
          <img
            src={dummyUser.avatar}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-[14px]">{user.fullName}</p>
            <p className="text-sm text-gray-100">View Profile</p>
          </div>
        </div> */}

        {/* Navigation Options */}
        <nav className="space-y-4">
          {/* home */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'home' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('home')}
          >
            <img src={activeSection === 'home' ? homeAcive : homeIcon} alt="Home" className="w-4 h-4" />
            <span>Home</span>
          </div>
          {/* profile-mngm */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'profile-mngm' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('profile-mngm')}
          >
            <img src={activeSection === 'profile-mngm' ? profileManagementActive : profileManagemnt} alt="Inbox" className="w-4 h-4" />
            <span>Profile Management</span>
          </div>
          {/* collabs */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'collabs' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('collabs')}
          >
            <img src={activeSection === 'collabs' ? collabsActive : collabsIcon} alt="Collaborations" className="w-4 h-4" />
            <span>Collaborations</span>
          </div>
          {/* earnings */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'earnings' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('earnings')}
          >
            <img src={activeSection === 'earnings' ? earningsActive : earnings} alt="Earnings" className="w-4 h-4" />
            <span>Earnings</span>
          </div>
          {/* messages */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'messages' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('messages')}
          >
            <img src={activeSection === 'messages' ? inboxActive : inboxIcon} alt="Messages" className="w-4 h-4" />
            <span>Messages</span>
          </div>
          {/* portfolio */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'portfolio' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('portfolio')}
          >
            <img src={activeSection === 'portfolio' ? portfolioActive : portfolioIcon} alt="Portfolio" className="w-4 h-4" />
            <span>Portfolio</span>
          </div>
          
          
          {/* settings */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'settings' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('settings')}
          >
            <img src={activeSection === 'settings' ? settingsActive : settingsIcon} alt="Settings" className="w-4 h-4" />
            <span>Settings</span>
          </div>
          {/* support */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer text-[18px] font-['Roboto'] font-semibold
            ${activeSection === 'support' ? 'bg-white text-[#007AFF]' : 'hover:bg-[#1a88ff] text-white'}`}
            onClick={() => setActiveSection('support')}
          >
            <img src={activeSection === 'support' ? supportActive : supportIcon} alt="Support" className="w-4 h-4" />
            <span>Support</span>
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

        <div>

          <button
            onClick={() => window.location.href = 'http://localhost:5000/api/v1/fbAuth/auth/facebook'}
            className="w-full mb-4 flex items-center justify-center space-x-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <svg
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Login with Facebook</span>
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