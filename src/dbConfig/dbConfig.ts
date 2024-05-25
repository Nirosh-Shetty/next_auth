import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Some error occurred in Database" + error.message);
      // process.exit();
    });
  } catch (error: any) {
    console.log("Something went wrong" + error.message);
  }
};
