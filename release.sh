#!/bin/bash
git checkout releases
git merge -m 'merge master into releases' master
npm install
npm install -g webpack
npm install -g @vercel/ncc
ncc build lib/main.js --license license.txt
git add action.yml dist/index.js
git commit -sm 'Update release'
git push origin releases
