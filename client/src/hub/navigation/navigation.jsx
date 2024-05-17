import '../styles/nav.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../function/authentication';

function Navigation() {
    const [showSidebar, setShowSidebar] = useState(true);
    const { toggleLogon } = useAuth();

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="navigation">
            <div style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center' }}>
                <div className='nav-left'>
                    <NavLink to="/home" >
                        <div style={{ width: '200px', textAlign: 'center' }}>
                            <h1 style={{ marginTop: 0, marginBottom: 0 }}> The HuB</h1>
                            <p style={{ marginTop: 0, marginBottom: 0 }}> Market Place </p>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-right'>
                    <NavLink to="/home" className={({isActive}) => isActive ? "selected": "non-active-class" }> Home </NavLink>
                    <NavLink to="/products" className={({isActive}) => isActive ? "selected": "non-active-class" }> Products </NavLink>
                    <NavLink to="/membership" className={({isActive}) => isActive ? "selected": "non-active-class" }> Membership </NavLink>
                    <NavLink to="/contact" className={({isActive}) => isActive ? "selected": "non-active-class" }> Contact </NavLink>
                    <NavLink to="/Review" className={({isActive}) => isActive ? "selected": "non-active-class" }> Review </NavLink>
                    {toggleLogon === 'Logout' && <NavLink to="/user" className={({isActive}) => isActive ? "selected": "non-active-class" }> Profile</NavLink>}
                    {toggleLogon === 'Login' && <NavLink to="/login" className={({isActive}) => isActive ? "selected": "non-active-class" }> {toggleLogon} </NavLink>}
                </div>
            </div>
            <div className='sidebar' onClick={toggleSidebar}>
                <div id='burgerbar' onClick={toggleSidebar}>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                </div>
                <div className={`sidebarMenu ${showSidebar ? 'shows' : ''}`}>
               
                    <NavLink to="/home" className={({isActive}) => isActive ? "selected side": "non-active-class" }> Home </NavLink>
                    <NavLink to="/products" className={({isActive}) => isActive ? "selected side": "non-active-class" }> Products </NavLink>
                    <NavLink to="/membership" className={({isActive}) => isActive ? "selected side": "non-active-class" }> Membership </NavLink>
                    <NavLink to="/contact" className={({isActive}) => isActive ? "selected side": "non-active-class" }> Contacts </NavLink>
                    <NavLink to="/review" className={({isActive}) => isActive ? "selected side": "non-active-class" }> Reviews </NavLink>
                    {toggleLogon === 'Logout' && <NavLink to="/user" className={({isActive}) => isActive ? "selected": "non-active-class" }> Profile</NavLink>}
                    {toggleLogon === 'Login' && <NavLink to="/login" className={({isActive}) => isActive ? "selected": "non-active-class" }> {toggleLogon} </NavLink>}
                 
                </div>
            </div>
        </div>
    );
}

export default Navigation;
