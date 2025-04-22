import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './comp/Navbar';
import Sidebar from './comp/SideBar';
import CreatorPackagesAPI from '../../services/creators/CreatorsPackagesServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileManagement = ({name, email, location, phoneNumber, bio, niches}) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [sliderWidth, setSliderWidth] = useState(0);
    const [sliderOffset, setSliderOffset] = useState(0);
    const tabsRef = useRef({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(niches)

    const defaultUser = {
        fullName: name,
        profilePicture: "https://avatar.iran.liara.run/public"
    };

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement) {
            setSliderWidth(activeTabElement.offsetWidth);
            setSliderOffset(activeTabElement.offsetLeft);
        }
    }, [activeTab]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileTab name={name} email={email} location={location} phoneNumber={phoneNumber} bio={bio} />;
            case 'niches':
                return <NichesTab niches={niches} />;
            case 'kyc':
                return <KYCTab/>;
            case 'bankAccounts':
                return <BankAccountsTab/>;
            case 'packages':
                return <PackagesTab />;
            default:
                return <div>Profile Content</div>;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex">
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}>
                <Navbar 
                    user={defaultUser} 
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
                />
                
                <div>
                    <div className="tab-bar" style={styles.tabBar}>
                        <div style={{
                            ...styles.slider,
                            width: sliderWidth,
                            transform: `translateX(${sliderOffset}px)`
                        }} />
                        <button 
                            ref={el => tabsRef.current['profile'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'profile' ? '#082777' : '#717B8C'
                            }}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button 
                            ref={el => tabsRef.current['niches'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'niches' ? '#082777' : '#717B8C'
                            }}
                            onClick={() => setActiveTab('niches')}
                        >
                            Niches
                        </button>
                        <button 
                            ref={el => tabsRef.current['kyc'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'kyc' ? '#082777' : '#717B8C',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onClick={() => setActiveTab('kyc')}
                        >
                            KYC
                            <span style={{
                                fontSize: '10px',
                                padding: '2px 6px',
                                backgroundColor: '#FFF3E0',
                                color: '#F57C00',
                                borderRadius: '12px',
                                fontWeight: '500'
                            }}>
                                Coming Soon
                            </span>
                        </button>
                        <button 
                            ref={el => tabsRef.current['bankAccounts'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'bankAccounts' ? '#082777' : '#717B8C',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onClick={() => setActiveTab('bankAccounts')}
                        >
                            Bank Accounts
                            <span style={{
                                fontSize: '10px',
                                padding: '2px 6px',
                                backgroundColor: '#FFF3E0',
                                color: '#F57C00',
                                borderRadius: '12px',
                                fontWeight: '500'
                            }}>
                                Coming Soon
                            </span>
                        </button>
                        <button 
                            ref={el => tabsRef.current['packages'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'packages' ? '#082777' : '#717B8C'
                            }}
                            onClick={() => setActiveTab('packages')}
                        >
                            Packages
                        </button>
                    </div>
                    <div className="tab-content" style={styles.tabContent}>
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
        </div>
    );
};





const BankAccountsTab = () => {
    const [formData, setFormData] = useState({
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // If IFSC code is being changed and has 11 characters, fetch bank details
        if (name === 'ifscCode' && value.length === 11) {
            fetchBankDetails(value);
        }
    };

    const fetchBankDetails = async (ifsc) => {
        setLoading(true);
        try {
            const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
            const data = await response.json();
            
            if (data) {
                setFormData(prev => ({
                    ...prev,
                    bankName: data.BANK || '',
                    branchName: data.BRANCH || ''
                }));
            }
        } catch (error) {
            console.error('Error fetching bank details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '600px' }}>
            <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600',
                marginBottom: '32px'
            }}>
                Bank Account Details
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '8px'
                    }}>
                        Account Holder's Name
                    </label>
                    <input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleInputChange}
                        placeholder="Enter account holder's name"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '8px',
                                    fontSize: '16px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        Account Number
                    </label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '8px',
                                fontSize: '16px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        IFSC Code
                    </label>
                    <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC code"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        Bank Name
                    </label>
                    <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        readOnly
                        placeholder={loading ? "Fetching bank details..." : "Bank name will appear here"}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f5f5f5',
                            cursor: 'not-allowed'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        Branch Name
                    </label>
                    <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        readOnly
                        placeholder={loading ? "Fetching branch details..." : "Branch name will appear here"}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f5f5f5',
                            cursor: 'not-allowed'
                        }}
                    />
                </div>

                <button
                    style={{
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '16px'
                    }}
                >
                    Save Bank Details
                </button>
            </div>
        </div>
    );
};  

