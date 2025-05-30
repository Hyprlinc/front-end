import axios from 'axios';

import { config } from '../../config/env';
const API_BASE_URL = config.AGENCY_PACKAGE_URL;


class AgencyPackagesAPI {

    static async createPackage(packageData) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/createPackage`,
                packageData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('agency_token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async updatePackage(packageId, updateData) {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/updatePackage/${packageId}`,
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('agency_token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async getPackages() {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/agencyPackages`,
                {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('agency_token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Clean and format the data
            if (response.data && response.data.data) {
                const cleanedData = response.data.data.map(pkg => ({
                    id: pkg.id,
                    package_type: pkg.package_type,
                    price: parseFloat(pkg.price),
                    features: this.parseFeatures(pkg.features),
                    delivery_time_days: pkg.delivery_time_days
                }));

                return {
                    message: response.data.message,
                    data: cleanedData
                };
            }

            return response.data;   
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static parseFeatures(featuresString) {
        try {
          
            const cleaned = featuresString
                .replace(/^\{|\}$/g, '') 
                .replace(/\\/g, '')      
                .replace(/^""|""$/g, '') 
                .split('","');
          
            return cleaned.map(feature => 
                feature
                    .replace(/^"|"$/g, '') 
                    .trim()                 
            ).filter(Boolean);              
        } catch (error) {
            console.error('Error parsing features:', error);
            return [];
        }
    }

    static handleError(error) {
    
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.error || 'An error occurred',
                details: error.response.data.details
            };
        }
        return {
            status: 500,
            message: 'Network error occurred',
            details: error.message
        };
    }
}

export default AgencyPackagesAPI;
