import express from "express";
import dotenve from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 8000;

dotenve.config(); // load.env variables
app.use(express.json()); // parse requests of content-type - application/json
app.use(cookieParser()); // read cookies (needed for auth)

app.get("/", (req, res) => {
  res.send("Hello World!"); // home page
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
