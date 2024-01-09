import { databaseUnit } from "../Database/database.js";
import { checkToken } from "../Service/checkAndCreateToken.js";

const privateKey = process.env.KEY;
export const validatorToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]

  const userUnit = await checkToken(privateKey, token);
  console.log(userUnit);


  const result = await databaseUnit.user().findOne({ username: userUnit.username });
  if (result) {
    return next();
  }
  else {
    throw new Error("Access is wrong")
  }

};
