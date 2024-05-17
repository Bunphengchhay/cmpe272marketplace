import React, { useEffect, useContext, useState } from 'react';
import '../styles/auth.css';
import { useAuth } from '../function/authentication';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [home_address, setAddress] = useState('');
    const [home_phone, setHomePhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpPage, setSignUpPage] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const { isAuthenticated, login, logout, signup } = useAuth();

    useEffect(() => {
        // console.log( "from useffect", isAuthenticated);
    }, [isAuthenticated]);

    const userData = {
        first_name,
        last_name,
        email,
        password,
        home_address,
        home_phone
      };
      
    const handleLogin = async () => {
        try {
          const loginStatus = await login(email, password);
          if (loginStatus.success) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate('/user');
          } else {
            console.error('Login error:', loginStatus.message);
          }
        } catch (error) {
          console.error('Login error:', error.message);
        }
      };

      const validateSignUp = () => {
        // Check if any required field is empty
        if(signUpPage){
            if (!first_name || !last_name || !email || !password || !confirmPassword || !home_address || !home_phone) {
            alert('Please fill in all fields.');
            return false;
            }
        
            // Check if password and confirm password match
            if (password !== confirmPassword) {
            alert('Password and confirm password do not match.');
            return false;
            }
        
            return true; // Validation passed
        }
      };
      const toggleSignupPage = () => {
        setSignUpPage(!signUpPage);
      }
      const handleSignUp = () => {
        // Validate sign up data before proceeding
        if (validateSignUp()) {
            // Add a delay before signing up
            setTimeout(async () => {
                // Call signup function after the delay
                const signUpStatus = await signup(userData);
                if (signUpStatus.success) {
                    // Navigate to '/user' upon successful signup
                    navigate('/user');
                } else {
                    // Handle signup error
                    console.error('Signup failed:', signUpStatus.message);
                }
            }, 1000);
        }
    };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Check if password and confirm password match
        setPasswordMatch(e.target.value === confirmPassword);
      };
    
      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Check if password and confirm password match
        setPasswordMatch(password === e.target.value);
      };

    return (
        <div className='login'>
            <div style={{minWidth: '300px', width: '50%', height: 'auto', display: 'flex', alignItems: 'center', borderRadius: '20px'}}>
                <div style={{width: '100%', height: 'inherit'}}>
                {!signUpPage &&<div className='login-container'>
                        <div style={{width: '100%', display: 'block'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', fontSize: 'small', marginBottom: '20px'}}>
                                <h1> Welcome to The HuB </h1>
                            </div>
                            <div>
                            <p> Email </p>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="username@email.com" />
                            </div>
                            <div>
                            <p> Password </p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456789" />
                            </div>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <button onClick={handleLogin}>Login</button>
                                {/* <button onClick={toggleSignupPage}> Sign Up</button> */}
                            </div>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <p> Need an Account ?</p>
                                <button onClick={toggleSignupPage}> Sign Up</button>
                            </div>
                        </div>
                    </div>
                }
                    <br/>
                    {signUpPage && <div className='login-container'>
                        <div style={{width: '100%', display: 'block'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', fontSize: 'small', marginBottom: '20px'}}>
                                <h1> Sign Up </h1>
                            </div>
                            <div>
                                <p> First Name </p>
                                <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                            </div>
                            <div>
                                <p> Last Name </p>
                                <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="First Name" />
                            </div>
                            <div>
                            <p> Email </p>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="username@email.com" />
                            </div>
                            <div>
                            <p> Address </p>
                            <input type="text" value={home_address} onChange={(e) => setAddress(e.target.value)} placeholder="123 San Jose CA" />
                            </div>
                            <div>
                            <p> Phone </p>
                            <input type="text" value={home_phone} onChange={(e) => setHomePhone(e.target.value)} placeholder="123456789" />
                            </div>
                            <div>
                                <p>Password</p>
                                <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="123456789"
                                />
                            </div>
                            <div>
                                <p>Confirm Password</p>
                                <input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="123456789"
                                style={{ borderColor: passwordMatch ? '' : 'red' }}
                                />
                                {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
                            </div>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <button onClick={handleSignUp}> Submit </button>
                                {/* <button onClick={toggleSignupPage}> Login</button> */}
                            </div>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <p> Already a member ?</p>
                                <button onClick={toggleSignupPage}> Login</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
