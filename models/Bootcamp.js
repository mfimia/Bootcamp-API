// import { config } from "dotenv";
import mongoose from "mongoose";
// Slug is a technical word that means to convert a name into an usable URL
// Example: slugify(Martin Fimia) = martin-fimia
import slugify from "slugify";
import geocoder from "../utils/geocoder.js";

// This file is basically saying  what type of data is allowed and how
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add description"],
    maxLength: [500, "Description can not be more than 50 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    //   GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create bootcamp slug from the name
// We don't use arrow function because it handles scope differently and "this" keyword would have different meaning
BootcampSchema.pre("save", function (next) {
  // Code below sets the slug of item and "lower: true" makes sure its lowercase
  // We can use "slugify" because we installed it and imported it
  this.slug = slugify(this.name, { lower: true });
  // We tell it to go to the next piece of middleware
  next();
});

// Geocode & create location field
// Syntax and keyworkds taken from MapQuest documentation
// Only required fields for location, according to our Schema, are "type" and "coordinates"
// By saying .pre(), we tell the program that this will run before it goes "save"
BootcampSchema.pre("save", async function (next) {
  // We await response from geocoder and store data in loc variable
  const loc = await geocoder.geocode(this.address);
  //   This code below basically gets all the information from our geocoder and stores it in this object with below format
  this.location = {
    // Required
    type: "Point",
    // Required
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  //   Do not save address in DB
  this.address = undefined;
  next();
});

export default mongoose.model("Bootcamp", BootcampSchema);
// URL Regular Expression --->   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
// Email Regular Expression --->   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
