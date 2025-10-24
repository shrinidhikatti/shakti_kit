import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8888/.netlify/functions';
  const PRODUCT_PRICE = 3; // Price in rupees (for testing)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone ||
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill all fields');
      return false;
    }
    if (formData.phone.length !== 10) {
      setError('Please enter valid 10-digit phone number');
      return false;
    }
    if (formData.pincode.length !== 6) {
      setError('Please enter valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Send lead to NeoDove CRM
      try {
        await fetch('https://e1398518-0664-479c-8214-266e8ccba075.neodove.com/integration/custom/e83bc1d9-9cbc-443a-ae7e-ef4e3094af26/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            mobile: parseInt(formData.phone),
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            product: 'Sacred Shakti Kit'
          })
        });
        console.log('Lead sent to NeoDove CRM');
      } catch (crmError) {
        console.error('Failed to send lead to CRM, but continuing with order:', crmError);
      }

      // Create order on backend
      const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: PRODUCT_PRICE,
          customerDetails: formData
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sacred Shakti Kit',
        description: 'Order for Sacred Shakti Kit by Shri V.M. Joshi',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(`${BACKEND_URL}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: formData
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Track successful purchase with Meta Pixel
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Purchase', {
                  content_name: 'Sacred Shakti Kit',
                  content_ids: ['SHAKTI-KIT-001'],
                  content_type: 'product',
                  value: PRODUCT_PRICE,
                  currency: 'INR'
                });
              }

              // Track successful purchase with Google Analytics
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                  transaction_id: response.razorpay_order_id,
                  value: PRODUCT_PRICE,
                  currency: 'INR',
                  items: [{
                    item_id: 'SHAKTI-KIT-001',
                    item_name: 'Sacred Shakti Kit',
                    price: PRODUCT_PRICE,
                    quantity: 1
                  }]
                });
              }

              alert('Payment successful! Your order has been placed. You will receive a confirmation email shortly.');
              onClose();
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#f97316'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Order Shakti Kit</h2>
        <p className="text-gray-300 mb-6">Price: ₹{PRODUCT_PRICE}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone (10 digits) *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Pincode (6 digits) *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              pattern="[0-9]{6}"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Pay ₹${PRODUCT_PRICE}`}
          </button>
        </form>
      </div>
    </div>
  );
};
