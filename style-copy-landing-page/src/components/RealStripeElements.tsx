import React, { useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Loader2 } from 'lucide-react';

interface RealStripeElementsProps {
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

const RealStripeElements: React.FC<RealStripeElementsProps> = ({
  amount,
  customerInfo,
  onPaymentSuccess,
  onPaymentError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState(customerInfo.email || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onPaymentError('Stripe has not loaded yet. Please try again.');
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
          customerInfo: {
            ...customerInfo,
            email: email
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?success=true`,
          payment_method_data: {
            billing_details: {
              name: `${customerInfo.firstName} ${customerInfo.lastName}`,
              email: email,
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
        },
        redirect: 'if_required',
      });

      if (error) {
        onPaymentError(error.message || 'Payment failed');
        setMessage(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
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

  const paymentElementOptions = {
    layout: 'tabs' as const,
    business: {
      name: 'Atmos'
    },
    fields: {
      billingDetails: {
        name: 'auto' as const,
        email: 'auto' as const,
        phone: 'auto' as const,
        address: {
          country: 'auto' as const,
          postalCode: 'auto' as const,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Choose your preferred payment method. All options are secure and encrypted.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Link Authentication Element */}
        <div>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(event) => {
              if (event.value?.email) {
                setEmail(event.value.email);
              }
            }}
            options={{
              defaultValues: {
                email: email,
              },
            }}
          />
        </div>

        {/* Payment Element - This is the real Stripe component */}
        <div>
          <PaymentElement 
            id="payment-element" 
            options={paymentElementOptions}
          />
        </div>

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
          disabled={!stripe || isLoading}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
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
        <p className="text-xs text-gray-500 mt-1">
          Your payment information is processed securely by Stripe.
        </p>
      </div>
    </div>
  );
};

export { RealStripeElements };
