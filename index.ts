import express from "express";
import cors from "cors";
import { initializeFirebase } from "./src/firebase/admin";
import { imagesRouter } from "./src/images/controller";
import { layersRouter } from "./src/layers/controller";
import { leaderboardRouter } from "./src/leaderboard/controller";
import { userRouter } from "./src/user/controller";
import { initializeMongoDB } from "./src/config/mongoClient";

require("dotenv").config();

const PORT = "8080";
const app = express();

app.use(cors());

app.use(express.json());
app.use("/user", userRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/layers", layersRouter);
app.use("/images", imagesRouter);

initializeFirebase();
initializeMongoDB();
app.listen(PORT);

console.info("Server started on port: ", PORT);
