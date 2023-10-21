import { Link } from "react-router-dom";
import styles from '../styles/Header.module.css';
import Sidebar from './Sidebar';
import logo from '../styles/imgs/HarvestExchangeLogo-181x76-removebg-preview.png'

function Header() {

    return ( 

        <div className={styles.mainHeader}>


            <Link to={'/'}>
            
                <img
                    height='45vh'
                    src={logo} 
                    alt ="" 
                />
                
            </Link> 
             
            <Link to={'/'} styles={styles.headerLogo}>Harvest Exchange</Link>
            
           

            {/* <nav className="navbar">
                <ul className={styles.navItems}>
                    <li className="">
                        <a href='/'>Home</a>
                    </li>
                    <li className="">
                        <Link to={'/profile'}>Profile</Link>
                    </li>
                    <li className="">
                        <a href='/listings'>Browse Listings</a>
                    </li>
                    <li className="">
                        <a href='/listings/create-listing'>Create Listing</a>
                    </li>
                    <li className="">
                        <a href='/:userID/listings'>My Listings</a>
                    </li>
                    <li className="">
                        <a href='/:userID/inbox'>Inbox</a>
                    </li>
                    <li className="">
                        <a href='/:userID/favorites'>Favorites</a>
                    </li>
                    <li className="">
                        <a href='/learn'>Learn</a>
                    </li>
                    <li>
                        <a href='/' onClick={signout}>Sign Out</a>
                    </li>
                </ul>
                
            </nav> */}
            <Sidebar />
        </div>
    );
}
export default Header;
