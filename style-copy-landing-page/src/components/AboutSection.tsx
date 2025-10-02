import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full mb-6">
                <Leaf className="w-4 h-4" />
                About Atmos
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Presence,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">
                Reimagined
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              Your intelligent environmental companion that helps you reconnect with the world around you through voice-first AI and ambient awareness.
            </p>
            
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <Link to="/about" className="flex items-center gap-3">
                Learn Our Story
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
          
          {/* Visual Element */}
          <div className="animate-fade-in [animation-delay:300ms]">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 sm:p-12 h-80 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Leaf className="w-16 h-16 text-gray-600" />
                </div>
                <p className="text-lg font-medium text-gray-700">
                  Intelligence that enhances awareness, not demands attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
