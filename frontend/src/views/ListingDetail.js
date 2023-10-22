import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function ListingDetail() {
    const { id } = useParams()
    // initialize state
    const [listing, setListing] = React.useState(null)

    // fetch one listing by id
    React.useEffect(() => {
        const getOne = async () => {
            const listing = await axios.get(`http://localhost:8000/listing/${id}`)
            setListing(listing.data)
        }
        getOne()
    }, [id])
    // there has GOT to be a better way than this.
    var chatUrl= "";
    if (listing)
        chatUrl = "/chat/"+listing.userID;

    return (
        <div>
            {listing ? (
                <div>
                    <img src={listing.image || 'https://picsum.photos/300/400' } alt={listing.text}/>
                    <p>{listing.category}</p>
                    <h2>{listing.title}</h2>
                    <p>posted on {listing.createdAt}</p>
                    <p><span>${listing.price}</span>/{listing.unit}</p>
                    <p>{listing.text}</p>
                    <button>
                        <a href={chatUrl}>Message</a>
                    </button>
                    <button>
                        <a href="/listings">Back to All Listings</a>
                    </button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}