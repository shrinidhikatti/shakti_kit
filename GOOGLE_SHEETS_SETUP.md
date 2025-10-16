# 📊 Google Sheets Integration Setup

Automatically log all orders to Google Sheets after successful payment.

---

## 📋 Part 1: Create Google Sheet

### Step 1: Create New Spreadsheet

1. Go to https://sheets.google.com/
2. Click **"Blank"** to create new spreadsheet
3. Name it: **"Shakti Kit Orders"**

### Step 2: Create Orders Sheet

1. Rename Sheet1 to **"Orders"** (exactly, case-sensitive)
2. Add these headers in Row 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Order ID | Payment ID | Customer Name | Email | Phone | Address | City | State | Pincode | Product Name | Product SKU | Amount (₹) | Shiprocket Order ID | Shipment ID | Status |

3. **Save the spreadsheet**

### Step 3: Get Spreadsheet ID

Look at the URL of your spreadsheet:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
                                        ^^^^^^^^^^^^^^^^^^^^
```

Copy the **SPREADSHEET_ID** part. You'll need it later.

---

## 🔑 Part 2: Create Service Account

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. **Create New Project** (or select existing)
   - Project name: "Shakti Kit"
   - Click **Create**

### Step 2: Enable Google Sheets API

1. In your project, go to **APIs & Services** → **Library**
2. Search for: "Google Sheets API"
3. Click on it
4. Click **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - Service account name: `shaktikit-orders`
   - Service account ID: (auto-filled)
   - Click **Create and Continue**
4. **Grant permissions**:
   - Role: Select **"Editor"**
   - Click **Continue**
5. Click **Done**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON**
5. Click **Create**
6. **Download the JSON file** - Keep it safe!

---

## 🔗 Part 3: Share Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `shaktikit-orders@your-project.iam.gserviceaccount.com`)
3. **Copy this email**

4. Go back to your Google Sheet
5. Click **Share** button (top right)
6. Paste the service account email
7. Set permission to **Editor**
8. **Uncheck** "Notify people"
9. Click **Send**

---

## 🌐 Part 4: Add to Netlify Environment Variables

### Step 1: Prepare Service Account Key

1. Open the downloaded JSON file in a text editor
2. **Copy the ENTIRE contents** (it should be one long JSON object)
3. **Minify it** (remove all line breaks and extra spaces)
   - Or use: https://www.text-fixer.com/html/compress-html-compression.php
   - Paste JSON, click "Compress", copy result

### Step 2: Add to Netlify

Go to Netlify Dashboard → Your shaktikit site → Environment Variables

**Add these 2 NEW variables:**

---

**Variable 11:**
```
Key: GOOGLE_SHEET_ID
Value: [YOUR_SPREADSHEET_ID_FROM_URL]
```

---

**Variable 12:**
```
Key: GOOGLE_SERVICE_ACCOUNT_KEY
Value: [PASTE_ENTIRE_MINIFIED_JSON_HERE]
```

Example of minified JSON:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"shaktikit@your-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/shaktikit%40your-project.iam.gserviceaccount.com"}
```

---

### Step 3: Redeploy

1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**
4. Wait 2-3 minutes

---

## 🧪 Part 5: Test Integration

### Test Order

1. Place a test order on your site
2. Complete payment
3. **Check Google Sheet**:
   - New row should appear automatically
   - Contains all order details
   - Timestamp, payment info, customer info, shipment info

---

## 📊 Spreadsheet Columns Explained

| Column | Data | Example |
|--------|------|---------|
| A | Timestamp | 2024-10-16T10:30:45.123Z |
| B | Order ID | order_abc123 |
| C | Payment ID | pay_xyz789 |
| D | Customer Name | John Doe |
| E | Email | john@example.com |
| F | Phone | 9876543210 |
| G | Address | 123 Test Street |
| H | City | Mumbai |
| I | State | Maharashtra |
| J | Pincode | 400001 |
| K | Product Name | Sacred Shakti Kit |
| L | Product SKU | SHAKTI-KIT-001 |
| M | Amount (₹) | 1999 |
| N | Shiprocket Order ID | 12345678 |
| O | Shipment ID | 87654321 |
| P | Status | Success |

---

## 🔒 Security Notes

1. **Never commit** the service account JSON to Git
2. **Keep JSON file safe** - it has full access to the sheet
3. **Use Editor role** - Don't give Owner permissions
4. **Regenerate keys** if compromised

---

## 🐛 Troubleshooting

### Orders not appearing in sheet

**Check:**
1. Service account has Editor access to sheet
2. Sheet is named exactly "Orders" (case-sensitive)
3. GOOGLE_SHEET_ID is correct
4. GOOGLE_SERVICE_ACCOUNT_KEY is valid JSON
5. Check Netlify function logs for errors

### "Failed to authenticate"

**Solution:**
- JSON might be malformed
- Make sure entire JSON is in one line
- No extra quotes or escaping

### "Spreadsheet not found"

**Solution:**
- Double-check GOOGLE_SHEET_ID
- Make sure service account has access to sheet

---

## ✅ Final Checklist

- [ ] Google Sheet created with "Orders" sheet
- [ ] Headers added (A1:P1)
- [ ] Spreadsheet ID copied
- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] Service account key (JSON) downloaded
- [ ] Sheet shared with service account email
- [ ] GOOGLE_SHEET_ID added to Netlify
- [ ] GOOGLE_SERVICE_ACCOUNT_KEY added to Netlify
- [ ] Site redeployed
- [ ] Test order placed
- [ ] Order appears in sheet

---

## 📊 Your Complete Environment Variables (12 total)

```
1.  RAZORPAY_KEY_ID
2.  RAZORPAY_KEY_SECRET
3.  RAZORPAY_WEBHOOK_SECRET
4.  SHIPROCKET_EMAIL
5.  SHIPROCKET_PASSWORD
6.  SHIPROCKET_API_URL
7.  FRONTEND_URL
8.  PRODUCT_PRICE
9.  PRODUCT_NAME
10. PRODUCT_SKU
11. GOOGLE_SHEET_ID (NEW)
12. GOOGLE_SERVICE_ACCOUNT_KEY (NEW)
```

---

## 🎉 Benefits

✅ Automatic order logging
✅ All details in one place
✅ Easy to export/analyze
✅ Backup of all orders
✅ No database needed
✅ Share with team members

---

**Need help?** Check Netlify function logs for Google Sheets errors.

Good luck! 📊
