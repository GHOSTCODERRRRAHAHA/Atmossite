import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, Shield } from 'lucide-react';

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

  // Demo payment handler since we don't have a real Stripe API
  const handleDemoPayment = async () => {
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
      setMessage('Payment succeeded! (Demo mode)');
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
      {/* Demo Payment Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleDemoPayment(); }} className="space-y-6">
        {/* Card Details Form */}
        <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
            <p className="text-xs text-gray-600">Enter your card information securely</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Error/Success Message */}
        {message && (
          <div className={`p-4 rounded-xl text-sm ${
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
          className="w-full bg-black text-white hover:bg-gray-800 py-4 text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
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

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Demo Mode</h4>
            <p className="text-xs text-blue-700">
              This is a demo payment form. In production, this would use Stripe Elements for secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StripePaymentSection };
