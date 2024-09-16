import styles from "../styles/Inbox.module.css";
import React from 'react'
import axios from 'axios'
//import { useParams } from 'react-router-dom';
//import { usePassageUserInfo } from "../hooks/";
import { Link } from 'react-router-dom'
import {GetUserProfile, ServerUrl} from '../utils/utils'

const   SERVER_URL=ServerUrl();

export default function  Inbox() {
    console.log("Start of Inbox");
//    console.log("process.env",process.env);

//const [userData, setUserData] = React.useState(null);
const [userID, setUserID] = React.useState(null)

React.useEffect(() => 
 {
    async function  getUserData() 
  {
    console.log("getUserData");
    const data = await GetUserProfile();
    if (data)
    {
      console.log("data", data);
//      setUserData(data);
      setUserID(data._id);
    }
  };
  getUserData();
}, []);

//console.log("userInfo:", userData);
console.log("userID:", userID);



const [listings, setListings] = React.useState([]);
    // fetch listings from db
    React.useEffect(() => 
    {
        if (userID)
        {
            const getAllListings = async () => {
                const allListings = await axios.get(SERVER_URL+'/message/penpals/'+ userID); //6530076dd128d58567d48136'); // 
                console.log(allListings.data.writers)
                setListings(allListings.data.writers)
            };
            getAllListings();
        }
    }, [userID])
    console.log("listing:", listings);


    const listingElements = 
    listings.map(listing => (
        // assign key with item id so react doesn't get mad
    
        <tr key={listing._id}>
            <td>
                <Link to={`/chat/${listing.Id}`}>
                    <span className={styles.Item}>{listing.firstname} {listing.lastname}</span>
                </Link>
            </td>
            <td>
                <span>{listing.mostRecent}</span>
            </td>
            <td>
                <span>{listing.unread ? "YES" : "no"}</span>
            </td>
        </tr>
    ))
    

    return (
        <div>
            <h1>Inbox</h1>
            <table className={styles.Grid}>
               <thead>
                <tr>
                    <td>Recipient</td>
                    <td>Last Message</td>
                    <td>Unread?</td>
                </tr>
                </thead> 
                <tbody>
                {listingElements}
                </tbody>
            </table>
        </div>
            )
}