# 🧪 Integration Test Checklist

## ✅ Backend Status: WORKING!

Backend API is deployed and responding correctly at:
`https://shaktikit.netlify.app/.netlify/functions`

---

## 📋 Complete Integration Test

### Step 1: Check Frontend Upload

1. **Visit**: https://astrovastushrivmjoshi.com/shaktikit
2. **Expected**: Shakti Kit website loads
3. **Check**:
   - [ ] Page loads without errors
   - [ ] All images load
   - [ ] Videos load (if any)
   - [ ] No console errors (press F12)

**If frontend not uploaded yet**: Upload the `shaktikit` folder to Hostinger `public_html/`

---

### Step 2: Test Payment Modal

1. **Click** "Order Shakti Kit" button
2. **Expected**: Payment modal opens
3. **Check**:
   - [ ] Modal appears
   - [ ] Form fields visible
   - [ ] No errors in console

**If modal doesn't open**:
- Check browser console for errors
- Verify Razorpay SDK loaded (check index.html)

---

### Step 3: Test Backend Connection

1. **Fill in the form**:
   ```
   Name: Test User
   Email: test@test.com
   Phone: 9876543210
   Address: 123 Test Street
   City: Mumbai
   State: Maharashtra
   Pincode: 400001
   ```

2. **Click** "Pay ₹1999"

3. **Expected**: Razorpay payment modal opens

4. **Check**:
   - [ ] Payment modal appears
   - [ ] Shows ₹1999 amount
   - [ ] Shows "Sacred Shakti Kit"

**If "Failed to fetch" error**:
- Backend not deployed
- CORS issue (check FRONTEND_URL in Netlify)
- Network error

---

### Step 4: Test Razorpay Integration

⚠️ **WARNING: This uses LIVE mode - real money will be charged!**

**Option A: Use Test Card (if you have test mode)**
```
Card: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date
```

**Option B: Use Real Card (LIVE mode)**
- Use your actual card
- Amount will be charged: ₹1999
- You'll receive the product

1. **Enter card details**
2. **Complete payment**
3. **Expected**: Success message appears

4. **Verify in Razorpay Dashboard**:
   - Go to https://dashboard.razorpay.com/
   - Check "Payments" tab
   - [ ] Payment appears
   - [ ] Status: Success/Captured
   - [ ] Amount: ₹1999

---

### Step 5: Test Shiprocket Integration

1. **Go to Shiprocket Dashboard**:
   - https://app.shiprocket.in/
   - Login with: tp.belgaum64@gmail.com

2. **Check Orders**:
   - [ ] New order appears
   - [ ] Order ID matches Razorpay order ID
   - [ ] Customer details correct
   - [ ] Product: Sacred Shakti Kit
   - [ ] Status: Ready to ship

**If order NOT in Shiprocket**:
- Check Netlify function logs
- Verify Shiprocket credentials
- Check "Primary" pickup location exists

---

### Step 6: Check Netlify Function Logs

1. **Go to Netlify Dashboard**
2. **Select** shaktikit site
3. **Click** "Functions" tab
4. **Click** on `verify-payment` function
5. **Check logs**:
   - [ ] No errors
   - [ ] Payment verified successfully
   - [ ] Shiprocket order created

**Common errors**:
- `Shiprocket authentication failed` → Wrong credentials
- `Pickup location 'Primary' not found` → Create pickup location
- `CORS error` → Wrong FRONTEND_URL

---

## 🔍 Quick Debug Commands

### Check Backend Functions:
```bash
# Test create-order endpoint (should return 405)
curl -X GET https://shaktikit.netlify.app/.netlify/functions/create-order

# Test with POST (should return error about missing data)
curl -X POST https://shaktikit.netlify.app/.netlify/functions/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 1999}'
```

### Check Frontend:
- Visit: https://astrovastushrivmjoshi.com/shaktikit
- Open DevTools (F12)
- Check Console for errors
- Check Network tab for failed requests

---

## ✅ Integration Test Results

### Backend ✅
- [x] Deployed to Netlify
- [x] Functions responding
- [x] Environment variables set

### Frontend
- [ ] Uploaded to Hostinger
- [ ] Site loads correctly
- [ ] Assets load (images, CSS, JS)

### Razorpay Integration
- [ ] Payment modal opens
- [ ] Payment completes
- [ ] Order appears in Razorpay dashboard
- [ ] Webhook receives notification

### Shiprocket Integration
- [ ] Order created automatically
- [ ] Customer details correct
- [ ] Product details correct
- [ ] Ready to ship

---

## 🐛 Troubleshooting

### Problem: Frontend shows 404

**Solution:**
- Upload `shaktikit` folder to Hostinger
- Verify files in `public_html/shaktikit/`
- Check .htaccess file exists

### Problem: Payment modal not opening

**Solution:**
- Check browser console
- Verify backend URL in .env
- Check Razorpay SDK loaded

### Problem: "Failed to fetch"

**Solution:**
- Verify Netlify deployment
- Check FRONTEND_URL = https://astrovastushrivmjoshi.com
- Check CORS in function logs

### Problem: Shiprocket order not created

**Solution:**
- Verify Shiprocket credentials in Netlify
- Check "Primary" pickup location exists
- View Netlify function logs for errors

---

## 📊 Integration Architecture

```
User → Frontend (Hostinger)
        ↓
        Backend (Netlify)
        ↓
        ├─→ Razorpay (Payment)
        └─→ Shiprocket (Shipping)
```

---

## 🎯 Test Status Summary

**Backend**: ✅ WORKING (405 response = correct)

**Frontend**: ⏳ Upload to Hostinger

**Razorpay**: ⏳ Test after frontend upload

**Shiprocket**: ⏳ Test after payment

---

## 📞 Support

- **Netlify Logs**: https://app.netlify.com/ → Functions → View logs
- **Razorpay Dashboard**: https://dashboard.razorpay.com/
- **Shiprocket Dashboard**: https://app.shiprocket.in/

---

**Next Step**: Upload `shaktikit` folder to Hostinger and test! 🚀
