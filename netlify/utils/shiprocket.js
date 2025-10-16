import axios from 'axios';

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

class ShiprocketAPI {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    // Check if token is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
      });

      this.token = response.data.token;
      // Token expires in 10 days, refresh after 9 days
      this.tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000);

      return this.token;
    } catch (error) {
      console.error('Shiprocket authentication failed:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Shiprocket');
    }
  }

  async createOrder(orderData) {
    try {
      const token = await this.authenticate();

      const shiprocketOrder = {
        order_id: orderData.orderId,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: "Primary", // You need to set this up in Shiprocket dashboard
        billing_customer_name: orderData.customer.name,
        billing_last_name: "",
        billing_address: orderData.customer.address,
        billing_city: orderData.customer.city,
        billing_pincode: orderData.customer.pincode,
        billing_state: orderData.customer.state,
        billing_country: "India",
        billing_email: orderData.customer.email,
        billing_phone: orderData.customer.phone,
        shipping_is_billing: true,
        order_items: [{
          name: orderData.product.name,
          sku: orderData.product.sku,
          units: orderData.product.quantity,
          selling_price: orderData.product.price
        }],
        payment_method: "Prepaid",
        sub_total: orderData.amount,
        length: 30,
        breadth: 20,
        height: 10,
        weight: 1.0
      };

      const response = await axios.post(
        `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
        shiprocketOrder,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Shiprocket order created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Shiprocket order creation failed:', error.response?.data || error.message);
      throw new Error('Failed to create Shiprocket order');
    }
  }

  async trackOrder(orderId) {
    try {
      const token = await this.authenticate();

      const response = await axios.get(
        `${SHIPROCKET_BASE_URL}/courier/track/order/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Shiprocket tracking failed:', error.response?.data || error.message);
      throw new Error('Failed to track order');
    }
  }
}

export default new ShiprocketAPI();