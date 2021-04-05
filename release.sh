#!/bin/bash
git checkout releases
git merge master
npm install
npm run build
npm i -g @vercel/ncc
ncc build lib/main.js --license license.txt
git add action.yml dist/index.js
git commit -sm 'Update release'
git push origin releases
