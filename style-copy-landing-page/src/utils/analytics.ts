// Analytics utility for tracking user interactions and performance

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-BJSSRJ9K2W', {
      page_path: page,
    });
  }
};

export const trackConversion = (conversionId: string, conversionLabel: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          trackEvent('timing_complete', 'Performance', 'Page Load Time', Math.round(loadTime));
          trackEvent('timing_complete', 'Performance', 'DOM Content Loaded', Math.round(domContentLoaded));
        }
      }, 0);
    });
  }
};

// Error tracking
export const trackError = (error: Error, errorInfo?: unknown) => {
  trackEvent('exception', 'Error', error.message, 1);
  console.error('Tracked Error:', error, errorInfo);
  
  // Enhanced error logging
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    errorInfo
  };
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.group('🚨 Error Details');
    console.error('Error:', errorData);
    console.groupEnd();
  }
  
  // Could send to error tracking service here
  // Example: Sentry, LogRocket, etc.
}; 