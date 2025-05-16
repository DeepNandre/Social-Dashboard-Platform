import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId: string;  // Your GA4 measurement ID
}

// Add this at the top of the file
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    trackEvent?: (category: string, action: string, label?: string, value?: number) => void;
  }
}

// Modify the trackEvent function to also set it on window
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();

  useEffect(() => {
    // Load the Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: location.pathname + location.search
    });

    // Make trackEvent available globally
    window.trackEvent = trackEvent;

    // Cleanup
    return () => {
      // Check if the script is still in the document before removing
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [measurementId]);

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search
      });
    }
  }, [location, measurementId]);

  return null;
}

export default GoogleAnalytics; 