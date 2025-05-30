import axios from "axios";

import { config } from "../../config/env";


class OrderManagement { 
    static API_BASE_URL = `${config.ORDER_MANAGEMENT}`;

    static async getOrders() {
        try {
            const response = await axios.get(
                `${this.API_BASE_URL}/dashboard/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('agencyToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async placeOrderFromAgency(influencerId, packageId) {
        try {
            const response = await axios.post(
                `${this.API_BASE_URL}/order`,
                {
                    influencerId: influencerId,
                    status: "pending", //change this to status if needed
                    packageId: packageId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('agencyToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static handleError(error) {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return { message: "No response received from server." };
        } else {
            return { message: error.message };
        }
    }
}

export default OrderManagement;