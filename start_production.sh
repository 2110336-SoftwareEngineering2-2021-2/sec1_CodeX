#!/bin/sh

NODE_ENV=production node dist/apps/tuto-real-backend/main.js &
cd dist/apps/tuto-real-frontend/
# ../../../node_modules/.bin/serve -l 4200  &
../../../node_modules/.bin/pm2 serve ./ 4200 --spa  &
echo "Started TutoReal Frontend using pm2"
cd ../../../
