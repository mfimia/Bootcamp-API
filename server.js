// import { Express } from "express";
// import { dotenv } from "dotenv";
import express from "express";
import { config } from "dotenv";

// Load env (environment) vars
// We take them from config.env in our config folder
config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
