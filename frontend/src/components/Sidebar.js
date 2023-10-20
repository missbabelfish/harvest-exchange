import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/Sidebar.css'
import { Link } from "react-router-dom";
import { usePassageLogout } from "../hooks";



export default (props) => {
  return (
    <Menu right>
      <ul className="bm-menu">
        <li className="bm-item">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="bm-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="bm-item">
          <Link to={"/listings"}>Listings</Link>
        </li>
        <li className="bm-item">
          <Link to={"/listings/create-listing"}>Create Listing</Link>
        </li>
        <li className="bm-item">
          <Link to="/:userID/listings">My Listings</Link>
        </li>
        <li className="bm-item">
          <Link to='/:userID/inbox'>Inbox</Link>
        </li>
        <li className="bm-item">
          <Link to='/:userID/favorites'>Favorites</Link>
        </li>
        <li className="bm-item">
          <Link to='/learn'>Learn</Link>
        </li>
        <li className="bm-item">
          <Link to='/' onClick={usePassageLogout}>Sign Out</Link>
        </li> 
            
      </ul>   
    </Menu>
  );
};