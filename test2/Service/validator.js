
import { checkSchema, validationResult } from "express-validator";
import { databaseUnit } from "../Database/database.js"
export const validator = (schema) => {
  return async (req, res, next) => {
    await schema.run(req)
    const error = validationResult(req).mapped();
    if (Object.values(error).length > 0) {
      next(error);
    }
    next();
  }
}

export const validateRegister = validator(checkSchema({
  username: {
    errorMessage: 'Invalid username',
    isEmail: false,
    custom: {
      options: async (value, { req }) => {
        const isExist = await databaseUnit.user().findOne({ username: value })
        console.log(isExist);
        if (isExist) {
          throw new Error("already username")
        }
        else { return true; }

      }
    }
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
  },
  confirm_pass: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
    custom: {
      options: (value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Error Pass")
        }
        return true;
      }
    }
  }
}, ["body"]))

export const validateGetme = validator(checkSchema({
  authorization: {
    custom: {
      options: (value, { req }) => {
        if (value == req.headers.authorization) {
          return true;
        }
        else {
          throw new Error("Error : access key is wrong")
        }
      }
    }
  },
}, ["body"]));



export const validateLogin = validator(checkSchema({
  username: {
    errorMessage: 'Invalid username',
    isEmail: false,
    custom: {
      options: async (value, { req }) => {
        const isExist = await databaseUnit.user().findOne({ username: value });

        if (isExist) {

          return true;
        }
        else { throw new Error("Error: USERNAME"); }

      }
    }
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
    custom: {
      options: async (value, { req }) => {
        const unitLogin = await databaseUnit.user().findOne({ username: req.body.username });

        if (unitLogin.password == value) {

          return true;
        }
        else { throw new Error("Error: PASSWORD"); }

      }
    }
  },
}, ["body"]))