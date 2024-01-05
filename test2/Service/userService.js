
import { User } from "../Schema/userSchema.js";
import { databaseUnit } from "../Database/database.js";
import { registerHash } from "./hashService.js";
 class UserService{
    async register(payload){
        payload.password= await registerHash( toString(payload.password));
        console.log(payload.password);
        const result= await databaseUnit.users().insertOne(new User(payload))
        return 1
    }
}
export const userService= new UserService();