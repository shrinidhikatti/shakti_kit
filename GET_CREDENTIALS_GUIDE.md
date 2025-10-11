# 🔐 How to Get Your Testing Credentials

Follow these steps to get all the credentials you need for testing.

## 📝 Step 1: Get Razorpay Test Credentials (5 minutes)

### A. Sign Up for Razorpay
1. Go to https://razorpay.com/
2. Click **Sign Up** (top right)
3. Enter your details:
   - Business Name: "Shakti Kit" or your name
   - Email: Your email
   - Phone: Your phone number
4. Complete signup process

### B. Get Test API Keys
1. After login, go to **Dashboard**
2. Left sidebar → **Settings** → **API Keys**
3. Under **Test Mode**, click **Generate Test Key**
4. You'll see two keys:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx` (starts with `rzp_test_`)
   - **Key Secret**: Click "eye icon" to reveal, then copy

### C. Set Up Webhook (Important!)
1. Settings → **Webhooks**
2. Click **+ Create Webhook**
3. For now, enter any URL like: `https://example.com/webhook`
   - (We'll update this after Netlify deployment)
4. **Active Events**: Check these boxes:
   - ✅ `payment.authorized`
   - ✅ `payment.captured`
   - ✅ `payment.failed`
5. Click **Create Webhook**
6. Copy the **Webhook Secret** (shown after creation)

### D. Update backend/.env
Open `backend/.env` and replace:
```env
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
```

---

## 📦 Step 2: Get Shiprocket Credentials (5 minutes)

### A. Sign Up for Shiprocket
1. Go to https://www.shiprocket.in/
2. Click **Sign Up**
3. Choose **"I am a Seller"**
4. Fill in details:
   - Name
   - Email
   - Phone
   - Business name: "Shakti Kit"
5. Complete signup

### B. Set Up Pickup Location (IMPORTANT!)
1. After login → **Settings** → **Pickup Locations**
2. Click **Add Pickup Location**
3. Fill in your address details
4. **Location Name**: Enter exactly **"Primary"** (case-sensitive!)
5. Save

### C. Get Credentials
Your credentials are simply your login details:
- **Email**: The email you used to sign up
- **Password**: Your password

### D. Update backend/.env
Open `backend/.env` and replace:
```env
SHIPROCKET_EMAIL=your-actual-email@example.com
SHIPROCKET_PASSWORD=your_actual_password
```

---

## 🌐 Step 3: Netlify Environment Variables

When deploying to Netlify, add these variables in:
**Site settings** → **Environment variables**

Copy these exact values from your `backend/.env` file:

| Variable Name | Value from backend/.env |
|---------------|------------------------|
| `RAZORPAY_KEY_ID` | Your `rzp_test_xxx` key |
| `RAZORPAY_KEY_SECRET` | Your secret key |
| `RAZORPAY_WEBHOOK_SECRET` | Your webhook secret |
| `SHIPROCKET_EMAIL` | Your Shiprocket email |
| `SHIPROCKET_PASSWORD` | Your Shiprocket password |
| `FRONTEND_URL` | `http://localhost:5174` |
| `PRODUCT_PRICE` | `1999` |
| `PRODUCT_NAME` | `Sacred Shakti Kit` |
| `PRODUCT_SKU` | `SHAKTI-KIT-001` |

---

## ✅ Final Checklist

Before testing, make sure:

- [ ] Razorpay account created (Test mode)
- [ ] API Keys copied to `backend/.env`
- [ ] Webhook created in Razorpay
- [ ] Webhook secret copied to `backend/.env`
- [ ] Shiprocket account created
- [ ] Pickup location "Primary" added in Shiprocket
- [ ] Shiprocket email/password added to `backend/.env`
- [ ] All environment variables added to Netlify

---

## 🧪 Test Your Setup

### Test Razorpay (Before full integration)
1. Razorpay Dashboard → **Test Mode**
2. Try creating a test payment link
3. Use test card: `4111 1111 1111 1111`
4. Verify payment appears in dashboard

### Test Shiprocket (Before full integration)
1. Shiprocket Dashboard → **Orders**
2. Try creating a manual test order
3. Verify pickup location "Primary" is available

---

## 🎯 Current `.env` Files Location

You have two `.env` files:

1. **Frontend**: `/Shakti-kit/.env`
   ```env
   VITE_BACKEND_URL=http://localhost:8888/.netlify/functions
   ```

2. **Backend**: `/Shakti-kit/backend/.env`
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxx
   RAZORPAY_KEY_SECRET=xxx
   RAZORPAY_WEBHOOK_SECRET=xxx
   SHIPROCKET_EMAIL=your@email.com
   SHIPROCKET_PASSWORD=xxx
   FRONTEND_URL=http://localhost:5174
   PRODUCT_PRICE=1999
   PRODUCT_NAME=Sacred Shakti Kit
   PRODUCT_SKU=SHAKTI-KIT-001
   ```

---

## 🆘 Quick Troubleshooting

### "Razorpay API key not working"
- Make sure you're using **TEST mode** keys (start with `rzp_test_`)
- Check for extra spaces when copying
- Verify keys are not expired

### "Shiprocket authentication failed"
- Use your actual login email and password
- Make sure account is activated
- Check for typos in password

### "Pickup location 'Primary' not found"
- Go to Shiprocket → Settings → Pickup Locations
- Name must be exactly **"Primary"** (capital P)
- Save and try again

---

## 🎉 You're Ready!

Once you've filled in all the credentials in `backend/.env`, you can:

1. **Deploy backend to Netlify**
2. **Test payment flow locally**
3. **Deploy frontend to Hostinger**
4. **Start selling!**

Need help? Refer to DEPLOYMENT_GUIDE.md for detailed deployment steps.
