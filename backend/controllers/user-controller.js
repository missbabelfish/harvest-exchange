const express = require("express");
const router = express.Router();
const { User } = require('../models');
const Passage = require("@passageidentity/passage-node");

require("dotenv").config();

const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
});

// Get active user's profile.
router.post("/getUserProfile", async (req, res) => {
    try {
        //retrieving info from passage
        const userID = await passage.authenticateRequest(req);
        if (userID) 
        {
            // user is authenticated
            console.log(userID)
            const { email, phone, user_metadata } = await passage.user.get(userID);
            const identifier = email ? email : phone;
            const getUser = await User.findOne({passage_id: identifier});
            if (getUser) 
            {
                res.status(200).json(getUser);
            } 
            else 
            {
                // logic to get meta data from passage and create user
                const newUserProfile = await User.create({
                    passage_id: identifier,
                    ...(user_metadata.first_name && {firstname: user_metadata.first_name}),
                    ...(user_metadata.last_name && {lastname: user_metadata.last_name}),
                    ...(user_metadata.zip_code && {zipcode: user_metadata.zip_code}),
                    ...(user_metadata.username && {username: user_metadata.username})
                });
                
                res.status(201).json(newUserProfile);
            }
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Get profile of any user (give)
router.post("/Profile/:profileId", async (req, res) => {
    try 
    {
        //retrieving info from passage
        const userID = true; //  await passage.authenticateRequest(req);    // TODO: fix this "PassageError: Could not verify token: JWTExpired: "exp" claim timestamp check failed. You must catch this error."
        if (userID) 
        {
            // user is authenticated
            const profile = await User.findOne({_id: req.params.profileId });
            if (profile) 
            {
                console.log(profile);
                res.status(200).json(profile);
            } 
            else 
            {
                console.warn(`User [${req.params.profileId }] not found`);
                res.status(404).json({ error: "User not found" });
            }
        }
    } 
    catch (err) 
    {
        console.error(err);
        res.status(400).json({ error: err });
    }
});





//update user profile 
router.put("/updateUserProfile", async (req, res) => {
  try {
    
    const updatedUser = await User.findByIdAndUpdate(
        req.body.id,
        {
            ...(req.body.firstname && {firstname: req.body.firstname}),
            ...(req.body.lastname && {lastname: req.body.lastname}),
            ...(req.body.email && {email: req.body.email}),
            ...(req.body.zipcode && {zipcode: req.body.zipcode})
        },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//List Listings for one specific user

router.get("/oneUsersListings/:id", async (req, res) => {
    try {
      const foundUserListings = await User.findById(req.params.id).where("listings")
      res.status(200).json(foundUserListings)
      } catch (err) {
          res.status(400).json({ error: err })
      }
    })


module.exports = router;