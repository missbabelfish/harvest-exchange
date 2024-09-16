import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import styles from '../styles/MyListings.module.css';
import { Link } from 'react-router-dom'
import {GetUserProfile, ServerUrl} from '../utils/utils'

const   SERVER_URL=ServerUrl();

export default function MyListings() 
{


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



    const [listings, setListings] = React.useState([])
    // fetch listings from db
    React.useEffect(() => {
        const getAllListings = async () => 
        {
            if (userID)
            {
                const allListings = await axios.get(SERVER_URL + '/listing/user/'+userID)
                console.log("data", allListings.data)
                setListings(allListings.data)
            }
        }
        getAllListings()
    }, [userID])

    const listingElements = listings.map(listing => (
        // assign key with item id so react doesn't get mad
        <div key={listing._id}>
            <Link to={`/listings/${listing._id}`}>

                <img className={styles.ImgLrg} src={listing.imageUrl}  alt="" />
                <div className={styles.Item}>

                    <h3>{listing.title}</h3>
                    <p className={styles.Price}>${listing.price}/{listing.unit}</p>
                    <p>{listing.text}</p>
                </div>
            </Link>
        </div>
    ))






    return (
        <div className={styles.view}>
            <h1>My Listings</h1>
            {listingElements}
        </div>
    )


}