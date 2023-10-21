const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models");
const { Listing } = require("../models");
const Passage = require("@passageidentity/passage-node");
require("dotenv").config();

const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
});

// retrieve information from all listings
router.get("/", async (req, res) => {
  try {
    //if filter is kept as an empty object, shows all listings
    let filter = {};
    //destructing the listing object
    let { location, distance, category, subtypes, price} = req.query;
    //if searching for zipcode and distance, example: url = http://localhost:3000/listing?zipCode=76120&distance=50 
    // api turns zipcode into longitude and latitude
    //store lat & long into zipinfo
    // filter then adds a key called zipCoords containing the distance away from said coordinates
    if (location && distance) {
        await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${location}`)
        .then((res) => res.json())
        .then( (json) => {
            const zipInfo = (json.results[0].locations[0].latLng);
            filter.zipCoords = { 
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [zipInfo.lng, zipInfo.lat]
                    },
                    $maxDistance: (Number(distance) * 1609.344)
                }
            }
        })
    }

    //checks if filter object has zipcoords and category. If category exists in the req.query(url) add category key along with value from the query
    filter = {
        ...filter,
        ...(category && {category: category}),
        ...(subtypes && {subtypes: subtypes}),
        ...(price && {price: price})
    };

    console.log(filter);
    //search listing by whatever is in filter
    const allListing = await Listing.find(filter);
    res.status(200).json(allListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their Listing ID
router.get("/:id", async (req, res) => {
  try {
    const getOneListing = await Listing.findOne({ _id: req.params.id });
    
    res.status(200).json(getOneListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their user ID
router.get("/user/:id", async (req, res) => {
  try {
    const getUserListings = await Listing.find({ userID: req.params.id });
    res.status(200).json(getUserListings);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// creates user listing
router.post("/", async (req, res) => {
    try {
      // Mary R's changes
        const userID = await passage.authenticateRequest(req);
        if (userID) {
            // user is authenticated
            const { email, phone, user_metadata } = await passage.user.get(userID);
            const identifier = email ? email : phone;
            const getUser = await User.findOne({passage_id: identifier});
            if (getUser) { 
                const location = req.body.location
                console.log(location)
                fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${location}`)
                .then((res) => res.json())
                .then( async (json) => {
                  const zipInfo = (json.results[0].locations[0].latLng);
                  var item = new Listing();
                  item.title = req.body.title;
                  item.category = req.body.category;
                  item.text = req.body.text;
                  item.price = req.body.price;
                  item.unit = req.body.unit;
                  item.zipCoords = { type: "Point", coordinates: [zipInfo.lng, zipInfo.lat]};
                  item.image = req.body.image;
//                  item.userID =  req.body.userId;
                  item.userID = getUser._id;
                  const newListing = await Listing.create(item);
                    res.status(200).json(newListing);
                }).catch((err) => {
                    res.status(400).json({ error: err.message });
                });
            } else {
                // logic to get meta data from passage and create listing
                res.status(400).json({ error: "The user is not logged in to post things" });
            };
        }
    }catch (err) {
      /*   James C's changes
        const location = req.body.location;
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${location}`)
        .then((res) => res.json())
        .then( async (json) => {
            const zipInfo = (json.results[0].locations[0].latLng);
            var item = new Listing();
            item.title = req.body.title;
            item.category = req.body.category;
            item.text = req.body.text;
            item.price = req.body.price;
            item.unit = req.body.unit;
            item.zipCoords = { type: "Point", coordinates: [zipInfo.lng, zipInfo.lat]};
            item.image = req.body.image;
            item.userID =  req.body.userId;
            console.log("item", item);

            const newListing = await Listing.create(item);
//            console.log("newListing", newListing);
            res.status(200).json(newListing);
        })
        .catch(console.error);
    } catch (err) {
    */
        res.status(400).json({ error: err.message });
    }
});

//edit Listing for user
router.put("/:id", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
        const { email, phone, user_metadata } = await passage.user.get(userID);
        const identifier = email ? email : phone;
        const getUser = await User.findOne({passage_id: identifier});
        if (getUser) {
        if (req.body.location){
            await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}&location=${req.body.location}`)
            .then((res) => res.json())
            .then(async (json) => {
                const zipInfo = (json.results[0].locations[0].latLng);
                req.body.zipCoords = { type: "Point", coordinates: [zipInfo.lng, zipInfo.lat] }
            })
        };
        const updatedListing = await Listing.findOneAndUpdate({
                _id: req.params.id,
                userID: getUser._id
            },
            req.body,
            { new: true, runValidators: true }
        );
        res.status(201).json(updatedListing);
        }} else {
        res.status(400).json({ error: "The user is not logged in to post things" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//delete Listing for user
router.delete("/:id", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
        // user is authenticated
        const { email, phone, user_metadata } = await passage.user.get(userID);
        const identifier = email ? email : phone;
        const getUser = await User.findOne({passage_id: identifier});
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedListing);
    }
    // const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    // res.status(200).json(deletedListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});


module.exports = router;
