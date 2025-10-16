const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');

const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerDetails
    } = JSON.parse(event.body);

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid payment signature'
        })
      };
    }

    // Initialize Razorpay to get payment details
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Get payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    // Create Shiprocket order
    let shiprocketOrder = { order_id: 'N/A', shipment_id: 'N/A' };
    try {
      // Authenticate with Shiprocket
      const authResponse = await axios.post(
        `${process.env.SHIPROCKET_API_URL}/auth/login`,
        {
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD
        }
      );

      const token = authResponse.data.token;

      // Create order in Shiprocket
      const shiprocketOrderData = {
        order_id: razorpay_order_id,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: 'Primary',
        billing_customer_name: customerDetails.name,
        billing_last_name: '',
        billing_address: customerDetails.address,
        billing_city: customerDetails.city,
        billing_pincode: customerDetails.pincode,
        billing_state: customerDetails.state,
        billing_country: 'India',
        billing_email: customerDetails.email,
        billing_phone: customerDetails.phone,
        shipping_is_billing: true,
        order_items: [
          {
            name: process.env.PRODUCT_NAME || 'Sacred Shakti Kit',
            sku: process.env.PRODUCT_SKU || 'SHAKTI-KIT-001',
            units: 1,
            selling_price: paymentDetails.amount / 100,
            discount: 0
          }
        ],
        payment_method: 'Prepaid',
        sub_total: paymentDetails.amount / 100,
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5
      };

      const orderResponse = await axios.post(
        `${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`,
        shiprocketOrderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      shiprocketOrder = orderResponse.data;
      console.log('Shiprocket order created:', shiprocketOrder);
    } catch (shiprocketError) {
      console.error('Failed to create Shiprocket order, but continuing:', shiprocketError.message);
    }

    // Log order to Google Sheets
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        await axios.post(
          webhookUrl,
          {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            customer: {
              name: customerDetails.name,
              email: customerDetails.email,
              phone: customerDetails.phone,
              address: customerDetails.address,
              city: customerDetails.city,
              state: customerDetails.state,
              pincode: customerDetails.pincode
            },
            product: {
              name: process.env.PRODUCT_NAME || 'Sacred Shakti Kit',
              sku: process.env.PRODUCT_SKU || 'SHAKTI-KIT-001'
            },
            amount: paymentDetails.amount / 100,
            shiprocketOrderId: shiprocketOrder.order_id || 'N/A',
            shipmentId: shiprocketOrder.shipment_id || 'N/A'
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
          }
        );
        console.log('Order logged to Google Sheets successfully');
      }
    } catch (sheetsError) {
      console.error('Failed to log to Google Sheets, but continuing:', sheetsError.message);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Payment verified and order created',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        shiprocketOrderId: shiprocketOrder.order_id || 'N/A',
        shipmentId: shiprocketOrder.shipment_id || 'N/A'
      })
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to verify payment',
        message: error.message
      })
    };
  }
};

module.exports = { handler };
