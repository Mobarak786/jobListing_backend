import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongoDB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api/v1/", authRoutes);

// connected to server and DB
const startServer = () => {
  try {
    connectDB(process.env.MONGO_DB_URL);
    app.listen(PORT, () => {
      console.log(`Connect to the server at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
