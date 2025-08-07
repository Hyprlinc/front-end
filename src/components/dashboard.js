import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Inbox,
  Search,
  Network,
  Star,
  MessageSquareQuote,
  Settings,
  DollarSignIcon,
  CreditCardIcon,
  Youtube,
  Instagram,
  User,
  Globe,
  Mail,
  MapPin,
  Award,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
} from "lucide-react";
import {
  fetchCreatorProfile,
  fetchCreatorsChannelData,
} from "../services/creators/CreatorsServices";

import { useNavigate } from "react-router-dom";
import CreatorDashboardHome from "./home/homePage";
import EmailInbox from "./Creators/EmailInbox";
import RatingsAndReviews from "./Creators/RatingsAndTestimonials";
import EarningsDashboard from "./Creators/Earnings";

import Portfolio from "./Creators/Portfolio";
import ProfileManagement from "./Creators/ProfileManagement";
import Collab from "./Creators/Collaborations/Collab";
import Support from "./Creators/Support";
import { useIsMobile } from "./hooks/use-mobile";
import LeftSidebar from "./Creators/comp/LeftSidebar";
import Navbar from "./Creators/comp/Navbar";
import Sidebar from "./Creators/comp/SideBar";
import AccountSettings from "./Creators/Settings";

// Placeholder user data (in a real app, this would come from authentication)
const dummyUser = {
  name: "Alex Rodriguez",
  email: "alex.rodriguez@example.com",
  avatar: "https://avatar.iran.liara.run/public/68",
  earnings: {
    total: 12500,
    thisMonth: 3200,
    pendingPayment: 1850,
  },
  ratings: {
    overall: 4.7,
    totalReviews: 142,
  },
};

const CreatorDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Add effect to handle sidebar state based on mobile detection
  useEffect(() => {
    if (!isMobile) {
      setIsLeftSidebarOpen(true);
    } else {
      setIsLeftSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    email: "",
    mobileNumber: "",
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

  const navigate = useNavigate();

  const populateFields = async (token) => {
    Promise.all([fetchCreatorProfile(token), fetchCreatorsChannelData(token)])
      .then(([profileResponse, channelDataResponse]) => {
        setUser((prevUser) => ({
          ...prevUser,
          id: profileResponse.data.id,
          fullName: profileResponse.data.full_name,
          email: profileResponse.data.email,
          primaryPlatform: profileResponse.data.primaryplatform,
          mobileNumber: profileResponse.data.mob_number,
          channelLinks: profileResponse.data.channel_links,
          age: profileResponse.data.age,
          gender: profileResponse.data.gender,
          country: profileResponse.data.country,
          city: profileResponse.data.city,
          contentLang: profileResponse.data.content_lang,
          contentDesc: profileResponse.data.content_desc,
          channelNiche: profileResponse.data.niches,
          channelAgeYoutub:
            channelDataResponse.data.channelDetails.channel_age_youtube,
          channelAgeIg: channelDataResponse.data.channelDetails.ig_account_age,
          subscribers:
            channelDataResponse.data.channelDetails.subscribers_count_youtube,
          averageViews:
            channelDataResponse.data.channelDetails.avg_views_youtube,
          contentType:
            channelDataResponse.data.channelDetails.content_type_youtube,
          postingFrequency:
            channelDataResponse.data.channelDetails.posts_freq_youtube,
          liveStreaming:
            channelDataResponse.data.channelDetails.live_streaming_youtube,
          collabType: channelDataResponse.data.channelDetails.collab_type,
          followers: channelDataResponse.data.channelDetails.ig_followers_count,
          avgReelViews:
            channelDataResponse.data.channelDetails.avg_ig_reel_views,
          avgComments:
            channelDataResponse.data.channelDetails.avg_ig_comment_count,
          avgLikes: channelDataResponse.data.channelDetails.avg_ig_likes_count,
          engagementRate: channelDataResponse.data.channelDetails.eng_rate_ig,
        }));
        setIsLoading(false); // Stop the loader after the data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch creator profile:", error);
        navigate("/");
      });
  };

  const mockStats = {
    ongoingCampaigns: 3,
    lastMonthEarnings: 1250,
    campaignsCompleted: 5,
  };

  const mockSocialStats = {
    instagramFollowers: 5420,
    youtubeViews: 125000,
  };

  const mockCampaigns = [
    {
      id: 1,
      brandName: "Rangraze.in",
      type: "Product Review",
      budgetRange: "$500 - $750",
      deadline: "2024-02-15",
    },
    {
      id: 2,
      brandName: "Boat LifeStyle",
      type: "Sponsored Content",
      budgetRange: "$350 - $500",
      deadline: "2024-02-20",
    },
    {
      id: 3,
      brandName: "Louis Philippe",
      type: "Sponsored Content",
      budgetRange: "$120 - $567",
      deadline: "2024-02-20",
    },
  ];

  // Function to clear token (e.g., on logout)
  const clearToken = () => {
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      populateFields(token);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const renderSocialIcon = (link) => {
    if (link.includes("youtube.com")) {
      return <Youtube className="text-red-600 w-5 h-5 mr-2" />;
    }
    if (link.includes("instagram.com")) {
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
            {isEditing ? "Save" : <Edit size={20} />}
          </button>
        )}
      </div>
    );
  };

  // Connected Status Indicator
  const ConnectedStatus = ({ isConnected }) => (
    <div className="flex items-center">
      <span
        className={`inline-block w-3 h-3 rounded-full mr-2 ${
          isConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"
        }`}
      />
      <span className="text-sm">
        {isConnected ? "Connected" : "Not Connected"}
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
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const renderAdditionalInfo = (link, user, onUpdateUser) => {
    if (link.includes("youtube")) {
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              YouTube Profile
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <ProfileRow
              label="Channel Age"
              value={user.channelAgeYoutube}
              onEdit={(newValue) => onUpdateUser("channelAgeYoutube", newValue)}
            />
            <ProfileRow
              label="Subscribers"
              value={user.subscribers}
              onEdit={(newValue) => onUpdateUser("subscribers", newValue)}
            />
            <ProfileRow
              label="Average Views"
              value={user.averageViews}
              onEdit={(newValue) => onUpdateUser("averageViews", newValue)}
            />
            <ProfileRow
              label="Content Type"
              value={user.contentType}
              onEdit={(newValue) => onUpdateUser("contentType", newValue)}
            />
            <ProfileRow
              label="Posting Frequency"
              value={user.postingFrequency}
              onEdit={(newValue) => onUpdateUser("postingFrequency", newValue)}
            />
            <ProfileRow
              label="Live Streaming"
              value={user.liveStreaming ? "Yes" : "No"}
              onEdit={(newValue) =>
                onUpdateUser("liveStreaming", newValue === "Yes")
              }
              editable={true}
            />
          </div>
        </div>
      );
    } else if (link.includes("instagram")) {
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-pink-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Instagram Profile
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <ProfileRow
              label="Account Age"
              value={user.channelAgeIg}
              onEdit={(newValue) => onUpdateUser("channelAgeIg", newValue)}
            />
            <ProfileRow
              label="Followers"
              value={user.followers}
              onEdit={(newValue) => onUpdateUser("followers", newValue)}
            />
            <ProfileRow
              label="Average Reel Views"
              value={user.avgReelViews}
              onEdit={(newValue) => onUpdateUser("avgReelViews", newValue)}
            />
            <ProfileRow
              label="Average Comments"
              value={user.avgComments}
              onEdit={(newValue) => onUpdateUser("avgComments", newValue)}
            />
            <ProfileRow
              label="Average Likes"
              value={user.avgLikes}
              onEdit={(newValue) => onUpdateUser("avgLikes", newValue)}
            />
            <ProfileRow
              label="Engagement Rate"
              value={`${user.engagementRate}%`}
              onEdit={(newValue) =>
                onUpdateUser("engagementRate", parseFloat(newValue))
              }
            />
          </div>
        </div>
      );
    }
    return null; // Default for unsupported links
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile-mngm":
        return (
          <ProfileManagement
            name={user.fullName}
            email={user.email}
            location={user.country}
            phoneNumber={user.mobileNumber}
            bio={user.contentDesc}
            niches={user.channelNiche}
          
          />
        );

      case "inbox":
        return <EmailInbox />;

      case "collabs":
        return <Collab />;

      case "earnings":
        return <EarningsDashboard />;

      case "ratings":
        return <RatingsAndReviews />;

      case "settings":
        return <AccountSettings />;

      case "payments":
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

      case "portfolio":
        return <Portfolio />;

      case "help":
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

      case "support":
        return <Support />;

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
        return (
          <CreatorDashboardHome
            user={user}
            stats={mockStats}
            socialStats={mockSocialStats}
            campaigns={mockCampaigns}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>{" "}
        {/* Replace with a proper loader component */}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <div>
        <LeftSidebar
          isOpen={isLeftSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isAvailable={isAvailable}
          setIsAvailable={setIsAvailable}
        />
      </div>

      {/* Right section (navbar + content) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          user={user}
          onMenuToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          onSidebarToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          isLeftSidebarOpen={isLeftSidebarOpen}
        />

        {/* Mobile backdrop */}
        {isMobile && isLeftSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsLeftSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className={`flex-1 bg-gray-50 overflow-y-auto`}>
            {renderContent()}
          </div>

          {/* Right Sidebar - Profile/Settings */}
          <Sidebar
            isOpen={isRightSidebarOpen}
            onClose={() => setIsRightSidebarOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
