// Updated by Copilot for sync test
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import ProductShowcase from "@/components/ProductShowcase";
import ProductConfiguration from "@/components/ProductConfiguration";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import { WaitlistTest } from "@/components/WaitlistTest";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, HeartPulse, Radar, Gauge, Timer } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      {/* <Hero /> */}
      
      {/* Product Configuration Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Meet Halo Button */}
          <div className="mb-6 flex justify-end">
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium rounded-full">
              <Link to="/halo">Meet Halo →</Link>
            </Button>
          </div>
          
          {/* Single connected background box */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Configuration */}
              <div className="p-6 sm:p-8 lg:p-12 animate-fade-in">
                <ProductConfiguration className="shadow-none bg-transparent p-0" />
              </div>

              {/* Product Image Carousel */}
              <div className="p-6 sm:p-8 lg:p-12 animate-fade-in [animation-delay:200ms]">
                <ProductImageCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Positioning Mantra */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
              <div>Adapt.</div>
              <div>Protect.</div>
              <div>Elevate.</div>
            </div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Our core philosophy that guides every aspect of Atmos design and functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center px-2">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Not a "display." A rhythm of light. A single glance reveals everything you need without pulling you out of the moment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center px-2">
              <div className="flex justify-center mb-4">
                <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If your pulse fades, Atmos doesn't wait. It signals, alerts, and becomes your lifeline before anyone else can react.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center px-2">
              <div className="flex justify-center mb-4">
                <Radar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                More than tracking. Atmos senses 40+ movements, adapts your performance, and guides your recovery automatically, no effort, no friction.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center px-2">
              <div className="flex justify-center mb-4">
                <Gauge className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Not "insights." A living gauge of when to push, when to pause, when to peak, tuned to your body, not a spec sheet.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center px-2">
              <div className="flex justify-center mb-4">
                <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                24 hours of true always‑on intelligence. Atmos moves with you, thinks for you, and keeps you ahead.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* <FeatureSection 
        id="design"
        title="Quietly powerful. Effortlessly wearable."
        description="Atmos Band is designed to disappear until you need it, a seamless extension of your intuition. With a smooth, matte finish and ambient LED display, it delivers timely insights without ever demanding your attention. From subtle glances to soft glows, Atmos blends into your day while enhancing every moment. Built for clarity, not clutter. This is wellness and intelligence, refined to its purest form."
        imagePosition="left"
        imageUrl="/ice Chrome.png"
      />
      
      <FeatureSection 
        id="features"
        title="Your smart environmental guide."
        description="Atmos keeps you ahead, monitoring air quality, weather, and noise in real time. Expect timely, gentle nudges to help you stay well, comfortable, and always prepared."
        imagePosition="right"
        imageUrl="/Rose Gold.png"
      />
      
      <ProductShowcase /> */}
      <AboutSection />
      <CTASection />
    </div>
  );
};

export default Index;
