import { google } from 'googleapis';

class GoogleSheetsAPI {
  constructor() {
    this.auth = null;
    this.sheets = null;
  }

  async authenticate() {
    try {
      // Parse the service account credentials from environment variable
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');

      this.auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      return true;
    } catch (error) {
      console.error('Google Sheets authentication failed:', error);
      throw new Error('Failed to authenticate with Google Sheets');
    }
  }

  async logOrder(orderData) {
    try {
      if (!this.sheets) {
        await this.authenticate();
      }

      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (!spreadsheetId) {
        console.error('GOOGLE_SHEET_ID not configured');
        return { success: false, error: 'Spreadsheet ID not configured' };
      }

      // Prepare row data
      const timestamp = new Date().toISOString();
      const values = [[
        timestamp, // A: Timestamp
        orderData.orderId, // B: Order ID
        orderData.paymentId, // C: Payment ID
        orderData.customer.name, // D: Customer Name
        orderData.customer.email, // E: Email
        orderData.customer.phone, // F: Phone
        orderData.customer.address, // G: Address
        orderData.customer.city, // H: City
        orderData.customer.state, // I: State
        orderData.customer.pincode, // J: Pincode
        orderData.product.name, // K: Product Name
        orderData.product.sku, // L: Product SKU
        orderData.amount, // M: Amount
        orderData.shiprocketOrderId || 'N/A', // N: Shiprocket Order ID
        orderData.shipmentId || 'N/A', // O: Shipment ID
        'Success' // P: Status
      ]];

      // Append the row to the sheet
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: 'Orders!A:P', // Append to 'Orders' sheet
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: values,
        },
      });

      console.log('Order logged to Google Sheets:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to log order to Google Sheets:', error);
      return { success: false, error: error.message };
    }
  }

  async createSheet(spreadsheetId) {
    try {
      if (!this.sheets) {
        await this.authenticate();
      }

      // Create the Orders sheet with headers
      const headers = [
        'Timestamp',
        'Order ID',
        'Payment ID',
        'Customer Name',
        'Email',
        'Phone',
        'Address',
        'City',
        'State',
        'Pincode',
        'Product Name',
        'Product SKU',
        'Amount (₹)',
        'Shiprocket Order ID',
        'Shipment ID',
        'Status'
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: 'Orders!A1:P1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      console.log('Orders sheet created with headers');
      return { success: true };
    } catch (error) {
      console.error('Failed to create sheet:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new GoogleSheetsAPI();
