import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-razorpay-signature'];
    const payload = req.body;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    const isValid = expectedSignature === signature;

    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const eventType = payload.event;
    const paymentEntity = payload.payload.payment.entity;

    console.log(`Webhook received: ${eventType}`, paymentEntity);

    // Handle different webhook events
    switch (eventType) {
      case 'payment.authorized':
      case 'payment.captured':
        // Payment successful
        console.log('Payment successful:', paymentEntity.id);
        break;

      case 'payment.failed':
        console.log('Payment failed:', paymentEntity.id);
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({
      error: 'Webhook processing failed',
      message: error.message
    });
  }
}
