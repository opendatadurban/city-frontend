## Application architecture

- `bin/`

  Binary/executable files (i.e. bash scripts) mainly used in the [publishing process](/docs/releasing/publishing.md).

- `dist/` **contains auto-generated files**

  Standalone builds of city-frontend. Provides a way to consume city-frontend without using npm.

- `docs/`

  Documentation files.

- `packages/`

  - `city-frontend-review/`

    [Express.js](https://github.com/expressjs/express) review app [deployed to Heroku](https://city-frontend-review.herokuapp.com) with configuration in [app.json](/app.json) and [Procfile](/Procfile).

    - `dist/` **contains auto-generated files**

      Builds of city-frontend-review served by [Express.js](https://github.com/expressjs/express).

    - `src/`

      Source files for component previews and examples.

    - `tasks/`

      Read about [npm and Gulp tasks](tasks.md) or list workspace specific Gulp tasks using:

      ```shell
      npx --workspace @city-frontend/review -- gulp --tasks
      ```

  - `city-frontend/`

    Package published on npm.
    Consume all of city-frontend through a single package.

    - `dist/` **contains auto-generated files**

      Builds of city-frontend published and exported from the npm package.

    - `src/`

      Source files. See [README.md](/packages/city-frontend/src/README.md) in the src directory for details.

    - `tasks/`

      Read about [npm and Gulp tasks](tasks.md) or list workspace specific Gulp tasks using:

      ```shell
      npx --workspace city-frontend -- gulp --tasks
      ```

- `shared/`

  Shared packages used by tests, build tools and the [review app](/packages/city-frontend-review).

  - `config/`

    Configuration files for common paths and port numbers.

  - `helpers/`

    [Jest](https://github.com/facebook/jest) and development helpers.

  - `lib/`

    Shared libraries for directory listings, component data, naming conventions.

  - `stats/`

    File size measurement and module breakdown of built files

  - `tasks/`

    Read about [npm and Gulp tasks](tasks.md) for more information about the tasks.