const KYCTab = () => {
    const [kycStatus] = useState(false); // This would come from the backend
    const [formData, setFormData] = useState({
        aadharNumber: '',
        panNumber: '',
        documents: null
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            documents: e.target.files[0]
        });
    };

    return (
        <div style={{ padding: '24px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600' }}>KYC Verification</h2>
                <div style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    backgroundColor: kycStatus ? '#E3F2FD' : '#FFF3E0',
                    color: kycStatus ? '#1976D2' : '#F57C00',
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    {kycStatus ? 'Verified' : 'Pending Verification'}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1E293B',
                        marginBottom: '8px'
                    }}>
                        Aadhar Number
                    </label>
                    <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your Aadhar number"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '10px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '8px'
                    }}>
                        PAN Number
                    </label>
                    <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your PAN number"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #E0E4EC',
                            borderRadius: '10px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        Upload Documents
                    </label>
                    <div style={{
                        border: '1px dashed #E0E4EC',
                        borderRadius: '2px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="file"
                            name="documents"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="document-upload"
                        />
                        <label htmlFor="document-upload" style={{ cursor: 'pointer' }}>
                            <div style={{ color: '#717B8C', marginBottom: '8px' }}>
                                Drag and drop your files here or click to browse
                            </div>
                            <div style={{ fontSize: '12px', color: '#717B8C' }}>
                                Supported formats: PDF, JPG, PNG (Max size: 5MB)
                            </div>
                        </label>
                    </div>
                </div>

                <button
                    style={{
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '16px'
                    }}
                >
                    Submit for Verification
                </button>
            </div>
        </div>
    );
};

