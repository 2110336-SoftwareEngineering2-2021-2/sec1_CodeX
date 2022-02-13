import {Storage} from '@google-cloud/storage'

const uuid = require('uuid')
const gc = require('./config').storage
const oAuth= require('./config').oAuth2Client
const mailKey = require('./config').mailKey
const BUCKETNAME = "vimsbin"
const nodemailer = require('nodemailer')
const bucket = gc.bucket('codex_img') 

class GoogleStorage {
   
  storage: Storage
    bucketName: any
    bucket: any
  constructor(bucketName) {
    this.storage = new Storage({
      projectId:BUCKETNAME ,
      keyFilename: '../../../vimsbin-83bc4e46f463.json'
    })
    this.bucketName = bucketName
    this.bucket = this.storage.bucket(bucketName)
  }
}

export const uploadImage = async (type,file) => {
    const { originalname, buffer,mimetype } = file
    //type : 'Profile , Evidence'
    var fileName = uuid.v4()+"."+mimetype.split("/")[1]

    const blob = bucket.file(type+"/"+fileName)
    console.log(`https://storage.googleapis.com/${bucket.name}/${type}/${fileName}`)
    // Uploads the file.
    return blob.save(buffer)
    .then(() => {
        return `https://storage.googleapis.com/${bucket.name}/${type}/${fileName}`
   
    })
    .catch(error => {
        return error
  
        // Error handling...
    });
}


export const uploadImageBy64 = async (type:String,base64:String) => {
  var mimetype
  switch(base64.charAt(0)) {
    case '/':
      mimetype = ".jpg"
      break;
    case 'i':
      mimetype = ".png"
      break;
    case 'R':
      mimetype = ".gif"
    default:
      mimetype = ".webp"
      // code block
  }
  var buffer = Buffer.from(base64, 'base64');
  var fileName = uuid.v4()+mimetype

    const blob = bucket.file(type+"/"+fileName)
    console.log(`https://storage.googleapis.com/${bucket.name}/${type}/${fileName}`)
    // Uploads the file.
    return blob.save(buffer,{metadata: {
      cacheControl: "public, max-age=60" // 1 minute caching
   }})
    .then(() => {
        return `https://storage.googleapis.com/${bucket.name}/${type}/${fileName}`
   
    })
    .catch(error => {
        return error
    });
  }

  export const deleteImg = async (fileName,type)=>{
    return await gc.bucket(bucket.name).file(`${type}/${fileName}`).delete();
  }
  

  export const sendMail = async ()=> {
    try {
      const accessToken = await oAuth.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'thisisfinebackend@gmail.com',
          clientId: mailKey.CLIENT_ID,
          clientSecret: mailKey.CLIENT_SECRET,
          refreshToken: mailKey.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'CodeX <thisisfinebackend@gmail.com>',
        to: 'sorasit789@gmail.com',
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }