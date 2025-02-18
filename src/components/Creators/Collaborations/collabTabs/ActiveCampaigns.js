import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import brandLogo from '../../../../assets/icons/brand_logo.svg';
import brandLogo2 from '../../../../assets/icons/brand_logo2.svg';

const ShimmerCard = () => (
    <div className="card" style={{
        borderRadius: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        background: '#f6f7f8',
    }}>
        <div style={{
            position: 'relative',
            paddingTop: '56.25%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{ padding: '16px' }}>
            <div style={{
                height: '24px',
                width: '80%',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                marginBottom: '8px',
                borderRadius: '4px',
            }} />
            <div style={{
                height: '60px',
                width: '100%',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                marginBottom: '16px',
                borderRadius: '4px',
            }} />
            <div style={{
                height: '36px',
                width: '120px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '8px',
            }} />
        </div>
    </div>
);

const ShimmerGrid = () => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        padding: '20px'
    }}>
        {[...Array(6)].map((_, index) => (
            <ShimmerCard key={index} />
        ))}
    </div>
);

const ActiveCampaigns = () => {
    const [slideDirection, setSlideDirection] = useState('right');
    const [animating, setAnimating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 6; // Or whatever number you want to show per page

    // Example data structure - replace with your actual data source
    const campaigns = [
        {
            id: 1,
            campaignName: "Summer Collection 2024",
            brand: {
                name: "Brand Name",
                logo: brandLogo,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                niches: ["Fashion", "Lifestyle", "Beauty"]
            },
            budget: 5000
        },
        {
            id: 2,
            campaignName: "Eco-Friendly Product Launch",
            brand: {
                name: "Green Living",
                logo: brandLogo,
                description: "Sustainable products for conscious consumers.",
                niches: ["Sustainability", "Lifestyle", "Home"]
            },
            budget: 7500
        },
        {
            id: 3,
            campaignName: "Fitness Challenge Series",
            brand: {
                name: "ActiveLife",
                logo: brandLogo2,
                description: "Join our 30-day transformation journey.",
                niches: ["Fitness", "Health", "Wellness"]
            },
            budget: 6000
        },
        {
            id: 4,
            campaignName: "Tech Gadget Review",
            brand: {
                name: "TechWorld",
                logo: brandLogo,
                description: "Exploring the latest in consumer technology.",
                niches: ["Technology", "Gadgets", "Reviews"]
            },
            budget: 8500
        },
        {
            id: 5,
            campaignName: "Organic Skincare Range",
            brand: {
                name: "Pure Beauty",
                logo: brandLogo,
                description: "Natural ingredients for radiant skin.",
                niches: ["Beauty", "Skincare", "Organic"]
            },
            budget: 4500
        },
        {
            id: 6,
            campaignName: "Travel Photography Series",
            brand: {
                name: "Wanderlust",
                logo: brandLogo2,
                description: "Capture your adventures with our gear.",
                niches: ["Travel", "Photography", "Adventure"]
            },
            budget: 6500
        },
        {
            id: 7,
            campaignName: "Healthy Meal Prep",
            brand: {
                name: "NutriLife",
                logo: brandLogo,
                description: "Simplifying healthy eating for busy lives.",
                niches: ["Food", "Health", "Cooking"]
            },
            budget: 3500
        },
        {
            id: 8,
            campaignName: "Gaming Accessories Launch",
            brand: {
                name: "GamersHub",
                logo: brandLogo,
                description: "Level up your gaming experience.",
                niches: ["Gaming", "Technology", "Entertainment"]
            },
            budget: 9000
        },
        {
            id: 9,
            campaignName: "Yoga Wellness Program",
            brand: {
                name: "ZenLife",
                logo: brandLogo,
                description: "Find your balance with mindful practice.",
                niches: ["Yoga", "Wellness", "Mindfulness"]
            },
            budget: 4000
        },
        {
            id: 10,
            campaignName: "Pet Care Essentials",
            brand: {
                name: "PawPerfect",
                logo: brandLogo,
                description: "Premium products for your furry friends.",
                niches: ["Pets", "Animals", "Lifestyle"]
            },
            budget: 5500
        },
        {
            id: 11,
            campaignName: "Home Office Setup",
            brand: {
                name: "WorkSpace",
                logo: brandLogo2,
                description: "Create your perfect productive environment.",
                niches: ["Home Office", "Productivity", "Interior"]
            },
            budget: 7000
        },
        {
            id: 12,
            campaignName: "Kids Educational Toys",
            brand: {
                name: "SmartPlay",
                logo: brandLogo,
                description: "Learning through play for young minds.",
                niches: ["Education", "Kids", "Toys"]
            },
            budget: 4800
        },
        {
            id: 13,
            campaignName: "Outdoor Adventure Gear",
            brand: {
                name: "WildTrails",
                logo: brandLogo,
                description: "Equipment for your next expedition.",
                niches: ["Outdoor", "Adventure", "Sports"]
            },
            budget: 8200
        },
        {
            id: 14,
            campaignName: "Sustainable Fashion",
            brand: {
                name: "EcoStyle",
                logo: brandLogo,
                description: "Ethical fashion for conscious consumers.",
                niches: ["Fashion", "Sustainability", "Lifestyle"]
            },
            budget: 6800
        },
        {
            id: 15,
            campaignName: "Smart Home Devices",
            brand: {
                name: "HomeTech",
                logo: brandLogo2,
                description: "Transform your home with smart technology.",
                niches: ["Smart Home", "Technology", "Innovation"]
            },
            budget: 9500
        },
        {
            id: 16,
            campaignName: "Art Supplies Collection",
            brand: {
                name: "CreativeCore",
                logo: brandLogo,
                description: "Professional tools for artists.",
                niches: ["Art", "Creativity", "Supplies"]
            },
            budget: 3800
        },
        {
            id: 17,
            campaignName: "Plant-Based Recipe Book",
            brand: {
                name: "VeggieFeast",
                logo: brandLogo,
                description: "Delicious plant-based cooking made easy.",
                niches: ["Vegan", "Cooking", "Health"]
            },
            budget: 5200
        },
        {
            id: 18,
            campaignName: "Music Production Tools",
            brand: {
                name: "SoundCraft",
                logo: brandLogo2,
                description: "Professional audio equipment for creators.",
                niches: ["Music", "Audio", "Production"]
            },
            budget: 7800
        },
        {
            id: 19,
            campaignName: "Mental Wellness App",
            brand: {
                name: "MindSpace",
                logo: brandLogo,
                description: "Digital tools for mental health support.",
                niches: ["Mental Health", "Wellness", "Technology"]
            },
            budget: 6200
        },
        {
            id: 20,
            campaignName: "DIY Craft Kits",
            brand: {
                name: "CraftBox",
                logo: brandLogo,
                description: "Creative projects delivered to your door.",
                niches: ["Crafts", "DIY", "Hobbies"]
            },
            budget: 4200
        },
        {
            id: 21,
            campaignName: "Coffee Enthusiast Bundle",
            brand: {
                name: "BeanMaster",
                logo: brandLogo,
                description: "Premium coffee brewing essentials.",
                niches: ["Coffee", "Beverages", "Lifestyle"]
            },
            budget: 5800
        }
    ];

    // Calculate total pages
    const totalPages = Math.ceil(campaigns.length / itemsPerPage);
    
    // Calculate current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        // Simulate loading delay
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentPage]);

    // Handle page changes
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
                    @keyframes shimmer {
                        0% {
                            background-position: -200% 0;
                        }
                        100% {
                            background-position: 200% 0;
                        }
                    }
                `}
            </style>
            <Box
                sx={{
                    transition: 'all 0.3s ease-out',
                    opacity: animating ? 0 : 1,
                    transform: animating
                        ? `translateX(${slideDirection === 'left' ? '-10%' : '10%'})`
                        : 'translateX(0)',
                }}
            >
                {loading ? (
                    <ShimmerGrid />
                ) : (
                    <ActiveCampaignsCards campaigns={currentItems} />
                )}
            </Box>
            
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, newPage) => {
                    setSlideDirection(newPage > currentPage ? 'left' : 'right');
                    setAnimating(true);
                    
                    setTimeout(() => {
                        setCurrentPage(newPage);
                        requestAnimationFrame(() => {
                            setAnimating(false);
                        });
                    }, 150);
                }}
                sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            />
        </Box>
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



const ActiveCampaignsTable = ({campaigns}) => {

    const handleCampaignClick = (campaignId) => {
        // Add your navigation or action logic here
        console.log(`Clicked campaign: ${campaignId}`);
    };

    const getBrandTooltipContent = (brand) => {
        return `${brand.description}\n\nTarget Niches: ${brand.niches.join(', ')}`;
    };
    return (
        <div className="active-campaigns">
            <table className="campaigns-table">
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>Posted By</th>
                        <th>Budget</th>
                        <th>Posted On</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr 
                            key={campaign.id}
                            onClick={() => handleCampaignClick(campaign.id)}
                            className="campaign-row"
                        >
                            <td>{campaign.campaignName}</td>
                            <td className="brand-cell">
                                <img 
                                    src={campaign.brand.logo} 
                                    alt={`${campaign.brand.name} logo`}
                                    className="brand-logo"
                                />
                                <span className="brand-info" 
                                      data-tooltip={getBrandTooltipContent(campaign.brand)}>
                                    {campaign.brand.name}
                                </span>
                            </td>
                            <td>${campaign.budget}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
    


export default ActiveCampaigns;