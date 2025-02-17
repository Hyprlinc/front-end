import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './comp/Navbar';
import Sidebar from './comp/SideBar';

const ProfileManagement = ({name, email, location, phoneNumber, bio}) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [sliderWidth, setSliderWidth] = useState(0);
    const [sliderOffset, setSliderOffset] = useState(0);
    const tabsRef = useRef({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const defaultUser = {
        name: "Anushka",
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
                return <ProfileTab name={"Harsh"} email={"tripathiharsh1606@gmail.com"} location={"India"} phoneNumber={"9876543210"} bio={"I am a software engineer lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."} />;
            case 'niches':
                return <NichesTab/>;
            case 'notifications':
                return <div>Notifications Content</div>;
            case 'bankAccounts':
                return <BankAccountsTab/>;
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
                            ref={el => tabsRef.current['notifications'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'notifications' ? '#082777' : '#717B8C'
                            }}
                            onClick={() => setActiveTab('notifications')}
                        >
                            Notifications
                        </button>
                        <button 
                            ref={el => tabsRef.current['bankAccounts'] = el}
                            style={{...styles.tabButton, 
                                color: activeTab === 'bankAccounts' ? '#082777' : '#717B8C'
                            }}
                            onClick={() => setActiveTab('bankAccounts')}
                        >
                            Bank Accounts
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
    return (
        <div>
            <h1>Bank Accounts</h1>
        </div>
    );
};  

const NichesTab = () => {
    const [selectedNiches, setSelectedNiches] = useState(new Set());

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
            if (editStates.bio && textareaRef.current) {
                textareaRef.current.focus();
            }
        }, [editStates.bio]);

        return (
            <div style={{ position: 'relative' }}>
                {editStates.bio ? (
                    <textarea 
                        ref={textareaRef}
                        placeholder='Enter your bio'
                        value={tempValues.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        onBlur={(e) => {
                            const relatedTarget = e.relatedTarget;
                            if (!relatedTarget || !relatedTarget.classList.contains('edit-button')) {
                                toggleEdit('bio');
                            }
                        }}
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
                ) : (
                    <div style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#EDF2F6',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        minHeight: '120px'
                    }}>
                        {values.bio || 'Enter your bio'}
                    </div>
                )}
                <button 
                    className="edit-button"
                    onClick={() => {
                        if (!editStates.bio) {
                            toggleEdit('bio');
                        }
                    }}
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