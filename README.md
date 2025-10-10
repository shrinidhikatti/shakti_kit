# Sacred Shakti Kit - E-Commerce Platform

A complete e-commerce solution for the Sacred Shakti Kit by Shri V.M. Joshi, featuring integrated Razorpay payments and Shiprocket shipping automation.

![Tech Stack](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-green)
![Shiprocket](https://img.shields.io/badge/Shiprocket-Integrated-orange)

## 🌟 Features

### 🛍️ E-Commerce
- Professional product showcase
- Mobile-responsive design
- Smooth animations and effects
- Video demonstrations
- Customer reviews section

### 💳 Payment Processing
- Razorpay integration
- Secure payment gateway
- Test & live mode support
- Payment verification
- Webhook support

### 📦 Shipping Automation
- Shiprocket API integration
- Automatic order creation
- Shipment tracking
- Pickup location management

### 🎨 User Experience
- Payment modal with form validation
- Sticky order button (mobile)
- Real-time order status
- Success/failure notifications

## 🏗️ Tech Stack

**Frontend:**
- React 18.3 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

**Backend:**
- Netlify Serverless Functions
- Node.js with ES Modules
- Razorpay SDK
- Shiprocket API
- Axios for HTTP requests

**Hosting:**
- Frontend: Hostinger (or any static host)
- Backend: Netlify (free tier)

## 📁 Project Structure

```
Shakti-kit/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── PaymentModal.tsx
│   │   ├── CTASection.tsx
│   │   ├── MobileStickyOrder.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── backend/                # Serverless backend
│   ├── functions/          # Netlify Functions
│   │   ├── create-order.js
│   │   ├── verify-payment.js
│   │   └── payment-webhook.js
│   ├── utils/              # Utility modules
│   │   ├── razorpay.js
│   │   └── shiprocket.js
│   └── package.json
├── public/                 # Static assets
├── QUICK_START.md         # Quick setup guide
├── DEPLOYMENT_GUIDE.md    # Detailed deployment instructions
└── PROJECT_SUMMARY.md     # Project overview
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Razorpay account
- Shiprocket account
- Netlify account
- Hostinger or similar hosting

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment

**Frontend** - Create `.env`:
```env
VITE_BACKEND_URL=http://localhost:8888/.netlify/functions
```

**Backend** - Create `backend/.env`:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
SHIPROCKET_EMAIL=your@email.com
SHIPROCKET_PASSWORD=your_password
FRONTEND_URL=http://localhost:5174
PRODUCT_PRICE=1999
PRODUCT_NAME=Sacred Shakti Kit
PRODUCT_SKU=SHAKTI-KIT-001
```

### 3. Run Development Servers

**Frontend:**
```bash
npm run dev
```
Visit: http://localhost:5174

**Backend (in separate terminal):**
```bash
cd backend
npm run dev
```
Backend runs at: http://localhost:8888

### 4. Test Payment Flow

1. Click "Order Shakti Kit"
2. Fill customer details
3. Use test card: `4111 1111 1111 1111`
4. Complete payment
5. Check Shiprocket dashboard for order

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 30 minutes
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Architecture & overview
- **[backend/README.md](backend/README.md)** - Backend API documentation

## 🔧 Development

### Build for Production

**Frontend:**
```bash
npm run build
```
Output: `dist/` folder

**Backend:**
No build needed - Netlify handles it automatically

### Linting
```bash
npm run lint
```

## 🌐 Deployment

### Option 1: Recommended Setup
- **Frontend**: Hostinger (static files)
- **Backend**: Netlify (serverless)

### Option 2: All-in-One
- **Both**: Hostinger VPS with Node.js

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_BACKEND_URL=<netlify-functions-url>
```

### Backend (backend/.env)
```env
RAZORPAY_KEY_ID=<your-key-id>
RAZORPAY_KEY_SECRET=<your-secret>
RAZORPAY_WEBHOOK_SECRET=<webhook-secret>
SHIPROCKET_EMAIL=<your-email>
SHIPROCKET_PASSWORD=<your-password>
FRONTEND_URL=<your-domain>
PRODUCT_PRICE=1999
PRODUCT_NAME=Sacred Shakti Kit
PRODUCT_SKU=SHAKTI-KIT-001
```

## 🧪 Testing

### Test Cards (Razorpay)
- **Success**: `4111 1111 1111 1111`
- **Failure**: `4111 1111 1111 1234`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test Flow
1. Development mode: Use test API keys
2. Fill order form with valid data
3. Complete test payment
4. Verify in Razorpay dashboard
5. Check Shiprocket for order creation

## 📊 API Endpoints

### POST `/create-order`
Creates a new Razorpay order

### POST `/verify-payment`
Verifies payment and creates Shiprocket order

### POST `/payment-webhook`
Razorpay webhook handler (auto-called)

See [backend/README.md](backend/README.md) for detailed API docs.

## 💰 Pricing

| Service | Cost |
|---------|------|
| Hostinger | ₹100-300/month |
| Netlify Backend | Free (100k requests/month) |
| Razorpay | 2% per transaction |
| Shiprocket | Per shipment (variable) |

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ HTTPS enforced
- ✅ Payment signature verification
- ✅ Webhook signature verification
- ✅ CORS protection
- ✅ Input validation

## 🐛 Troubleshooting

### Payment Modal Not Opening
- Check browser console for errors
- Ensure Razorpay SDK is loaded
- Verify backend URL in `.env`

### Backend Connection Failed
- Check Netlify function logs
- Verify environment variables
- Check CORS settings

### Shiprocket Order Not Created
- Verify credentials in backend `.env`
- Ensure "Primary" pickup location exists
- Check Netlify function logs

## 📞 Support

- **Razorpay**: https://razorpay.com/docs/
- **Shiprocket**: https://apidocs.shiprocket.in/
- **Netlify**: https://docs.netlify.com/functions/

## 🤝 Contributing

This is a private project. For issues or suggestions, contact the repository owner.

## 📄 License

Private - All rights reserved

## 👨‍💻 Credits

- **Original Design**: Uday Kiran Palepu
- **Payment & Shipping Integration**: Enhanced by Claude Code
- **Product**: Sacred Shakti Kit by Shri V.M. Joshi

---

**Made with ❤️ for the Sacred Shakti Kit**

Start selling in 30 minutes! See [QUICK_START.md](QUICK_START.md)
