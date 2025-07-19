import React, { useState, useRef, useEffect } from 'react';

const Portfolio = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('instagram');
    const [sliderWidth, setSliderWidth] = useState(0);
    const [sliderOffset, setSliderOffset] = useState(0);
    const tabsRef = useRef({});
    
    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement) {
            setSliderWidth(activeTabElement.offsetWidth);
            setSliderOffset(activeTabElement.offsetLeft);
        }
    }, [activeTab]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* <Navbar
                user={defaultUser}
                onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            /> */}
            
            <div>
                <div className="tab-bar" style={styles.tabBar}>
                    <div style={{
                        ...styles.slider,
                        width: sliderWidth,
                        transform: `translateX(${sliderOffset}px)`
                    }} />
                    <button 
                        ref={el => tabsRef.current['instagram'] = el}
                        style={{
                            ...styles.tabButton,
                            color: activeTab === 'instagram' ? '#082777' : '#717B8C'
                        }}
                        onClick={() => setActiveTab('instagram')}
                    >
                        Instagram
                    </button>
                    <button 
                        ref={el => tabsRef.current['youtube'] = el}
                        style={{
                            ...styles.tabButton,
                            color: activeTab === 'youtube' ? '#082777' : '#717B8C'
                        }}
                        onClick={() => setActiveTab('youtube')}
                    >
                        YouTube
                    </button>
                </div>

                <div className="tab-content" style={styles.tabContent}>
                    {activeTab === 'instagram' && (
                        <div className="instagram-content">
                            <h2>Instagram Content</h2>
                        </div>
                    )}
                    
                    {activeTab === 'youtube' && (
                        <div className="youtube-content">
                            <h2>YouTube Content</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    tabBar: {
        display: 'flex',
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

export default Portfolio;
