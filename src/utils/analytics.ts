export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag('config', 'G-BG8E04DPVS', {
      page_path: path
    });
  }
}; 