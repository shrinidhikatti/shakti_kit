# 📊 Simple Google Sheets Setup (No Google Cloud Required!)

Easy method - same as your horoscopebook setup!

---

## 📝 Part 1: Prepare Your Spreadsheet (2 minutes)

### Step 1: Open Your Sheet
https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/

### Step 2: Add "Orders" Sheet
1. Click **+** at bottom to create new sheet
2. Rename it to **"Orders"** (exact name)

### Step 3: Add Headers
In the "Orders" sheet, add these headers in row 1 (A1 to P1):

```
Timestamp | Order ID | Payment ID | Customer Name | Email | Phone | Address | City | State | Pincode | Product Name | Product SKU | Amount (₹) | Shiprocket Order ID | Shipment ID | Status
```

---

## ⚡ Part 2: Create Apps Script Webhook (5 minutes)

### Step 1: Open Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a code editor

### Step 2: Delete Existing Code
Delete everything in the editor (the `function myFunction()` part)

### Step 3: Paste This Code

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Get the "Orders" sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');

    // If sheet doesn't exist, create it
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Orders');
      // Add headers
      sheet.appendRow([
        'Timestamp', 'Order ID', 'Payment ID', 'Customer Name', 'Email',
        'Phone', 'Address', 'City', 'State', 'Pincode', 'Product Name',
        'Product SKU', 'Amount (₹)', 'Shiprocket Order ID', 'Shipment ID', 'Status'
      ]);
    }

    // Prepare row data
    var rowData = [
      new Date(), // Timestamp
      data.orderId || '',
      data.paymentId || '',
      data.customer.name || '',
      data.customer.email || '',
      data.customer.phone || '',
      data.customer.address || '',
      data.customer.city || '',
      data.customer.state || '',
      data.customer.pincode || '',
      data.product.name || '',
      data.product.sku || '',
      data.amount || '',
      data.shiprocketOrderId || 'N/A',
      data.shipmentId || 'N/A',
      'Success'
    ];

    // Append the row
    sheet.appendRow(rowData);

    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Order logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 4: Save the Script
1. Click the **disk icon** (💾) or press `Ctrl+S` / `Cmd+S`
2. Name it: **"Shakti Kit Logger"**
3. Click **Save**

---

## 🚀 Part 3: Deploy as Web App (3 minutes)

### Step 1: Deploy
1. Click **Deploy** button (top right) → **New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Choose **Web app**

### Step 2: Configure Deployment
Fill in these settings:
- **Description**: "Shakti Kit Order Logger"
- **Execute as**: **Me** (your email)
- **Who has access**: **Anyone** (Important!)

### Step 3: Deploy
1. Click **Deploy**
2. **Authorize** the script
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Shakti Kit Logger (unsafe)**
   - Click **Allow**

### Step 4: Copy Web App URL
1. You'll see a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycbxxx.../exec
   ```
2. **COPY THIS URL** - You'll need it!

---

## 🌐 Part 4: Update Backend Code (2 minutes)

### Step 1: Update googlesheets.js

Replace the file `/netlify/utils/googlesheets.js` with this simpler code:

```javascript
import axios from 'axios';

class GoogleSheetsAPI {
  async logOrder(orderData) {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error('GOOGLE_SHEETS_WEBHOOK_URL not configured');
        return { success: false, error: 'Webhook URL not configured' };
      }

      // Send data to Google Apps Script webhook
      const response = await axios.post(webhookUrl, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Order logged to Google Sheets:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to log order to Google Sheets:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new GoogleSheetsAPI();
```

### Step 2: Add to Netlify Environment Variables

Go to Netlify → Environment Variables

**Add this 1 NEW variable:**

```
Key: GOOGLE_SHEETS_WEBHOOK_URL
Value: [PASTE YOUR WEB APP URL HERE]
```

Example:
```
https://script.google.com/macros/s/AKfycbxxx.../exec
```

### Step 3: Redeploy
1. Push changes to GitHub (or redeploy from Netlify)
2. Trigger deploy on Netlify
3. Wait 2-3 minutes

---

## 🧪 Part 5: Test It!

1. **Place a test order** on your site
2. **Complete payment**
3. **Check Google Sheet** - New row should appear!

---

## ✅ Simple Checklist

- [ ] "Orders" sheet created with headers
- [ ] Apps Script code pasted
- [ ] Script saved
- [ ] Web app deployed (Anyone access)
- [ ] Web app URL copied
- [ ] googlesheets.js updated (I'll do this for you)
- [ ] GOOGLE_SHEETS_WEBHOOK_URL added to Netlify
- [ ] Code pushed to GitHub
- [ ] Netlify redeployed
- [ ] Test order placed
- [ ] Order appears in sheet ✨

---

## 🎯 Why This is Better

✅ **No Google Cloud Console** - Much simpler!
✅ **No Service Account** - No JSON files!
✅ **No API Keys** - Just a webhook URL!
✅ **Same as horoscopebook** - Familiar setup!
✅ **Free** - No billing setup needed!

---

## 🐛 Troubleshooting

### "Authorization required"
- Deploy again
- Make sure "Who has access" = **Anyone**

### "Orders not appearing"
- Check sheet name is exactly "Orders"
- Check webhook URL is correct
- Check Netlify logs for errors

### "Permission denied"
- Redeploy the web app
- Choose "Execute as: Me"
- Choose "Who has access: Anyone"

---

## 📊 Summary

**Your Spreadsheet**: https://docs.google.com/spreadsheets/d/1gxJaP5DYVIwlQlI9SypuO_LX82fzMde3Vj0aMIfc9-I/

**Netlify Variable Needed**:
- `GOOGLE_SHEETS_WEBHOOK_URL` = Your Apps Script web app URL

**That's it!** Much simpler than Google Cloud method! 🎉

---

Let me know when you have the Web App URL and I'll update the code for you!
