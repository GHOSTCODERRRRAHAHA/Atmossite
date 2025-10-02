import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductConfiguration from "@/components/ProductConfiguration";
import { useEffect } from "react";
import { 
  Camera, 
  MessageSquare, 
  Smartphone, 
  Battery, 
  Circle,
  Eye,
  Zap,
  Heart,
  Users,
  Bell,
  Target,
  Sparkles,
  Sun,
  Clock,
  ChevronDown,
  ChevronRight,
  Globe,
  Shield,
  Brain,
  Palette,
  Wifi,
  Lightbulb,
  Smartphone as Phone,
  Zap as Lightning,
  MapPin,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Sparkles as Star,
  Monitor,
  Palette as Brush,
  Zap as Energy,
  Eye as Awareness,
  Lock,
  Cpu,
  Sparkles as Design
} from "lucide-react";
import { useState } from "react";

const Halo = () => {
  // Keep all accordions closed by default
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Add Product schema for rich search results
  useEffect(() => {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Atmos Halo",
      "description": "The world's first AI companion designed for living. Voice-first interaction, environmental awareness, and real-world functionality without a screen.",
      "brand": {
        "@type": "Brand",
        "name": "Atmos"
      },
      "category": "Wearable Technology",
      "image": "https://www.wearatmos.com/android-chrome-512x512.png",
      "url": "https://www.wearatmos.com/halo",
      "offers": {
        "@type": "Offer",
        "url": "https://www.wearatmos.com/halo",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder",
        "seller": {
          "@type": "Organization",
          "name": "Atmos"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(productSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return <div className="min-h-screen bg-white font-inter">
      <Header />
      
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
                <img src="/Black band.png" alt="Atmos Halo" className="w-full h-full object-cover rounded-3xl" />
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-fade-in [animation-delay:200ms]">
              <div className="mb-6 flex flex-col items-start">
                <span className="inline-flex items-center justify-center mb-2">
                  <Circle className="w-14 h-14 text-transparent bg-gradient-to-br from-purple-400 via-white to-purple-700 rounded-full shadow-lg" style={{boxShadow: '0 4px 24px 0 rgba(128, 90, 213, 0.15)'}} />
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                  Atmos Halo
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-600 mb-8">
                  The Core of Presence
                </p>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">Halo is our flagship smart band; minimal, intelligent, and designed to disappear into your life. Built with voice-first AI and ambient environmental sensing, it helps you stay in sync with the world around you, without needing to look at a screen.</p>

                {/* 🌍 Awareness Section */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('awareness')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-black">
                      Awareness – See the invisible, stay connected
                    </h3>
                    {expandedSections.includes('awareness') ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  
                  {expandedSections.includes('awareness') && (
                    <div className="mt-4 space-y-3 pl-6">
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Globe className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Environmental sensing</span> → Tracks air quality, UV, and circadian rhythm so you adapt in real time.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Advanced sensors monitor air quality, UV exposure, and your body's natural rhythms. Halo adapts your environment and alerts you to invisible threats before they affect you.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Camera className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Ask the World camera</span> → Point, capture, and instantly know what you see.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Point, capture, and ask. Use Halo's discreet camera to identify anything, objects, products, translations, or places, with instant AI-powered answers.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <MessageSquare className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Atmos Listen™ translation</span> → Speak in 25+ languages, naturally.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Speak across borders. Say "Atmos, listen" to instantly translate and speak in 25+ languages, your voice, now fluent anywhere in the world.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Protection Section */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('protection')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-black">
                      Protection – Safety you can trust, even in silence
                    </h3>
                    {expandedSections.includes('protection') ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  
                  {expandedSections.includes('protection') && (
                    <div className="mt-4 space-y-3 pl-6">
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Atmos Shield™</span> → One tap or voice phrase alerts contacts, shares location, and records surroundings.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">One tap or spoken phrase activates Atmos Shield, alerting contacts, sharing your location, and recording your surroundings. Protection, always on.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Safe Zones & Alerts</span> → Parents set home, school, or play zones; exits trigger notifications.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Define safe zones for family members. When someone leaves a designated area, instant notifications keep everyone connected and aware.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Stealth SOS Button</span> → Double-press or hidden tap pattern sends a silent distress signal.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Discreet emergency activation. Double-press or use a hidden tap pattern to silently alert emergency contacts without drawing attention.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Users className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Pulse Panic Detection</span> → If stress spikes across multiple users nearby, Atmos flags mass danger instantly.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Network intelligence. When multiple Atmos users in the same area show elevated stress levels, the system can detect and alert to potential mass danger situations.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 🔁 Adaptation Section */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('adaptation')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-black">
                      Adaptation – An AI that learns you
                    </h3>
                    {expandedSections.includes('adaptation') ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  
                  {expandedSections.includes('adaptation') && (
                    <div className="mt-4 space-y-3 pl-6">
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Personalized nudges</span> → Smarter sleep, focus, and recovery timing based on your rhythm.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">AI learns your unique patterns and provides personalized recommendations for optimal sleep, focus periods, and recovery timing based on your body's natural rhythms.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Habit awareness</span> → Learns daily patterns and refines them over time.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Continuously learns your daily routines, preferences, and behaviors to provide increasingly accurate and helpful insights and automation.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Grows with you</span> → Atmos gets better the more you wear it, becoming more automated, seamless, and attuned to your life.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">The more you wear Halo, the smarter it becomes. It evolves from a helpful assistant to an invisible, anticipatory companion that knows you better than you know yourself.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Design Section */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('design')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-black">
                      Design That Disappears
                    </h3>
                    {expandedSections.includes('design') ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  
                  {expandedSections.includes('design') && (
                    <div className="mt-4 space-y-3 pl-6">
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Monitor className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Screenless, minimalist interface</span> → No distractions, only subtle intelligence.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">No bulky screen. Halo features a minimalist display that blends into each band color with a glowing light strip for subtle, intelligent cues.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Color-matched light strip</span> → A glow that speaks your language.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">The light strip adapts to your band color and personal preferences, creating a seamless visual language that feels natural and intuitive.</p>
                        </div>
                      </div>
                      <div className="group relative flex items-start space-x-4 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Battery className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">All-day comfort & long battery</span> → Built to disappear until you need it.
                        </span>
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                          <p className="text-sm leading-relaxed">Engineered for all-day wear. With extended battery performance and swappable band options, Halo adapts to your body and your lifestyle.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Order Now Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button 
                    asChild 
                    className="group relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-semibold px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl border-0 min-w-[200px]"
                  >
                    <Link to="/purchase" className="flex items-center justify-center space-x-3">
                      <Zap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                      <span>Order Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                  
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600 mb-1">Starting at <span className="font-semibold text-black">$50</span> deposit</p>
                    <p className="text-xs text-gray-500">Fully refundable • Ships Q2 2025</p>
                  </div>
                </div>
                
                {/* Trust indicators */}
                <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="w-4 h-4" />
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>Privacy protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default Halo;