import razorpayAPI from '../utils/razorpay.js';
import shiprocketAPI from '../utils/shiprocket.js';

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const signature = event.headers['x-razorpay-signature'];
    const payload = JSON.parse(event.body);

    // Verify webhook signature
    const isValid = razorpayAPI.verifyWebhookSignature(payload, signature);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid signature' })
      };
    }

    const eventType = payload.event;
    const paymentEntity = payload.payload.payment.entity;

    console.log(`Webhook received: ${eventType}`, paymentEntity);

    // Handle different webhook events
    switch (eventType) {
      case 'payment.authorized':
      case 'payment.captured':
        // Payment successful - you can create Shiprocket order here if needed
        console.log('Payment successful:', paymentEntity.id);
        // Store payment info in database if you have one
        break;

      case 'payment.failed':
        console.log('Payment failed:', paymentEntity.id);
        // Handle failed payment
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Webhook processing failed',
        message: error.message
      })
    };
  }
};
