import express from "express"
import morgan from "morgan"
import { config } from "dotenv";
import cors from "cors";
import { databaseUnit } from "./Database/database.js";
import { userRoute } from "./Route/userRoute.js";

const app = express()
const port = 3000
config();

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
databaseUnit.run();
app.use("/user",userRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })