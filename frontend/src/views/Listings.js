import styles from "../styles/Listings.module.css";
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LogoutButton from "../components/LogoutButton";
import {GetUserProfile, ServerUrl} from '../utils/utils'

const   SERVER_URL=ServerUrl();
export default function Listing() {
    // initialize state
    const [listings, setListings] = React.useState([])

    // fetch listings from db
    React.useEffect(() => {
        const getAllListings = async () => {
            const allListings = await axios.get(SERVER_URL + '/listing/')
            console.log(allListings.data)
            setListings(allListings.data)
        }
        getAllListings()
    }, [])

    const listingElements = listings.map(listing => (
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
            <h1>Browse Listings</h1>
            {listingElements}
            {/* <LogoutButton /> */}
        </div>
    )
}

