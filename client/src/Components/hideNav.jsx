import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function HideNav({ children }) {
    const location = useLocation();
    const [showNav, setShowNav] = useState(false);

    // Show the navbar if user not on a page that nav hide it.
    useEffect(() => {
       // console.log("Current path:", location.pathname); // path name display 
       //check specific pages 
        if (
          location.pathname === '/login' ||
          location.pathname === '/signUp' ||
          location.pathname === '/forgot' ||
          location.pathname === '/reset/:token'||
          location.pathname === '/dashboard'
        ) {
          setShowNav(false);// those pages navbar should hide
        } else {
          setShowNav(true);//other pages display nav
        }
      }, [location]);
      

    return <div>{showNav && <>{children}</>}</div>; // pass the children prop
}

export default HideNav;
