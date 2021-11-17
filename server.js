import express from "express";
import { config } from "dotenv";
// Helper package to log colors into the console
import colors from "colors";
import errorHandler from "./middleware/error.js";
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

// Body parser
// This method takes the info from the request and parses it from JSON
app.use(express.json());

// Deprecated middleware custom logger function
// app.use(logger);

// All middleware we need to bring to the server by using app.use()
// Dev logging middleware
// Adding some logic so this will only run will in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
// When we declare this, we don't need to use the complete url in the bootcamp file, we can put only '/'
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
