import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import styles from '../styles/App.module.css';

const SERVER_URL="http://localhost:8000"

export default function MyListings() {
    const [userId, setUserId] = useState('')
    const [userData, setUserData] = useState(null);
    const [userListings, setUserListings] = useState([])

    // get userId from db
    useEffect(() => {
        const getUserData = async () => {
        // Retrieve the auth token from localStorage
        const authToken = localStorage.getItem('psg_auth_token');
        console.log(authToken)

        // Make API call to fetch user details using the auth token
        try {
            const response = await fetch(SERVER_URL+"/user/getUserProfile", {
                method: "POST", // or 'PUT'
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });

            // Set the user data in state
            const data = await response.json()
            console.log(data._id)
            // setUserData(data)
            setUserId(data._id);
            console.log(userId)
            } catch (error) {
                // Handle error if the API call fails
                console.error(error);
            }
        };
        getUserData();
    }, []);

    // fetch user listings from db and filter by user
    useEffect(() => {
        const filterListingsByUser = async () => {
            console.log(userId)
            const allListings = await axios.get('http://localhost:8000/listing/')
            const listingArray = allListings.data
            console.log(listingArray)
            const filtered = listingArray.filter(listing => listing.userID === userId)
            // console.log(filtered)
            setUserListings(filtered)
        }
        filterListingsByUser()
    }, [])

    // const userListings = listings.filter(listing => listing.id === userId)

    const userListingElements = userListings.map(listing => (
        // assign key with item id so react doesn't get mad
        <div key={listing._id}>
            <Link to={`/listings/${listing._id}`}>

                <img className={styles.imgSmall} src={listing.image || 'https://picsum.photos/150/120' } alt={listing.text} />
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
            {userListingElements}
        </div>
    )
}