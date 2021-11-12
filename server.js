import  express  from "express";
import { config } from "dotenv";
import bootcamps from "./routes/bootcamps.js";
// import { restart } from "nodemon";
// Routes files
// const bootcamps = require("./routes/bootcamps");

// Load env (environment) vars
// We take them from config.env in our config folder
config({ path: "./config/config.env" });

const app = express();

// Mount routers
// When we declare this, we don't need to use the complete url in the bootcamp file, we can put only '/'
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
