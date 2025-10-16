# 📤 Upload Shakti Kit to Hostinger

## ✅ `shaktikit` Folder is Ready!

I've created a **`shaktikit`** folder with all frontend files ready to upload.

---

## 📁 What's in the `shaktikit` Folder:

```
shaktikit/
├── index.html          (Main HTML file)
├── assets/             (CSS, JavaScript, Images)
│   ├── index-*.css    (Styles)
│   └── index-*.js     (React app)
├── .htaccess          (Routing configuration)
└── README_UPLOAD.txt  (Upload instructions)
```

---

## 🚀 Upload Methods

### Method 1: Hostinger File Manager (Recommended)

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com/
   - Login with your credentials

2. **Open File Manager**
   - Click on **File Manager** icon

3. **Navigate to public_html**
   - Click on `public_html` folder

4. **Upload shaktikit folder**
   - Option A: Upload entire folder
     - Click **Upload** button
     - Select the entire `shaktikit` folder
     - Wait for upload to complete

   - Option B: Create folder and upload contents
     - Click **New Folder** → Name it `shaktikit`
     - Open `shaktikit` folder
     - Click **Upload**
     - Select ALL files from your local `shaktikit` folder:
       - `index.html`
       - `assets` folder
       - `.htaccess`
     - Wait for upload

5. **Verify Upload**
   - Your structure should look like:
   ```
   public_html/
   ├── horoscopebook/  (existing)
   └── shaktikit/      (new)
       ├── index.html
       ├── assets/
       └── .htaccess
   ```

---

### Method 2: FTP Upload

1. **Get FTP Credentials**
   - Hostinger → Hosting → FTP Accounts
   - Note: Host, Username, Password

2. **Connect with FTP Client** (FileZilla, etc.)
   - Host: Your FTP host
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Navigate to public_html**

4. **Upload shaktikit Folder**
   - Drag the entire `shaktikit` folder
   - Drop into `public_html/`
   - Wait for upload

---

## ✅ After Upload - Verification

### Check Files Are Uploaded:

Your Hostinger file structure:
```
public_html/
└── shaktikit/
    ├── index.html ✓
    ├── assets/
    │   ├── index-*.css ✓
    │   └── index-*.js ✓
    └── .htaccess ✓
```

### Test Your Site:

1. **Open Browser**
2. **Visit**: `https://astrovastushrivmjoshi.com/shaktikit`
3. **Should Load**: Shakti Kit website
4. **Check**: All images, videos load correctly
5. **No Errors**: Open browser console (F12)

---

## 🧪 Test Payment Flow

1. Click **"Order Shakti Kit"** button
2. Fill in the form
3. Click **"Pay ₹1999"**
4. Payment modal should open
5. Complete payment (⚠️ LIVE MODE - will charge!)
6. Check Razorpay & Shiprocket dashboards

---

## ⚠️ Important Notes

### .htaccess File
- **Must be uploaded** for React routing to work
- If site shows 404 on refresh, .htaccess is missing
- Enable "Show Hidden Files" in File Manager to see it

### File Permissions
- Files: 644
- Folders: 755
- Usually set automatically by Hostinger

### Clear Cache
- If changes don't appear, clear browser cache
- Or open in incognito mode

---

## 🐛 Troubleshooting

### Problem: Site shows blank page

**Solution:**
- Check browser console for errors
- Verify all files uploaded correctly
- Check file paths are correct

### Problem: 404 error on page refresh

**Solution:**
- .htaccess file is missing
- Upload .htaccess file
- Enable "Show Hidden Files" in File Manager

### Problem: Assets not loading

**Solution:**
- Check `assets` folder uploaded
- Verify folder structure matches above
- Clear browser cache

### Problem: "Failed to fetch" when ordering

**Solution:**
- Backend not deployed yet
- Check Netlify deployment
- Verify environment variables in Netlify

---

## 📊 Your Complete Setup

```
┌─────────────────────────────────────────┐
│  astrovastushrivmjoshi.com              │
├─────────────────────────────────────────┤
│  Frontend (Hostinger)                   │
│  ├── /horoscopebook (existing)          │
│  └── /shaktikit (NEW!)                  │
│                                         │
│  Backend (Netlify)                      │
│  └── shaktikit.netlify.app              │
│      └── /.netlify/functions/           │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist

- [ ] `shaktikit` folder uploaded to `public_html/`
- [ ] All files present (index.html, assets, .htaccess)
- [ ] Site loads at https://astrovastushrivmjoshi.com/shaktikit
- [ ] No console errors
- [ ] Images/videos load correctly
- [ ] Backend deployed on Netlify
- [ ] Payment flow tested

---

## 🎉 You're Done!

**Your site**: https://astrovastushrivmjoshi.com/shaktikit

**Backend API**: https://shaktikit.netlify.app/.netlify/functions

**Need help?** See `HOSTINGER_DEPLOYMENT.md` for detailed troubleshooting

---

## 🔄 To Update Frontend

When you make changes:

1. Run `npm run build`
2. Delete old files in `public_html/shaktikit/`
3. Upload new files from `dist/` folder
4. Don't forget `.htaccess`!

Or use the `shaktikit` folder (it gets regenerated each build)

---

Good luck! 🚀
