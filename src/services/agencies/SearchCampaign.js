import axios from 'axios';



const API_BASE_URL = 'http://localhost:5001/api/v1';

export const searchCampaignsInAgency = async (searchParams) => {
    const token = localStorage.getItem('agency_token');
    console.log(token)

    try {
        // Construct query parameters
        const queryParams = new URLSearchParams({
            ...(searchParams.search && { search: searchParams.search }),
            ...(searchParams.startDate && { startDate: searchParams.startDate }),
            ...(searchParams.endDate && { endDate: searchParams.endDate }),
            ...(searchParams.minBudget && { minBudget: searchParams.minBudget }),
            ...(searchParams.maxBudget && { maxBudget: searchParams.maxBudget }),
            page: searchParams.page || 1,
            limit: searchParams.limit || 20
        });

        const response = await axios.get(`${API_BASE_URL}/agency/campaignManagement/agencyCampaignSearch?${queryParams}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error searching campaigns:', error);
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized access');
        } else {
            throw new Error('Error searching campaigns: ' + (error.response?.data?.message || error.message));
        }
    }
};

export const agencyApplyCampaign = async (campaignId, msg) => {
    const token = localStorage.getItem('agency_token');
    try {
        const response = await axios.post(
            `${API_BASE_URL}/agency/campaignManagement/applyCampaignAgency/${campaignId}`, {message : msg}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error applying to campaign:', error);

        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 400:
                    throw new Error(error.response.data.error || 'Invalid application request');
                case 401:
                    throw new Error('Unauthorized access');
                case 404:
                    throw new Error('Campaign not found');
                default:
                    throw new Error('Error applying to campaign: ' + (error.response.data.error || error.message));
            }
        } else {
            throw new Error('Network error while applying to campaign');
        }
    }
} 




export const createAgencyCampaign = async (campaignData) => {
    try {
        const token = localStorage.getItem('agency_token');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const formData = new FormData();

        formData.append('campaignName', campaignData.name);
        formData.append('campaignDescription', campaignData.description);
        formData.append('campaignStartDate', campaignData.startDate);
        formData.append('campaignEndDate', campaignData.endDate);
        formData.append('campaignBudget', campaignData.budget);
        formData.append('targetAudience', campaignData.targetAudience);
        formData.append('campaignStatus', 'ACTIVE'); // Default status for new campaigns

        if (campaignData.mediaFiles && campaignData.mediaFiles.length > 0) {
            formData.append('campaignMedia', campaignData.mediaFiles[0]); // Taking first file as the main campaign media
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        };

        const response = await axios.post(`${API_BASE_URL}/agency/campaignManagement/createAgencyCampaign`, formData, config);
        return response.data;

    } catch (error) {
        console.error('Create campaign error:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to create campaign');
        }
        throw error;
    }
};