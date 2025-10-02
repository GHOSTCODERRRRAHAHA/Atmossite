import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 py-20">
        {/* Badge */}
        <div className="animate-fade-in mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
            <Sparkles className="w-4 h-4" />
            The Future of Wearable AI
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8 leading-tight animate-fade-in [animation-delay:200ms]">
          Experience
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">
            True Presence
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in [animation-delay:400ms] font-medium">
          The world's first AI companion, designed for living
        </p>
        
        {/* CTA Button */}
        <div className="animate-fade-in [animation-delay:600ms] mb-16">
          <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            <Link to="/halo" className="flex items-center gap-3">
              Meet Halo 
              <ArrowRight size={24} />
            </Link>
          </Button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center opacity-60">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
