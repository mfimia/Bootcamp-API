import mongoose from "mongoose";

// Using async syntax to connect mongoose
// To connect we are going to use URI, taking it from Atlas. We copy the connection string into our config file and make it an environment variable (MONGO_URI)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Adding these parameters just to avoid potential errors later on
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true,
    });

    //   Logging a message to know that we are connected for testing purposes
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
