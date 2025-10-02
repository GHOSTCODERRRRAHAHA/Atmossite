import { Button } from "@/components/ui/button";
import { SimpleWaitlistForm } from "./SimpleWaitlistForm";
import { Bell, Users, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full mb-6">
              <Bell className="w-4 h-4" />
              Stay Updated
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Get Product Updates
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800">
              & Early Access
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Be the first to know about product launches, exclusive events, and the future of wearable AI.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto animate-fade-in [animation-delay:300ms]">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Join the Waitlist
              </h3>
              <p className="text-gray-600 mb-6">
                Secure your spot for the future of intelligent wearables
              </p>
              
            </div>
            
            <div id="waitlist-form">
              <SimpleWaitlistForm source="cta-section" />
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Early access</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Join thousands</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bell className="w-4 h-4" />
                  <span>Updates first</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;