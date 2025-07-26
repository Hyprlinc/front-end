// import React, { useState, useEffect } from 'react';
// import { Tabs, Tab, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import { agencyApplyCampaign, searchCampaignsInAgency, createAgencyCampaign, getCampaignResponses } from '../../services/agencies/SearchCampaign';
// import { Card, CardContent, CardActions } from '@mui/material';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Chip,
//   Divider,
//   IconButton,
//   TextField,
//   DialogActions
// } from '@mui/material';
// import {
//   Calendar,
//   DollarSign,
//   Target,
//   BarChart2,
//   Users,
//   X as CloseIcon,
//   Instagram,
//   Clock,
// } from 'lucide-react';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { Message as MessageIcon } from '@mui/icons-material';


// const DiscoverCampaignsInAgency = () => {
//     const [createModalOpen, setCreateModalOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState(0);
//     const [campaigns, setCampaigns] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedCampaign, setSelectedCampaign] = useState(null);
//     const [responses, setResponses] = useState([]);
//     const [responsesLoading, setResponsesLoading] = useState(false);
//     const [responsesError, setResponsesError] = useState(null);

//     const handleCreateCampaign = async (campaignData) => {
//       try {
//           await createAgencyCampaign(campaignData);
//           // Refresh the campaigns list
//           fetchCampaigns();
//       } catch (error) {
//           throw error;
//       }
//   };

//     const fetchCampaigns = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await searchCampaignsInAgency({
//                 page: 1,
//                 limit: 20
//             });
//             setCampaigns(response.data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchResponses = async () => {
//         setResponsesLoading(true);
//         setResponsesError(null);
//         try {
//             const response = await getCampaignResponses();
//             setResponses(response.data);
//         } catch (error) {
//             setResponsesError(error.message);
//         } finally {
//             setResponsesLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCampaigns();
//     }, []);

//     useEffect(() => {
//         if (activeTab === 2) {
//             fetchResponses();
//         }
//     }, [activeTab]);

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const handleCampaignClick = (campaign) => {
//         setSelectedCampaign(campaign);
//     };

//     const handleCloseModal = () => {
//         setSelectedCampaign(null);
//     };

//     return (
//         <Box sx={{ padding: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Typography variant="h5" component="h1">
//                     Discover Campaigns
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddIcon />}
//                     onClick={() => setCreateModalOpen(true)}
//                 >
//                     Create Campaign
//                 </Button>
//             </Box>

//             <Tabs
//                 value={activeTab}
//                 onChange={handleTabChange}
//                 sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
//             >
//                 <Tab label="Brand Campaigns" />
//                 <Tab label="My Campaigns" />
//                 <Tab label="Responses" />
//             </Tabs>

//             <Box sx={{ mt: 2 }}>
//                 {activeTab === 0 && (
//                     <>
//                         {loading ? (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                                 <CircularProgress />
//                             </Box>
//                         ) : error ? (
//                             <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
//                                 {error}
//                             </Typography>
//                         ) : (
//                             <Grid container spacing={3}>
//                                 {campaigns.map((campaign) => (
//                                     <Grid item xs={12} sm={6} md={4} key={campaign.id}>
//                                         <CampaignCard campaign={campaign} onClick={() => handleCampaignClick(campaign)} />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         )}
//                     </>
//                 )}
//                 {activeTab === 1 && (
//                     <Typography sx={{ textAlign: 'center', mt: 2 }}>
//                         My Campaigns section coming soon...
//                     </Typography>
//                 )}
//                 {activeTab === 2 && (
//                     <Box sx={{ mt: 2 }}>
//                         {responsesLoading ? (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                                 <CircularProgress />
//                             </Box>
//                         ) : responsesError ? (
//                             <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
//                                 {responsesError}
//                             </Typography>
//                         ) : (
//                             <>
//                                 {responses.length > 0 ? (
//                                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//                                         {responses.map((response) => (
//                                             <Card
//                                                 key={response.application_id}
//                                                 sx={{
//                                                     bgcolor: 'background.paper',
//                                                     borderRadius: 1,
//                                                     boxShadow: 1
//                                                 }}
//                                             >
//                                                 <CardContent>
//                                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                                                         <Box>
//                                                             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                                                                 {response.name}
//                                                             </Typography>
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 {response.email}
//                                                             </Typography>
//                                                         </Box>
//                                                         <Chip
//                                                             label={response.status}
//                                                             color={response.status === 'applied' ? 'success' : 'default'}
//                                                             size="small"
//                                                         />
//                                                     </Box>
                                                    
