import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, Shield, Loader2 } from 'lucide-react';

interface RealStripePaymentSectionProps {
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

const RealStripePaymentSection: React.FC<RealStripePaymentSectionProps> = ({
  amount,
  customerInfo,
  onPaymentSuccess,
  onPaymentError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRealPayment = async () => {
    if (!stripe || !elements) {
      onPaymentError('Stripe has not loaded yet. Please try again.');
      return;
    }

    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      onPaymentError('Please fill in all required fields');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentError('Card information is required');
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'usd',
          customerInfo: customerInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: customerInfo.country.toLowerCase(),
            },
          },
        },
      });

      if (error) {
        onPaymentError(error.message || 'Payment failed');
        setMessage(error.message || 'Payment failed');
      } else {
        onPaymentSuccess(paymentIntent);
        setMessage('Payment succeeded!');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Payment failed. Please try again.';
      onPaymentError(errorMessage);
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true, // We collect this separately
  };

  return (
    <div className="space-y-6">
      {/* Real Stripe Payment Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleRealPayment(); }} className="space-y-6">
        {/* Card Details Form */}
        <div className="p-6 border-2 border-gray-200 rounded-xl bg-gray-50">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
            <p className="text-xs text-gray-600">Enter your card information securely</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Card Information</label>
              <div className="relative">
                <div className="w-full px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all bg-white">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Pay ${amount}</span>
            </div>
          )}
        </Button>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-xl ${
            message.includes('succeeded') 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
      </form>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-3 h-3 text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-green-900 mb-1">Secure Payment</h4>
            <p className="text-xs text-green-700">
              Your payment information is encrypted and processed securely by Stripe. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Stripe Branding */}
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <span>Powered by</span>
        <img src="/Powered by Stripe - black.svg" alt="Powered by Stripe" className="h-4" />
      </div>
    </div>
  );
};

export { RealStripePaymentSection };