const NichesTab = ({ niches }) => {
    // Initialize selectedNiches with passed niches if available
    const [selectedNiches, setSelectedNiches] = useState(() => {
        if (!niches) return new Set();
        // Split the niches string and create a Set
        return new Set(niches.split(',').map(niche => niche.trim()));
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
            "Motivation & Personal Development"
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
        <div style={{ 
            padding: '20px',
            maxWidth: '60%',
            margin: '0'
        }}>
            {Object.entries(categories).map(([category, niches]) => (
                <div key={category} style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#082777',
                        marginBottom: '16px'
                    }}>
                        {category}
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        alignItems: 'flex-start',
                        marginLeft: '-8px' // Compensate for staggered offset
                    }}>
                        {niches.map((niche, index) => (
                            <div
                                key={niche}
                                onClick={() => toggleNiche(niche)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: selectedNiches.has(niche) ? '#2196F3' : '#EDF2F6',
                                    color: selectedNiches.has(niche) ? '#FFFFFF' : '#4C535F',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                    userSelect: 'none',
                                    marginLeft: index % 2 === 1 ? '16px' : '0', // Create staggered effect
                                    marginTop: index % 2 === 1 ? '8px' : '0',  // Add vertical offset for odd items
                                    boxShadow: selectedNiches.has(niche) 
                                        ? '0 2px 4px rgba(8, 39, 119, 0.2)' 
                                        : 'none',
                                    transform: `translateY(${index % 2 === 1 ? '4px' : '0'})` // Additional stagger effect
                                }}
                            >
                                {niche}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const ProfileTab = ({name, email, location, phoneNumber, bio}) => {
    const [loading, setLoading] = useState(true);
    const [editStates, setEditStates] = useState({
        name: false,
        email: false,
        location: false,
        phoneNumber: false,
        bio: false
    });

    const [values, setValues] = useState({
        name: name || '',
        email: email || '',
        location: location || '',
        phoneNumber: phoneNumber || '',
        bio: bio || ''
    });

    const [tempValues, setTempValues] = useState({
        name: name || '',
        email: email || '',
        location: location || '',
        phoneNumber: phoneNumber || '',
        bio: bio || ''
    });

    const [originalValues] = useState({
        name: name || '',
        email: email || '',
        location: location || '',
        phoneNumber: phoneNumber || '',
        bio: bio || ''
    });

    // Loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Shimmer animation styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
            .shimmer {
                animation: shimmer 2s infinite linear;
                background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
                background-size: 1000px 100%;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const hasChanges = () => {
        return Object.keys(values).some(key => values[key] !== originalValues[key]);
    };

    const handleChange = (field, value) => {
        setTempValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleEdit = (field) => {
        if (editStates[field]) {
            setValues(prev => ({
                ...prev,
                [field]: tempValues[field]
            }));
        } else {
            setTempValues(prev => ({
                ...prev,
                [field]: values[field]
            }));
        }
        setEditStates(prev => ({...prev, [field]: !prev[field]}));
    };

    const handleReset = () => {
        setValues(originalValues);
        setTempValues(originalValues);
        setEditStates({
            name: false,
            email: false,
            location: false,
            phoneNumber: false,
            bio: false
        });
    };

    const handleUpdate = () => {
        console.log('Updated values:', values);
    };

    // Shimmer Components
    const ShimmerField = () => (
        <div>
            <div className="shimmer" style={{
                width: '100px',
                height: '20px',
                backgroundColor: '#f6f7f8',
                marginBottom: '8px',
                borderRadius: '4px'
            }} />
            <div className="shimmer" style={{
                width: '100%',
                height: '45px',
                backgroundColor: '#f6f7f8',
                borderRadius: '8px'
            }} />
        </div>
    );

    const ShimmerBio = () => (
        <div>
            <div className="shimmer" style={{
                width: '100px',
                height: '20px',
                backgroundColor: '#f6f7f8',
                marginBottom: '8px',
                borderRadius: '4px'
            }} />
            <div className="shimmer" style={{
                width: '100%',
                height: '120px',
                backgroundColor: '#f6f7f8',
                borderRadius: '8px'
            }} />
        </div>
    );

    const ShimmerAvatar = () => (
        <div className="shimmer" style={{
            width: '130px',
            height: '130px',
            backgroundColor: '#f6f7f8',
            borderRadius: '14px'
        }} />
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
            <div>
                <label style={{
                    display: 'block',
                    fontFamily: 'Manrope',
                    color: '#4C535F',
                    fontWeight: 500,
                    fontSize: '16px',
                    marginBottom: '8px'
                }}>
                    {label}
                </label>
                
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {editStates[field] ? (
                        <input 
                            ref={inputRef}
                            placeholder={placeholder}
                            type={type}
                            value={tempValues[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                            onBlur={(e) => {
                                const relatedTarget = e.relatedTarget;
                                if (!relatedTarget || !relatedTarget.classList.contains('edit-button')) {
                                    toggleEdit(field);
                                }
                            }}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#EDF2F6',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#EDF2F6',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px'
                        }}>
                            {values[field] || placeholder}
                        </div>
                    )}
                    <button 
                        className="edit-button"
                        onClick={() => {
                            if (!editStates[field]) {
                                toggleEdit(field);
                            }
                        }}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 1
                        }}
                    >
                        {editStates[field] ? '✓' : '✎'}
                    </button>
                </div>
            </div>
        );
    };

    const EditableBio = () => {
        const textareaRef = useRef(null);

        useEffect(() => {
           
        }, [editStates.bio]);

        const handleBioChange = (e) => {
            const newValue = e.target.value;
            setTempValues(prev => ({
                ...prev,
                bio: newValue
            }));
        };

        return (
            <div style={{ position: 'relative' }}>
                {!editStates.bio ? (
                    <div 
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#EDF2F6',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            minHeight: '120px'
                        }}
                        onClick={() => toggleEdit('bio')}
                    >
                        {values.bio || 'Enter your bio'}
                    </div>
                ) : (
                    <textarea 
                        ref={textareaRef}
                        placeholder='Enter your bio'
                        value={tempValues.bio}
                        onChange={handleBioChange}
                        onBlur={() => toggleEdit('bio')}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#EDF2F6',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            minHeight: '120px',
                            resize: 'vertical'
                        }}
                    />
                )}
                <button 
                    className="edit-button"
                    onClick={() => toggleEdit('bio')}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 1
                    }}
                >
                    {editStates.bio ? '✓' : '✎'}
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div>
                <ShimmerAvatar />

                <div style={{
                    height: '1px',
                    backgroundColor: '#E0E4EC',
                    margin: '24px 0'
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px',
                    marginBottom: '20px'
                }}>
                    <ShimmerField />
                    <ShimmerField />
                    <ShimmerField />
                    <ShimmerField />
                </div>

                <ShimmerBio />

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginTop: '24px'
                }}>
                    <div className="shimmer" style={{
                        width: '200px',
                        height: '49px',
                        backgroundColor: '#f6f7f8',
                        borderRadius: '8px'
                    }} />
                    <div className="shimmer" style={{
                        width: '200px',
                        height: '49px',
                        backgroundColor: '#f6f7f8',
                        borderRadius: '8px'
                    }} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                width: '130px',
                height: '130px',
                border: '2px dashed #717B8C',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            }}>
                <span style={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    color: '#717B8C',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    Upload your avatar
                </span>
            </div>

            <div style={{
                height: '1px',
                backgroundColor: '#E0E4EC',
                margin: '24px 0'
            }} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '20px'
            }}>
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

            <div>
                <label style={{
                    display: 'block',
                    fontFamily: 'Manrope',
                    color: '#4C535F',
                    fontWeight: 500,
                    fontSize: '16px',
                    marginBottom: '8px'
                }}>
                    Bio
                </label>
                <EditableBio />
            </div>

            <div style={{
                display: 'flex',
                gap: '20px',
                marginTop: '24px'
            }}>
                <button
                    onClick={handleUpdate}
                    disabled={!hasChanges()}
                    style={{
                        width: '200px',
                        height: '49px',
                        backgroundColor: hasChanges() ? '#000000' : '#717B8C',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: hasChanges() ? 'pointer' : 'not-allowed',
                        fontSize: '16px'
                    }}
                >
                    Update
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        width: '200px',
                        height: '49px',
                        backgroundColor: '#717B8C',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const PackageCard = ({ pkg, onEdit }) => (
    <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #E0E4EC'
    }}>
        {pkg.target_brand && (
            <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#FFF3E0',
                color: '#F57C00',
                borderRadius: '12px',
                fontSize: '12px',
                marginBottom: '12px'
            }}>
                Targeted Package
            </div>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            {pkg.package_type}
        </h3>
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
            ₹{pkg.price}
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
            {pkg.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>✓</span>
                    {feature}
                </li>
            ))}
        </ul>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #E0E4EC',
            paddingTop: '16px'
        }}>
            <div>Delivery in {pkg.delivery_time_days} days</div>
            <button
                onClick={() => onEdit(pkg)}
                style={{
                    backgroundColor: '#EDF2F6',
                    color: '#082777',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Edit Package
            </button>
        </div>
    </div>
);

const PackagesTab = () => {
    const [packages, setPackages] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoadingPackages, setIsLoadingPackages] = useState(true);
    const [packageMode, setPackageMode] = useState('broadcast');
    const [formData, setFormData] = useState({
        package_type: '',
        price: '',
        features: '',
        delivery_time_days: '',
        target_brand: ''
    });

    const fetchPackages = async () => {
        try {
            setIsLoadingPackages(true);
            const response = await CreatorPackagesAPI.getPackages();
            if (response?.data) {
                setPackages(response.data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
            toast.error('Failed to fetch packages');
        } finally {
            setIsLoadingPackages(false);
        }
    };

    const handleEditPackage = useCallback((pkg) => {
        setPackageMode(pkg.target_brand ? 'targeted' : 'broadcast');
        setFormData({
            package_type: pkg.package_type,
            price: pkg.price.toString(),
            features: Array.isArray(pkg.features) ? pkg.features.join('\n') : pkg.features,
            delivery_time_days: pkg.delivery_time_days.toString(),
            target_brand: pkg.target_brand || ''
        });
        setEditingPackage(pkg);
        setIsCreating(true);
    }, []);

    const resetForm = useCallback(() => {
        setFormData({
            package_type: '',
            price: '',
            features: '',
            delivery_time_days: '',
            target_brand: ''
        });
        setPackageMode('broadcast');
        setIsCreating(false);
        setEditingPackage(null);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const processedFormData = {
                ...formData,
                features: formData.features.split('\n').filter(feature => feature.trim() !== ''),
                target_brand: packageMode === 'targeted' ? formData.target_brand : null,
                price: parseFloat(formData.price),
                delivery_time_days: parseInt(formData.delivery_time_days)
            };

            if (editingPackage) {
                await CreatorPackagesAPI.updatePackage(editingPackage.id, processedFormData);
                toast.success('Package updated successfully!');
            } else {
                await CreatorPackagesAPI.createPackage(processedFormData);
                toast.success('Package created successfully!');
            }
            
            resetForm();
            await fetchPackages();
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'An error occurred while saving the package');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const PackageForm = useCallback(() => (
        <form onSubmit={handleSubmit} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #E0E4EC'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontWeight: '600'
                }}>
                    Package Mode
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        type="button"
                        onClick={() => setPackageMode('broadcast')}
                        style={{
                            flex: 1,
                            padding: '16px',
                            borderRadius: '8px',
                            border: '2px solid',
                            borderColor: packageMode === 'broadcast' ? '#082777' : '#E0E4EC',
                            backgroundColor: packageMode === 'broadcast' ? '#EDF2F6' : '#FFFFFF',
                            color: packageMode === 'broadcast' ? '#082777' : '#717B8C',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>🌐</span>
                        <div>Broadcast</div>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPackageMode('targeted')}
                        style={{
                            flex: 1,
                            padding: '16px',
                            borderRadius: '8px',
                            border: '2px solid',
                            borderColor: packageMode === 'targeted' ? '#082777' : '#E0E4EC',
                            backgroundColor: packageMode === 'targeted' ? '#EDF2F6' : '#FFFFFF',
                            color: packageMode === 'targeted' ? '#082777' : '#717B8C',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: '20px' }}>🎯</span>
                        <div>Targeted</div>
                    </button>
                </div>
            </div>

            {packageMode === 'targeted' && (
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600'
                    }}>
                        Brand ID
                    </label>
                    <input
                        type="text"
                        name="target_brand"
                        value={formData.target_brand}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #E0E4EC'
                        }}
                        placeholder="Enter the brand's UUID"
                        required={packageMode === 'targeted'}
                    />
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600'
                }}>
                    Package Type
                </label>
                <input
                    type="text"
                    name="package_type"
                    value={formData.package_type}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #E0E4EC'
                    }}
                    placeholder="e.g., Basic, Standard, Premium"
                    required
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600'
                }}>
                    Price (₹)
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #E0E4EC'
                    }}
                    placeholder="Enter price"
                    required
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600'
                }}>
                    Features (one per line)
                </label>
                <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #E0E4EC',
                        minHeight: '120px',
                        resize: 'vertical'
                    }}
                    placeholder="Enter features (one per line)"
                    required
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600'
                }}>
                    Delivery Time (days)
                </label>
                <input
                    type="number"
                    name="delivery_time_days"
                    value={formData.delivery_time_days}
                    onChange={handleInputChange}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #E0E4EC'
                    }}
                    placeholder="Enter delivery time in days"
                    required
                />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: '#082777',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Saving...' : (editingPackage ? 'Update Package' : 'Create Package')}
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    style={{
                        backgroundColor: '#EDF2F6',
                        color: '#717B8C',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    ), [formData, packageMode, loading, editingPackage, handleInputChange]);

    return (
        <div style={{ padding: '24px', maxWidth: '800px' }}>
            <ToastContainer />
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#082777'
                }}>Your Packages</h2>
                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        style={{
                            backgroundColor: '#082777',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Create New Package
                    </button>
                )}
            </div>

            {isLoadingPackages ? (
                <div>Loading packages...</div>
            ) : isCreating ? (
                <PackageForm />
            ) : (
                <div style={{
                    display: 'grid',
                    gap: '20px',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                }}>
                    {packages.map(pkg => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            onEdit={handleEditPackage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    tabBar: {
        display: 'flex',
        marginTop: '40px',
        marginBottom: '20px',
        paddingTop: '20px',
        paddingLeft: '20px',
        position: 'relative',
    },
    tabButton: {
        padding: '10px 40px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        background: 'none',
        transition: 'color 0.3s ease',
    },
    slider: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        height: '2px',
        backgroundColor: '#000',
        transition: 'all 0.3s ease',
    },
    tabContent: {
        padding: '20px',
    }
};

export default ProfileManagement;