import React from 'react';
import { 
  UserIcon, 
  CameraIcon, 
  BadgeCheckIcon, 
  TrendingUpIcon, 
  MailOpenIcon, 
  Sidebar,
  SearchIcon,
  XIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';

import Navbar from '../Creators/comp/Navbar';
import SideBar from '../Creators/comp/SideBar';

import { searchCampaigns } from '../../services/creators/CreatorsServices';

const CreatorDashboardHome = ({ user, stats, campaigns, socialStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  
  const placeholders = [
    "Search Campaigns...",
    "Search Brands...",
    "Search Product Niches...",
    "Search Keywords..."
  ];

  useEffect(() => {
    if (!isSearchActive) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setIsTransitioning(false);
        }, 400);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isSearchActive]);

  // If user is undefined, provide a default user object
  const defaultUser = {
    name: "Anushka",
    profilePicture: "https://avatar.iran.liara.run/public"
  };

  // Mock data - in a real application, these would come from props or context
  const profileCompletionPercentage = user.profileCompletionPercentage || 85;
  const performanceMetrics = stats || {
    ongoingCampaigns: 3,
    lastMonthEarnings: 1250,
    campaignsCompleted: 5
  };
  const socialMetrics = socialStats || {
    instagramFollowers: 5420,
    youtubeViews: 125000
  };
  const campaignInvitations = campaigns || [
    {
      id: 1,
      brandName: 'TechGear',
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
        brandName: 'Rangraze.in',
        type: 'Sponsored Content',
        budgetRange: '$350 - $500',
        deadline: '2024-02-20'
      }
  ];


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value && !isSearchActive) {
      setIsTransitioning(true);
      setIsSearchActive(true);
    } else if (!value && isSearchActive) {
      handleSearchClose();
    }

    // Debounce the API call
    const timeoutId = setTimeout(async () => {
      if (value) {
        const searchParams = {
          search: value,
          page: 1,
          limit: 20
        };
        try {
          const response = await searchCampaigns(searchParams);
          if (response.status === "success") {
            setSearchResults(response);
          }
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSearchClose = () => {
    setIsTransitioning(true);
    setIsSearchActive(false);
    setSearchQuery('');
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Main content wrapper */}  
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}>
        {/* Navbar */}
        <Navbar 
          user={user || defaultUser} 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section with Animation */}
            <div className={`transition-all duration-500 ease-in-out
              ${isSearchActive ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-6'}`}>
              <div className="bg-[#4778EC] shadow-md rounded-[10px] p-6">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h2 className="font-poppins text-[20px] font-[400] text-white mb-2">
                      Hello Anushka, Welcome back 👋
                    </h2>
                    <p className="font-poppins text-[14px] font-[400] text-white">
                      We're excited to have you on board! Here's your personalized dashboard<br />
                      where you can track your collaborations, earnings, and engagement<br />
                      insights—all in one place.
                    </p>
                  </div>
                  <button className="h-[50px] w-[140px] bg-white text-[#4778EC] rounded-md font-poppins hover:bg-opacity-90 transition-all">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Cards with Animation */}
            <div className={`grid grid-cols-4 gap-6 transition-all duration-500 ease-in-out
              ${isSearchActive ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-6'}`}>
              {/* Campaign Summary */}
              <div className="bg-indigo-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Campaign Summary
                  </h3>
                  <TrendingUpIcon className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Active</p>
                    <p className="font-bold text-indigo-600">{performanceMetrics.ongoingCampaigns}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Completed</p>
                    <p className="font-bold text-indigo-600">{performanceMetrics.campaignsCompleted}</p>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-emerald-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Earnings
                  </h3>
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Monthly</p>
                  <p className="font-bold text-emerald-600">${performanceMetrics.lastMonthEarnings}</p>
                </div>
              </div>

              {/* Portfolio */}
              <div className="bg-amber-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Portfolio
                  </h3>
                  <CameraIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Projects</p>
                    <p className="font-bold text-amber-600">12</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Views</p>
                    <p className="font-bold text-amber-600">1.2K</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-rose-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Pricing
                  </h3>
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Base Rate</p>
                    <p className="font-bold text-rose-600">$500</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Avg. Project</p>
                    <p className="font-bold text-rose-600">$1,200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section */}
            
            <div className={`fixed left-0 right-0 px-6 transition-all duration-500 ease-in-out z-10
              ${isSearchActive ? 'top-[80px]' : 'relative top-0'}`}>
              <div className="max-w-6xl mx-auto">
                <div className="relative">
                  <style>
                    {`
                      @keyframes slideOutLeft {
                        0% {
                          transform: translateX(0);
                          opacity: 1;
                        }
                        100% {
                          transform: translateX(-100%);
                          opacity: 0;
                        }
                      }

                      @keyframes slideInRight {
                        0% {
                          transform: translateX(100%);
                          opacity: 0;
                        }
                        100% {
                          transform: translateX(0);
                          opacity: 1;
                        }
                      }

                      .input-with-animated-placeholder::placeholder {
                        opacity: 1;
                        transform-origin: left;
                        transition: transform 0.3s, opacity 0.3s;
                      }

                      .input-with-animated-placeholder.transitioning::placeholder {
                        animation: slideOutLeft 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
                      }

                      .input-with-animated-placeholder:not(.transitioning)::placeholder {
                        animation: slideInRight 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
                      }
                    `}
                  </style>
                  <input
                    type="text"
                    placeholder={placeholders[placeholderIndex]}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`w-full p-4 pl-12 pr-12 rounded-lg border border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all bg-white shadow-lg
                      input-with-animated-placeholder
                      ${isTransitioning ? 'transitioning' : ''}`}
                  />
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  {isSearchActive && (
                    <button
                      onClick={handleSearchClose}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                {isSearchActive && (
                  <div className={`mt-4 transition-all duration-300 ease-in-out
                    ${searchQuery ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {searchQuery ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
                            {searchResults?.pagination && (
                              <p className="text-sm text-gray-600">
                                Page {searchResults.pagination.currentPage} of {searchResults.pagination.totalPages}
                              </p>
                            )}
                          </div>
                          {searchResults?.data && searchResults.data.length > 0 ? (
                            <ActiveCampaignsCards 
                              campaigns={searchResults.data.map(item => ({
                                id: item.id,
                                campaignName: item.name,
                                brand: {
                                  logo: "https://placeholder.com/150", // You might want to add a logo field in your API
                                  description: item.description,
                                  name: item.brand_name
                                },
                                budget: item.budget,
                                startDate: item.start_date,
                                endDate: item.end_date,
                                targetAudience: item.target_audience
                              }))}
                            />
                          ) : (
                            <p className="text-gray-500">No results found</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">Start typing to search...</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sidebar */}
      <SideBar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
    </div>
  );
};


const ActiveCampaignsCards = ({campaigns}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate total pages
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);
  

  return (
      <div className="active-campaigns-cards">
          <div className="cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
              padding: '20px'
          }}>
              {currentCampaigns.map(campaign => (
                  <div key={campaign.id} className="card" style={{
                      borderRadius: '16px',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden'
                  }}>
                      <div style={{
                          position: 'relative',
                          paddingTop: '56.25%' // 16:9 aspect ratio
                      }}>
                          <img 
                              src={campaign.brand.logo} 
                              alt="Campaign"
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0
                              }}
                          />
                      </div>
                      <div className="card-content" style={{ padding: '16px' }}>
                          <h3 style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '16px',
                              fontWeight: 600,
                              marginBottom: '8px'
                          }}>
                              {campaign.campaignName}
                          </h3>
                          <p style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              fontWeight: 400,
                              color: '#666',
                              marginBottom: '16px'
                          }}>
                              {campaign.brand.description}
                          </p>
                          <button style={{
                              backgroundColor: '#007BFF',
                              color: 'white',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: 'none',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              fontWeight: 500,
                              cursor: 'pointer'
                          }}>
                              Learn More
                          </button>
                      </div>
                  </div>
              ))}
          </div>
          
      </div>
  );
};

export default CreatorDashboardHome;