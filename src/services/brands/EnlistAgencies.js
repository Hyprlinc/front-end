import axios from "axios";
import { config } from "../../config/env";

export const getAgencies = async () => {
    try {
        const brandToken = localStorage.getItem('brandToken');
        if(!brandToken) {
            throw new Error('Brand token is not available');
        }
        const response = await axios.get(config.ENLIST_AGENCIES, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${brandToken}`
            }
        });
        return response.data;
    } catch (error) {   
        throw new Error(error.response?.data?.message || 'Failed to fetch agencies');
        
    }
}
