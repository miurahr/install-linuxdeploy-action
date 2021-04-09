#!/bin/bash
git checkout releases
git merge -m 'merge master into releases' master
npm install
npm install -g typescript
npm install -g webpack
npm install -g @vercel/ncc
npm run all
git add action.yml dist/
git commit -sm 'Update release'
git push origin releases
