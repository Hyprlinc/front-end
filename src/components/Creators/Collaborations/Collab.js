// import React, { useState, useEffect } from 'react';
// import { Tabs, Tab, Box, CircularProgress } from '@mui/material';
// import ActiveCampaigns from './collabTabs/ActiveCampaigns';
// import Invitations from './collabTabs/Invitations';
// import PastCampaigns from './collabTabs/PastCampaigns';
// import { searchCampaigns } from '../../../services/creators/CreatorsServices';
// import { motion } from 'framer-motion';

// const Collab = () => {
//     const [activeTab, setActiveTab] = useState(0);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [campaigns, setCampaigns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [tabLoading, setTabLoading] = useState(false);

//     const fetchCampaigns = async () => {
//         try {
//             setTabLoading(true);
//             const searchParams = {
//                 page: 1,
//                 limit: 20
//             };
//             const response = await searchCampaigns(searchParams);
//             setCampaigns(response);
//         } catch (error) {
//             console.error('Error fetching campaigns:', error);
//         } finally {
//             setLoading(false);
//             setTabLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCampaigns();
//     }, []);

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const TabPanel = ({ children, value, index, ...other }) => {
//         return (
//             <div
//                 role="tabpanel"
//                 hidden={value !== index}
//                 id={`simple-tabpanel-${index}`}
//                 aria-labelledby={`simple-tab-${index}`}
//                 {...other}
//             >
//                 {value === index && (
//                     <Box sx={{ p: 3 }}>
//                         {children}
//                     </Box>
//                 )}
//             </div>
//         );
//     };

//     const a11yProps = (index) => {
//         return {
//             id: `simple-tab-${index}`,
//             'aria-controls': `simple-tabpanel-${index}`,
//         };
//     };

//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}
//         >
//             <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//                 <Box sx={{ 
//                     borderBottom: 1, 
//                     borderColor: 'divider',
//                     position: 'sticky',
//                     top: 0,
//                     zIndex: 10,
//                     backgroundColor: 'white',
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
//                 }}>
//                     <Tabs 
//                         value={activeTab} 
//                         onChange={handleTabChange} 
//                         variant="fullWidth"
//                         textColor="primary"
//                         indicatorColor="primary"
//                         sx={{
//                             '& .MuiTabs-indicator': {
//                                 height: 3,
//                             },
//                             '& .MuiTab-root': {
//                                 textTransform: 'none',
//                                 fontSize: '0.9375rem',
//                                 fontWeight: 600,
//                                 minHeight: 48,
//                             }
//                         }}
//                     >
//                         <Tab 
//                             label={
//                                 <div className="flex items-center">
//                                     {tabLoading && activeTab === 0 && (
//                                         <CircularProgress size={16} thickness={5} sx={{ mr: 1 }} />
//                                     )}
//                                     Active Campaigns
//                                 </div>
//                             } 
//                             {...a11yProps(0)} 
//                             sx={{ 
//                                 '&.Mui-selected': { color: 'primary.main' },
//                                 px: 2,
//                             }}
//                         />
//                         <Tab 
//                             label={
//                                 <div className="flex items-center">
//                                     {tabLoading && activeTab === 1 && (
//                                         <CircularProgress size={16} thickness={5} sx={{ mr: 1 }} />
//                                     )}
//                                     New Opportunities
//                                 </div>
//                             } 
//                             {...a11yProps(1)} 
//                             sx={{ 
//                                 '&.Mui-selected': { color: 'primary.main' },
//                                 px: 2,
//                             }}
//                         />
//                         <Tab 
//                             label={
//                                 <div className="flex items-center">
//                                     {tabLoading && activeTab === 2 && (
//                                         <CircularProgress size={16} thickness={5} sx={{ mr: 1 }} />
//                                     )}
//                                     History
//                                 </div>
//                             } 
//                             {...a11yProps(2)} 
//                             sx={{ 
//                                 '&.Mui-selected': { color: 'primary.main' },
//                                 px: 2,
//                             }}
//                         />
//                     </Tabs>
//                 </Box>

//                 <TabPanel value={activeTab} index={0}>
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <ActiveCampaigns campaigns={campaigns} loading={loading} onRefresh={fetchCampaigns} />
//                     </motion.div>
//                 </TabPanel>

//                 <TabPanel value={activeTab} index={1}>
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <Invitations />
//                     </motion.div>
//                 </TabPanel>

//                 <TabPanel value={activeTab} index={2}>
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <PastCampaigns />
//                     </motion.div>
//                 </TabPanel>
//             </Box>
//         </motion.div>
//     );
// };

// export default Collab;

import React, { useState, useEffect, useRef } from 'react';
import ActiveCampaigns from './collabTabs/ActiveCampaigns';
import Invitations from './collabTabs/Invitations';
import PastCampaigns from './collabTabs/PastCampaigns';
import { searchCampaigns } from '../../../services/creators/CreatorsServices';
import { motion, AnimatePresence } from 'framer-motion';

const Collab = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [sliderWidth, setSliderWidth] = useState(0);
    const [sliderOffset, setSliderOffset] = useState(0);
    const tabsRef = useRef({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabLoading, setTabLoading] = useState(false);

    const tabs = [
        { id: 'active', label: 'Active Campaigns' },
        { id: 'invitations', label: 'New Opportunities' },
        { id: 'past', label: 'History' }
    ];

    const fetchCampaigns = async () => {
        try {
            setTabLoading(true);
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
            setTabLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement) {
            setSliderWidth(activeTabElement.offsetWidth);
            setSliderOffset(activeTabElement.offsetLeft);
        }
    }, [activeTab]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'active':
                return <ActiveCampaigns campaigns={campaigns} loading={loading} onRefresh={fetchCampaigns} />;
            case 'invitations':
                return <Invitations />;
            case 'past':
                return <PastCampaigns />;
            default:
                return <ActiveCampaigns campaigns={campaigns} loading={loading} onRefresh={fetchCampaigns} />;
        }
    };

    const LoadingSpinner = () => (
        <div className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}
        >
            <div className="w-full bg-white">
                {/* Enhanced Tab Bar with Motion */}
                <div className="relative border-b border-gray-200 pb-1 sticky top-0 z-10 bg-white shadow-sm">
                    <div className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                ref={(el) => (tabsRef.current[tab.id] = el)}
                                className={`relative py-4 px-1 text-sm font-medium focus:outline-none transition-colors duration-200
                                    ${
                                        activeTab === tab.id
                                            ? "text-indigo-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <div className="flex items-center">
                                    {tabLoading && activeTab === tab.id && (
                                        <LoadingSpinner />
                                    )}
                                    <span>{tab.label}</span>
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
                        className="px-6 py-4"
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Collab;