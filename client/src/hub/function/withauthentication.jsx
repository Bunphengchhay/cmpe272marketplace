import React, { useEffect, useState } from 'react';
import Review from '../pages/review'

const withAuthentication = (WrappedComponent) => {
  // Define the HOC component
  const AuthenticationWrapper = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem('authenticated') === 'true'
    );
    const [names, setNames] = useState([]);

    useEffect(() => {
      const handleStorageChange = () => {
        setIsAuthenticated(localStorage.getItem('authenticated') === 'true');
      };

      // Listen for changes in localStorage
      window.addEventListener('storage', handleStorageChange);

      return () => {
        // Clean up the event listener
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

     // Retrieve names from localStorage when isAuthenticated changes
     useEffect(() => {
      if (isAuthenticated) {
        const storedNames = localStorage.getItem('names');
        // Listen for changes in localStorage
        if (storedNames) {
          setNames(JSON.parse(storedNames));
        }
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <WrappedComponent {...props} names={names} /> : <Auth />;
  };

  return AuthenticationWrapper;
};

export default withAuthentication;