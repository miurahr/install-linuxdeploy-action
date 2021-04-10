#!/bin/bash
npm install -g typescript
npm install -g webpack
npm install -g @vercel/ncc
git checkout releases
git merge -m 'merge master into releases' master
npm run release
git add action.yml dist/ -f
git commit -sm 'Update release'
