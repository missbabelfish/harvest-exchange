import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/Sidebar.css'
import { Link } from "react-router-dom";
import { usePassageLogout } from "../hooks";


export default (props) => {
  const closeMenu = () => document.querySelector(".closeMenu").click()
    return (
      <Menu right overlayClassName={"closeMenu"}>
        <ul className="bm-menu">
          <li className="bm-item">
            <Link to={"/"} onClick={closeMenu}>Home</Link>
          </li>
          <li className="bm-item">
            <Link to={"/profile"} onClick={closeMenu}>Profile</Link>
          </li>
          <li className="bm-item">
            <Link to={"/listings"} onClick={closeMenu}>Listings</Link>
          </li>
          <li className="bm-item">
            <Link to={"/createlisting"} onClick={closeMenu}>Create Listing</Link>
          </li>
          <li className="bm-item">
            <Link to={"/:userID/listings"} onClick={closeMenu}>My Listings</Link>
          </li>
          <li className="bm-item">
            <Link to={'/:userID/inbox'} onClick={closeMenu}>Inbox</Link>
          </li>
          <li className="bm-item">
            <Link to={'/:userID/favorites'} onClick={closeMenu}>Favorites</Link>
          </li>
          <li className="bm-item">
            <Link to={'/learn'} onClick={closeMenu}>Learn</Link>
          </li>
          <li className="bm-item">
            <Link to={'/'} onClick={closeMenu} onClick={usePassageLogout}>Sign Out</Link>
          </li> 
              
        </ul>   
      </Menu>
  );
};

export default Sidebar