# 🚀 Quick Start Guide

Get your Shakti Kit e-commerce site up and running in 30 minutes!

## 🎯 What You'll Get

- ✅ Payment processing via Razorpay
- ✅ Automatic shipping via Shiprocket
- ✅ Professional payment modal
- ✅ Order management system

## ⚡ Quick Setup (3 Steps)

### Step 1: Deploy Backend (10 mins)

1. **Sign up for accounts** (all free to start):
   - [Razorpay](https://razorpay.com/) - Get API keys
   - [Shiprocket](https://shiprocket.in/) - Setup pickup location
   - [Netlify](https://netlify.com/) - For backend hosting

2. **Deploy to Netlify**:
   ```bash
   cd backend
   npm install
   ```

3. **On Netlify Dashboard**:
   - Import your GitHub repo
   - Base directory: `backend`
   - Add environment variables (see DEPLOYMENT_GUIDE.md)
   - Deploy!

### Step 2: Deploy Frontend (10 mins)

1. **Update config**:
   Create `.env` in root:
   ```
   VITE_BACKEND_URL=https://YOUR-SITE.netlify.app/.netlify/functions
   ```

2. **Build**:
   ```bash
   npm install
   npm run build
   ```

3. **Upload to Hostinger**:
   - Upload all files from `dist/` folder
   - Done!

### Step 3: Test (10 mins)

1. Visit your website
2. Click "Order Shakti Kit"
3. Fill the form
4. Use test card: `4111 1111 1111 1111`
5. Complete payment
6. Check Shiprocket for the order!

## 📖 Detailed Guides

For complete instructions, see:
- **DEPLOYMENT_GUIDE.md** - Full deployment steps
- **backend/README.md** - Backend API docs
- **PROJECT_SUMMARY.md** - Project overview

## 🆘 Need Help?

Common issues:
- **Payment modal not opening?** Check browser console
- **Backend errors?** Check Netlify function logs
- **CORS errors?** Update FRONTEND_URL in Netlify env

## 💡 Tips

1. Start with **test mode** (Razorpay test keys)
2. Test multiple times before going live
3. Switch to **live mode** only when ready
4. Keep your API keys secure!

## ✅ Success Checklist

- [ ] Backend deployed and running
- [ ] Frontend shows payment modal
- [ ] Test payment works
- [ ] Order appears in Shiprocket
- [ ] Ready for customers!

---

**Time to first sale**: ~30 minutes 🎉

Questions? Check DEPLOYMENT_GUIDE.md for detailed instructions!
