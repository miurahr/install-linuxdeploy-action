# Development memo

## Contribution

As usual, you are eelcome to send Pull-Request for improvements!

## Release process

Github actions in Javascript/Typescript need spcecial treatment for release.

1. `git checkout releases`
2. `git merge  master`
3.  run `npm install`
4. `git add node_modules`
5. `git commit`
6.  git push`releases` branch to github
5.  put release tag `v1.x.x`
6.  git rebase `v1` branch
7.  git push v1 to github