import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, Shield, X, Link as LinkIcon } from 'lucide-react';

interface StripePaymentSectionProps {
  amount: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
}


const StripePaymentSection: React.FC<StripePaymentSectionProps> = ({
  amount,
  customerInfo,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'googlepay'>('card');
  const [showLinkCheckout, setShowLinkCheckout] = useState(true);
  const [linkEmail, setLinkEmail] = useState('');

  // Payment handler
  const handlePayment = async () => {
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      onPaymentError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentIntent = {
        id: `pi_demo_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount: amount * 100,
        currency: 'usd'
      };
      
      onPaymentSuccess(mockPaymentIntent);
      setMessage('Payment succeeded!');
    } catch (error) {
      const errorMessage = 'Payment failed. Please try again.';
      onPaymentError(errorMessage);
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Choose your preferred payment method. All options are secure and encrypted.
        </p>
      </div>

      {/* Payment Method Tabs */}
      <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => setSelectedPaymentMethod('card')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
            selectedPaymentMethod === 'card'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Card</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedPaymentMethod('googlepay')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
            selectedPaymentMethod === 'googlepay'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          <div className="w-4 h-4 bg-current rounded-sm flex items-center justify-center">
            <span className="text-xs font-bold">G</span>
          </div>
          <span>Google Pay</span>
        </button>
      </div>

      {/* Link Checkout Banner */}
      {showLinkCheckout && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 relative">
          <button
            onClick={() => setShowLinkCheckout(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Secure, fast checkout with Link</span>
            </div>
          </div>
          <p className="text-sm text-green-700 mt-1 pr-8">
            Securely pay with your saved info, or create a Link account for faster checkout next time.
          </p>
          <div className="mt-3">
            <input
              type="email"
              placeholder="Email"
              value={linkEmail}
              onChange={(e) => setLinkEmail(e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <LinkIcon className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">link</span>
          </div>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
        {selectedPaymentMethod === 'card' && (
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                />
                <div className="absolute right-3 top-3 flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">AE</div>
                  <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">DC</div>
                </div>
              </div>
            </div>

            {/* Expiry and Security Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Expiration date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Security code</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                  <div className="absolute right-3 top-3">
                    <div className="w-6 h-4 border border-gray-400 rounded text-xs flex items-center justify-center text-gray-500">123</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Country and ZIP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Country</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base bg-white">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">ZIP code</label>
                <input
                  type="text"
                  placeholder="12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                />
              </div>
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'googlepay' && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black text-sm font-bold">G</span>
              </div>
              <span>Pay with Google Pay</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Click to pay with your Google Pay account</p>
          </div>
        )}

        {/* Error/Success Message */}
        {message && (
          <div className={`p-4 rounded-lg text-sm ${
            message.includes('succeeded') || message.includes('success')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Payment Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Pay ${amount}</span>
            </div>
          )}
        </Button>
      </form>

      {/* Security Notice */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Powered by</span>
          <img src="/Powered by Stripe - black.svg" alt="Powered by Stripe" className="h-3" />
        </div>
      </div>
    </div>
  );
};

export { StripePaymentSection };
