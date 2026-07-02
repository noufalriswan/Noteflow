import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/Tasks")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });