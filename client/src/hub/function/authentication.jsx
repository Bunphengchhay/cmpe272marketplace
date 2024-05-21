import React, {useState, useEffect, useContext} from 'react';
import { endpoint } from '../config/config';

const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
//   const [toggleLogon, setToggleLogon] = useState('Login');
  const [toggleLogon, setToggleLogon] = useState(
    localStorage.getItem('isAuthenticated') === 'true' ? 'Logout' : 'Login'
  );
  const [productInformations, setProductInformations] = useState(
    localStorage.getItem('productInformations') ? localStorage.getItem('productInformations') : null
  );
  const [comments, setComments] = useState(
    localStorage.getItem('allComments') ? JSON.parse(localStorage.getItem('allComments')) : []
  );
  const [isReviewed, setIsReviewed] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null && storedUser !== 'undefined') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email, password) => {
    try {
      const response = await fetch(`${endpoint}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  
      if (!response.ok) {
        throw new Error('Failed to authenticate. Please check your credentials.');
      }
  
      const data = await response.json();
  
      if (data.status === 'ok') {
        console.log(data);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');
        setToggleLogon('Logout');
        console.log('Login successful');
        return { success: true };
      } else {
        throw new Error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      return { success: false, message: error.message };
    }
  };
  
  const signup = async (userData) => {
    try {
      const response = await fetch(`${endpoint}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }
  
      const data = await response.json();
  
      if (data.status === 'ok') {
        // Automatically login the user after successful signup
        const loginStatus = await login(userData.email, userData.password);
        if (loginStatus.success) {
          return { success: true };
        } else {
          throw new Error('Failed to log in after signup. Please try logging in manually.');
        }
      } else {
        throw new Error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error.message);
      return { success: false, message: error.message };
    }
  };
  
  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setToggleLogon('Login');
    console.log('logout');
  };


  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, toggleLogon, signup, productInformations, setProductInformations, comments, setComments, isReviewed, setIsReviewed, refreshProducts, setRefreshProducts}}>
      {props.children}
    </AuthContext.Provider>
  );
}