import { useState } from "react";

function  Logout() {
    const auth = localStorage.getItem('isAuthenticated');
    console.log('current status: ' + auth);
    if (auth) {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('isAuthenticated');
        // console.log('logout sucessfully');
        return auth;
    }
    else if(auth === 'false') {
        // console.log('Unsucessfully logged out');
        return auth;
    }
    else{
        // console.log('already logged out');
        return true;
    }
}

export default  Logout;