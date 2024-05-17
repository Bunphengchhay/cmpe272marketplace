import { NavLink, useLocation } from "react-router-dom";
import "../style/styles.css";
import { useEffect, useState } from 'react';

function WineNavigation() {
    const currentLocation = useLocation();
    const [isHomePath, setIsHomePath] = useState(false);

    useEffect(() => {
        setIsHomePath(currentLocation.pathname.endsWith('/winehome') || currentLocation.pathname.endsWith('/wine'));
    }, [currentLocation]);

    return ( 
        <div style={{width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', zIndex: 999}}>
            <div className="wine-navigation-left">
                <h1 style={{color: isHomePath ? 'white' : 'rgb(22, 94, 154)', fontSize: 'medium'}}> ECSTASY</h1>
            </div>
            <div className="wine-navigation-right">
                <NavLink to="winehome" className={({isActive}) => isActive ? "wineSelected": "non-active-class" } style={{color: isHomePath ? 'white' : 'rgb(22, 94, 154)'}}> Home </NavLink>
                <NavLink to="wineabout" className={({isActive}) => isActive ? "wineSelected": "non-active-class" } style={{color: isHomePath ? 'white' : 'rgb(22, 94, 154)'}}> About </NavLink>
                <NavLink to="wineproducts" className={({isActive}) => isActive ? "wineSelected": "non-active-class" } style={{color: isHomePath ? 'white' : 'rgb(22, 94, 154)'}}> Products </NavLink>
                <NavLink to="winenews" className={({isActive}) => isActive ? "wineSelected": "non-active-class" } style={{color: isHomePath ? 'white' : 'rgb(22, 94, 154)'}}> News </NavLink>
            </div>
        </div>
     );
}

export default WineNavigation;

