# Shakti Kit - Complete Deployment Guide

This guide covers deploying both frontend and backend for the Shakti Kit e-commerce platform.

## Architecture Overview

```
Frontend (Hostinger) ──► Backend (Netlify) ──► Razorpay (Payment)
                                            └──► Shiprocket (Shipping)
```

## Prerequisites

- [x] Razorpay account (free signup)
- [x] Shiprocket account (free signup)
- [x] Netlify account (free tier available)
- [x] Hostinger hosting account
- [x] GitHub account (for code deployment)

---

## Part 1: Backend Deployment (Netlify)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Get Razorpay Credentials

1. **Sign up**: https://razorpay.com/
2. **Dashboard** → **Settings** → **API Keys**
3. Click **Generate Test Key** (or Live Key for production)
4. Copy:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
   - **Key Secret**: `xxxxxxxxxxxxx`

### Step 3: Configure Razorpay Webhook

1. **Dashboard** → **Settings** → **Webhooks**
2. Click **Create Webhook**
3. **Webhook URL**: `https://YOUR_SITE_NAME.netlify.app/.netlify/functions/payment-webhook`
   - (You'll update this after Netlify deployment)
4. **Active Events**: Select
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
5. Click **Create Webhook**
6. Copy the **Webhook Secret**

### Step 4: Get Shiprocket Credentials

1. **Sign up**: https://www.shiprocket.in/
2. Use your **login email** and **password**
3. **Important**: Set up a pickup location
   - Dashboard → **Settings** → **Pickup Locations**
   - Add location and name it **"Primary"**

### Step 5: Deploy Backend to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com/
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub account
4. Select your `shakti_kit` repository
5. **Configure build settings**:
   - **Base directory**: `backend`
   - **Build command**: (leave empty)
   - **Publish directory**: (leave empty)
6. Click **Deploy site**

#### Option B: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
cd backend
netlify init
netlify deploy --prod
```

### Step 6: Add Environment Variables to Netlify

1. In Netlify Dashboard → **Site settings** → **Environment variables**
2. Click **Add a variable** and add these:

```
RAZORPAY_KEY_ID = rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET = your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET = your_webhook_secret
SHIPROCKET_EMAIL = your@email.com
SHIPROCKET_PASSWORD = your_password
FRONTEND_URL = https://yourdomain.com
PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

3. Click **Save**
4. **Trigger redeploy**: Site settings → Deploys → Trigger deploy

### Step 7: Update Razorpay Webhook URL

1. Go back to Razorpay Dashboard
2. Edit your webhook
3. Update URL with your actual Netlify URL:
   ```
   https://YOUR_ACTUAL_SITE.netlify.app/.netlify/functions/payment-webhook
   ```

### Step 8: Test Backend

Your backend endpoints will be:
- `https://YOUR_SITE.netlify.app/.netlify/functions/create-order`
- `https://YOUR_SITE.netlify.app/.netlify/functions/verify-payment`
- `https://YOUR_SITE.netlify.app/.netlify/functions/payment-webhook`

---

## Part 2: Frontend Deployment (Hostinger)

### Step 1: Configure Frontend

1. Create `.env` file in the root directory:
```bash
VITE_BACKEND_URL=https://YOUR_SITE.netlify.app/.netlify/functions
```

Replace `YOUR_SITE` with your actual Netlify site name.

### Step 2: Build Frontend

```bash
# Make sure you're in the root directory (not backend)
cd ..
npm install
npm run build
```

This creates a `dist` folder with all production files.

### Step 3: Upload to Hostinger

#### Via File Manager:
1. Log in to Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's directory)
4. Delete default files (index.html, etc.)
5. Upload all files from the `dist` folder

#### Via FTP:
1. Get FTP credentials from Hostinger
2. Use FileZilla or similar FTP client
3. Connect to your Hostinger account
4. Navigate to `public_html`
5. Upload all files from `dist` folder

### Step 4: Configure Domain (if using custom domain)

1. Hostinger → **Domains**
2. Point your domain to Hostinger nameservers
3. Update `FRONTEND_URL` in Netlify environment variables

---

## Part 3: Testing the Complete Flow

### Test Payment (Using Test Mode)

1. Visit your website
2. Click **Order Shakti Kit**
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Address: 123 Test Street
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001

4. Click **Pay**
5. Use test card details:
   - **Card Number**: `4111 1111 1111 1111`
   - **CVV**: `123`
   - **Expiry**: Any future date
   - **Name**: Any name

6. Complete payment
7. Check:
   - Payment success message appears
   - Check Razorpay Dashboard for payment
   - Check Shiprocket Dashboard for order

---

## Alternative: Both on Hostinger

If you have **Node.js hosting** on Hostinger:

### Prerequisites
- Hostinger VPS or Business plan with Node.js support

### Steps
1. Upload entire project (frontend + backend) to Hostinger
2. Install dependencies: `npm install` in both directories
3. Set up PM2 or similar process manager
4. Configure reverse proxy (Nginx/Apache)
5. Set environment variables on server

**Note**: This is more complex and requires server management skills.

---

## Production Checklist

### Before Going Live:

- [ ] Switch Razorpay to **Live Mode**
  - Generate Live API keys
  - Update environment variables on Netlify
  - Update webhook to use Live mode
- [ ] Test complete payment flow
- [ ] Verify Shiprocket order creation
- [ ] Set up email notifications (optional)
- [ ] Add SSL certificate (Hostinger usually auto-enables)
- [ ] Update privacy policy with payment processor info
- [ ] Test on mobile devices
- [ ] Set up Google Analytics (optional)

### Security:

- [ ] Never commit `.env` files to Git
- [ ] Keep API keys secure
- [ ] Use HTTPS for both frontend and backend
- [ ] Validate all user inputs
- [ ] Monitor webhook activity

---

## Troubleshooting

### Issue: Payment modal doesn't open
**Solution**: Check browser console, ensure Razorpay script is loaded

### Issue: "Backend not responding"
**Solution**: Check Netlify function logs, verify environment variables

### Issue: Shiprocket order not created
**Solution**:
- Verify Shiprocket credentials
- Ensure "Primary" pickup location exists
- Check Netlify function logs

### Issue: CORS errors
**Solution**: Update `FRONTEND_URL` in Netlify environment variables

---

## Support & Documentation

- **Razorpay Docs**: https://razorpay.com/docs/
- **Shiprocket API**: https://apidocs.shiprocket.in/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/
- **Vite Build**: https://vitejs.dev/guide/build.html

---

## Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Netlify | Free tier | ₹0 (100k requests/month) |
| Razorpay | Pay per transaction | 2% per transaction |
| Shiprocket | Pay per shipment | Variable (per shipment) |
| Hostinger | Shared hosting | ~₹100-300/month |

**Total monthly cost**: ~₹100-300 + transaction fees

---

## Next Steps

1. Deploy backend to Netlify ✓
2. Deploy frontend to Hostinger ✓
3. Test payment flow ✓
4. Switch to Live mode (when ready)
5. Monitor orders and analytics
6. Scale as needed

Good luck with your Shakti Kit business! 🚀
