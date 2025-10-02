import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';

interface CartSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidePanel: React.FC<CartSidePanelProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();

  const formatColorName = (color: string) => {
    return color.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatCountryName = (country: string) => {
    const countryMap: { [key: string]: string } = {
      'us': 'United States',
      'ca': 'Canada',
      'uk': 'United Kingdom',
      'de': 'Germany',
      'fr': 'France',
      'au': 'Australia',
      'jp': 'Japan',
      'sg': 'Singapore',
      'ae': 'UAE',
      'sa': 'Saudi Arabia',
      'za': 'South Africa',
      'ng': 'Nigeria',
      'ke': 'Kenya',
      'gh': 'Ghana',
    };
    return countryMap[country] || country.toUpperCase();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Cart ({getTotalItems()})</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          ATMOS HALO - {formatColorName(item.color)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatCountryName(item.country)} • {item.paymentOption === 'full' ? 'Full Payment' : 'Deposit'}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id!)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">US${item.unitPrice * item.quantity}</p>
                        <p className="text-sm text-gray-500">US${item.unitPrice} each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>US${getTotalPrice()}</span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-semibold"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { CartSidePanel };
