# GOV.UK Frontend stats

This package is used to generate Rollup visualizer stats for built GOV.UK Frontend modules.

It can also generate file size information for key distribution files.

```shell
npm run build:stats --workspace city-frontend
```

Stats are shown in the review app [deployed to Heroku](https://city-frontend-review.herokuapp.com) or when run locally using `npm start`.

## Stats for previous version

GOV.UK Frontend is resolved from [./packages/city-frontend](../../packages/city-frontend/) unless a previous version is installed locally:

```shell
npm install city-frontend@4.7.0 --save --workspace @city-frontend/stats
```
