import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/tasks", taskRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/Tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});