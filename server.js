import express from "express";
import { config } from "dotenv";
import colors from "colors";
// Deprecated custom logger function
import logger from "./middleware/logger.js";
// Lightweight middleware application installed
import morgan from "morgan";
// Importing the connection to the database
import connectDB from "./config/db.js";
// Load env (environment) vars
// We take them from config.env in our config folder
config({ path: "./config/config.env" });

// Actually connecting to the database by calling connectDB function (imported)
connectDB();
// import { restart } from "nodemon";
// const bootcamps = require("./routes/bootcamps");

// Route files
import bootcamps from "./routes/bootcamps.js";

const app = express();

// Deprecated middleware custom logger function
// app.use(logger);

// Dev logging middleware
// Adding some logic so this will only run will in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
// When we declare this, we don't need to use the complete url in the bootcamp file, we can put only '/'
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// ----CURRENTLY BEING HANDLED ON TRYCATCH BLOCK
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
