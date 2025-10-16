# 🌐 Setup shaktikit.com Domain on Netlify

## 📋 Current Situation

- Domain: `shaktikit.com` is already registered with Netlify DNS
- It's currently on another team/account
- You want to use it for your shaktikit site

## 🎯 Solutions

### Option 1: If You Own the Domain

If `shaktikit.com` is yours but registered on another Netlify account:

#### Step 1: Remove from Other Account
1. Log into the OTHER Netlify account (where domain is currently)
2. Go to **Domains** → Find `shaktikit.com`
3. Click domain → **Options** → **Remove domain**

#### Step 2: Add to Your Current Account
1. Log into YOUR Netlify account (where shaktikit site is)
2. Go to your **shaktikit** site
3. **Domain settings** → **Add custom domain**
4. Enter: `shaktikit.com`
5. Click **Verify**
6. Netlify will automatically configure DNS

#### Step 3: Add www subdomain
1. Also add: `www.shaktikit.com`
2. Netlify will redirect www to root automatically

---

### Option 2: If Someone Else Owns the Domain

Contact the domain owner to:
1. Transfer the domain to your Netlify account, OR
2. Remove it from their account so you can add it

---

### Option 3: Use a Different Domain (Temporary)

While resolving domain issues, you can use:
- Keep using: `shaktikit.netlify.app`
- Buy a new domain from Netlify or other registrar
- Use a subdomain if you have another domain

---

## 🔧 After Domain is Connected

### Update Environment Variables

Once domain is connected, update in Netlify:

**Environment Variables:**
```
FRONTEND_URL = https://shaktikit.com
```

**Razorpay Webhook URL:**
```
https://shaktikit.com/.netlify/functions/payment-webhook
```

### Update Local .env Files

Update `backend/.env`:
```env
FRONTEND_URL=https://shaktikit.com
```

Update `.env` (if needed for local dev):
```env
VITE_BACKEND_URL=https://shaktikit.com/.netlify/functions
```

---

## 📝 DNS Configuration (If Setting Up Manually)

If you need to configure DNS manually:

### If Domain is on Netlify DNS:
Netlify handles everything automatically when you add the domain.

### If Domain is with Another Registrar (GoDaddy, Namecheap, etc.):

**A Record:**
```
Type: A
Name: @
Value: 75.2.60.5
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: shaktikit.netlify.app
```

---

## ✅ Verification Steps

After domain is connected:

1. **Check DNS Propagation** (may take up to 48 hours)
   - Visit: https://dnschecker.org/
   - Enter: shaktikit.com
   - Check if it points to Netlify

2. **Test Site**
   - Visit: https://shaktikit.com
   - Should load your site

3. **Test HTTPS**
   - Netlify automatically provides SSL certificate
   - Wait 10-20 minutes for SSL to activate

4. **Test Payment Flow**
   - Click "Order Shakti Kit"
   - Complete a test order
   - Verify backend is working

---

## 🆘 Common Issues

### "Domain already registered on another team"
**Solution:** Remove from other team first, then add to yours

### "DNS configuration not working"
**Solution:** Wait 24-48 hours for DNS propagation

### "SSL certificate pending"
**Solution:** Wait 10-20 minutes, Netlify auto-generates SSL

### "Payment not working on custom domain"
**Solution:** Update FRONTEND_URL in Netlify environment variables

---

## 📞 Need Help?

Contact Netlify Support:
- https://www.netlify.com/support/
- They can help transfer domains between accounts

---

## 🎯 Quick Action Plan

**Right Now:**
1. ✅ Keep site running on: `shaktikit.netlify.app`
2. ✅ Add all 10 environment variables (use shaktikit.netlify.app URLs)
3. ✅ Deploy and test payment flow
4. ✅ Make sure everything works

**After Site Works:**
1. 📧 Contact domain owner or Netlify support
2. 🔄 Transfer/add shaktikit.com to your account
3. 🔧 Update environment variables to use shaktikit.com
4. 🚀 Your site is live on custom domain!

---

**For now, your site works perfectly on:**
- https://shaktikit.netlify.app

Custom domain can be added anytime without affecting functionality!
