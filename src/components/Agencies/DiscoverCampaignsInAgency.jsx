import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { agencyApplyCampaign, searchCampaignsInAgency, createAgencyCampaign } from '../../services/agencies/SearchCampaign';
import { Card, CardContent, CardActions } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Divider,
  IconButton,
  TextField,
  DialogActions
} from '@mui/material';
import {
  Calendar,
  DollarSign,
  Target,
  BarChart2,
  Users,
  X as CloseIcon,
  Instagram,
  Clock,
} from 'lucide-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const DiscoverCampaignsInAgency = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleCreateCampaign = async (campaignData) => {
      try {
          await createAgencyCampaign(campaignData);
          // Refresh the campaigns list
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

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
    };

    const handleCloseModal = () => {
        setSelectedCampaign(null);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Discover Campaigns
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateModalOpen(true)}
                >
                    Create Campaign
                </Button>
            </Box>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
            >
                <Tab label="Brand Campaigns" />
                <Tab label="My Campaigns" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
                {activeTab === 0 && (
                    <>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
                                {error}
                            </Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {campaigns.map((campaign) => (
                                    <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                                        <CampaignCard campaign={campaign} onClick={() => handleCampaignClick(campaign)} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
                {activeTab === 1 && (
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        My Campaigns section coming soon...
                    </Typography>
                )}
            </Box>

            <CampaignDetailModal
                isOpen={!!selectedCampaign}
                onClose={handleCloseModal}
                campaign={selectedCampaign}
                onApply={fetchCampaigns}
            />
            <CreateCampaignModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateCampaign}
    />
        </Box>
    );
};

export default DiscoverCampaignsInAgency;

const CampaignCard = ({ campaign, onClick }) => {
  return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} onClick={onClick}>
          <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="div"
                      sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          borderBottom: '2px solid',
                          borderColor: 'primary.light',
                          pb: 1,
                          mb: 2,
                          flex: 1
                      }}
                  >
                      {campaign.name}
                  </Typography>
                  {campaign.application_status && (
                      <Chip
                          label="Applied"
                          size="small"
                          color="success"
                          sx={{ ml: 1 }}
                      />
                  )}
              </Box>
              <Typography 
                  variant="subtitle1" 
                  color="text.secondary"
                  sx={{ mb: 1, fontWeight: 500 }}
              >
                  Brand: {campaign.brand_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Budget: Rs.{campaign.budget}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Duration: {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
              </Typography>
          </CardContent>
          <CardActions>
              <Button size="small" color="primary">
                  View Details
              </Button>
          </CardActions>
      </Card>
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
      onApply(); // This will trigger the parent component to refresh campaigns
    } catch (err) {
      setError(err.message);
    } finally {
      setIsApplying(false);
    }
  };

  if (!campaign) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header with Image */}
        <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          {campaign.campaign_media ? (
            <img
              src={campaign.campaign_media}
              alt={campaign.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" color="white">
                {campaign.name.charAt(0)}
              </Typography>
            </Box>
          )}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          {/* Campaign Title and Status */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
              {campaign.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                label={campaign.status}
                color={campaign.status === 'ACTIVE' ? 'success' : 'default'}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Instagram size={18} />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  Instagram Campaign
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Key Information Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <InfoSection
                icon={<Calendar />}
                title="Campaign Duration"
                content={`${new Date(campaign.start_date).toLocaleDateString()} - ${new Date(campaign.end_date).toLocaleDateString()}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoSection
                icon={<DollarSign />}
                title="Budget"
                content={`₹${campaign.budget.toLocaleString()}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoSection
                icon={<Target />}
                title="Target Audience"
                content={campaign.target_audience}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoSection
                icon={<Clock />}
                title="Created On"
                content={new Date(campaign.created_at).toLocaleDateString()}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Campaign Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Campaign Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {campaign.description}
            </Typography>
          </Box>

          {/* Campaign Progress */}
          {campaign.status === 'ACTIVE' && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Campaign Progress
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <MetricCard
                      icon={<Users />}
                      title="Applications"
                      value={campaign.applications_count || 0}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MetricCard
                      icon={<BarChart2 />}
                      title="Days Remaining"
                      value={calculateDaysRemaining(campaign.end_date)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {/* Apply Section */}
          <Box sx={{ p: 3, bgcolor: 'background.neutral', mt: 2 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {campaign.application_status === "applied" ? "Application Status" : "Apply for Campaign"}
    </Typography>
    
    {campaign.application_status === "applied" ? (
        <Typography 
            variant="body1" 
            sx={{ 
                color: 'success.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1 
            }}
        >
            <Chip
                label="Already Applied"
                color="success"
                size="medium"
            />
            Your application for this campaign has been submitted
        </Typography>
    ) : (
        <>
            <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write a message to the brand about why you'd be a great fit for this campaign..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isApplying}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleApply}
                    disabled={isApplying}
                    startIcon={isApplying ? <CircularProgress size={20} /> : null}
                >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                </Button>
            </Box>
        </>
    )}
</Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

// Helper Components
const InfoSection = ({ icon, title, content }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
    <Box sx={{ 
      p: 1, 
      borderRadius: 1, 
      bgcolor: 'primary.lighter',
      color: 'primary.main',
      display: 'flex'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {content}
      </Typography>
    </Box>
  </Box>
);

const MetricCard = ({ icon, title, value }) => (
  <Box
    sx={{
      p: 2,
      bgcolor: 'background.neutral',
      borderRadius: 2,
      textAlign: 'center'
    }}
  >
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 1,
      color: 'primary.main'
    }}>
      {icon}
    </Box>
    <Typography variant="h4" sx={{ mb: 0.5 }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
  </Box>
);

// Helper function
const calculateDaysRemaining = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = Math.abs(end - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};



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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Create New Campaign</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Campaign Name"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange('name')}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange('description')}
                            error={!!errors.description}
                            helperText={errors.description}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <DatePicker
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={(date) => setFormData({ ...formData, startDate: date })}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.startDate,
                                            helperText: errors.startDate
                                        }
                                    }}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={formData.endDate}
                                    onChange={(date) => setFormData({ ...formData, endDate: date })}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.endDate,
                                            helperText: errors.endDate
                                        }
                                    }}
                                />
                            </Box>
                        </LocalizationProvider>

                        <TextField
                            label="Budget"
                            type="number"
                            fullWidth
                            value={formData.budget}
                            onChange={handleChange('budget')}
                            error={!!errors.budget}
                            helperText={errors.budget}
                            InputProps={{
                                startAdornment: '₹'
                            }}
                        />

                        <TextField
                            label="Target Audience"
                            fullWidth
                            value={formData.targetAudience}
                            onChange={handleChange('targetAudience')}
                            error={!!errors.targetAudience}
                            helperText={errors.targetAudience}
                        />

                        <Box>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                Upload Campaign Media
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {formData.mediaFiles.length > 0 && (
                                <Typography variant="caption" sx={{ mt: 1 }}>
                                    Selected file: {formData.mediaFiles[0].name}
                                </Typography>
                            )}
                        </Box>

                        {errors.submit && (
                            <Typography color="error" variant="body2">
                                {errors.submit}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Creating...' : 'Create Campaign'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};


