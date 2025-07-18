import { useState, useEffect } from "react";
import {
  User,
  Target,
  MapPin,
  Film,
  Mail,
  Lock,
  MailIcon,
  Link,
  UserCheck2,
} from "lucide-react";
import Select from "react-select";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaInstagram,
  FaMobile,
  FaYoutube,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import indianLanguages from "../assets/locale/indianLanguages";
import internationalLanguages from "../assets/locale/internationalLanguages";
import countriesAndCities from "../assets/coutriesAndCities";
import channelGenres from "../assets/genres";
import { showToast } from "./lib/toast";

import { useNavigate } from "react-router-dom";
import {
  registerUser,
  registerChannelDetails,
  creatorLogin,
} from "../services/creators/CreatorsServices";
import { Button } from "./ui/button";

// Function to store token securely (localStorage for simplicity, cookies recommended in production)

const RegistrationForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileType, setProfileType] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("jwt", token);
  };

  // Function to retrieve stored token
  const getToken = () => {
    return localStorage.getItem("jwt");
  };

  // Function to clear token (e.g., on logout)
  const clearToken = () => {
    localStorage.removeItem("jwt");
  };

  // Handle login after registration
  const handleNavigateToDashboard = async () => {
    const token = getToken();
    if (!token) return;
    navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const response = await creatorLogin(email, password);
      console.log("Login successful:", response.data);
      storeToken(response.data.token);
      handleNavigateToDashboard();
    } catch (error) {
      console.error("Login failed:", error);
      showToast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const [channelDetails, setChannelDetails] = useState({
    channelAge: "",
    subscribers: "",
    averageViews: "",
    contentType: "",
    postingFrequency: "",
    liveStreaming: "",
    collabType: "",
  });

  // Influencer form state
  const [influencerDetails, setInfluencerDetails] = useState({
    name: "",
    email: "",
    password: "",
    platform: "",
    channelLink: "",
  });

  const [personalDetails, setPersonalDetails] = useState({
    age: "",
    gender: "",
    country: "",
    city: "",
    contentLanguages: [],
    channelGenre: "",
    contentDescription: "",
  });

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    // Enhanced phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(phoneNumber)) {
      setStep(2);
    } else {
      showToast.error("Please enter a valid 10-digit phone number");
    }
  };

  const handleProfileTypeSelect = (type) => {
    setProfileType(type);
    if (type === "Influencer") {
      setStep(3); // Go to influencer details form
    } else {
      // For Brand, you might want to add additional steps or submit directly
      console.log(`Selected profile type: ${type}`);
      showToast.error(`Registration for ${type} with phone ${phoneNumber}`);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleInfluencerDetailsSubmit = (e) => {
    e.preventDefault();
    // Validate influencer details
    const { name, email, platform, channelLink } = influencerDetails;

    // Basic validation
    if (!name || !email || !platform || !channelLink) {
      showToast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast.error("Please enter a valid email address");
      return;
    }

    // If all validations pass
    console.log("Full Registration Details:", {
      phoneNumber,
      profileType,
      influencerDetails,
    });
    setStep(4);
  };

  const handleInfluencerDetailsChange = (e) => {
    const { name, value } = e.target;
    setInfluencerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "contentLanguages") {
      // Directly update the contentLanguages with the new selected values from react-select
      setPersonalDetails((prev) => ({
        ...prev,
        [name]: value.map((option) => option.value), // Map to extract only the language values from the options
      }));
    } else {
      setPersonalDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    // const {
    //     age, gender, country, city,
    //     contentLanguages, channelGenre, contentDescription
    // } = personalDetails;
    // // If all validations pass
    // console.log('Full Registration Details:', {
    //     phoneNumber,
    //     profileType,
    //     influencerDetails,
    //     personalDetails
    // });
    const registrationData = {
      // Phone number details
      // phoneNumber,
      // profileType,

      // Influencer details
      fullName: influencerDetails.name,
      email: influencerDetails.email,
      password: influencerDetails.password,
      primaryPlatforms: influencerDetails.platform,
      channelLink: influencerDetails.channelLink,

      // Personal details
      age: personalDetails.age,
      gender: personalDetails.gender,
      country: personalDetails.country,
      city: personalDetails.city,
      contentLanguages: personalDetails.contentLanguages,
      channelGenre: personalDetails.channelGenre,
      contentDescription: personalDetails.contentDescription,

      // Channel details for [/* instagram and youtube */] to be added later.
    };
    console.log(registrationData);
    try {
      setIsLoading(true);
      const response = await registerUser(registrationData).then((value) => {
        setIsLoading(false);
      });
      console.log("Response body", response);
      showToast.success("Registration successful! Welcome aboard.");
    } catch (error) {
      setIsLoading(false);
      showToast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  // Prepare country options for react-select
  const countryOptions = Object.keys(countriesAndCities).map((country) => ({
    label: country,
    value: country,
  }));

  const cityOptions = personalDetails.country
    ? countriesAndCities[personalDetails.country]?.map((city) => ({
        label: city,
        value: city,
      }))
    : [];

  // Handle form input changes
  const handleChannelDetailsChange = (event) => {
    const { name, value } = event.target;
    setChannelDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleChannelDetailsSubmit = (event) => {
    event.preventDefault();
    console.log("Channel Details Submitted:", channelDetails);
    // Add logic to handle the submission (e.g., API call or navigation)
    setStep(6);
  };

  const [instagramDetails, setInstagramDetails] = useState({
    accountName: "",
    accountAge: "",
    followers: "",
    avgReelViews: "",
    avgComments: "",
    avgLikes: "",
    engagementRate: "",
  });

  const handleInstagramDetailsChange = (e) => {
    const { name, value } = e.target;
    setInstagramDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInstagramDetailsSubmit = async (e) => {
    e.preventDefault();
    const {
      accountName,
      accountAge,
      followers,
      avgReelViews,
      avgComments,
      avgLikes,
      engagementRate,
    } = instagramDetails;

    const combinedDetails = {
      ...channelDetails,
      ...instagramDetails,
    };
    console.log(combinedDetails);

    const allFieldsFilled = Object.values(combinedDetails).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) {
      showToast.error("Please fill in all fields");
      return;
    }

    try {
      // Call the API function
      const response = await registerChannelDetails(combinedDetails);
      console.log("API Response:", response);
      showToast.success(
        "Channel and Instagram details submitted successfully!"
      );
      navigate("/dashboard"); // Navigate to the dashboard or another page
    } catch (error) {
      console.error("Error submitting details:", error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now(); // Check if token is expired
        if (!isExpired) {
          handleNavigateToDashboard();
          // Redirect to dashboard if token is valid
        } else {
          navigate("/creatorsAuth");
          clearToken(); // Clear expired token
        }
      } catch (error) {
        console.error("Invalid Token:", error);
        navigate("/creatorsAuth");
        clearToken();
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black md:p-4 ">
      <div className="w-full max-w-md">
        {step === 1 && !showLoginForm && (
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
                  Join Our Community
                </h1>
                <p className="text-gray-900 text-sm sm:text-base">
                  Start your journey with us today
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400">+91</span>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter 10-digit number"
                      maxLength="10"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  variant="default"
                  size="full"
                  className="py-3 text-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.01] shadow-lg"
                >
                  Send Verification Code
                </Button>
              </div>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink mx-4 text-gray-800 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-800"></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <FaInstagram className="text-pink-500 mr-2" size={18} />
                  Instagram
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <FaYoutube className="text-red-500 mr-2" size={18} />
                  YouTube
                </button>
              </div>

              <p className="text-center text-gray-700 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowLoginForm(true)}
                  className="font-medium text-blue-500 hover:text-blue-900 hover:underline focus:outline-none transition-colors"
                >
                  Login as an Influencer
                </button>
              </p>
            </form>
          </div>
        )}

        {showLoginForm && (
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
                  Influencer Login
                </h2>
                <p className="text-gray-900 text-sm sm:text-base">
                  Welcome back to your community
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="full"
                  className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all transform hover:scale-[1.01]"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink mx-4 text-gray-800 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-800"></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  variant="default"
                  size="full"
                  className="font-medium  bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <FaGoogle className="text-red-500 mr-2" size={18} />
                  Google
                </Button>
                <Button
                  variant="default"
                  size="full"
                  className="font-medium  bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  <FaInstagram className="text-pink-500 mr-2" size={18} />
                  Instagram
                </Button>
              </div>

              <p className="text-center text-gray-700 text-sm">
                <button
                  type="button"
                  onClick={() => setShowLoginForm(false)}
                  className="font-medium text-blue-500 hover:text-blue-900 hover:underline focus:outline-none transition-colors"
                >
                  Back to Phone Verification
                </button>
              </p>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
                  Choose Your Profile Type
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Select how you'll use the platform
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleProfileTypeSelect("Brand")}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-400 rounded-xl hover:border-blue-500 hover:shadow-md bg-white transition-all duration-300 space-y-3 group"
                >
                  <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Target className="text-blue-600" size={32} />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg">
                    As a Brand
                  </span>
                  <p className="text-sm text-gray-500 text-center">
                    Create campaigns, find influencers
                  </p>
                </button>

                <button
                  onClick={() => handleProfileTypeSelect("Influencer")}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-400 rounded-xl hover:border-purple-500 hover:shadow-md bg-white transition-all duration-300 space-y-3 group"
                >
                  <div className="p-3 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    <User className="text-purple-600" size={32} />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg">
                    As an Influencer
                  </span>
                  <p className="text-sm text-gray-500 text-center ">
                    Find brand collaborations
                  </p>
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 rounded-lg transition-colors duration-300"
              >
                Back to Phone Number
              </button>
            </div>
          </div>
        )}

        {step === 3 && profileType === "Influencer" && (
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form
              onSubmit={handleInfluencerDetailsSubmit}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
                  Influencer Profile
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Complete your profile information
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={influencerDetails.name}
                      onChange={handleInfluencerDetailsChange}
                      placeholder="Ex. Shri"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={influencerDetails.email}
                      onChange={handleInfluencerDetailsChange}
                      placeholder="Example@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="platform"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Primary Platform
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaMobile className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="platform"
                      name="platform"
                      value={influencerDetails.platform}
                      onChange={handleInfluencerDetailsChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    >
                      <option value="" disabled>
                        Select Platform
                      </option>
                      <option value="youtube">YouTube Channel</option>
                      <option value="instagram">Instagram Channel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="channelLink"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Channel/Profile Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Link className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="channelLink"
                      name="channelLink"
                      value={influencerDetails.channelLink}
                      onChange={handleInfluencerDetailsChange}
                      placeholder="Paste your channel/profile link"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={influencerDetails.password}
                      onChange={handleInfluencerDetailsChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={influencerDetails.confirmPassword}
                      onChange={handleInfluencerDetailsChange}
                      placeholder="Confirm your password"
                      onBlur={() => {
                        // Validate on blur
                        if (
                          influencerDetails.password !==
                          influencerDetails.confirmPassword
                        ) {
                          setPasswordError("Passwords do not match");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {influencerDetails.password &&
                    influencerDetails.confirmPassword &&
                    influencerDetails.password !==
                      influencerDetails.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/2 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-[1.01] shadow-lg"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form onSubmit={handlePersonalDetailsSubmit}>
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                  <MapPin
                    className="text-gradient-to-r from-blue-600 to-purple-600"
                    size={28}
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Unlock Your Content Creator Journey!
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Let's customize your profile
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Personal Information Card */}
                <div className=" grid-cols-3  rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <User className="text-blue-600" size={16} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Age
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <UserCheck2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={personalDetails.age}
                          onChange={handlePersonalDetailsChange}
                          placeholder="e.g. 25"
                          min="13"
                          max="120"
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={personalDetails.gender}
                        onChange={handlePersonalDetailsChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="B">Non-Binary</option>
                        <option value="N">Prefer Not to Say</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-200 mb-2"
                      >
                        Country
                      </label>
                      <Select
                        id="country"
                        name="country"
                        options={countryOptions}
                        value={countryOptions.find(
                          (option) => option.value === personalDetails.country
                        )}
                        onChange={(selectedOption) =>
                          setPersonalDetails((prev) => ({
                            ...prev,
                            country: selectedOption?.value || "",
                            city: "",
                          }))
                        }
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select country"
                        isSearchable
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: "44px",
                            backgroundColor: "#374151",
                            borderColor: "#4B5563",
                            borderRadius: "0.5rem",
                            "&:hover": { borderColor: "#4B5563" },
                            boxShadow: "none",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "white",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? "#1E40AF"
                              : isFocused
                              ? "#4B5563"
                              : "#374151",
                            color: "white",
                            "&:active": {
                              backgroundColor: "#1E40AF",
                            },
                          }),
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City
                      </label>
                      <Select
                        id="city"
                        name="city"
                        options={cityOptions}
                        value={cityOptions.find(
                          (option) => option.value === personalDetails.city
                        )}
                        onChange={(selectedOption) =>
                          setPersonalDetails((prev) => ({
                            ...prev,
                            city: selectedOption?.value || "",
                          }))
                        }
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select city"
                        isSearchable
                        isDisabled={!personalDetails.country}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: "44px",
                            borderColor: "#4B5563",
                            borderRadius: "0.5rem",
                            backgroundColor: !personalDetails.country
                              ? "#374151"
                              : "#4B5563",
                            "&:hover": { borderColor: "#4B5563" },
                            boxShadow: "none",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "white",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? "#1E40AF"
                              : isFocused
                              ? "#4B5563"
                              : "#374151",
                            color: "white",
                            "&:active": {
                              backgroundColor: "#1E40AF",
                            },
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Information Card */}
                <div className=" rounded-xl shadow-sm">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Film className="text-purple-600" size={16} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Content Information
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content Languages
                      </label>

                      <Select
                        isMulti
                        name="contentLanguages"
                        options={[
                          {
                            label: "Indian Languages",
                            options: indianLanguages.map((lang) => ({
                              value: lang,
                              label: lang,
                            })),
                          },
                          {
                            label: "International Languages",
                            options: internationalLanguages.map((lang) => ({
                              value: lang,
                              label: lang,
                            })),
                          },
                        ]}
                        value={personalDetails.contentLanguages
                          .filter((lang) => lang)
                          .map((lang) => ({
                            value: lang,
                            label: lang,
                          }))}
                        onChange={(selectedOptions) => {
                          setPersonalDetails((prev) => ({
                            ...prev,
                            contentLanguages: selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : [],
                          }));
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select your content language"
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: "44px",
                            backgroundColor: "#374151",
                            borderColor: "#4B5563",

                            borderRadius: "0.5rem",
                            "&:hover": {
                              borderColor: "#4B5563",
                            },
                            boxShadow: "none",
                          }),
                          input: (base) => ({
                            ...base,
                            color: "white",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#374151",
                            borderColor: "#4B5563",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? "#1E40AF"
                              : isFocused
                              ? "#4B5563"
                              : "#374151",
                            color: "white",
                            "&:active": {
                              backgroundColor: "#1E40AF",
                            },
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#1E40AF",
                            borderRadius: "0.375rem",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "white",
                            fontWeight: "500",
                            padding: "2px 6px",
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: "#93C5FD",
                            ":hover": {
                              backgroundColor: "#1D4ED8",
                              color: "white",
                            },
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            padding: "4px 8px",
                          }),
                          indicatorsContainer: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                            "&:hover": {
                              color: "#D1D5DB",
                            },
                          }),
                          clearIndicator: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                            "&:hover": {
                              color: "#D1D5DB",
                            },
                          }),
                          indicatorSeparator: (base) => ({
                            ...base,
                            backgroundColor: "#4B5563",
                          }),
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="channelGenre"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Content Niche
                      </label>
                      <select
                        id="channelGenre"
                        name="channelGenre"
                        value={personalDetails.channelGenre}
                        onChange={handlePersonalDetailsChange}
                        className="w-full px-2 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                        required
                      >
                        <option value="">Select your primary niche</option>
                        {channelGenres.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contentDescription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Content Description
                      </label>
                      <textarea
                        id="contentDescription"
                        name="contentDescription"
                        value={personalDetails.contentDescription}
                        onChange={handlePersonalDetailsChange}
                        placeholder="Describe your content style, audience, and unique value..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Processing...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 5 && (
          <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form onSubmit={handleChannelDetailsSubmit} className="space-y-6">
              {/* Header Section */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                  <FaYoutube className="text-red-600" size={28} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Channel Details
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  This information helps us understand your audience and content
                  style
                </p>
              </div>

              <div className="space-y-4">
                {/* Channel Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="channelAge"
                      className="text-sm font-medium text-gray-700 mb-2 md:min-h-[3rem] flex items-center"
                    >
                      Channel Age (months)
                    </label>
                    <input
                      type="number"
                      id="channelAge"
                      name="channelAge"
                      value={channelDetails.channelAge}
                      onChange={handleChannelDetailsChange}
                      placeholder="e.g. 12"
                      min="0"
                      max="1200"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="subscribers"
                      className="text-sm font-medium text-gray-700 mb-2 md:pt-1 md:min-h-[3rem] flex items-start"
                    >
                      Subscribers
                    </label>
                    <input
                      type="number"
                      id="subscribers"
                      name="subscribers"
                      value={channelDetails.subscribers}
                      onChange={handleChannelDetailsChange}
                      placeholder="e.g. 10000"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="averageViews"
                      className="text-sm font-medium text-gray-700 mb-2 md:min-h-[3rem] flex items-center"
                    >
                      Avg. Views (last 10)
                    </label>
                    <input
                      type="number"
                      id="averageViews"
                      name="averageViews"
                      value={channelDetails.averageViews}
                      onChange={handleChannelDetailsChange}
                      placeholder="e.g. 5000"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Content Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contentType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Content Type
                    </label>
                    <select
                      id="contentType"
                      name="contentType"
                      value={channelDetails.contentType}
                      onChange={handleChannelDetailsChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    >
                      <option value="">Select Type</option>
                      {[
                        "Shorts",
                        "Long (< 3min)",
                        "Long (> 3min <10min)",
                        "Podcasts",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="postingFrequency"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Posting Frequency (days)
                    </label>
                    <input
                      type="number"
                      id="postingFrequency"
                      name="postingFrequency"
                      value={channelDetails.postingFrequency}
                      onChange={handleChannelDetailsChange}
                      placeholder="e.g. 7"
                      min="1"
                      max="365"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="liveStreaming"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Live Streaming?
                    </label>
                    <select
                      id="liveStreaming"
                      name="liveStreaming"
                      value={channelDetails.liveStreaming}
                      onChange={handleChannelDetailsChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    >
                      <option value="">Select Option</option>
                      {["Yes", "No"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="collabType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Collaboration Type
                    </label>
                    <select
                      id="collabType"
                      name="collabType"
                      value={channelDetails.collabType}
                      onChange={handleChannelDetailsChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    >
                      <option value="">Select Type</option>
                      {[
                        "Exclusive Collab",
                        "Background Collab",
                        "In-Between Video",
                        "Indirect",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01] shadow-lg"
                >
                  Submit Channel Details
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 6 && (
          <div className="max-w-md mx-auto p-6 sm:p-8 bg-white/90 md:rounded-2xl shadow-2xl">
            <form onSubmit={handleInstagramDetailsSubmit} className="space-y-6">
              {/* Header Section */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-4">
                  <FaInstagram className="text-pink-600" size={28} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Instagram Profile
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Provide details about your account
                </p>
              </div>

              <div className="space-y-4">
                {/* Account Info */}
                <div>
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Account Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={instagramDetails.accountName}
                    onChange={handleInstagramDetailsChange}
                    placeholder="Enter your Instagram handle"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                    required
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="accountAge"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Account Age (months)
                    </label>
                    <input
                      type="number"
                      id="accountAge"
                      name="accountAge"
                      value={instagramDetails.accountAge}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 12"
                      min="0"
                      max="1200"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="followers"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Followers
                    </label>
                    <input
                      type="number"
                      id="followers"
                      name="followers"
                      value={instagramDetails.followers}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 10000"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Engagement Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="avgReelViews"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Avg. Reel Views
                    </label>
                    <input
                      type="number"
                      id="avgReelViews"
                      name="avgReelViews"
                      value={instagramDetails.avgReelViews}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 5000"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="avgLikes"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Avg. Likes
                    </label>
                    <input
                      type="number"
                      id="avgLikes"
                      name="avgLikes"
                      value={instagramDetails.avgLikes}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 1000"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="avgComments"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Avg. Comments
                    </label>
                    <input
                      type="number"
                      id="avgComments"
                      name="avgComments"
                      value={instagramDetails.avgComments}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 100"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="engagementRate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Engagement Rate (%)
                    </label>
                    <input
                      type="number"
                      id="engagementRate"
                      name="engagementRate"
                      value={instagramDetails.engagementRate}
                      onChange={handleInstagramDetailsChange}
                      placeholder="e.g. 3.5"
                      step="0.1"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all transform hover:scale-[1.01] shadow-lg"
                >
                  Submit Instagram Data
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;

/*

in this code, I want to handle session. When a user first signs up and done with submitting till instagram details, it should call login api using the stored jwt token and if this jwt token is there then navigate to the dashboard automatically when webiste refreshes.
*/
