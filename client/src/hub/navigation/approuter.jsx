import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';
import Login from '../authentication/login';
import Logout from '../authentication/logout';
import Membership from '../pages/membership';
import Products from '../pages/product';
import Wine from '../../wine/pages/wine';
import BestProducts from '../pages/bestproduct';
// import WineHome from '../../wine/pages/wine/../home';
import Crabs from '../../crab/crab';
import Socks from '../../socks/socks';
import WineHome from '../../wine/pages/home';
import WineAbout from '../../wine/pages/about';
import WProducts from '../../wine/pages/products';
import WineNews from '../../wine/pages/news';
import Review from '../../wine/pages/review';
import User from '../pages/user';
import WineProfile from '../../wine/pages/wineProfile';
import usePageTracking from '../hook/usePageTracking';


function AppRouter() {
  usePageTracking();
  return (
   <div>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/home" element={<Home/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/contact" element={<Contact/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/logout" element={<Logout/>}/>
        <Route path = "/membership" element={<Membership/>}/>
        <Route path ="/review" element={<BestProducts/>}/>
        <Route path ="/user" element={<User/>}/>
        <Route path = "/products" element={<Products/>}>
          <Route path="wine" element={<Wine/>}>
              <Route path = "" element={<WineHome/>}/>
              <Route path = "winehome" element={<WineHome/>}/>
              <Route path = "wineabout" element={<WineAbout/>}/>
              <Route path = "WineProducts" element={<WProducts/>}/>
              <Route path = "WineNews" element={<WineNews/>}/>
              {/* <Route path = "wineprofile" element={<WineProfile/>}/> */}
              <Route path="wineprofile/wine/:wineName/:wineId" element={<WineProfile />} />
              <Route path="wineprofile/cocktail/:cocktailName/:cocktailId" element={<WineProfile />} />
          </Route>
          <Route path="crabs" element={<Crabs/>}/>
          <Route path="socks" element={<Socks/>}/>
        </Route>
      </Routes>
      </div>
  );
}

export default AppRouter;
