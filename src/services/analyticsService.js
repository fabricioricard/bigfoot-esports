import ReactGA from 'react-ga';

export const initializeAnalytics = () => {
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
  }
};

export const trackPageView = (page) => {
  ReactGA.pageview(page);
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};