# 📊 Quick Google Sheets Setup for Your Existing Sheet

Using your spreadsheet: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/

---

## ✅ Part 1: Prepare Your Sheet (2 minutes)

### Step 1: Open Your Sheet
1. Go to: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/
2. Create a new sheet tab named **"Orders"** (exact name, case-sensitive)
3. Or rename an existing empty sheet to **"Orders"**

### Step 2: Add Headers in Row 1

Copy-paste this entire row into A1:

```
Timestamp	Order ID	Payment ID	Customer Name	Email	Phone	Address	City	State	Pincode	Product Name	Product SKU	Amount (₹)	Shiprocket Order ID	Shipment ID	Status
```

Or manually type these headers in cells A1 to P1:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Order ID | Payment ID | Customer Name | Email | Phone | Address | City | State | Pincode | Product Name | Product SKU | Amount (₹) | Shiprocket Order ID | Shipment ID | Status |

---

## 🔑 Part 2: Create Service Account (5 minutes)

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. **Create New Project** (or use existing)
   - Name: "Shakti Kit Orders"
   - Click **Create**

### Step 2: Enable Google Sheets API
1. In the search bar, type: "Google Sheets API"
2. Click on **Google Sheets API**
3. Click **ENABLE**

### Step 3: Create Service Account
1. Go to: **APIs & Services** → **Credentials**
2. Click **CREATE CREDENTIALS** → **Service Account**
3. Fill in:
   - **Service account name**: `shaktikit-logger`
   - Click **CREATE AND CONTINUE**
4. **Grant access**:
   - Select role: **Editor**
   - Click **CONTINUE**
5. Click **DONE**

### Step 4: Create JSON Key
1. Click on the **service account** you just created
2. Go to **KEYS** tab
3. Click **ADD KEY** → **Create new key**
4. Choose **JSON**
5. Click **CREATE**
6. **File downloads** - Save it safely!

---

## 🔗 Part 3: Share Sheet with Service Account (1 minute)

### Step 1: Get Service Account Email
1. Open the JSON file you just downloaded
2. Find this line:
   ```json
   "client_email": "shaktikit-logger@YOUR-PROJECT.iam.gserviceaccount.com"
   ```
3. **Copy this email address**

### Step 2: Share Your Spreadsheet
1. Open your sheet: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/
2. Click **Share** button (top right)
3. **Paste the service account email**
4. Change permission to **Editor**
5. **UNCHECK** "Notify people"
6. Click **Done**

---

## 🌐 Part 4: Add to Netlify (3 minutes)

### Step 1: Prepare the JSON Key
1. Open the downloaded JSON file
2. Copy **ENTIRE contents**
3. **Minify it** (remove line breaks):
   - Go to: https://jsonformatter.org/json-minify
   - Paste JSON → Click "Minify" → Copy result

### Step 2: Add to Netlify

Go to: https://app.netlify.com/ → Your shaktikit site → Site Settings → Environment Variables

**Add these 2 NEW variables:**

---

**Variable 11:**
```
Key: GOOGLE_SHEET_ID
Value: 1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I
```

---

**Variable 12:**
```
Key: GOOGLE_SERVICE_ACCOUNT_KEY
Value: [PASTE MINIFIED JSON HERE]
```

The JSON should look like one long line:
```
{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

---

### Step 3: Redeploy
1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**
4. Wait 2-3 minutes

---

## 🧪 Part 5: Test It!

1. **Place a test order** on your site
2. **Complete payment**
3. **Check your Google Sheet**: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/
4. **New row should appear** in the "Orders" sheet with all details!

---

## ✅ Quick Checklist

- [ ] "Orders" sheet created in spreadsheet
- [ ] Headers added (A1:P1)
- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Sheet shared with service account email (Editor permission)
- [ ] GOOGLE_SHEET_ID added to Netlify
- [ ] GOOGLE_SERVICE_ACCOUNT_KEY added to Netlify (minified JSON)
- [ ] Site redeployed on Netlify
- [ ] Test order placed
- [ ] Order appears in sheet ✨

---

## 🐛 Troubleshooting

### "Spreadsheet not found"
- Check GOOGLE_SHEET_ID is correct: `1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I`
- Make sure service account has Editor access

### "Sheet not found"
- Sheet must be named exactly "Orders" (capital O)
- Check spelling and case

### "Permission denied"
- Service account email not added to sheet
- Or wrong permission (needs Editor, not Viewer)

### Check Netlify Logs
1. Netlify Dashboard → Functions → verify-payment
2. Look for Google Sheets errors in logs

---

## 📊 Your Spreadsheet

**URL**: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/

**Sheet ID**: `1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I`

**Sheet Name**: `Orders` (must be exact)

---

## 🎉 Done!

After setup, every successful order will automatically log to your Google Sheet with:
- Timestamp
- Order & Payment IDs
- Customer details
- Product info
- Amount
- Shiprocket tracking info
- Status

No manual entry needed! 🚀
