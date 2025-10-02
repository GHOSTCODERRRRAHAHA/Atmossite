import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Circle, CircleDot } from "lucide-react";

const bandColors = [
  { id: 'onyx', name: 'Onyx Black', color: 'bg-black' },
  { id: 'white', name: 'Cloud White', color: 'bg-white border border-gray-300' },
  { id: 'silver', name: 'Lunar Silver', color: 'bg-gray-300' },
];

const ProductShowcase = () => {
  return <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 animate-fade-in">
            Meet the Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 animate-fade-in [animation-delay:200ms]">
            Two approaches to intelligent living
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Halo Product */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg animate-fade-in [animation-delay:400ms] group hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <Circle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                Atmos Halo
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                The Core of Presence
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl sm:rounded-2xl aspect-square mb-3 sm:mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img src="/Black band.png" alt="Atmos Halo" className="w-full h-full object-cover" />
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2">
                Minimal, intelligent, and designed to disappear into your life. Built with voice-first AI and ambient environmental sensing.
              </p>
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-black"></span>
                <span className="text-sm sm:text-base text-gray-600 ml-2"></span>
              </div>
            </div>

            <div className="text-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-medium mb-4 w-full sm:w-auto">
                <Link to="/halo">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Lucid Product */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg animate-fade-in [animation-delay:600ms] group hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <CircleDot className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                Atmos Lucid
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">
                The Icon Reimagined
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl sm:rounded-2xl aspect-square mb-3 sm:mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <span className="bg-black/80 text-white text-lg sm:text-2xl font-bold px-6 py-2 rounded-full shadow-lg tracking-wide uppercase">Coming Soon</span>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2">
                Where fashion, AI, and architecture converge. A wearable AI for those who view technology as personal art.
              </p>
            </div>

            <div className="text-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-medium mb-4 w-full sm:w-auto">
                <Link to="/lucid">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductShowcase;