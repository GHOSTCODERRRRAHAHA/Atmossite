import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductConfigurationProps {
  className?: string;
}

const ProductConfiguration = ({ className = "" }: ProductConfigurationProps) => {

  return (
    <div className={`${className}`}>
      {/* New Headline and Subhead */}
      <div className="mb-8">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
          The first wearable that adapts to you.
        </div>
        
        <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Reserve your Atmos today. Fully refundable.
        </div>
        
        {/* Preorder Button */}
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium rounded-full">
          <Link to="/purchase">Preorder</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductConfiguration;
