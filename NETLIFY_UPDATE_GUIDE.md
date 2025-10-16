# 🚀 Netlify Update Guide - Final Steps

Your code is pushed to GitHub! Now follow these steps to deploy the combined frontend + backend.

## ✅ What Was Done

I've restructured your project so **both frontend and backend are in ONE Netlify site**:

```
shaktikit.netlify.app
├── Frontend (React app)
└── Backend Functions (/.netlify/functions/)
```

## 📋 Steps to Complete Deployment

### Step 1: Update Netlify Site Settings

1. Go to https://app.netlify.com/
2. Select your **shaktikit** site
3. Go to **Site configuration** → **Build & deploy** → **Build settings**

Update these settings:
- **Base directory**: Leave empty (or delete if filled)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

4. Click **Save**

### Step 2: Verify Environment Variables

Go to **Site configuration** → **Environment variables**

Make sure you have ALL these 9 variables (add any missing ones):

```
RAZORPAY_KEY_ID = rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET = your_secret_key
RAZORPAY_WEBHOOK_SECRET = your_webhook_secret
SHIPROCKET_EMAIL = your@email.com
SHIPROCKET_PASSWORD = your_password
FRONTEND_URL = https://shaktikit.netlify.app
PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

**Important**: Update `FRONTEND_URL` to `https://shaktikit.netlify.app`

### Step 3: Trigger New Deploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete (2-3 minutes)

### Step 4: Update Razorpay Webhook URL

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Edit your webhook
3. Update URL to:
   ```
   https://shaktikit.netlify.app/.netlify/functions/payment-webhook
   ```
4. Save

## 🧪 Test Your Site

After deployment completes:

### 1. Check Frontend
Visit: https://shaktikit.netlify.app
- Should load the Shakti Kit website ✅

### 2. Check Backend Functions
Open browser console and check for errors when clicking "Order Shakti Kit"

### 3. Test Payment Flow
1. Click "Order Shakti Kit" button
2. Fill in test details:
   - Name: Test User
   - Email: test@test.com
   - Phone: 9876543210
   - Address: 123 Test St
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001

3. Click "Pay"
4. Use test card: `4111 1111 1111 1111`
5. CVV: 123, Expiry: Any future date
6. Complete payment

### 4. Verify Order Creation
- Check Razorpay Dashboard for payment
- Check Shiprocket Dashboard for order

## 🐛 Troubleshooting

### "Backend function not found"
- Check Netlify deploy logs for errors
- Verify `netlify.toml` is in root directory
- Make sure all environment variables are set

### "Payment modal not opening"
- Check browser console for errors
- Verify Razorpay SDK is loaded (check index.html)

### "Shiprocket order not created"
- Verify Shiprocket credentials in environment variables
- Check "Primary" pickup location exists
- Check Netlify function logs

## 📊 View Function Logs

To debug backend issues:
1. Netlify Dashboard → **Functions** tab
2. Click on a function (create-order, verify-payment, etc.)
3. View logs for errors

## ✅ Success Checklist

- [ ] Netlify build settings updated
- [ ] All 9 environment variables added
- [ ] FRONTEND_URL updated to https://shaktikit.netlify.app
- [ ] New deployment triggered
- [ ] Deployment completed successfully
- [ ] Frontend loads correctly
- [ ] Payment modal opens
- [ ] Test payment completed
- [ ] Order appears in Shiprocket
- [ ] Razorpay webhook URL updated

## 🎉 You're Live!

Once all tests pass, your site is ready to:
- Switch to Razorpay **Live mode** (when ready)
- Start accepting real payments
- Automatically ship orders via Shiprocket

---

**Your site**: https://shaktikit.netlify.app

Good luck! 🚀
