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
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, toggleLogon, signup}}>
      {props.children}
    </AuthContext.Provider>
  );
}

// import React, { createContext, useState } from 'react';
// import Logout from "../authentication/logout";
// import Auth from "../authentication/getAuth";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem('isAuthenticated') === 'true'
//   );

//   const login = (firstname, lastname, useremail, password) => {
//     // Perform authentication logic
//     // Assuming authentication is successful
//     setIsAuthenticated(true);
//     localStorage.setItem('isAuthenticated', 'true');
//   };

//   const logout = () => {
//     localStorage.removeItem('isAuthenticated');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };




// class AuthenticationWrapper extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
//             firstname: null,
//             lastname: null,
//             useremail: null,
//             userphone: null,
//             useraddress: null,
//         };
//         this.logout = this.logout.bind(this);
//         this.login = this.login.bind(this);
//         this.signup = this.signup.bind(this);
//         this.isAuthorized = this.isAuthorized.bind(this);
//     }

//     isAuthorized() {
//         return this.state.isAuthenticated;
//     }

//     login(firstname, lastname, useremail, password) {
//         const isAuthenticated = Auth(useremail, password);
//         if (isAuthenticated) {
//             this.setState({
//                 isAuthenticated: true,
//                 firstname: firstname,
//                 lastname: lastname,
//                 useremail: useremail,
//             }, () => {
//                 localStorage.setItem("isAuthenticated", "true");
//             });
//         }
//         return isAuthenticated;
//     }

//     signup(firstname, lastname, password, useremail, userphones, useraddress) {
//         this.setState({
//             isAuthenticated: true,
//             firstname: firstname,
//             lastname: lastname,
//             useremail: useremail,
//             userphone: userphones,
//             useraddress: useraddress,
//         }, () => {
//             localStorage.setItem("isAuthenticated", "true");
//         });
//     }

//     logout() {
//         Logout(); // Call logout function
//         this.setState({
//             isAuthenticated: false,
//             firstname: null,
//             lastname: null,
//             useremail: null,
//             userphone: null,
//             useraddress: null,
//         });
//     }
// }

// export default AuthenticationWrapper;

