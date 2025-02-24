import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Navbar from '../comp/Navbar';
import Sidebar from '../comp/SideBar';
import ActiveCampaigns from './collabTabs/ActiveCampaigns';
import Invitations from './collabTabs/Invitations';
import PastCampaigns from './collabTabs/PastCampaigns';
import { searchCampaigns } from '../../../services/creators/CreatorsServices';

const Collab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const searchParams = {
                    page: 1,
                    limit: 20
                };
                const response = await searchCampaigns(searchParams);
                setCampaigns(response);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const defaultUser = {
        name: "Anushka",
        profilePicture: "https://avatar.iran.liara.run/public"
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const TabPanel = ({ children, value, index }) => {
        return (
            <div hidden={value !== index} style={{ padding: '20px' }}>
                {value === index && children}
            </div>
        );
    };

    return (
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}>
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Navbar
                user={defaultUser}
                onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Active Campaigns" sx={{ marginRight: 3 }} />
                    <Tab label="New Opportunities" sx={{ marginRight: 3 }} />
                    <Tab label="History" />
                </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
                <ActiveCampaigns campaigns={campaigns} loading={loading} />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
                <Invitations/>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
                <PastCampaigns/>
            </TabPanel>

            {isSidebarOpen && (
                <Box sx={{ position: 'absolute', right: 0, top: 0, height: '100%' }}>
                    <div className="sidebar">
                        <Sidebar
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
                    </div>
                </Box>
            )}
        </Box>
        </div>
    );
};

export default Collab;
