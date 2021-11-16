import mongoose from "mongoose";
import colors from 'colors'

// Using async syntax to connect mongoose
// To connect we are going to use URI, taking it from Atlas. We copy the connection string into our config file and make it an environment variable (MONGO_URI)
const connectDB = async () => {
  // Created a try/catch block to handle rejected promises but we instead wrote that handling on server.js (server variable)
    try {
  const conn = await mongoose.connect(
    // For now, we are just commenting out the parameters to connect to the database without these settings
    process.env.MONGO_URI
    //     , {
    //   // Adding these parameters just to avoid potential errors later on
    //   useNewUrlParser: true,
    // //   useCreateIndex: true,
    // //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    // }
  );

  //   Logging a message to know that we are connected for testing purposes
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
      console.log(error.red);
    }
};

export default connectDB;
