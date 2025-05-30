import { config } from "../../config/env";
import axios from "axios";

class OrderManagement {

    static API_BASE_URL = `${config.ORDER_MANAGEMENT}`
    static async getOrders() {
        try {
            const response = await axios.get(
                `${this.API_BASE_URL}/dashboard/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('brandToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async placeOrderFromBrand(agencyId, influencerId, packageId) {
        try {
            const response = await axios.post(
                `${this.API_BASE_URL}/order`,
                {
                    agencyId: agencyId,
                    influencerId: influencerId,
                    status: "pending",
                    packageId: packageId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('brandToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }

    }
}

export default OrderManagement;