//                                                     <Typography variant="body1" sx={{ mb: 2 }}>
//                                                         {response.message}
//                                                     </Typography>
                                                    
//                                                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                                                         <Typography variant="caption" color="text.secondary">
//                                                             Applied on: {new Date(response.applied_at).toLocaleDateString()}
//                                                         </Typography>
//                                                         {response.channel_links?.map((link, index) => (
//                                                             <Chip
//                                                                 key={index}
//                                                                 icon={<Instagram size={16} />}
//                                                                 label="Instagram"
//                                                                 size="small"
//                                                                 component="a"
//                                                                 href={link}
//                                                                 target="_blank"
//                                                                 clickable
//                                                             />
//                                                         ))}
//                                                     </Box>
//                                                 </CardContent>
//                                                 <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//                                                     <Button
//                                                         variant="contained"
//                                                         startIcon={<MessageIcon />}
//                                                         onClick={() => {
//                                                             // Handle chat initiation
//                                                             console.log(`Initiating chat with ${response.name}`);
//                                                         }}
//                                                     >
//                                                         Start Chat
//                                                     </Button>
//                                                 </CardActions>
//                                             </Card>
//                                         ))}
//                                     </Box>
//                                 ) : (
//                                     <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
//                                         No responses to your campaigns yet
//                                     </Typography>
//                                 )}
//                             </>
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             <CampaignDetailModal
//                 isOpen={!!selectedCampaign}
//                 onClose={handleCloseModal}
//                 campaign={selectedCampaign}
//                 onApply={fetchCampaigns}
//             />
//             <CreateCampaignModal
//         open={createModalOpen}
//         onClose={() => setCreateModalOpen(false)}
//         onSubmit={handleCreateCampaign}
//     />
//         </Box>
//     );
// };

// export default DiscoverCampaignsInAgency;

// const CampaignCard = ({ campaign, onClick }) => {
//   return (
//       <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} onClick={onClick}>
//           <CardContent sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <Typography 
//                       gutterBottom 
//                       variant="h6" 
//                       component="div"
//                       sx={{
//                           fontWeight: 600,
//                           color: 'primary.main',
//                           borderBottom: '2px solid',
//                           borderColor: 'primary.light',
//                           pb: 1,
//                           mb: 2,
//                           flex: 1
//                       }}
//                   >
//                       {campaign.name}
//                   </Typography>
//                   {campaign.application_status && (
//                       <Chip
//                           label="Applied"
//                           size="small"
//                           color="success"
//                           sx={{ ml: 1 }}
//                       />
//                   )}
//               </Box>
//               <Typography 
//                   variant="subtitle1" 
//                   color="text.secondary"
//                   sx={{ mb: 1, fontWeight: 500 }}
//               >
//                   Brand: {campaign.brand_name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                   Budget: Rs.{campaign.budget}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                   Duration: {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
//               </Typography>
//           </CardContent>
//           <CardActions>
//               <Button size="small" color="primary">
//                   View Details
//               </Button>
//           </CardActions>
//       </Card>
//   );
// };

// const CampaignDetailModal = ({ isOpen, onClose, campaign, onApply }) => {
//   const [isApplying, setIsApplying] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);

//   const handleApply = async () => {
//     if (!message.trim()) {
//       setError('Please write a message to the brand');
//       return;
//     }

