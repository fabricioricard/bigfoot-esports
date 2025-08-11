import ReactGA from 'react-ga';

export const initializeAnalytics = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
};

export const trackPageView = (page) => {
  ReactGA.pageview(page);
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};