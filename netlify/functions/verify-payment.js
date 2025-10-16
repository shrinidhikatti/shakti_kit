import razorpayAPI from '../utils/razorpay.js';
import shiprocketAPI from '../utils/shiprocket.js';
import googlesheetsAPI from '../utils/googlesheets.js';

export const handler = async (event) => {
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
    const isValid = razorpayAPI.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

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

    // Get payment details from Razorpay
    const paymentDetails = await razorpayAPI.getPaymentDetails(razorpay_payment_id);

    // Create Shiprocket order
    const shiprocketOrder = await shiprocketAPI.createOrder({
      orderId: razorpay_order_id,
      amount: paymentDetails.amount / 100, // Convert paise to rupees
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
        sku: process.env.PRODUCT_SKU || 'SHAKTI-KIT-001',
        price: paymentDetails.amount / 100,
        quantity: 1
      }
    });

    // Log order to Google Sheets
    try {
      await googlesheetsAPI.logOrder({
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
        shiprocketOrderId: shiprocketOrder.order_id,
        shipmentId: shiprocketOrder.shipment_id
      });
      console.log('Order logged to Google Sheets successfully');
    } catch (sheetsError) {
      // Don't fail the entire process if sheets logging fails
      console.error('Failed to log to Google Sheets, but continuing:', sheetsError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Payment verified and order created',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        shiprocketOrderId: shiprocketOrder.order_id,
        shipmentId: shiprocketOrder.shipment_id
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
