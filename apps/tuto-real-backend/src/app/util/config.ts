import {Storage} from '@google-cloud/storage'
const path = require('path')

const serviceKey = './apps/tuto-real-backend/src/app/util/key.json'


console.log(serviceKey)
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'vimsbin',
})

module.exports = storage