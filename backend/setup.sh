#!/bin/bash

echo "🚀 Shakti Kit Backend Setup"
echo "============================"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file already exists"
else
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your credentials"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your Razorpay and Shiprocket credentials"
echo "2. Run 'npm run dev' to test locally"
echo "3. Deploy to Netlify with 'netlify deploy --prod'"
echo ""
echo "📖 See README.md for detailed instructions"
