import NodeGeocoder from "node-geocoder";
// import { config } from "dotenv";

const options = {
    
  provider: 'mapquest',
//   provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: 'NRcYOm46gAHsrs9dGau9eAl48GCR66db',
//   apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

console.log(options.provider)

const geocoder = NodeGeocoder(options);

export default geocoder