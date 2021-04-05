#!/bin/bash
git checkout releases
git merge master
npm install
npm i -g @vercel/ncc
ncc build lib/main.js --license license.txt
git add dist
