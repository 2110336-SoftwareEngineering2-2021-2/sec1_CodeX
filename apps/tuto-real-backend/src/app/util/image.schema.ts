import * as mongoose from 'mongoose';


export const ImgSchema = new mongoose.Schema({
        fileName : String , 
        url : String
      });
      