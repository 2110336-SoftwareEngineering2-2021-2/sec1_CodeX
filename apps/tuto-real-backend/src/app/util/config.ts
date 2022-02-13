import {Storage} from '@google-cloud/storage'
import {mailKey} from '../../../../../key/mailKey'



import {google} from 'googleapis'
const serviceKey = './key/CloudKey.json'


const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'codex-340110',
})

const oAuth2Client = new google.auth.OAuth2(mailKey.CLIENT_ID,mailKey.CLIENT_SECRET,mailKey.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:mailKey.REFRESH_TOKEN})
module.exports = { storage , oAuth2Client,mailKey}