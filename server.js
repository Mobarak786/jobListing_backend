import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./mongoDB/connectDB.js";
import authRoutes from "./Routes/auth.router.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// middlewares
app.use(cors({ origin: "http://localhost:5173/" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

//routes
app.use("/api/v1/", authRoutes);

// error route for handling errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  res.status(errorStatus).send(errorMessage);
});

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
