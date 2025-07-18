import React from "react";
import {
  UserIcon,
  CameraIcon,
  BadgeCheckIcon,
  TrendingUpIcon,
  MailOpenIcon,
  Sidebar,
  SearchIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

import Navbar from "../Creators/comp/Navbar";
import SideBar from "../Creators/comp/SideBar";

import { searchCampaigns } from "../../services/creators/CreatorsServices";

const CreatorDashboardHome = ({ user, stats, campaigns, socialStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchResults, setSearchResults] = useState(null);

  const placeholders = [
    "Search Campaigns...",
    "Search Brands...",
    "Search Product Niches...",
    "Search Keywords...",
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
  // const defaultUser = {
  //   name: "Anushka",
  //   profilePicture: "https://avatar.iran.liara.run/public"
  // };

  // Mock data - in a real application, these would come from props or context
  const profileCompletionPercentage = user.profileCompletionPercentage || 85;
  const performanceMetrics = stats || {
    ongoingCampaigns: 3,
    lastMonthEarnings: 1250,
    campaignsCompleted: 5,
  };
  const socialMetrics = socialStats || {
    instagramFollowers: 5420,
    youtubeViews: 125000,
  };
  const campaignInvitations = campaigns || [
    {
      id: 1,
      brandName: "TechGear",
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
      brandName: "Rangraze.in",
      type: "Sponsored Content",
      budgetRange: "$350 - $500",
      deadline: "2024-02-20",
    },
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
          limit: 20,
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
    setSearchQuery("");
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Main content wrapper */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "mr-80" : ""
        }`}
      >
        {/* Navbar */}
        <Navbar
          user={user}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section with Animation */}
            <div className="space-y-6 px-6">
              {/* Welcome Banner with Enhanced Animation */}
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
     ${
      isSearchActive
        ? "opacity-0 h-0 overflow-hidden -translate-y-4"
        : "opacity-100 mb-6 translate-y-0"
    }`}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg rounded-xl p-4 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                  <div className="absolute -right-5 -bottom-5 w-20 h-20 rounded-full bg-white/5"></div>

                  <div className="relative z-10 flex justify-between items-center">
                    <div className="flex flex-col max-w-2xl">
                      <h2 className="font-poppins text-2xl font-medium text-white mb-3">
                        Hello Anushka, Welcome back{" "}
                        <span className="animate-wiggle inline-block">👋</span>
                      </h2>
                      {/* <p className="font-poppins text-base font-normal text-white/90 leading-relaxed">
                        We're excited to have you on board! Here's your
                        personalized dashboard where you can track your
                        collaborations, earnings, and engagement insights—all in
                        one place.
                      </p> */}
                    </div>
                    <button
                      className="h-12 px-6 bg-white text-blue-600 rounded-lg font-poppins font-medium 
          hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 active:translate-y-0
          shadow-md hover:shadow-lg"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Dashboard Cards with Enhanced Animation */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
    ${
      isSearchActive
        ? "opacity-0 h-0 overflow-hidden -translate-y-4"
        : "opacity-100 mb-6 translate-y-0"
    }`}
              >
                {/* Campaign Summary Card */}
                <div
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 
      border-l-4 border-indigo-500 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Campaign Summary
                    </h3>
                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:rotate-6 transition-transform">
                      <TrendingUpIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-indigo-50 rounded-lg">
                      <p className="text-gray-600">Active</p>
                      <p className="font-bold text-indigo-700 text-lg">
                        {performanceMetrics.ongoingCampaigns}
                      </p>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-indigo-50 rounded-lg">
                      <p className="text-gray-600">Completed</p>
                      <p className="font-bold text-indigo-700 text-lg">
                        {performanceMetrics.campaignsCompleted}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Earnings Card */}
                <div
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 
      border-l-4 border-emerald-500 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Earnings
                    </h3>
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:rotate-6 transition-transform">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="text-gray-600 text-sm">Monthly</p>
                      <p className="font-bold text-emerald-700 text-xl">
                        ${performanceMetrics.lastMonthEarnings}
                      </p>
                    </div>
                    <div className="text-emerald-600 text-xs font-medium bg-white px-2 py-1 rounded-full">
                      +12% from last month
                    </div>
                  </div>
                </div>

                {/* Portfolio Card */}
                <div
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 
      border-l-4 border-amber-500 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Portfolio
                    </h3>
                    <div className="p-2 bg-amber-100 rounded-lg group-hover:rotate-6 transition-transform">
                      <CameraIcon className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-amber-50 rounded-lg">
                      <p className="text-gray-600">Projects</p>
                      <p className="font-bold text-amber-700 text-lg">12</p>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-amber-50 rounded-lg">
                      <p className="text-gray-600">Views</p>
                      <p className="font-bold text-amber-700 text-lg">1.2K</p>
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
                <div
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 
      border-l-4 border-rose-500 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Pricing
                    </h3>
                    <div className="p-2 bg-rose-100 rounded-lg group-hover:rotate-6 transition-transform">
                      <svg
                        className="w-6 h-6 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-rose-50 rounded-lg">
                      <p className="text-gray-600">Base Rate</p>
                      <p className="font-bold text-rose-700 text-lg">$500</p>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-rose-50 rounded-lg">
                      <p className="text-gray-600">Avg. Project</p>
                      <p className="font-bold text-rose-700 text-lg">$1,200</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Search Section */}
              <div
                className={`fixed left-0 right-0 px-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10
    ${isSearchActive ? "top-20" : "relative top-0"}`}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={placeholders[placeholderIndex]}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={`w-full p-4 pl-14 pr-12 rounded-xl border border-gray-200 
            focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
            transition-all bg-white shadow-lg text-gray-700
            ${
              isTransitioning
                ? "placeholder-transition-out"
                : "placeholder-transition-in"
            }
            focus:shadow-md focus:scale-[1.01]`}
                    />
                    <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {isSearchActive && (
                      <button
                        onClick={handleSearchClose}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Search Results with Enhanced Animation */}
                  {isSearchActive && (
                    <div
                      className={`mt-4 transition-all duration-300 ease-out
          ${
            searchQuery
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
                    >
                      <div className="bg-white rounded-xl shadow-xl p-6 max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-100">
                        {searchQuery ? (
                          <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                <SearchIcon className="w-5 h-5 mr-2 text-blue-500" />
                                Search Results
                              </h3>
                              {searchResults?.pagination && (
                                <div className="flex items-center space-x-2">
                                  <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                                    <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <span className="text-sm text-gray-600">
                                    Page {searchResults.pagination.currentPage}{" "}
                                    of {searchResults.pagination.totalPages}
                                  </span>
                                  <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              )}
                            </div>
                            {searchResults?.data &&
                            searchResults.data.length > 0 ? (
                              <ActiveCampaignsCards
                                campaigns={searchResults.data.map((item) => ({
                                  id: item.id,
                                  campaignName: item.name,
                                  brand: {
                                    logo:
                                      item.brand_logo ||
                                      "https://placeholder.com/150",
                                    description: item.description,
                                    name: item.brand_name,
                                  },
                                  budget: item.budget,
                                  startDate: item.start_date,
                                  endDate: item.end_date,
                                  targetAudience: item.target_audience,
                                }))}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center py-12">
                                <SearchIcon className="w-12 h-12 text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">
                                  No results found for "{searchQuery}"
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                  Try different keywords
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12">
                            <SearchIcon className="w-12 h-12 text-gray-300 mb-4 animate-pulse" />
                            <p className="text-gray-500">
                              Start typing to search campaigns, brands, or
                              categories
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                              {[
                                "Fashion",
                                "Beauty",
                                "Travel",
                                "Tech",
                                "Food",
                              ].map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

const ActiveCampaignsCards = ({ campaigns }) => {
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
      <div
        className="cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          padding: "20px",
        }}
      >
        {currentCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="card"
            style={{
              borderRadius: "16px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%", // 16:9 aspect ratio
              }}
            >
              <img
                src={campaign.brand.logo}
                alt="Campaign"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
            <div className="card-content" style={{ padding: "16px" }}>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {campaign.campaignName}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#666",
                  marginBottom: "16px",
                }}
              >
                {campaign.brand.description}
              </p>
              <button
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
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
