import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import ConfigureHeader from '../components/configure/ConfigureHeader';
import ProductInfo from '../components/configure/ProductInfo';
import ProductImage from '../components/configure/ProductImage';
import OrderIncludes from '../components/configure/OrderIncludes';
import ConfigurationOptions from '../components/configure/ConfigurationOptions';
import AdditionalInfo from '../components/configure/AdditionalInfo';
import { CartSidePanel } from '../components/CartSidePanel';
import { useCart } from '../contexts/CartContext';

const Purchase = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('blush-chrome');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [paymentOption, setPaymentOption] = useState('deposit');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsProcessing(true);
    
    const unitPrice = paymentOption === 'full' ? 600 : 50;
    
    addItem({
      color: selectedColor,
      country: selectedCountry,
      paymentOption,
      quantity,
      unitPrice
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
    }, 500);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <ConfigureHeader onCartClick={() => setIsCartOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image and Info */}
          <div className="space-y-8">
            <ProductInfo />
            <ProductImage selectedColor={selectedColor} />
            <OrderIncludes />
          </div>

          {/* Right Column - Configuration Options */}
          <ConfigurationOptions
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            quantity={quantity}
            setQuantity={setQuantity}
            isProcessing={isProcessing}
            onAddToCart={handleAddToCart}
          />
        </div>

        <AdditionalInfo />
      </div>

      { /* Sticky Add to Cart Button for Mobile */ }
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 border-t border-gray-200 shadow-lg px-4 py-3 flex items-center justify-between" style={{backdropFilter: 'blur(8px)'}}>
        <div className="text-lg font-bold text-black">Total: US${(paymentOption === 'full' ? 600 : 50) * quantity}</div>
        <button
          onClick={handleAddToCart}
          disabled={isProcessing}
          className="ml-4 px-6 py-3 bg-black text-white rounded-xl font-semibold text-base shadow hover:bg-gray-900 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
          style={{minWidth: 120}}
        >
          {isProcessing ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

      {/* Cart Side Panel */}
      <CartSidePanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Purchase;
