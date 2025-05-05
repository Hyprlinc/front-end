import axios from 'axios';



const API_BASE_URL = 'http://localhost:5000/api/v1';

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

        const response = await axios.get(`${API_BASE_URL}/agency/campaignManagement/campaignSearch?${queryParams}`, {
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
            `${API_BASE_URL}/agency/campaignManagement/applyCampaignAgency/${campaignId}`, { msg }, {
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