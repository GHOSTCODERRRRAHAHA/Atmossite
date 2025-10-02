import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle, Watch, RotateCcw, User, Mail, Phone, MapPin, Calendar, Zap, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { RealStripeElements } from '@/components/RealStripeElements';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [error, setError] = useState<string | null>(null);
  
  // Customer information form
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    company: '',
    notes: ''
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      console.log('Cart is empty, redirecting to purchase page');
      navigate('/purchase');
    }
  }, [items, navigate]);

  // Debug logging
  useEffect(() => {
    console.log('Checkout page loaded, items:', items);
    console.log('Total price:', getTotalPrice());
  }, [items, getTotalPrice]);

  const getColorName = (colorId: string) => {
    const colorMap: { [key: string]: string } = {
      'blush-chrome': 'Blush Chrome',
      'black-mist': 'Black Mist',
      'ice-chrome': 'Ice Chrome',
      'rose-gold': 'Rose Gold',
    };
    return colorMap[colorId] || colorId;
  };

  const getCountryName = (countryCode: string) => {
    const countryMap: { [key: string]: string } = {
      'us': 'United States',
      'ca': 'Canada',
      'gb': 'United Kingdom',
      'au': 'Australia',
    };
    return countryMap[countryCode] || countryCode.toUpperCase();
  };

  const getColorImage = (colorId: string) => {
    const imageMap: { [key: string]: string } = {
      'blush-chrome': '/Blush chrome.png',
      'black-mist': '/Obsidian Mist.png',
      'ice-chrome': '/ice Chrome.png',
      'rose-gold': '/Rose Gold.png',
    };
    return imageMap[colorId] || '/Obsidian Mist.png';
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    setIsProcessing(true);
    setPaymentStep('processing');
    setError(null);
    
    try {
      console.log('Processing payment success:', paymentIntent);
      
      // Prepare order data for both full price and preorder
      const orderData = {
        customerInfo,
        items: items.map(item => ({
          ...item,
          orderType: item.paymentOption === 'full' ? 'fullprice' : 'preorder'
        })),
        paymentIntentId: paymentIntent.id,
        totalAmount: getTotalPrice(),
        timestamp: new Date().toISOString()
      };

      console.log('Sending order data:', orderData);

      // Send to your API endpoint
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('API response status:', response.status);
      const responseText = await response.text();
      console.log('API response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to process order: ${response.status} - ${responseText}`);
      }

      setPaymentStep('success');
      clearCart();
      toast.success("Payment successful! Thank you for your purchase.");
      
      // Redirect to home after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Order processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Payment successful but failed to save order: ${errorMessage}`);
      setPaymentStep('form');
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
    setPaymentStep('form');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  // Show error if there's one
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Checkout Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button 
              onClick={() => setError(null)}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => navigate('/purchase')}
              variant="outline"
              className="w-full"
            >
              Back to Purchase
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/purchase')}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gray-900">ATMOS</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Secure Checkout</h1>
                    <p className="text-gray-300">Complete your purchase securely</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {paymentStep === 'form' && (
                  <div className="space-y-8">
                    {/* Customer Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Contact Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">First Name *</Label>
                          <Input
                            value={customerInfo.firstName}
                            onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                            placeholder="John"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">Last Name *</Label>
                          <Input
                            value={customerInfo.lastName}
                            onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                            placeholder="Doe"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <Input
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                              type="email"
                              placeholder="john@example.com"
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">Phone Number *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <Input
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              className="h-12 pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700 mb-2">Company (Optional)</Label>
                        <Input
                          value={customerInfo.company}
                          onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                          placeholder="Your Company Name"
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Shipping Address
                      </h2>
                      
                      <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700 mb-2">Street Address *</Label>
                        <Input
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          placeholder="123 Main Street"
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">City *</Label>
                          <Input
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                            placeholder="New York"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">State *</Label>
                          <Input
                            value={customerInfo.state}
                            onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                            placeholder="NY"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2">ZIP Code *</Label>
                          <Input
                            value={customerInfo.zipCode}
                            onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                            placeholder="10001"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700 mb-2">Country *</Label>
                        <Input
                          value={customerInfo.country}
                          onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                          placeholder="United States"
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Order Details
                      </h2>
                      
                      <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</Label>
                        <textarea
                          value={customerInfo.notes}
                          onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                          placeholder="Any special delivery instructions or notes..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment Method
                      </h2>
                      
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Secure Payment Form
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Shield className="w-4 h-4" />
                            <span>PCI Compliant</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                          Or use the secure payment form below for detailed checkout with shipping information.
                        </p>
                        
                        {/* Stripe Payment Section */}
                        <RealStripeElements
                          amount={getTotalPrice()}
                          customerInfo={customerInfo}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                        />
                      </div>

                      {/* Security Badges */}
                      <div className="flex items-center justify-center space-x-8 py-6 border-t border-gray-200">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Shield className="w-5 h-5" />
                          <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Lock className="w-5 h-5" />
                          <span>PCI Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <CreditCard className="w-5 h-5" />
                          <span>Stripe Powered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentStep === 'processing' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
                    <p className="text-gray-600">Please don't close this page...</p>
                  </div>
                )}

                {paymentStep === 'success' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 mb-4">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
                    <p className="text-sm text-gray-500">Redirecting to home page...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={getColorImage(item.color)} 
                        alt={`Atmos HALO ${getColorName(item.color)}`}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        style={{ imageRendering: 'high-quality' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">Atmos HALO</h3>
                      <p className="text-xs text-gray-600">{getColorName(item.color)}</p>
                      <p className="text-xs text-gray-600">
                        {item.paymentOption === 'full' ? 'Full Payment' : 'Deposit'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">×{item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">${item.unitPrice * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${getTotalPrice()}</span>
                </div>
                
                
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>1-year warranty</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RotateCcw className="w-3 h-3" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
