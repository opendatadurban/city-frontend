const { join } = require('path')

const { paths, urls } = require('@city-frontend/config')
const { packageTypeToPath } = require('@city-frontend/lib/names')

// Resolve GOV.UK Frontend from review app `node_modules`
// to allow previous versions to be installed locally
const frontendPath = packageTypeToPath('city-frontend', {
  modulePath: '/',
  moduleRoot: paths.app
})

/**
 * Browsersync config
 *
 * @satisfies {import('browser-sync').Options}
 */
module.exports = {
  proxy: urls.app,

  // Prevent browser mirroring
  ghostMode: false,

  // Prevent browser opening
  open: false,

  // Allow for Express.js restart
  reloadDelay: 1000,

  // Files to watch for auto reload
  files: [
    join(paths.app, 'dist/javascripts/**/*.mjs'),
    join(paths.app, 'dist/stylesheets/**/*.css'),
    join(paths.app, 'src/views/**/*.njk'),
    join(frontendPath, 'assets/**/*'),
    join(frontendPath, 'city-frontend.min.js'),
    join(frontendPath, '**/*.njk')
  ],
  ignore: ['**/*.test.*'],

  /**
   * Browser URL paths (e.g. `/javascripts`) are mapped to multiple
   * Browsersync watch directories and static asset middleware in:
   *
   * {@link file://./src/common/middleware/assets.mjs}
   */
  serveStatic: [
    {
      route: '/assets',
      dir: [join(frontendPath, 'assets')]
    },
    {
      route: '/javascripts',
      dir: [frontendPath, join(paths.app, 'dist/javascripts')]
    },
    {
      route: '/stylesheets',
      dir: [frontendPath, join(paths.app, 'dist/stylesheets')]
    }
  ]
}
