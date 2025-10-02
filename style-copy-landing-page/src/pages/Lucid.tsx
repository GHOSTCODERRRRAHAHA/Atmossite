import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Brain, Eye, Gem, Hash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Lucid = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowForm(false);
      setFormData({ name: '', email: '' });
      toast({ title: 'Thank you!', description: "We'll notify you when Lucid is available.", });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add Product schema for rich search results
  useEffect(() => {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Atmos Lucid",
      "description": "Where fashion, AI, and architecture converge. A wearable AI for those who view technology as personal art. Made in small runs with unique serial numbers.",
      "brand": {
        "@type": "Brand",
        "name": "Atmos"
      },
      "category": "Luxury Wearable Technology",
      "image": "https://www.wearatmos.com/android-chrome-512x512.png",
      "url": "https://www.wearatmos.com/lucid",
      "offers": {
        "@type": "Offer",
        "url": "https://www.wearatmos.com/lucid",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder",
        "seller": {
          "@type": "Organization",
          "name": "Atmos"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "89"
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

  return <div className="min-h-screen bg-white font-inter">
      <Header />
      
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="bg-white rounded-3xl aspect-square flex items-center justify-center overflow-hidden relative">
                <span className="bg-black/80 text-white text-lg sm:text-2xl font-bold px-6 py-2 rounded-full shadow-lg tracking-wide uppercase">Coming Soon</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-fade-in [animation-delay:200ms]">
              <div className="mb-6 flex flex-col items-start">
                <span className="inline-flex items-center justify-center mb-2">
                  <Gem className="w-14 h-14 text-transparent bg-gradient-to-br from-blue-400 via-white to-blue-700 rounded-full shadow-lg" style={{boxShadow: '0 4px 24px 0 rgba(59, 130, 246, 0.15)'}} />
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
                  Atmos Lucid
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-600 mb-8">
                  The Icon Reimagined
                </p>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">Lucid is our top-trim masterpiece, where fashion, AI, and architecture converge. Inspired by high-end horology and modern sculpture, Lucid is a wearable AI for those who view technology as personal art. It's not just functional; it's collectible.</p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-6">Key Features</h3>
                  <div className="space-y-4">
                    <div className="group relative flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <Brain className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">Same core AI as Halo, with enhanced personalization</span>
                      <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                        <p className="text-sm leading-relaxed">Lucid uses the same powerful Atmos AI engine as Halo, now tailored to you. It adapts to your speech patterns, behaviors, and preferences for an even more personal, anticipatory experience.</p>
                      </div>
                    </div>
                    <div className="group relative flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <Eye className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">Precision-crafted body with exposed internals</span>
                      <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                        <p className="text-sm leading-relaxed">Lucid reveals what others hide. Its transparent elements showcase the inner workings of your device, fusing raw engineering with refined craftsmanship.</p>
                      </div>
                    </div>
                    <div className="group relative flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <Gem className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">Rare materials: ceramic, sapphire, carbon options</span>
                      <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                        <p className="text-sm leading-relaxed">Every Lucid unit is forged from elite materials like polished ceramic, sapphire crystal, or aerospace-grade carbon, designed not just for durability, but for presence.</p>
                      </div>
                    </div>
                    <div className="group relative flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <Hash className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">Limited production batches with serialized models</span>
                      <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg max-w-sm">
                        <p className="text-sm leading-relaxed">Lucid is made in small runs with unique serial numbers engraved into each band, a collectible, not just a wearable. Once a batch is gone, it's gone.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-3xl font-bold text-black">TBD</span>
                  <span className="text-lg text-gray-600 ml-2">Lucid one</span>
                </div>

                <div className="mb-8">
                  <p className="text-lg font-medium text-black">
                    Atmos Lucid isn't worn for utility. It's worn for identity.
                  </p>
                </div>

                {!showForm ? (
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full sm:w-auto"
                  >
                    Notify Me
                  </Button>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-black mb-4">Get Notified</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-base"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-black text-white hover:bg-gray-800 px-6 py-3 sm:py-4 text-base font-medium disabled:opacity-50 h-12 sm:h-auto"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-3 sm:py-4 text-base font-medium h-12 sm:h-auto"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Lucid;