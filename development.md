# Development memo

## Contribution

As usual, you are eelcome to send Pull-Request for improvements!

## Release process

Github actions in Javascript/Typescript need spcecial treatment for release.

1. `git checkout releases`
2. git merge -m 'merge master into releases' master
3. run `npm install`
4. run `npm install typescript`
5. run `npm install webpack`
6. run `npm install @vercel/ncc`
7. run `npm run release`
8. git add action.yml dist/ -f
9. git commit -sm 'Update release'
10.  git push`releases` branch to github
11.  put release tag `v1.x.x`
12.  git rebase `v1` branch
13.  git push v1 to github
