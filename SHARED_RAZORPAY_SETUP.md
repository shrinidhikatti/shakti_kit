# ✅ Using Same Razorpay Account for Multiple Sites

You can absolutely use the same Razorpay account for both:
- trovastushrivmjoshi.com/horoscopebook
- shaktikit.netlify.app (or shaktikit.com)

## 🎯 What You Need to Do

### Step 1: Create a New Webhook for Shakti Kit

You already have a webhook for horoscopebook. Now create another one:

1. **Go to Razorpay Dashboard**
   - https://dashboard.razorpay.com/

2. **Settings → Webhooks**

3. **Click "Create Webhook"**

4. **Configure:**
   - **Webhook URL**: `https://shaktikit.netlify.app/.netlify/functions/payment-webhook`
   - **Active Events**: Select these 3:
     - ✅ `payment.authorized`
     - ✅ `payment.captured`
     - ✅ `payment.failed`
   - **Secret**: Razorpay will generate a new secret

5. **Save and Copy the Webhook Secret**
   - You'll get a NEW webhook secret (different from horoscopebook)
   - Copy this secret

### Step 2: Update Your Netlify Environment Variables

You already have these from horoscopebook:
```
RAZORPAY_KEY_ID = rzp_live_RQsJBd4fNpZt85
RAZORPAY_KEY_SECRET = CB6Nd25m0pGmp89oKddMTaKg
```

**Keep these same**, but update the webhook secret:

```
RAZORPAY_WEBHOOK_SECRET = [NEW_SECRET_FROM_STEP_1]
```

**Use the NEW webhook secret from shaktikit webhook, NOT the horoscopebook webhook secret!**

### Step 3: Your Final Netlify Environment Variables

Add these 10 variables to Netlify:

```
RAZORPAY_KEY_ID = rzp_live_RQsJBd4fNpZt85
RAZORPAY_KEY_SECRET = CB6Nd25m0pGmp89oKddMTaKg
RAZORPAY_WEBHOOK_SECRET = [NEW_SECRET_FOR_SHAKTIKIT]

SHIPROCKET_EMAIL = tp.belgaum64@gmail.com
SHIPROCKET_PASSWORD = diVI2m05p5IrwWL&
SHIPROCKET_API_URL = https://apiv2.shiprocket.in/v1/external

FRONTEND_URL = https://shaktikit.netlify.app

PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

---

## 📊 How It Works

### Same Razorpay Account = ✅
- Same API Key ID and Secret
- All payments go to same Razorpay account
- You can see all orders in one dashboard

### Different Webhooks = ✅
- **Horoscopebook webhook** → sends events to horoscopebook site
- **Shaktikit webhook** → sends events to shaktikit site
- Each site handles its own orders

### Different Products = ✅
The backend uses environment variables to identify products:
- **Horoscopebook**: Has its own PRODUCT_NAME, PRODUCT_SKU, PRODUCT_PRICE
- **Shaktikit**: Has its own PRODUCT_NAME, PRODUCT_SKU, PRODUCT_PRICE

---

## 🔍 Example Razorpay Dashboard

After setup, your Razorpay webhooks will look like this:

```
Webhooks:
├── Webhook 1 (Horoscopebook)
│   URL: https://trovastushrivmjoshi.com/horoscopebook/webhook
│   Secret: 7@wTd8jh6SAtcL@ (your current one)
│
└── Webhook 2 (Shaktikit) ← NEW ONE
    URL: https://shaktikit.netlify.app/.netlify/functions/payment-webhook
    Secret: [NEW_SECRET_YOU_COPIED]
```

---

## ✅ Benefits of This Setup

1. **Single Razorpay Account**
   - All revenue in one place
   - Easy accounting
   - One settlement account

2. **Separate Order Management**
   - Each site handles its own orders
   - No confusion between products
   - Separate Shiprocket orders

3. **Same Shiprocket Account**
   - Can also use same Shiprocket account
   - Just different product SKUs
   - Track all shipments in one place

---

## 🎯 Action Steps Right Now

1. ✅ **Create new webhook** in Razorpay for shaktikit
2. ✅ **Copy the NEW webhook secret**
3. ✅ **Update `NETLIFY_ENV_VALUES.txt`**:
   - Change `RAZORPAY_WEBHOOK_SECRET` to the NEW secret
   - Keep everything else same
4. ✅ **Add all 10 variables to Netlify**
5. ✅ **Deploy your site**

---

## 📝 Updated NETLIFY_ENV_VALUES.txt

Update your file with:

```
RAZORPAY_KEY_ID = rzp_live_RQsJBd4fNpZt85
RAZORPAY_KEY_SECRET = CB6Nd25m0pGmp89oKddMTaKg
RAZORPAY_WEBHOOK_SECRET = [GET_NEW_ONE_FROM_RAZORPAY]

SHIPROCKET_EMAIL = tp.belgaum64@gmail.com
SHIPROCKET_PASSWORD = diVI2m05p5IrwWL&
SHIPROCKET_API_URL = https://apiv2.shiprocket.in/v1/external

FRONTEND_URL = https://shaktikit.netlify.app

PRODUCT_PRICE = 1999
PRODUCT_NAME = Sacred Shakti Kit
PRODUCT_SKU = SHAKTI-KIT-001
```

---

## ⚠️ Important Notes

1. **Different webhook secrets** = Good for security
2. **Same API keys** = Perfectly fine
3. **Different product SKUs** = Helps distinguish orders in Shiprocket
4. **Payment separation** = Razorpay will show which webhook/site processed each payment

---

**In Summary:**
- ✅ Use same Razorpay account (same Key ID & Secret)
- ✅ Create NEW webhook for shaktikit site
- ✅ Use NEW webhook secret in Netlify
- ✅ Everything else stays the same!

You're good to go! 🚀
