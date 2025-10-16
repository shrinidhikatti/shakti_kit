# ✅ Quick Deploy Checklist

Deploy Shakti Kit to: `https://astrovastushrivmjoshi.com/shaktikit`

## 🎯 Step 1: Deploy Backend (Netlify) - 10 minutes

### A. Create Razorpay Webhook
1. [ ] Go to https://dashboard.razorpay.com/
2. [ ] Settings → Webhooks → Create Webhook
3. [ ] URL: `https://shaktikit.netlify.app/.netlify/functions/payment-webhook`
4. [ ] Events: payment.authorized, payment.captured, payment.failed
5. [ ] **Copy webhook secret**

### B. Add Netlify Environment Variables
1. [ ] Go to https://app.netlify.com/ → shaktikit site
2. [ ] Site Settings → Environment Variables
3. [ ] Add all 10 variables from `NETLIFY_ENV_PRODUCTION.txt`
4. [ ] Use NEW webhook secret from step A.5
5. [ ] Click Save

### C. Deploy
1. [ ] Deploys tab → Trigger deploy
2. [ ] Wait 2-3 minutes
3. [ ] ✅ Backend live!

---

## 📦 Step 2: Deploy Frontend (Hostinger) - 10 minutes

### A. Build
```bash
cd /Users/shrinidhikatti/Desktop/shakti_kit/Shakti-kit
npm run build
```

### B. Upload to Hostinger
1. [ ] Login to Hostinger File Manager
2. [ ] Navigate to `public_html/`
3. [ ] Create folder `shaktikit` (if doesn't exist)
4. [ ] Upload ALL files from `dist/` folder to `public_html/shaktikit/`
5. [ ] Verify `.htaccess` file is uploaded

### C. Done!
1. [ ] Visit: https://astrovastushrivmjoshi.com/shaktikit
2. [ ] Site should load

---

## 🧪 Step 3: Test Everything - 5 minutes

1. [ ] Click "Order Shakti Kit"
2. [ ] Fill form with test data
3. [ ] Complete payment (⚠️ LIVE - will charge!)
4. [ ] Check Razorpay dashboard for payment
5. [ ] Check Shiprocket dashboard for order
6. [ ] ✅ Everything works!

---

## 📋 Files You Need

- `NETLIFY_ENV_PRODUCTION.txt` - Environment variables to add
- `HOSTINGER_DEPLOYMENT.md` - Detailed instructions
- `dist/` folder - Will be created after `npm run build`

---

## 🆘 Quick Help

**Frontend not loading?**
- Check files are in `public_html/shaktikit/`
- Verify `.htaccess` exists

**Payment not working?**
- Check Netlify environment variables
- Verify FRONTEND_URL = https://astrovastushrivmjoshi.com

**Backend errors?**
- Check Netlify function logs
- Verify webhook secret is correct

---

## 🎉 Success!

Your site: `https://astrovastushrivmjoshi.com/shaktikit`

Same owner, two products:
- `/horoscopebook` - Existing
- `/shaktikit` - NEW!

Both using same Razorpay & Shiprocket accounts! 🚀
