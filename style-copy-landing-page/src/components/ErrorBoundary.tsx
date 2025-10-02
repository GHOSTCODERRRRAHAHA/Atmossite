
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { trackError } from "@/utils/analytics";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Enhanced error tracking for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const errorDetails = {
      ...errorInfo,
      userAgent: navigator.userAgent,
      isMobile,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    trackError(error, errorDetails);
  }

  public render() {
    if (this.state.hasError) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-black mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {isMobile 
                ? "We're experiencing issues on mobile. Please try refreshing or clearing your browser cache."
                : "We apologize for the inconvenience. Please try refreshing the page."
              }
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
              >
                Refresh Page
              </Button>
              {isMobile && (
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Go to Home
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
