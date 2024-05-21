import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Ensure window.gtag is defined
    if (window.gtag) {
      window.gtag('config', 'G-K35XNM8R1N', {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

export default usePageTracking;
