import {Storage} from '@google-cloud/storage'
import uuid from 'uuid';
const gc = require('./config');

const BUCKETNAME = "vimsbin"

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
    return blob.save(buffer)
    .then(() => {
        return `https://storage.googleapis.com/${bucket.name}/${type}/${fileName}`
   
    })
    .catch(error => {
        return error
  
        // Error handling...
    });
  }
  /*const { originalname, buffer,mimetype } = buf

}


    const blobStream = blob.createWriteStream( {metadata: {
        contentType: req.file.mimetype
      }})

    console.log( `https://storage.googleapis.com/${bucket.name}/${blob.name}`)

    blobStream.on('finish', () => {
        
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  

  

   uploadFileToGCSPromise = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    console.log(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
    blobStream.on('finish', () => {
        
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  })
}


export const uploadFiles = async (files) => {
    console.log(gc)
    const googleStorage = new GoogleStorage(BUCKETNAME)
    console.log(files)
    let promises = []
    files.forEach(file => {
        promises.push(googleStorage.uploadFileToGCSPromise(file))
    })
    console.log("promise",promises)
    Promise.all(promises)
        .then(result => {
            console.log("result" ,result)
        return result
        })
        .catch(error => {
        return error
        })


}

*/