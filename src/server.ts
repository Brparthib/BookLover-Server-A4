import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
const PORT = 5000;

let server: Server;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://library_management:assignment3@cluster0.h5btmpi.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected Successfully!");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