//     setIsApplying(true);
//     setError(null);

//     try {
//       await agencyApplyCampaign(campaign.id, message);
//       onClose();
//       onApply(); // This will trigger the parent component to refresh campaigns
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   if (!campaign) return null;

//   return (
//     <Dialog 
//       open={isOpen} 
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//     >
//       <Box sx={{ position: 'relative' }}>
//         {/* Header with Image */}
//         <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
//           {campaign.campaign_media ? (
//             <img
//               src={campaign.campaign_media}
//               alt={campaign.name}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//             />
//           ) : (
//             <Box
//               sx={{
//                 height: '100%',
//                 bgcolor: 'primary.light',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <Typography variant="h3" color="white">
//                 {campaign.name.charAt(0)}
//               </Typography>
//             </Box>
//           )}
//           <IconButton
//             onClick={onClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'white',
//               bgcolor: 'rgba(0,0,0,0.5)',
//               '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <DialogContent>
//           {/* Campaign Title and Status */}
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
//               {campaign.name}
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//               <Chip
//                 label={campaign.status}
//                 color={campaign.status === 'ACTIVE' ? 'success' : 'default'}
//               />
//               <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
//                 <Instagram size={18} />
//                 <Typography variant="body2" sx={{ ml: 0.5 }}>
//                   Instagram Campaign
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 3 }} />

//           {/* Key Information Grid */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={6}>
//               <InfoSection
//                 icon={<Calendar />}
//                 title="Campaign Duration"
//                 content={`${new Date(campaign.start_date).toLocaleDateString()} - ${new Date(campaign.end_date).toLocaleDateString()}`}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <InfoSection
//                 icon={<DollarSign />}
//                 title="Budget"
//                 content={`₹${campaign.budget.toLocaleString()}`}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <InfoSection
//                 icon={<Target />}
//                 title="Target Audience"
//                 content={campaign.target_audience}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <InfoSection
//                 icon={<Clock />}
//                 title="Created On"
//                 content={new Date(campaign.created_at).toLocaleDateString()}
//               />
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 3 }} />

//           {/* Campaign Description */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//               Campaign Description
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
//               {campaign.description}
//             </Typography>
//           </Box>

//           {/* Campaign Progress */}
//           {campaign.status === 'ACTIVE' && (
//             <>
//               <Divider sx={{ my: 3 }} />
//               <Box>
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//                   Campaign Progress
//                 </Typography>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={4}>
//                     <MetricCard
//                       icon={<Users />}
//                       title="Applications"
//                       value={campaign.applications_count || 0}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <MetricCard
//                       icon={<BarChart2 />}
//                       title="Days Remaining"
//                       value={calculateDaysRemaining(campaign.end_date)}
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//             </>
//           )}

//           {/* Apply Section */}
//           <Box sx={{ p: 3, bgcolor: 'background.neutral', mt: 2 }}>
//     <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//         {campaign.application_status === "applied" ? "Application Status" : "Apply for Campaign"}
//     </Typography>
    
//     {campaign.application_status === "applied" ? (
//         <Typography 
//             variant="body1" 
//             sx={{ 
//                 color: 'success.main',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1 
//             }}
//         >
//             <Chip
//                 label="Already Applied"
//                 color="success"
//                 size="medium"
//             />
//             Your application for this campaign has been submitted
//         </Typography>
//     ) : (
//         <>
//             <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 placeholder="Write a message to the brand about why you'd be a great fit for this campaign..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 error={!!error}
//                 helperText={error}
//                 sx={{ mb: 2 }}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                 <Button
//                     variant="outlined"
//                     onClick={onClose}
//                     disabled={isApplying}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     variant="contained"
//                     onClick={handleApply}
//                     disabled={isApplying}
//                     startIcon={isApplying ? <CircularProgress size={20} /> : null}
//                 >
//                     {isApplying ? 'Applying...' : 'Apply Now'}
//                 </Button>
//             </Box>
//         </>
//     )}
// </Box>
//         </DialogContent>
//       </Box>
//     </Dialog>
//   );
// };

