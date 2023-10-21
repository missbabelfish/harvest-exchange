import styles from "../styles/Inbox.module.css";
import React from 'react'
import axios from 'axios'
//import { useParams } from 'react-router-dom';
import { usePassageUserInfo } from "../hooks/";
import { Link } from 'react-router-dom'

var  SERVER_URL=process.env.SERVER_URL;
SERVER_URL="http://localhost:8000"

export default function  Inbox() {
    console.log("Start of Inbox");
    console.log(process.env);

    const { userInfo, loading } = usePassageUserInfo();
//    const { id } = userInfo;
    const [listings, setListings] = React.useState([]);
console.log("userInfo:", userInfo);
console.log("listing:", listings);
console.log("loading:", loading);

    // fetch listings from db
    React.useEffect(() => {
        const getAllListings = async () => {
            const allListings = await axios.get(SERVER_URL+'/message/penpals/'+ userInfo.id); //6530076dd128d58567d48136'); // 
            console.log(allListings.data.writers)
            setListings(allListings.data.writers)
        }
        getAllListings()
    }, [])

    const listingElements = 
    listings.map(listing => (
        // assign key with item id so react doesn't get mad
    
        <tr key={listing._id}>
            <td>
                <Link to={`/chatbox/${listing.Id}`}>
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
}