import NodeGeocoder from "node-geocoder";
// import { config } from "dotenv";

// We use mapquest as our geocoder provider
// Api key below taken from the account created at developer.mapquest.com
const options = {
  provider: "mapquest",
  //   provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: "NRcYOm46gAHsrs9dGau9eAl48GCR66db",
  //   apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
