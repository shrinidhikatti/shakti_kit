import axios from 'axios';

class GoogleSheetsAPI {
  async logOrder(orderData) {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error('GOOGLE_SHEETS_WEBHOOK_URL not configured');
        return { success: false, error: 'Webhook URL not configured' };
      }

      // Send data to Google Apps Script webhook
      const response = await axios.post(webhookUrl, orderData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('Order logged to Google Sheets via webhook:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to log order to Google Sheets:', error.message);
      return { success: false, error: error.message };
    }
  }
}

export default new GoogleSheetsAPI();
