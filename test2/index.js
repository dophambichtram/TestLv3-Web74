import express from "express"
import morgan from "morgan"
import { config } from "dotenv";
import cors from "cors";
import { database } from "./Database/database.js";
import { userRoute } from "./Route/userRoute.js";

const app = express()
const port = 4000;
config();

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
database.run();
app.use("/user", userRoute)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})