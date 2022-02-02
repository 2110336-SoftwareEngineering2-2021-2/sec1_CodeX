import {Storage} from '@google-cloud/storage'
const path = require('path')

const serviceKey = `D:\\program\\se\\sec1_CodeX\\apps\\tuto-real-backend\\src\\app\\util\\key.json`



const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'vimsbin',
})

module.exports = storage