// // Helper Components
// const InfoSection = ({ icon, title, content }) => (
//   <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//     <Box sx={{ 
//       p: 1, 
//       borderRadius: 1, 
//       bgcolor: 'primary.lighter',
//       color: 'primary.main',
//       display: 'flex'
//     }}>
//       {icon}
//     </Box>
//     <Box>
//       <Typography variant="subtitle2" color="text.secondary">
//         {title}
//       </Typography>
//       <Typography variant="body1" sx={{ fontWeight: 500 }}>
//         {content}
//       </Typography>
//     </Box>
//   </Box>
// );

// const MetricCard = ({ icon, title, value }) => (
//   <Box
//     sx={{
//       p: 2,
//       bgcolor: 'background.neutral',
//       borderRadius: 2,
//       textAlign: 'center'
//     }}
//   >
//     <Box sx={{ 
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       mb: 1,
//       color: 'primary.main'
//     }}>
//       {icon}
//     </Box>
//     <Typography variant="h4" sx={{ mb: 0.5 }}>
//       {value}
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       {title}
//     </Typography>
//   </Box>
// );

// // Helper function
// const calculateDaysRemaining = (endDate) => {
//   const today = new Date();
//   const end = new Date(endDate);
//   const diffTime = Math.abs(end - today);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };



// const CreateCampaignModal = ({ open, onClose, onSubmit }) => {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         startDate: null,
//         endDate: null,
//         budget: '',
//         targetAudience: '',
//         mediaFiles: []
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (field) => (event) => {
//         setFormData({ ...formData, [field]: event.target.value });
//         setErrors({ ...errors, [field]: '' });
//     };

//     const handleFileChange = (event) => {
//         const files = Array.from(event.target.files);
//         setFormData({ ...formData, mediaFiles: files });
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.name) newErrors.name = 'Campaign name is required';
//         if (!formData.description) newErrors.description = 'Description is required';
//         if (!formData.startDate) newErrors.startDate = 'Start date is required';
//         if (!formData.endDate) newErrors.endDate = 'End date is required';
//         if (!formData.budget) newErrors.budget = 'Budget is required';
//         if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setLoading(true);
//         try {
//             await onSubmit(formData);
//             onClose();
//         } catch (error) {
//             setErrors({ submit: error.message });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Typography variant="h6">Create New Campaign</Typography>
//                 <IconButton onClick={onClose}>
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
//             <form onSubmit={handleSubmit}>
//                 <DialogContent dividers>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                         <TextField
//                             label="Campaign Name"
//                             fullWidth
//                             value={formData.name}
//                             onChange={handleChange('name')}
//                             error={!!errors.name}
//                             helperText={errors.name}
//                         />
                        
//                         <TextField
//                             label="Description"
//                             fullWidth
//                             multiline
//                             rows={4}
//                             value={formData.description}
//                             onChange={handleChange('description')}
//                             error={!!errors.description}
//                             helperText={errors.description}
//                         />

//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                             <Box sx={{ display: 'flex', gap: 2 }}>
//                                 <DatePicker
//                                     label="Start Date"
//                                     value={formData.startDate}
//                                     onChange={(date) => setFormData({ ...formData, startDate: date })}
//                                     slotProps={{
//                                         textField: {
//                                             fullWidth: true,
//                                             error: !!errors.startDate,
//                                             helperText: errors.startDate
//                                         }
//                                     }}
//                                 />
//                                 <DatePicker
//                                     label="End Date"
//                                     value={formData.endDate}
//                                     onChange={(date) => setFormData({ ...formData, endDate: date })}
//                                     slotProps={{
//                                         textField: {
//                                             fullWidth: true,
//                                             error: !!errors.endDate,
//                                             helperText: errors.endDate
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </LocalizationProvider>

