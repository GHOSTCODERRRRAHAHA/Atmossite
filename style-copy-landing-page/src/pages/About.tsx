import Header from "@/components/Header";
import { Globe, Brain, Sparkles, Target, Rocket, Leaf, Linkedin, MessageCircleQuestion, Shield, Mic, Zap, Droplet, Lock, Truck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded-full mb-6">
              About Us
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight animate-fade-in">
              Reconnecting
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">
                Humanity
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
              Through intelligent presence and environmental awareness
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in [animation-delay:300ms]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                A Post-Screen Future
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                For decades, technology has pulled us further from what matters: from nature, from stillness, from ourselves. We've traded presence for productivity, awareness for convenience.
              </p>
              <p className="text-lg sm:text-xl font-semibold text-black">
                At Atmos, we believe it's time for something different.
              </p>
            </div>
            <div className="animate-fade-in [animation-delay:500ms]">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 sm:p-12 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
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

      {/* Mission Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to repair the most important relationship we have: the one between humans and the planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:400ms]">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Environmental Connection</h3>
              <p className="text-gray-600 leading-relaxed">
                Reconnect with the world around you through intelligent environmental sensing and awareness.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:600ms]">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Voice-First AI</h3>
              <p className="text-gray-600 leading-relaxed">
                Intelligence that lives quietly on your body, enhancing your experience without demanding attention.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:800ms]">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Elegant Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Crafted to be worn everywhere, from silent forests to electric cities, always present, never overwhelming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in [animation-delay:1000ms]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8">
              No screens. No stress.
            </h2>
            <p className="text-2xl sm:text-3xl text-gray-600 mb-12 leading-relaxed">
              Just intelligence, presence, and beauty.
            </p>
            
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 sm:p-12">
              <div className="flex justify-center mb-6">
                <Target className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-xl sm:text-2xl font-semibold text-black mb-4">
                It's not about being more optimized.
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-black">
                It's about being more alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in [animation-delay:1200ms]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Born from Movement
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                Atmos was founded by Charlie, an engineer, traveler, and builder with a belief that AI should make us more human, not less.
              </p>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Inspired by cities, nature, and the spaces in between, Atmos was created for those who want to feel everything, not through a screen, but through real experience.
              </p>
            </div>
            <div className="animate-fade-in [animation-delay:1400ms]">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Rocket className="w-16 h-16 text-gray-300" />
                  </div>
                  <p className="text-lg font-medium text-gray-300">
                    This isn't a fitness band.
                  </p>
                  <p className="text-xl font-bold text-white mt-2">
                    This is presence, reimagined.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in [animation-delay:1600ms]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              Ready to Experience True Presence?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in building a future where technology enhances your connection to the world around you.
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 transition hover:shadow-xl cursor-pointer">
              <Link to="/purchase" className="block focus:outline-none focus:ring-2 focus:ring-black rounded-2xl">
                <p className="text-lg font-medium text-gray-700 mb-4">
                  Experience the future of wearable AI
                </p>
                <div className="text-4xl font-bold text-black">
                  Atmos Halo
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
