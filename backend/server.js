import express from "express";
import dotenve from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
const app = express();
const PORT = process.env.PORT || 8000;

dotenve.config(); // load.env variables
app.use(express.json()); // parse requests of content-type - application/json

app.get("/", (req, res) => {
  // home page
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes); // use auth middleware

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
