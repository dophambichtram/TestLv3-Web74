import express from "express";
import { validateLogin } from "../Service/validator.js";
import { createAccess } from "../Controller/makeToken.js";
import { getItem, getitemsOrder } from "../Controller/getItem.js";
import { validatorToken } from "../Controller/validatorToken.js";
export const userRoute = express.Router();
userRoute.get("/get", validatorToken, getItem);
userRoute.get("/getOrder", validatorToken, getitemsOrder)
userRoute.post("/login", validateLogin, createAccess);
