import { useState, useRef, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import CreatorPackagesAPI from "../../services/creators/CreatorsPackagesServices";
import { showSuccessToast } from "../lib/toast";

const ProfileManagement = ({
  name,
  email,
  location,
  phoneNumber,
  bio,
  niches,
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const tabsRef = useRef({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tabsContainerRef = useRef(null);

  const defaultUser = {
    fullName: name,
    profilePicture: "https://avatar.iran.liara.run/public",
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "niches", label: "Niches" },
    {
      id: "kyc",
      label: "KYC",
      badge: { text: "Coming Soon", color: "#F57C00", bgColor: "#FFF3E0" },
    },
    {
      id: "bankAccounts",
      label: "Bank Accounts",
      badge: { text: "Coming Soon", color: "#F57C00", bgColor: "#FFF3E0" },
    },
    { id: "packages", label: "Packages" },
  ];

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    if (activeTabElement) {
      setSliderWidth(activeTabElement.offsetWidth);
      setSliderOffset(activeTabElement.offsetLeft);
      
      // Scroll to active tab on mobile
      if (window.innerWidth < 768) {
        const container = tabsContainerRef.current;
        const tab = tabsRef.current[activeTab];
        if (container && tab) {
          const containerWidth = container.offsetWidth;
          const tabLeft = tab.offsetLeft;
          const tabWidth = tab.offsetWidth;
          const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            name={name}
            email={email}
            location={location}
            phoneNumber={phoneNumber}
            bio={bio}
          />
        );
      case "niches":
        return <NichesTab niches={niches} />;
      case "kyc":
        return <KYCTab />;
      case "bankAccounts":
        return <BankAccountsTab />;
      case "packages":
        return <PackagesTab />;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "mr-80" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Enhanced Tab Bar with Motion */}
          <div className="relative border-b border-gray-200 pb-1">
            <div 
              ref={tabsContainerRef}
              className="flex space-x-8 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 hide-scrollbar"
              style={{ scrollbarWidth: 'none' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabsRef.current[tab.id] = el)}
                  className={`relative py-3 px-1 text-sm font-medium focus:outline-none transition-colors duration-200 whitespace-nowrap
                                        ${
                                          activeTab === tab.id
                                            ? "text-indigo-600"
                                            : "text-gray-500 hover:text-gray-700"
                                        }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: tab.badge.bgColor,
                          color: tab.badge.color,
                        }}
                      >
                        {tab.badge.text}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-indigo-600"
              initial={false}
              animate={{
                width: sliderWidth,
                x: sliderOffset,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
            />
          </div>

          {/* Tab Content with Smooth Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 sm:mt-8"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// Enhanced ProfileTab Component
const ProfileTab = ({ name, email, location, phoneNumber, bio }) => {
  const [loading, setLoading] = useState(true);
  const [editStates, setEditStates] = useState({
    name: false,
    email: false,
    location: false,
    phoneNumber: false,
    bio: false,
  });

  const [values, setValues] = useState({
    name: name || "",
    email: email || "",
    location: location || "",
    phoneNumber: phoneNumber || "",
    bio: bio || "",
  });

  const [tempValues, setTempValues] = useState({
    name: name || "",
    email: email || "",
    location: location || "",
    phoneNumber: phoneNumber || "",
    bio: bio || "",
  });

  const [originalValues] = useState({
    name: name || "",
    email: email || "",
    location: location || "",
    phoneNumber: phoneNumber || "",
    bio: bio || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const hasChanges = () => {
    return Object.keys(values).some(
      (key) => values[key] !== originalValues[key]
    );
  };

  const handleChange = (field, value) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = (field) => {
    if (editStates[field]) {
      setValues((prev) => ({
        ...prev,
        [field]: tempValues[field],
      }));
    } else {
      setTempValues((prev) => ({
        ...prev,
        [field]: values[field],
      }));
    }
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleReset = () => {
    setValues(originalValues);
    setTempValues(originalValues);
    setEditStates({
      name: false,
      email: false,
      location: false,
      phoneNumber: false,
      bio: false,
    });
  };

  const handleUpdate = () => {
    showSuccessToast("Profile updated successfully!");
  };

  // Shimmer Components
  const ShimmerField = () => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );

  const ShimmerBio = () => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-24 bg-gray-200 rounded"></div>
    </div>
  );

  const ShimmerAvatar = () => (
    <div className="animate-pulse h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-gray-200"></div>
  );

  // Editable Components
  const EditableField = ({ label, field, placeholder, type = "text" }) => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (editStates[field] && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editStates[field]]);

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div className="relative">
          {editStates[field] ? (
            <input
              ref={inputRef}
              placeholder={placeholder}
              type={type}
              value={tempValues[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={(e) => {
                const relatedTarget = e.relatedTarget;
                if (
                  !relatedTarget ||
                  !relatedTarget.classList.contains("edit-button")
                ) {
                  toggleEdit(field);
                }
              }}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base"
            />
          ) : (
            <div
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-lg cursor-pointer text-sm sm:text-base"
              onClick={() => toggleEdit(field)}
            >
              {values[field] || placeholder}
            </div>
          )}
          <button
            className="edit-button absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => toggleEdit(field)}
          >
            {editStates[field] ? (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  };

  const EditableBio = () => {
    const textareaRef = useRef(null);

    return (
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">Bio</label>

        <div className="relative w-full">
          {!editStates.bio ? (
            <div
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-lg min-h-24 cursor-pointer text-sm sm:text-base"
              onClick={() => toggleEdit("bio")}
            >
              {values.bio || "Tell us about yourself..."}
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              placeholder="Tell us about yourself..."
              value={tempValues.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              onBlur={() => toggleEdit("bio")}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-24 text-sm sm:text-base"
            />
          )}
          <button
            className="edit-button absolute right-2 sm:right-3 top-8 text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => toggleEdit("bio")}
          >
            {editStates.bio ? (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 max-w-4xl space-y-6 sm:space-y-8">
        <ShimmerAvatar />

        <div className="border-t border-gray-200 my-4 sm:my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ShimmerField />
          <ShimmerField />
          <ShimmerField />
          <ShimmerField />
        </div>

        <ShimmerBio />

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
          <div className="h-10 sm:h-12 bg-gray-200 rounded-lg w-full sm:w-40"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded-lg w-full sm:w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full">
      <div className="flex flex-col items-start space-y-3 sm:space-y-4">
        <div className="relative group w-full sm:w-auto">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition-colors mx-auto sm:mx-0">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-1 sm:mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-xs sm:text-sm text-gray-500 text-center px-1 sm:px-2">
              Upload avatar
            </span>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
        </div>

        <div className="border-t border-gray-200 w-full my-4 sm:my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
          <EditableField
            label="Full Name"
            field="name"
            placeholder="Enter your full name"
          />

          <EditableField
            label="Email"
            field="email"
            placeholder="Enter your email"
            type="email"
          />

          <EditableField
            label="Location"
            field="location"
            placeholder="Enter your location"
          />

          <EditableField
            label="Phone Number"
            field="phoneNumber"
            placeholder="Enter your phone number"
            type="tel"
          />
        </div>

        <EditableBio />

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 w-full">
          <button
            onClick={handleUpdate}
            disabled={!hasChanges()}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors shadow-md text-sm sm:text-base
                            ${
                              hasChanges()
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
          >
            Update Profile
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Reset Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced BankAccountsTab Component
const BankAccountsTab = () => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "ifscCode" && value.length === 11) {
      fetchBankDetails(value);
    }
  };

  const fetchBankDetails = async (ifsc) => {
    setLoading(true);
    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      const data = await response.json();

      if (data) {
        setFormData((prev) => ({
          ...prev,
          bankName: data.BANK || "",
          branchName: data.BRANCH || "",
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch bank details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Bank Account Details
        </h2>
        <div className="mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
          Coming Soon
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder's Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="1234567890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="SBIN0001234"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              readOnly
              placeholder={loading ? "Fetching details..." : "Bank name"}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              readOnly
              placeholder={loading ? "Fetching details..." : "Branch name"}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md"
            disabled
          >
            Save Bank Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced KYCTab Component
const KYCTab = () => {
  const [kycStatus] = useState(false);
  const [formData, setFormData] = useState({
    aadharNumber: "",
    panNumber: "",
    documents: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files[0],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">KYC Verification</h2>
        <div
          className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
            kycStatus
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {kycStatus ? "Verified" : "Pending Verification"}
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aadhar Number
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number
            </label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              placeholder="ABCDE1234F"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors">
            <input
              type="file"
              name="documents"
              onChange={handleFileChange}
              className="hidden"
              id="document-upload"
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400 mb-2 sm:mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm sm:text-base text-gray-600 mb-1">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, JPG, PNG (Max size: 5MB)
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md"
            disabled
          >
            Submit for Verification
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced NichesTab Component
const NichesTab = ({ niches }) => {
  const [selectedNiches, setSelectedNiches] = useState(() => {
    if (!niches) return new Set();
    return new Set(niches.split(",").map((niche) => niche.trim()));
  });

  const categories = {
    "Content Preferences": [
      "Fashion, Lifestyle & Beauty",
      "Technology",
      "Food & Beverages",
      "Fitness & Wellness",
      "Travel & Adventure",
      "Entertainment",
      "Education & Careers",
      "Gaming",
      "Finance & Business",
      "Automotive",
      "Art & Creativity",
      "Environment & Sustainability",
      "Health & Medicine",
      "Pets & Animals",
      "Motivation & Personal Development",
    ],
  };

  const toggleNiche = (niche) => {
    const newSelected = new Set(selectedNiches);
    if (newSelected.has(niche)) {
      newSelected.delete(niche);
    } else {
      newSelected.add(niche);
    }
    setSelectedNiches(newSelected);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
        Your Content Niches
      </h2>

      {Object.entries(categories).map(([category, niches]) => (
        <div key={category} className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {niches.map((niche, index) => (
              <motion.div
                key={niche}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleNiche(niche)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer transition-colors duration-200 text-xs sm:text-sm
                                    ${
                                      selectedNiches.has(niche)
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                style={{
                  marginLeft: index % 2 === 1 ? "8px" : "0",
                  marginTop: index % 2 === 1 ? "4px" : "0",
                }}
              >
                {niche}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 sm:mt-8">
        <button
          className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md text-sm sm:text-base"
          disabled={!selectedNiches.size}
        >
          Save Niches
        </button>
      </div>
    </div>
  );
};

// Enhanced PackagesTab Component
const PackagesTab = () => {
  const [packages, setPackages] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [packageMode, setPackageMode] = useState("broadcast");
  const [formData, setFormData] = useState({
    package_type: "",
    price: "",
    features: "",
    delivery_time_days: "",
    target_brand: "",
  });

  const fetchPackages = async () => {
    try {
      setIsLoadingPackages(true);
      const response = await CreatorPackagesAPI.getPackages();
      if (response?.data) {
        setPackages(response.data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to fetch packages");
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const handleEditPackage = useCallback((pkg) => {
    setPackageMode(pkg.target_brand ? "targeted" : "broadcast");
    setFormData({
      package_type: pkg.package_type,
      price: pkg.price.toString(),
      features: Array.isArray(pkg.features)
        ? pkg.features.join("\n")
        : pkg.features,
      delivery_time_days: pkg.delivery_time_days.toString(),
      target_brand: pkg.target_brand || "",
    });
    setEditingPackage(pkg);
    setIsCreating(true);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      package_type: "",
      price: "",
      features: "",
      delivery_time_days: "",
      target_brand: "",
    });
    setPackageMode("broadcast");
    setIsCreating(false);
    setEditingPackage(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const processedFormData = {
        ...formData,
        features: formData.features
          .split("\n")
          .filter((feature) => feature.trim() !== ""),
        target_brand: packageMode === "targeted" ? formData.target_brand : null,
        price: parseFloat(formData.price),
        delivery_time_days: parseInt(formData.delivery_time_days),
      };

      if (editingPackage) {
        await CreatorPackagesAPI.updatePackage(
          editingPackage.id,
          processedFormData
        );
        toast.success("Package updated successfully!");
      } else {
        await CreatorPackagesAPI.createPackage(processedFormData);
        toast.success("Package created successfully!");
      }

      resetForm();
      await fetchPackages();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.message || "An error occurred while saving the package"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const PackageForm = useCallback(
    () => (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Package Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPackageMode("broadcast")}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all
                            ${
                              packageMode === "broadcast"
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1 sm:mb-2">🌐</span>
                <div className="font-medium text-sm sm:text-base">Broadcast</div>
                <div className="text-xs mt-1">Available to all brands</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPackageMode("targeted")}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all
                            ${
                              packageMode === "targeted"
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1 sm:mb-2">🎯</span>
                <div className="font-medium text-sm sm:text-base">Targeted</div>
                <div className="text-xs mt-1">For specific brands</div>
              </div>
            </button>
          </div>
        </div>

        {packageMode === "targeted" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand ID
            </label>
            <input
              type="text"
              name="target_brand"
              value={formData.target_brand}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter the brand's UUID"
              required={packageMode === "targeted"}
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Type
          </label>
          <input
            type="text"
            name="package_type"
            value={formData.package_type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="e.g., Basic, Standard, Premium"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Time (days)
            </label>
            <input
              type="number"
              name="delivery_time_days"
              value={formData.delivery_time_days}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter delivery time"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features (one per line)
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-32"
            placeholder="Enter features (one per line)"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md
                        ${
                          loading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-indigo-700"
                        }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {editingPackage ? "Updating..." : "Creating..."}
              </span>
            ) : editingPackage ? (
              "Update Package"
            ) : (
              "Create Package"
            )}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    ),
    [formData, packageMode, loading, editingPackage, handleInputChange]
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Packages</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-md text-sm sm:text-base"
          >
            Create New Package
          </button>
        )}
      </div>

      {isLoadingPackages ? (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="animate-pulse space-y-4 sm:space-y-6">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 sm:h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      ) : isCreating ? (
        <PackageForm />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                {pkg.target_brand && (
                  <div className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-2 sm:mb-3">
                    Targeted Package
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  {pkg.package_type}
                </h3>
                <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-3 sm:mb-4">
                  ₹{pkg.price}
                </div>
                <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-1 sm:mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Delivery in {pkg.delivery_time_days} days
                  </div>
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;