//                         <TextField
//                             label="Budget"
//                             type="number"
//                             fullWidth
//                             value={formData.budget}
//                             onChange={handleChange('budget')}
//                             error={!!errors.budget}
//                             helperText={errors.budget}
//                             InputProps={{
//                                 startAdornment: '₹'
//                             }}
//                         />

//                         <TextField
//                             label="Target Audience"
//                             fullWidth
//                             value={formData.targetAudience}
//                             onChange={handleChange('targetAudience')}
//                             error={!!errors.targetAudience}
//                             helperText={errors.targetAudience}
//                         />

//                         <Box>
//                             <Button
//                                 variant="outlined"
//                                 component="label"
//                                 fullWidth
//                             >
//                                 Upload Campaign Media
//                                 <input
//                                     type="file"
//                                     hidden
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                 />
//                             </Button>
//                             {formData.mediaFiles.length > 0 && (
//                                 <Typography variant="caption" sx={{ mt: 1 }}>
//                                     Selected file: {formData.mediaFiles[0].name}
//                                 </Typography>
//                             )}
//                         </Box>

//                         {errors.submit && (
//                             <Typography color="error" variant="body2">
//                                 {errors.submit}
//                             </Typography>
//                         )}
//                     </Box>
//                 </DialogContent>
//                 <DialogActions sx={{ p: 2 }}>
//                     <Button onClick={onClose} disabled={loading}>
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading}
//                         startIcon={loading && <CircularProgress size={20} />}
//                     >
//                         {loading ? 'Creating...' : 'Create Campaign'}
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
//     );
// };


import React, { useState, useEffect } from 'react';
import { MdAdd } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { agencyApplyCampaign, searchCampaignsInAgency, createAgencyCampaign, getCampaignResponses } from '../../services/agencies/SearchCampaign';

