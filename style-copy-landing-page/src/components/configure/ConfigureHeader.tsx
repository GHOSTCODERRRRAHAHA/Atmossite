
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../contexts/CartContext';

interface ConfigureHeaderProps {
  onCartClick: () => void;
}

const ConfigureHeader: React.FC<ConfigureHeaderProps> = ({ onCartClick }) => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black hover:opacity-80 transition-opacity cursor-pointer">
          ATMOS
        </Link>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onCartClick}
          className="relative"
        >
          <ShoppingBag className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default ConfigureHeader;
