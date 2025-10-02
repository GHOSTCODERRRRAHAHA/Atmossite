import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ErrorBoundary from "./components/ErrorBoundary";
import { AccessibilityProvider } from "./components/AccessibilityProvider";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Halo from "./pages/Halo";
import Purchase from "./pages/Purchase";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_live_51Ri1QoCiVNimrvXub9cmXqIe8HVwgQO4I6fMPsGbsC74IHCa5S6FMoYhAcya0FJwQhhmHhBlBd8YOohgoT8fjble003gsjHjji');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  useEffect(() => {
    // Set default page title
    document.title = 'ATMOS - The Future of Wearable AI';
    
    // Add meta description if not exists
    if (!document.querySelector('meta[name="description"]')) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experience the future with ATMOS HALO - AI-powered wearable technology that adapts to your lifestyle.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    
    // Add viewport meta if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }

    // Mobile-specific error handling
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Handle mobile refresh issues
      const handleMobileError = (event: ErrorEvent) => {
        console.error('Mobile error caught:', event.error);
        // Prevent infinite error loops
        if (event.error && event.error.message && event.error.message.includes('Script error')) {
          event.preventDefault();
          return false;
        }
      };

      // Handle unhandled promise rejections on mobile
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        console.error('Unhandled promise rejection on mobile:', event.reason);
        // Don't prevent default to allow normal error handling
      };

      window.addEventListener('error', handleMobileError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      // Cleanup
      return () => {
        window.removeEventListener('error', handleMobileError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <CartProvider>
            <AccessibilityProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/halo" element={<Halo />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </TooltipProvider>
            </AccessibilityProvider>
          </CartProvider>
        </Elements>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
