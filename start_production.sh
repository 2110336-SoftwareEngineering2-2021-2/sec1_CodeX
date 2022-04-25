#!/bin/sh

# NODE_ENV=production node dist/apps/tuto-real-backend/main.js &
cd dist/apps/tuto-real-frontend/
# ../../../node_modules/.bin/webpack start -p 4200 &
../../../node_modules/.bin/serve -l 4200  &
# npm install -D webpack-cli &
echo "Started TutoReal Frontend"
cd ../../../
