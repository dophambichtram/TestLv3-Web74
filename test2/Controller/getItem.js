import { databaseUnit } from "../Database/database.js"

export const getItem= async (req,res)=>{
    
    if(Object.keys(req.query).length>0)
    {
        const itemList= await databaseUnit.order().find({quantity:{$lt:+req.query.quantity}}).toArray();
        console.log(itemList);
        if(itemList){
            return res.json({itemList})
        }
    }
    else{
        const itemList= await databaseUnit.inventory().find().toArray();
        
        if(itemList){
            return res.json({itemList})
        }
    }
   
}
export const getItemOrder=async (req,res)=>{
 
    const dex= await databaseUnit.order().aggregate([
        {
          '$match': {}
        }, {
          '$lookup': {
            'from': 'inventory', 
            'localField': 'item', 
            'foreignField': 'sku', 
            'as': 'description'
          }
        }
      ]).toArray();
      console.log(dex);
    return res.json(dex)
}