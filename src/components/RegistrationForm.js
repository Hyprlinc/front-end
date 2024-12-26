import React, { useState, useEffect } from 'react';
import { Phone, User, Target, CheckCircle, MapPin } from 'lucide-react';
import Select from 'react-select';
import { FaYoutube } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import indianLanguages from '../assets/locale/indianLanguages';
import internationalLanguages from '../assets/locale/internationalLanguages';
import countriesAndCities from '../assets/coutriesAndCities';
import channelGenres from '../assets/genres';

import { useNavigate } from 'react-router-dom';
import { registerUser, registerChannelDetails, creatorLogin, fetchCreatorProfile } from '../services/creators/CreatorsServices';


// Function to store token securely (localStorage for simplicity, cookies recommended in production)




const RegistrationForm = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileType, setProfileType] = useState('');

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Logic for influencer login
    };


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
        navigate('/dashboard')
       
    };

    const handleLogin = async () => {
        try {
            const response = await creatorLogin(email, password);
            console.log("Response from API", response.data)
            storeToken(response.data.token);
            handleNavigateToDashboard();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    const [channelDetails, setChannelDetails] = useState({
        channelAge: '',
        subscribers: '',
        averageViews: '',
        contentType: '',
        postingFrequency: '',
        liveStreaming: '',
        collabType: '',
    });

    // Influencer form state
    const [influencerDetails, setInfluencerDetails] = useState({
        name: '',
        email: '',
        password: '',
        platform: '',
        channelLink: ''
    });

    const [personalDetails, setPersonalDetails] = useState({
        age: '',
        gender: '',
        country: '',
        city: '',
        contentLanguages: [],
        channelGenre: '',
        contentDescription: ''
    });

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        // Enhanced phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        if (phoneRegex.test(phoneNumber)) {
            setStep(2);
        } else {
            alert('Please enter a valid 10-digit phone number');
        }
    };

    const handleProfileTypeSelect = (type) => {
        setProfileType(type);
        if (type === 'Influencer') {
            setStep(3); // Go to influencer details form
        } else {
            // For Brand, you might want to add additional steps or submit directly
            console.log(`Selected profile type: ${type}`);
            alert(`Registration for ${type} with phone ${phoneNumber}`);
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleInfluencerDetailsSubmit = (e) => {
        e.preventDefault();
        // Validate influencer details
        const { name, email, platform, channelLink } = influencerDetails;

        // Basic validation
        if (!name || !email || !platform || !channelLink) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // If all validations pass
        console.log('Full Registration Details:', {
            phoneNumber,
            profileType,
            influencerDetails
        });
        setStep(4)
    };

    const handleInfluencerDetailsChange = (e) => {
        const { name, value } = e.target;
        setInfluencerDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePersonalDetailsChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'contentLanguages') {
            // Directly update the contentLanguages with the new selected values from react-select
            setPersonalDetails(prev => ({
                ...prev,
                [name]: value.map(option => option.value) // Map to extract only the language values from the options
            }));
        }
        else {
            setPersonalDetails(prev => ({
                ...prev,
                [name]: value
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
            const response = await registerUser(registrationData).then((value) => { setIsLoading(false) });
            console.log("Response body", response);
            alert("Registration Successful")
            setStep(5);
        } catch (error) {
            setIsLoading(false);
            alert("Something went wrong" || error);
            console.error(error)
        }

    };


    // Prepare country options for react-select
    const countryOptions = Object.keys(countriesAndCities).map(country => ({
        label: country,
        value: country,
    }));

    const cityOptions = personalDetails.country
        ? countriesAndCities[personalDetails.country]?.map(city => ({
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
        console.log('Channel Details Submitted:', channelDetails);
        // Add logic to handle the submission (e.g., API call or navigation)
        setStep(6)
    };

    const [instagramDetails, setInstagramDetails] = useState({
        accountName: '',
        accountAge: '',
        followers: '',
        avgReelViews: '',
        avgComments: '',
        avgLikes: '',
        engagementRate: ''
    });

    const handleInstagramDetailsChange = (e) => {
        const { name, value } = e.target;
        setInstagramDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [showPassword, setShowPassword] = useState(false);


    const handleInstagramDetailsSubmit = async (e) => {
        e.preventDefault();
        const {
            accountName, accountAge, followers,
            avgReelViews, avgComments, avgLikes, engagementRate
        } = instagramDetails;

        const combinedDetails = {
            ...channelDetails,
            ...instagramDetails,
        };
        console.log(combinedDetails);

        const allFieldsFilled = Object.values(combinedDetails).every((field) => field.trim() !== '');
        if (!allFieldsFilled) {
            alert('Please fill in all fields');
            return;
        }

        try {
            // Call the API function
            const response = await registerChannelDetails(combinedDetails);
            console.log('API Response:', response);
            alert('Channel and Instagram details submitted successfully!');
            navigate('/dashboard'); // Navigate to the dashboard or another page
        } catch (error) {
            console.error('Error submitting details:', error);
        }

    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now(); // Check if token is expired
                if (!isExpired) {
                    handleNavigateToDashboard()
                    // Redirect to dashboard if token is valid
                } else {
                    navigate('/');
                    clearToken(); // Clear expired token
                }
            } catch (error) {
                console.error("Invalid Token:", error);
                navigate('/')
                clearToken();
            }
        }
    }, [navigate]);



    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-gray p-4">
            <div className="bg-white shadow-md rounded-lg w-full p-8" style={{ maxWidth: '600px' }}>


                {step === 1 && !showLoginForm && (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                        <div className="text-center">
                            <Phone className="mx-auto mb-4 text-brand-blue" size={48} />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Enter Your Phone Number
                            </h2>
                            <p className="text-gray-600 mt-2">We'll send a verification code</p>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-600">+91</span>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter 10-digit number"
                                    maxLength="10"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-blue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Send Verification Code
                        </button>
                        <p className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setShowLoginForm(true)}
                                className="text-brand-blue hover:underline focus:outline-none"
                            >
                                Login as an Influencer
                            </button>
                        </p>
                    </form>
                )}

                {showLoginForm && (
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800">Influencer Login</h2>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="w-full bg-brand-blue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                        <p className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setShowLoginForm(false)}
                                className="text-gray-600 hover:underline focus:outline-none"
                            >
                                Back to Phone Verification
                            </button>
                        </p>
                    </form>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <User className="mx-auto mb-4 text-brand-blue" size={48} />
                            <h2 className="text-2xl font-bold text-gray-800">Choose Your Profile Type</h2>
                            <p className="text-gray-600 mt-2">Select how you'll use the platform</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleProfileTypeSelect('Brand')}
                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition duration-300 space-y-3"
                            >
                                <Target className="text-brand-blue" size={36} />
                                <span className="font-semibold text-gray-800">As a Brand</span>
                                <p className="text-xs text-gray-500 text-center">Create campaigns, find influencers</p>
                            </button>
                            <button
                                onClick={() => handleProfileTypeSelect('Influencer')}
                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg hover:border-brand-blue hover:bg-blue-50 transition duration-300 space-y-3"
                            >
                                <User className="text-brand-blue" size={36} />
                                <span className="font-semibold text-gray-800">As an Influencer</span>
                                <p className="text-xs text-gray-500 text-center">Find brand collaborations</p>
                            </button>
                        </div>
                        <button
                            onClick={() => setStep(1)}
                            className="w-full text-brand-blue py-2 rounded-md hover:bg-blue-50 transition duration-300"
                        >
                            Back to Phone Number
                        </button>
                    </div>
                )}

                {step === 3 && profileType === 'Influencer' && (
                    <form onSubmit={handleInfluencerDetailsSubmit} className="space-y-6">
                        <div className="text-center">
                            <CheckCircle className="mx-auto mb-4 text-brand-blue" size={48} />
                            <h2 className="text-2xl font-bold text-gray-800">Influencer Profile Details</h2>
                            <p className="text-gray-600 mt-2">Complete your profile information</p>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={influencerDetails.name}
                                onChange={handleInfluencerDetailsChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={influencerDetails.email}
                                onChange={handleInfluencerDetailsChange}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="platform" className="block text-gray-700 mb-2">Primary Platform</label>
                            <select
                                id="platform"
                                name="platform"
                                value={influencerDetails.platform}
                                onChange={handleInfluencerDetailsChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            >
                                <option value="">Select Platform</option>
                                <option value="youtube">YouTube Channel</option>
                                <option value="instagram">Instagram Channel</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="channelLink" className="block text-gray-700 mb-2">Channel/Profile Link</label>
                            <input
                                type="url"
                                id="channelLink"
                                name="channelLink"
                                value={influencerDetails.channelLink}
                                onChange={handleInfluencerDetailsChange}
                                placeholder="Paste your channel/profile link"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        {/* Password and Confirm Password Fields Side by Side */}
                        <div className="flex space-x-9">
                            {/* Password Field */}
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={influencerDetails.password}
                                        onChange={handleInfluencerDetailsChange}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? 'Hide' : 'View'}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="w-1/2">
                                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={influencerDetails.confirmPassword}
                                        onChange={handleInfluencerDetailsChange}
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                        required
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                                    >
                                        {showConfirmPassword ? 'Hide' : 'View'}
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="w-1/2 text-brand-blue border border-brand-blue py-2 rounded-md hover:bg-blue-50 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-brand-blue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}

                {step === 4 && (
                    <form onSubmit={handlePersonalDetailsSubmit} className="max-w-3xl mx-auto space-y-4">
                        <div className="text-center">
                            <MapPin className="mx-auto mb-2 text-brand-blue" size={40} />
                            <h2 className="text-xl font-bold text-gray-800">Unlock Your Content Creator Journey!</h2>
                            <p className="text-gray-600 text-sm">Let's Customize Your Profile</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className="block text-gray-700 text-sm mb-1">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={personalDetails.age}
                                    onChange={handlePersonalDetailsChange}
                                    placeholder="Enter age"
                                    min="13"
                                    max="120"
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-gray-700 text-sm mb-1">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={personalDetails.gender}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    {[
                                        { label: 'Male', value: 'M' },
                                        { label: 'Female', value: 'F' },
                                        { label: 'Non-Binary', value: 'B' },
                                        { label: 'Prefer Not to Say', value: 'N' },
                                    ].map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-gray-700 text-sm mb-1">Country</label>
                                <Select
                                    id="country"
                                    name="country"
                                    options={countryOptions}
                                    value={countryOptions.find(option => option.value === personalDetails.country)} // Match the selected country
                                    onChange={(selectedOption) => setPersonalDetails((prev) => ({
                                        ...prev,
                                        country: selectedOption ? selectedOption.value : '', // Safely update country
                                    }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    placeholder="Select Country"
                                    isSearchable
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-gray-700 text-sm mb-1">City</label>
                                <Select
                                    id="city"
                                    name="city"
                                    options={cityOptions}
                                    value={cityOptions.find(option => option.value === personalDetails.city)} // Match the selected city
                                    onChange={(selectedOption) => setPersonalDetails((prev) => ({
                                        ...prev,
                                        city: selectedOption ? selectedOption.value : '', // Update city
                                    }))}
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    placeholder="Select City"
                                    isSearchable
                                    isDisabled={!personalDetails.country} // Disable city dropdown if no country is selected
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Content Languages</label>
                            <Select
                                isMulti
                                name="contentLanguages"
                                options={[
                                    { label: 'Indian Languages', options: indianLanguages.map(lang => ({ value: lang, label: lang })) },
                                    { label: 'International Languages', options: internationalLanguages.map(lang => ({ value: lang, label: lang })) }
                                ]}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={personalDetails.contentLanguages.map(lang => ({ value: lang, label: lang }))} // Format for react-select
                                onChange={(selectedOptions) => {
                                    handlePersonalDetailsChange({
                                        target: {
                                            name: 'contentLanguages',
                                            value: selectedOptions || []
                                        }
                                    });
                                }}
                                placeholder="Select languages"
                            />
                        </div>

                        <div>
                            <label htmlFor="channelGenre" className="block text-gray-700 text-sm mb-1">Channel Genre</label>
                            <select
                                id="channelGenre"
                                name="channelGenre"
                                value={personalDetails.channelGenre}
                                onChange={handlePersonalDetailsChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            >
                                <option value="">Select Channel Genre</option>
                                {channelGenres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="contentDescription" className="block text-gray-700 text-sm mb-1">
                                How Would You Describe Your Content?
                            </label>
                            <textarea
                                id="contentDescription"
                                name="contentDescription"
                                value={personalDetails.contentDescription}
                                onChange={handlePersonalDetailsChange}
                                placeholder="Share a detailed description of your content, style, and unique value proposition"
                                rows="3"
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="w-1/2 text-brand-blue border border-brand-blue py-2 rounded-md text-sm hover:bg-blue-50 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="loading-spinner">
                                        <span>Loading...</span>
                                        {/* You can replace this with a more sophisticated spinner */}
                                    </div>
                                ) : (
                                    'Complete Registration'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {step === 5 && (
                    <form onSubmit={handleChannelDetailsSubmit} className="max-w-3xl mx-auto space-y-4">
                        <div className="text-center">
                            <FaYoutube className="mx-auto mb-2 text-brand-blue" size={40} />
                            <h2 className="text-xl font-bold text-gray-800">Let's Learn About Your Channel!</h2>
                            <p className="text-gray-600 text-sm">This information helps us understand your audience and content style</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="channelAge" className="block text-gray-700 text-sm mb-1">How old is the channel?</label>
                                <input
                                    type="number"
                                    id="channelAge"
                                    name="channelAge"
                                    value={channelDetails.channelAge}
                                    onChange={handleChannelDetailsChange}
                                    placeholder="Enter age in months or years"
                                    min="0"
                                    max="1200"
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subscribers" className="block text-gray-700 text-sm mb-1">Number of Subscribers</label>
                                <input
                                    type="number"
                                    id="subscribers"
                                    name="subscribers"
                                    value={channelDetails.subscribers}
                                    onChange={handleChannelDetailsChange}
                                    placeholder="Enter subscriber count"
                                    min="0"
                                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="averageViews" className="block text-gray-700 text-sm mb-1">Average Views on Last 10 Videos</label>
                            <input
                                type="number"
                                id="averageViews"
                                name="averageViews"
                                value={channelDetails.averageViews}
                                onChange={handleChannelDetailsChange}
                                placeholder="Enter average view count"
                                min="0"
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="contentType" className="block text-gray-700 text-sm mb-1">Type of Content</label>
                            <select
                                id="contentType"
                                name="contentType"
                                value={channelDetails.contentType}
                                onChange={handleChannelDetailsChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            >
                                <option value="">Select Type</option>
                                {['Shorts', 'Long (< 3min)', 'Long (> 3min <10min)', 'Podcasts'].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="postingFrequency" className="block text-gray-700 text-sm mb-1">Frequency of Posting Videos (in days)</label>
                            <input
                                type="number"
                                id="postingFrequency"
                                name="postingFrequency"
                                value={channelDetails.postingFrequency}
                                onChange={handleChannelDetailsChange}
                                placeholder="Enter number of days"
                                min="1"
                                max="365"
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="liveStreaming" className="block text-gray-700 text-sm mb-1">Do You Do Live Streaming?</label>
                            <select
                                id="liveStreaming"
                                name="liveStreaming"
                                value={channelDetails.liveStreaming}
                                onChange={handleChannelDetailsChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            >
                                <option value="">Select an Option</option>
                                {['Yes', 'No'].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="collabType" className="block text-gray-700 text-sm mb-1">Type of Collaborations</label>
                            <select
                                id="collabType"
                                name="collabType"
                                value={channelDetails.collabType}
                                onChange={handleChannelDetailsChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            >
                                <option value="">Select Collaboration Type</option>
                                {['Exclusive Collab', 'Background Collab', 'In-Between Video', 'Indirect'].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                className="w-1/2 text-brand-blue border border-brand-blue py-2 rounded-md text-sm hover:bg-blue-50 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-brand-blue text-white py-2 rounded-md text-sm hover:bg-blue-700 transition duration-300"
                            >
                                Submit Channel Details
                            </button>
                        </div>
                    </form>
                )}

                {step === 6 && (
                    <form onSubmit={handleInstagramDetailsSubmit} className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800">Tell Us About Your Instagram Page</h2>
                            <p className="text-gray-600 mt-2">Provide details about your account</p>
                        </div>

                        <div>
                            <label htmlFor="accountName" className="block text-gray-700 mb-2">Account Name</label>
                            <input
                                type="text"
                                id="accountName"
                                name="accountName"
                                value={instagramDetails.accountName}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter account name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="accountAge" className="block text-gray-700 mb-2">Account Age (in months)</label>
                            <input
                                type="number"
                                id="accountAge"
                                name="accountAge"
                                value={instagramDetails.accountAge}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter account age"
                                min="0"
                                max="1200"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="followers" className="block text-gray-700 mb-2">Number of Followers</label>
                            <input
                                type="number"
                                id="followers"
                                name="followers"
                                value={instagramDetails.followers}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter follower count"
                                min="0"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="avgReelViews" className="block text-gray-700 mb-2">Average Reel Views</label>
                            <input
                                type="number"
                                id="avgReelViews"
                                name="avgReelViews"
                                value={instagramDetails.avgReelViews}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter average reel views"
                                min="0"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="avgComments" className="block text-gray-700 mb-2">Average Comments</label>
                            <input
                                type="number"
                                id="avgComments"
                                name="avgComments"
                                value={instagramDetails.avgComments}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter average comments"
                                min="0"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="avgLikes" className="block text-gray-700 mb-2">Average Likes</label>
                            <input
                                type="number"
                                id="avgLikes"
                                name="avgLikes"
                                value={instagramDetails.avgLikes}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter average likes"
                                min="0"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="engagementRate" className="block text-gray-700 mb-2">Engagement Rate (%)</label>
                            <input
                                type="number"
                                id="engagementRate"
                                name="engagementRate"
                                value={instagramDetails.engagementRate}
                                onChange={handleInstagramDetailsChange}
                                placeholder="Enter engagement rate"
                                step="0.01"
                                min="0"
                                max="100"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                required
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setStep(5)}
                                className="w-1/2 text-brand-blue border border-brand-blue py-2 rounded-md hover:bg-blue-50 transition duration-300"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-brand-blue text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Submit Instagram Data
                            </button>
                        </div>
                    </form>
                )}



            </div>
        </div>
    );
};

export default RegistrationForm;

/*

in this code, I want to handle session. When a user first signs up and done with submitting till instagram details, it should call login api using the stored jwt token and if this jwt token is there then navigate to the dashboard automatically when webiste refreshes.
*/