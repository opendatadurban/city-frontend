# npm and Gulp tasks

This document describes the npm scripts that run the Express.js review app, and the Gulp tasks they trigger to build files, update the package, copy assets and watch for changes.

To run the Express.js review app without any tasks being triggered, see [Review app only](#review-app-only).

## npm script aliases

npm scripts are defined in `package.json`. These trigger a number of Gulp tasks.

**`npm start` will trigger `npm run dev` that will:**

- runs `npm run build`
- starts the review app, restarting when `.mjs`, `.json` or `.yaml` files change
- compile again when frontend `.mjs` and `.scss` files change

**`npm test` will do the following:**

- run Nunjucks macros tests
- run JavaScript tests on the review app
- run accessibility and HTML validation tests

**`npm run build` will do the following:**

- run tasks from `npm run build:package`
- run tasks from `npm run build:app`

**`npm run clean` will do the following:**

- clean the `./dist` folder from all workspaces

**`npm run build:app` will trigger `npm run build --workspace @city-frontend/review` that will:**

- clean the `./packages/city-frontend-review/dist` folder
- output files into `./packages/city-frontend-review/dist`
- copy fonts and images
- compile JavaScript and Sass, including documentation

**`npm run build:package` will do the following:**

- clean the `./packages/city-frontend/dist` folder
- output files into `./packages/city-frontend/dist`
- copy Sass files, applying Autoprefixer via PostCSS
- copy Nunjucks component template/macro files, including JSON configs
- copy GOV.UK Prototype Kit config files
- compile Sass to CSS
- compile JavaScript to ECMAScript (ES) modules
- compile JavaScript to Universal Module Definition (UMD) bundles
- compile Rollup build stats into `./shared/stats/dist`
- runs `npm run postbuild:package` (which will test the output is correct)

**`npm run build:release` will do the following:**

- clean the `./dist` folder
- output files into `./dist`
- copy fonts and images
- compile JavaScript and Sass
- append version number from `packages/city-frontend/package.json` to compiled JavaScript and CSS files
- runs `npm run postbuild:release` (which will test the output is correct)

**`npm run build:types` will do the following:**

- run the [TypeScript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to build type declarations for the GOV.UK Frontend package

To verify the types in all our JavaScript files, run `npm run lint:types`

## Gulp tasks

Project Gulp tasks are defined in [`gulpfile.mjs`](/gulpfile.mjs) and the [`tasks/`](/shared/tasks) folder.

Gulp tasks from npm workspaces (such as the review app) can be run as shown:

**`npx --workspace @city-frontend/review -- gulp --tasks`**

This will list out all available tasks for the review app.

GOV.UK Frontend package build Gulp tasks are defined in [`packages/city-frontend/gulpfile.mjs`](/packages/city-frontend/gulpfile.mjs) and the [`packages/city-frontend/tasks/`](/packages/city-frontend/tasks) folder.

**`npx --workspace city-frontend -- gulp --tasks`**

This will list out all available tasks for the GOV.UK Frontend package.

Review app Gulp tasks are defined in [`packages/city-frontend-review/gulpfile.mjs`](/packages/city-frontend-review/gulpfile.mjs) and the [`packages/city-frontend-review/tasks/`](/packages/city-frontend-review/tasks) folder.

**`npx --workspace @city-frontend/review -- gulp scripts`**

This task will:

- check JavaScript code quality via ESLint (`npm run lint:js`) (using JavaScript Standard Style)
- bundle JavaScript using Rollup into `./packages/city-frontend-review/dist/javascripts`

**`npx --workspace @city-frontend/review -- gulp styles`**

This task will:

- check Sass code quality via Stylelint (`npm run lint:scss`)
- compile Sass to CSS into `./packages/city-frontend-review/dist/stylesheets`

## Review app only

After building the project with `npm run build` the Express.js review app can be started with `npm start --workspace @city-frontend/review`. This prevents the Gulp tasks triggered by `npm start` from running.

## Bundler integration

After building the project with `npm run build`, you can verify that the `city-frontend` package will be consumed correctly by mainstream bundlers with `npm run <BUNDLER_NAME> --workspace @city-frontend/bundler-integrations` (where bundler name is one of `rollup`, `webpack` or `vite`).

This will use the specified bundler to compile both `.github/workflows/bundler-integrations/src/default.mjs` which is only importing one component, and `.github/workflows/bundler-integrations/src/initAll.mjs` which is importing and initialising all components via `initAll`. This helps us verify that [tree shaking] works as intended. The build output for both files is `.github/workflows/bundler-integrations/dist/<BUNDLER_NAME>/[name].js`. `default.js` should not contain the code of other components whilst `initAll.js` should contain the code for all the components.

You can also run `npm run build:all --workspace @city-frontend/bundler-integrations` to run all three bundlers in one go.

[tree shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
