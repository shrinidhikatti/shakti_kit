# 🚀 Deploy Shakti Kit to Hostinger + Netlify

Complete guide to deploy:
- **Frontend**: `https://astrovastushrivmjoshi.com/shaktikit` (Hostinger)
- **Backend**: `https://shaktikit.netlify.app/.netlify/functions` (Netlify)

Same setup as your horoscopebook!

---

## 📋 Part 1: Deploy Backend to Netlify (15 minutes)

### Step 1: Add Environment Variables to Netlify

1. Go to https://app.netlify.com/
2. Select your **shaktikit** site
3. **Site Settings** → **Environment Variables**
4. Add these **10 variables**:

```
RAZORPAY_KEY_ID = rzp_live_RQsJBd4fNpZt85
RAZORPAY_KEY_SECRET = CB6Nd25m0pGmp89oKddMTaKg
RAZORPAY_WEBHOOK_SECRET = [CREATE_NEW_WEBHOOK_FIRST]

SHIPROCKET_EMAIL = tp.belgaum64@gmail.com
SHIPROCKET_PASSWORD = diVI2m05p5IrwWL&
SHIPROCKET_API_URL = https://apiv2.shiprocket.in/v1/external

FRONTEND_URL = https://astrovastushrivmjoshi.com

PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

### Step 2: Create Razorpay Webhook (IMPORTANT!)

1. Go to https://dashboard.razorpay.com/
2. **Settings** → **Webhooks**
3. Click **Create Webhook**
4. **Webhook URL**:
   ```
   https://shaktikit.netlify.app/.netlify/functions/payment-webhook
   ```
5. **Active Events**: Select these 3:
   - ✅ `payment.authorized`
   - ✅ `payment.captured`
   - ✅ `payment.failed`
6. Click **Create**
7. **Copy the Webhook Secret**
8. Go back to Netlify → Update `RAZORPAY_WEBHOOK_SECRET` with this new secret

### Step 3: Verify Shiprocket Setup

1. Go to https://app.shiprocket.in/
2. Login with `tp.belgaum64@gmail.com`
3. **Settings** → **Pickup Locations**
4. Verify location named **"Primary"** exists
5. If not, create one

### Step 4: Deploy Backend

1. In Netlify → **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait 2-3 minutes
4. ✅ Backend is live!

---

## 📦 Part 2: Deploy Frontend to Hostinger (15 minutes)

### Step 1: Build the Frontend

On your local machine:

```bash
cd /Users/shrinidhikatti/Desktop/shakti_kit/Shakti-kit
npm run build
```

This creates a `dist` folder with all files.

### Step 2: Upload to Hostinger

#### Via Hostinger File Manager:

1. **Login to Hostinger** control panel
2. **File Manager** → Navigate to:
   ```
   public_html/shaktikit/
   ```
   (Create `shaktikit` folder if it doesn't exist)

3. **Delete** any existing files in `shaktikit` folder

4. **Upload** all files from your local `dist` folder:
   - Select all files in `dist` folder
   - Drag and drop into `public_html/shaktikit/`

5. Wait for upload to complete

#### Via FTP (Alternative):

1. Use FileZilla or similar FTP client
2. Connect to Hostinger:
   - Host: Your FTP host
   - Username: Your FTP username
   - Password: Your FTP password

3. Navigate to `public_html/shaktikit/`
4. Upload all files from `dist` folder

### Step 3: Configure .htaccess (IMPORTANT for React routing)

Create/Edit `.htaccess` file in `public_html/shaktikit/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /shaktikit/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /shaktikit/index.html [L]
</IfModule>
```

This ensures React routing works properly.

---

## 🧪 Part 3: Test Your Deployment

### Test Frontend

1. Visit: https://astrovastushrivmjoshi.com/shaktikit
2. Should load the Shakti Kit website
3. Check if all images/videos load
4. No console errors

### Test Payment Flow

1. Click **"Order Shakti Kit"** button
2. Fill in the form:
   - Name: Test User
   - Email: test@test.com
   - Phone: 9876543210
   - Address: 123 Test Street
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001

3. Click **"Pay ₹1999"**
4. Payment modal should open
5. Use a **real card** (⚠️ LIVE mode - will charge!)
   - Or use test card if you switch to test mode

6. Complete payment

### Verify Order Creation

1. **Razorpay Dashboard**: Check for payment
2. **Shiprocket Dashboard**: Check for order
3. **Netlify Functions Logs**: Check for any errors

---

## 🔧 Troubleshooting

### Issue: Site not loading at /shaktikit

**Solution:**
- Check if files are in correct folder: `public_html/shaktikit/`
- Verify `.htaccess` is present
- Clear browser cache

### Issue: "Failed to fetch" when ordering

**Solution:**
- Check Netlify environment variables
- Verify `FRONTEND_URL = https://astrovastushrivmjoshi.com`
- Check Netlify function logs for CORS errors

