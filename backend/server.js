import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express"
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})


const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server Started on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();


// app.listen(port, () => {
//     console.log(`Server Started on http://localhost:${port}`)
// })