const DiscoverCampaignsInAgency = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [responses, setResponses] = useState([]);
    const [responsesLoading, setResponsesLoading] = useState(false);
    const [responsesError, setResponsesError] = useState(null);

    const handleCreateCampaign = async (campaignData) => {
        try {
            await createAgencyCampaign(campaignData);
            fetchCampaigns();
        } catch (error) {
            throw error;
        }
    };

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await searchCampaignsInAgency({
                page: 1,
                limit: 20
            });
            setCampaigns(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchResponses = async () => {
        setResponsesLoading(true);
        setResponsesError(null);
        try {
            const response = await getCampaignResponses();
            setResponses(response.data);
        } catch (error) {
            setResponsesError(error.message);
        } finally {
            setResponsesLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        if (activeTab === 2) {
            fetchResponses();
        }
    }, [activeTab]);

    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
    };

    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
    };

    const handleCloseModal = () => {
        setSelectedCampaign(null);
    };

    return (
        <div className="md:p-6">
            <div className="md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Discover Campaigns</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 md:mt-0 rounded flex items-center"
                    onClick={() => setCreateModalOpen(true)}
                >
                    <MdAdd className="mr-2 w-5 h-5 font-bold" />
                    Create Campaign
                </button>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8 overflow-x-auto">
                    <button
                        onClick={() => handleTabChange(0)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 0 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Brand Campaigns
                    </button>
                    <button
                        onClick={() => handleTabChange(1)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 1 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        My Campaigns
                    </button>
                    <button
                        onClick={() => handleTabChange(2)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 2 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Responses
                    </button>
                </nav>
            </div>

            <div className="mt-4">
                {activeTab === 0 && (
                    <>
                        {loading ? (
                            <div className="flex justify-center mt-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <p className="text-red-500 text-center mt-4">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {campaigns.map((campaign) => (
                                    <CampaignCard 
                                        key={campaign.id} 
                                        campaign={campaign} 
                                        onClick={() => handleCampaignClick(campaign)} 
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
                {activeTab === 1 && (
                    <p className="text-center mt-4">My Campaigns section coming soon...</p>
                )}
                {activeTab === 2 && (
                    <div className="mt-4">
                        {responsesLoading ? (
                            <div className="flex justify-center mt-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : responsesError ? (
                            <p className="text-red-500 text-center mt-4">{responsesError}</p>
                        ) : (
                            <>
                                {responses.length > 0 ? (
                                    <div className="space-y-4">
                                        {responses.map((response) => (
                                            <div 
                                                key={response.application_id}
                                                className="bg-white rounded-lg shadow p-6"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{response.name}</h3>
                                                        <p className="text-gray-500 text-sm">{response.email}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${response.status === 'applied' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {response.status}
                                                    </span>
                                                </div>
                                                
                                                <p className="mb-4">{response.message}</p>
                                                
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-gray-500 text-sm">
                                                        Applied on: {new Date(response.applied_at).toLocaleDateString()}
                                                    </p>
                                                    {response.channel_links?.map((link, index) => (
                                                        <a 
                                                            key={index}
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                                                        >
                                                            Instagram
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                                                        onClick={() => {
                                                            console.log(`Initiating chat with ${response.name}`);
                                                        }}
                                                    >
                                                        <FaMessage  className="mr-2" />
                                                        Start Chat
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center mt-8 text-lg">No responses to your campaigns yet</p>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {selectedCampaign && (
                <CampaignDetailModal
                    isOpen={!!selectedCampaign}
                    onClose={handleCloseModal}
                    campaign={selectedCampaign}
                    onApply={fetchCampaigns}
                />
            )}
            <CreateCampaignModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateCampaign}
            />
        </div>
    );
};

const CampaignCard = ({ campaign, onClick }) => {
    return (
        <div 
            className="h-full flex flex-col bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-2">
                        {campaign.name}
                    </h3>
                    {campaign.application_status && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Applied
                        </span>
                    )}
                </div>
                <p className="text-gray-600 font-medium mb-1">
                    Brand: {campaign.brand_name}
                </p>
                <p className="text-gray-500 text-sm">Budget: Rs.{campaign.budget}</p>
                <p className="text-gray-500 text-sm">
                    Duration: {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                </p>
            </div>
            <div className="p-4">
                <button className="text-blue-600 text-sm font-medium">
                    View Details
                </button>
            </div>
        </div>
    );
};

const CampaignDetailModal = ({ isOpen, onClose, campaign, onApply }) => {
    const [isApplying, setIsApplying] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleApply = async () => {
        if (!message.trim()) {
            setError('Please write a message to the brand');
            return;
        }

        setIsApplying(true);
        setError(null);

        try {
            await agencyApplyCampaign(campaign.id, message);
            onClose();
            onApply();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsApplying(false);
        }
    };

    if (!campaign) return null;

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} overflow-auto`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="relative">
                        {/* Header with Image */}
                        <div className="h-48 overflow-hidden relative">
                            {campaign.campaign_media ? (
                                <img
                                    src={campaign.campaign_media}
                                    alt={campaign.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full bg-blue-200 flex items-center justify-center">
                                    <span className="text-white text-4xl">
                                        {campaign.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={onClose}
                                className="absolute right-2 top-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Campaign Title and Status */}
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold mb-2">{campaign.name}</h2>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {campaign.status}
                                    </span>
                                    <div className="flex items-center ml-4">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        <span className="text-sm">Instagram Campaign</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-6"></div>

                            {/* Key Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <InfoSection
                                    icon={
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    title="Campaign Duration"
                                    content={`${new Date(campaign.start_date).toLocaleDateString()} - ${new Date(campaign.end_date).toLocaleDateString()}`}
                                />
                                <InfoSection
                                    icon={
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                    title="Budget"
                                    content={`₹${campaign.budget.toLocaleString()}`}
                                />
                                <InfoSection
                                    icon={
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    }
                                    title="Target Audience"
                                    content={campaign.target_audience}
                                />
                                <InfoSection
                                    icon={
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                    title="Created On"
                                    content={new Date(campaign.created_at).toLocaleDateString()}
                                />
                            </div>

                            <div className="border-t border-gray-200 my-6"></div>

                            {/* Campaign Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">Campaign Description</h3>
                                <p className="text-gray-600 whitespace-pre-line">{campaign.description}</p>
                            </div>

                            {/* Campaign Progress */}
                            {campaign.status === 'ACTIVE' && (
                                <>
                                    <div className="border-t border-gray-200 my-6"></div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Campaign Progress</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <MetricCard
                                                icon={
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                }
                                                title="Applications"
                                                value={campaign.applications_count || 0}
                                            />
                                            <MetricCard
                                                icon={
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                }
                                                title="Days Remaining"
                                                value={calculateDaysRemaining(campaign.end_date)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Apply Section */}
                            <div className="bg-gray-50 p-6 rounded-lg mt-6">
                                <h3 className="text-xl font-bold mb-4">
                                    {campaign.application_status === "applied" ? "Application Status" : "Apply for Campaign"}
                                </h3>
                                
                                {campaign.application_status === "applied" ? (
                                    <p className="text-green-600 flex items-center gap-2">
                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                            Already Applied
                                        </span>
                                        Your application for this campaign has been submitted
                                    </p>
                                ) : (
                                    <>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-4"
                                            rows="4"
                                            placeholder="Write a message to the brand about why you'd be a great fit for this campaign..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                                onClick={onClose}
                                                disabled={isApplying}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                                onClick={handleApply}
                                                disabled={isApplying}
                                            >
                                                {isApplying ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Applying...
                                                    </>
                                                ) : 'Apply Now'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoSection = ({ icon, title, content }) => (
    <div className="flex items-start gap-3">
        <div className="p-1 rounded-md bg-blue-100 text-blue-600 flex-shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="font-medium">{content}</p>
        </div>
    </div>
);

const MetricCard = ({ icon, title, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="flex justify-center text-blue-600 mb-2">
            {icon}
        </div>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
    </div>
);

const CreateCampaignModal = ({ open, onClose, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        budget: '',
        targetAudience: '',
        mediaFiles: []
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
        setErrors({ ...errors, [field]: '' });
    };

    const handleDateChange = (field) => (date) => {
        setFormData({ ...formData, [field]: date });
        setErrors({ ...errors, [field]: '' });
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setFormData({ ...formData, mediaFiles: files });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Campaign name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';
        if (!formData.budget) newErrors.budget = 'Budget is required';
        if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'} overflow-auto`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Create New Campaign</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        value={formData.name}
                                        onChange={handleChange('name')}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange('description')}
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            className={`w-full p-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.startDate ? formData.startDate.toISOString().split('T')[0] : ''}
                                            onChange={(e) => handleDateChange('startDate')(new Date(e.target.value))}
                                        />
                                        {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                        <input
                                            type="date"
                                            className={`w-full p-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.endDate ? formData.endDate.toISOString().split('T')[0] : ''}
                                            onChange={(e) => handleDateChange('endDate')(new Date(e.target.value))}
                                        />
                                        {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            className={`block w-full pl-7 pr-12 p-2 border rounded-md ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.budget}
                                            onChange={handleChange('budget')}
                                        />
                                    </div>
                                    {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2 border rounded-md ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'}`}
                                        value={formData.targetAudience}
                                        onChange={handleChange('targetAudience')}
                                    />
                                    {errors.targetAudience && <p className="mt-1 text-sm text-red-500">{errors.targetAudience}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Media</label>
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                                        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">Upload files</span>
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    </label>
                                    {formData.mediaFiles.length > 0 && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Selected file: {formData.mediaFiles[0].name}
                                        </p>
                                    )}
                                </div>

                                {errors.submit && (
                                    <p className="text-red-500 text-sm">{errors.submit}</p>
                                )}
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:col-start-1 sm:text-sm"
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:col-start-2 sm:text-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : 'Create Campaign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function
const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = Math.abs(end - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export default DiscoverCampaignsInAgency;