### Issue: Payment modal not opening

**Solution:**
- Check browser console for errors
- Verify Razorpay SDK loaded (check index.html)
- Check backend URL in `.env` is correct

### Issue: Shiprocket order not created

**Solution:**
- Verify Shiprocket credentials in Netlify
- Check "Primary" pickup location exists
- View Netlify function logs

---

## 📊 Your Final Setup

```
┌─────────────────────────────────────────┐
│  https://astrovastushrivmjoshi.com      │
│                                         │
│  ├── /horoscopebook (existing)        │
│  │   ├── Frontend: Hostinger           │
│  │   └── Backend: Railway (existing)   │
│  │                                      │
│  └── /shaktikit (NEW!)                 │
│      ├── Frontend: Hostinger           │
│      └── Backend: Netlify              │
└─────────────────────────────────────────┘

Razorpay Account (shared):
├── Webhook 1: Horoscopebook
└── Webhook 2: Shaktikit (NEW)

Shiprocket Account (shared):
├── Product 1: Horoscope Book
└── Product 2: Shakti Kit (NEW SKU)
```

---

## 📝 Environment Variables Summary

### Netlify Environment Variables:
```
RAZORPAY_KEY_ID = rzp_live_RQsJBd4fNpZt85
RAZORPAY_KEY_SECRET = CB6Nd25m0pGmp89oKddMTaKg
RAZORPAY_WEBHOOK_SECRET = [NEW_WEBHOOK_SECRET]
SHIPROCKET_EMAIL = tp.belgaum64@gmail.com
SHIPROCKET_PASSWORD = diVI2m05p5IrwWL&
SHIPROCKET_API_URL = https://apiv2.shiprocket.in/v1/external
FRONTEND_URL = https://astrovastushrivmjoshi.com
PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

### Local .env (Frontend):
```
VITE_BACKEND_URL=https://shaktikit.netlify.app/.netlify/functions
```

---

## ✅ Deployment Checklist

### Backend (Netlify):
- [ ] All 10 environment variables added
- [ ] Razorpay webhook created for shaktikit
- [ ] Webhook secret updated in Netlify
- [ ] Shiprocket "Primary" location verified
- [ ] Backend deployed successfully
- [ ] Test backend functions (check logs)

### Frontend (Hostinger):
- [ ] Build completed (`npm run build`)
- [ ] Files uploaded to `public_html/shaktikit/`
- [ ] `.htaccess` file created
- [ ] Site loads at /shaktikit
- [ ] No console errors
- [ ] Images/videos load

### Integration Testing:
- [ ] Payment modal opens
- [ ] Payment completes successfully
- [ ] Order appears in Razorpay
- [ ] Order appears in Shiprocket
- [ ] Customer receives confirmation

---

## 🎉 You're Live!

After completing all steps:

**Your Shakti Kit site**: https://astrovastushrivmjoshi.com/shaktikit

**Backend API**: https://shaktikit.netlify.app/.netlify/functions

**Razorpay Dashboard**: https://dashboard.razorpay.com/

**Shiprocket Dashboard**: https://app.shiprocket.in/

---

## 📞 Support Links

- **Razorpay Docs**: https://razorpay.com/docs/
- **Shiprocket API**: https://apidocs.shiprocket.in/
- **Netlify Functions**: https://docs.netlify.com/functions/
- **Hostinger Support**: https://www.hostinger.com/tutorials/

---

**Need help?** Check function logs in Netlify Dashboard → Functions

Good luck! 🚀
