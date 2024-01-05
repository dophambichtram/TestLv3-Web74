import express from "express";
import { validateLogin } from "../Service/validater.js";
import { createLoginAccess } from "../Controller/makeToken.js";

import { getItem, getItemOrder } from "../Controller/getItem.js";
import { validateToken } from "../Controller/validateToken.js";
export const userRoute=express.Router();
userRoute.get("/get",validateToken,getItem);
userRoute.get("/getOrder",validateToken,getItemOrder)
userRoute.post("/login",validateLogin,createLoginAccess);
