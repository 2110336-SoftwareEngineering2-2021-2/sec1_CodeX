import * as mongoose from 'mongoose';


export const imgSchema = new mongoose.Schema({
        data : Buffer , 
        name : String , 
        type : String
      });
      