import { Storage } from '@google-cloud/storage';

const serviceKey = './key/CloudKey.json';

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'codex-340110',
});

module.exports = { storage };
