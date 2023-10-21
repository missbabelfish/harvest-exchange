import { useEffect, useState } from "react";
import axios from "axios";
import { Passage, Session, User } from "@passageidentity/passage-js";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassage } from "@passageidentity/passage-react";

import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

import {FormToJson } from "../utils/utils"

var  SERVER_URL=process.env.SERVER_URL;
SERVER_URL="http://localhost:8000"

export default function CreateListing() {

const [userData, setUserData] = useState(null);
const [userID, setUserID] = useState()

const [listing, setListing] = useState({
  userId: "",
  username: "",
  firstname: "",
  location: "",
  category: "produce",
  title: "",
  text: "",
  // does this need to be a string or number
  price: "",
  unit: "lb",
  image: "",
});

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
        console.log(data)
        setUserData(data)
        setUserID(data._id);
    } catch (error) {
        // Handle error if the API call fails
        console.error(error);
    }
};
getUserData();
}, []);

//   POST form data to DB
  const handleSubmit = async (event) => {
    console.log(`form submit`)
     event.preventDefault();
     if (!listing.userId) {
      setListing({
          ...listing, 
          userId: userData._id,
          username: userData.username,
          firstname: userData.firstname
      })
  };     
     const json = FormToJson(event.target);
     json["userId"] = userData._id;
    var response = await axios.post(SERVER_URL+'/listing/', json,);
    console.log("response: " + response);
  

  };

//   handle form changes, manage state
  function handleChange(e) {
    setListing({
        ...listing,
        [e.target.name] : e.target.value
    })
  }
/*
//   POST form data to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    // set userID in listing state
    if (!listing.userId) {
        setListing({
            ...listing, 
            userId: userData._id,
            username: userData.username,
            firstname: userData.firstname
        })
    }
    console.log(listing)
    // Handle form submission logic here
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData)
    try {
        // make axios post request
        const response = await axios.post("http://localhost:8000/listing/", formData)
        console.log(response)
      } catch(error) {
        console.error(error)
      }
  };
*/

      return (
          <PassageAuthGuard
          // displays if not logged in
            unAuthComp={
              <div>
                <div>you must be logged in</div>
                <div>
                  <a href="/">Login</a>
                </div>
              </div>
            }
          >
              {/* displays if logged in */}
            <div>
              <h1>Create Listing</h1>
              {userData && <p><span className="formBold">Username:</span> {userData.username}</p>}
              {userData && <p><span className="formBold">First Name:</span> {userData.firstname}</p>}

              <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Location">
                        Zip Code or Address
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={userData && userData.location}
                            onChange={handleChange}
                        />    
                    </label>
                </div>
                <div>
                    <label htmlFor="category">
                        Category:
                        <select id="category" name="category" value={listing.category} onChange={handleChange}>
                            <option value="produce">Produce</option>
                            <option value="seed">Seeds</option>
                            <option value="live plant">Live Plants</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="title">
                        Title
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={listing.title}
                            onChange={handleChange}
                        />    
                    </label>
                </div>
                <div>
                    <label htmlFor="text">
                        Description:
                        <input
                            type="text"
                            id="text"
                            name="text"
                            value={listing.text}
                            onChange={handleChange}
                        />    
                    </label>
                </div>
                <div>
                    <label htmlFor="price">
                        Price
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            id="price"
                            name="price"
                            value={listing.price}
                            onChange={handleChange}
                        />    
                    </label>
                </div>
                <div>
                    <label htmlFor="unit">
                        Unit
                        <select id="unit" name="unit" value={listing.unit} onChange={handleChange}>
                            <option value="lb">lb</option>
                            <option value="gram">gram</option> 
                            <option value="ounce">ounce</option>
                            <option value="pint">pint</option>
                            <option value="flat">flat</option>
                            <option value="dozen">dozen</option>
                        </select>
                    </label>
                    
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                    type="text"
                    id="image"
                    name="image"
                    value={listing.image}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </PassageAuthGuard>
    );
  }
