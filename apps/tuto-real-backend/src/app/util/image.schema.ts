import * as mongoose from 'mongoose';


export const imgSchema = new mongoose.Schema({
        fileName : String , 
        url : String
      });
      