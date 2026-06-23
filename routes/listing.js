const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');

const{storage}  = require("../cloudConfig.js")
const upload = multer({storage })



router 
.route("/")
.get( wrapAsync(listingController.index))
.post(
  isloggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.creatiListing)
);
//New Route
router.get("/new", isloggedIn, listingController.renderNewForm);
router
.route("/:id")
.get( wrapAsync(listingController.showlistings))
.put(
  isloggedIn,
    isOwner,
     upload.single('listing[image]'),
  validateListing,

   wrapAsync(listingController.updateListing ))
.delete( isloggedIn,  isOwner, wrapAsync(listingController.distroyListing ));


//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.renderEditForm ));


 
module.exports = router;
