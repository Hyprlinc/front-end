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

const ActiveCampaigns = ({ campaigns, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [slideDirection, setSlideDirection] = useState('right');
    const [animating, setAnimating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Check if campaigns exists and has the expected structure
    const campaignData = campaigns?.data || [];
    const pagination = campaigns?.pagination || { currentPage: 1, totalPages: 1 };

    // Filter campaigns based on search query
    const filteredCampaigns = campaignData.filter(campaign => 
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                `}
            </style>
            
            {/* Search and filter section */}
            <Box sx={{ 
                padding: '20px 20px 0 20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        backgroundColor: showFilters ? '#007BFF' : 'white',
                        color: showFilters ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span>Filter</span>
                    <span style={{ fontSize: '18px' }}>
                        {showFilters ? '▼' : '▲'}
                    </span>
                </button>
            </Box>

            {/* Filter options panel */}
            {showFilters && (
                <Box sx={{ 
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    margin: '0 20px 20px 20px',
                    borderRadius: '8px'
                }}>
                    {/* Add your filter options here */}
                    <div>Filter options will go here</div>
                </Box>
            )}

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
                    <ActiveCampaignsCards campaigns={filteredCampaigns} />
                )}
            </Box>
            
            {!loading && pagination.totalPages > 1 && (
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.currentPage}
                    onChange={(event, newPage) => {
                        setSlideDirection(newPage > currentPage ? 'left' : 'right');
                        setAnimating(true);
                        setCurrentPage(newPage);
                        // Add your pagination callback here to fetch new data
                        
                        setTimeout(() => {
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
            )}
        </Box>
    );
};

const ActiveCampaignsCards = ({ campaigns }) => {
    return (
        <div className="active-campaigns-cards">
            <div className="cards-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
                padding: '20px'
            }}>
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="card" style={{
                        borderRadius: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <h2 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px',
                                color: '#333'
                            }}>
                                {campaign.brand_name}
                            </h2>
                        </div>
                        <div className="card-content" style={{ padding: '16px' }}>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                fontWeight: 600,
                                marginBottom: '8px'
                            }}>
                                {campaign.name}
                            </h3>
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: '#666',
                                marginBottom: '16px'
                            }}>
                                {campaign.description}
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <span style={{ color: '#007BFF', fontWeight: 500 }}>
                                    Budget: ${parseFloat(campaign.budget).toLocaleString()}
                                </span>
                                <span style={{ color: '#666' }}>
                                    {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{
                                backgroundColor: '#f5f5f5',
                                padding: '8px',
                                borderRadius: '4px',
                                marginBottom: '16px'
                            }}>
                                <span style={{ fontSize: '14px' }}>
                                    Target Audience: {campaign.target_audience}
                                </span>
                            </div>
                            <button style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                width: '100%'
                            }}>
                                View Campaign Details
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