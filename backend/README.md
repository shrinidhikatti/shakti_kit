# Shakti Kit Backend

Backend API for Shakti Kit e-commerce platform with Razorpay payment integration and Shiprocket shipping automation.

## Features

- **Razorpay Integration**: Create orders and verify payments
- **Shiprocket Integration**: Automatic order creation and shipment tracking
- **Webhook Support**: Real-time payment status updates
- **Serverless**: Deployed on Netlify Functions (free tier available)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Shiprocket Configuration
SHIPROCKET_EMAIL=your@email.com
SHIPROCKET_PASSWORD=your_password

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Product Configuration
PRODUCT_PRICE=1999
PRODUCT_NAME=Sacred Shakti Kit
PRODUCT_SKU=SHAKTI-KIT-001
```

### 3. Get Razorpay Credentials

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test/Live API keys
4. Copy Key ID and Key Secret

**Webhook Setup:**
1. Go to Settings → Webhooks
2. Create webhook with URL: `https://your-site.netlify.app/.netlify/functions/payment-webhook`
3. Enable events: `payment.authorized`, `payment.captured`, `payment.failed`
4. Copy webhook secret

### 4. Get Shiprocket Credentials

1. Sign up at [Shiprocket](https://www.shiprocket.in/)
2. Use your login email and password in `.env`
3. Set up a pickup location in Shiprocket dashboard (name it "Primary")

### 5. Deploy to Netlify

#### Option A: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### Option B: Deploy via Netlify Dashboard

1. Go to [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Set base directory to `backend`
5. Add environment variables in Site settings → Environment variables
6. Deploy!

### 6. Update Frontend

In the main project directory, create `.env`:

```env
VITE_BACKEND_URL=https://your-site.netlify.app/.netlify/functions
```

## API Endpoints

### POST /create-order
Creates a Razorpay order

**Request:**
```json
{
  "amount": 1999,
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "order_xxx",
  "amount": 199900,
  "currency": "INR",
  "key": "rzp_test_xxx"
}
```

### POST /verify-payment
Verifies payment and creates Shiprocket order

**Request:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified and order created",
  "paymentId": "pay_xxx",
  "orderId": "order_xxx",
  "shiprocketOrderId": 12345,
  "shipmentId": 67890
}
```

### POST /payment-webhook
Razorpay webhook endpoint (called automatically by Razorpay)

## Testing

### Test Payment Flow

1. Use Razorpay test mode credentials
2. Test card: `4111 1111 1111 1111`
3. CVV: Any 3 digits
4. Expiry: Any future date

### Local Development

```bash
npm run dev
```

This will start Netlify Dev server at `http://localhost:8888`

## Deployment Checklist

- [ ] Razorpay account created
- [ ] Razorpay API keys added to Netlify environment
- [ ] Razorpay webhook configured
- [ ] Shiprocket account created
- [ ] Shiprocket pickup location set up
- [ ] Shiprocket credentials added to Netlify
- [ ] Backend deployed to Netlify
- [ ] Frontend `.env` updated with backend URL
- [ ] Test payment flow end-to-end

## Support

For issues or questions:
- Razorpay Docs: https://razorpay.com/docs/
- Shiprocket API Docs: https://apidocs.shiprocket.in/
- Netlify Functions Docs: https://docs.netlify.com/functions/overview/
