
import React from "react";
import {Outlet} from "react-router-dom"
import WineNavigation from "../navigation/winenavigation";

function Wine() {
    return ( 
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '98%', minHeight: '100vh'}}>
            <WineNavigation/>
            <Outlet/>
        </div>
    </div> );
}

export default Wine;