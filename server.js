// import { Express } from "express";
// import { dotenv } from "dotenv";
const express = require("express");
const dotenv = require("dotenv");

// Load env (environment) vars
// We take them from config.env in our config folder
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
