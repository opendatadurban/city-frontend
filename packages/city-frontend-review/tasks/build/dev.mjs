import { npm } from '@city-frontend/tasks'
import gulp from 'gulp'

import { watch } from '../index.mjs'

/**
 * Dev task
 * Runs a sequence of tasks on start
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export default (options) =>
  gulp.parallel(
    npm.script('serve', [], options), // Express.js server using Nodemon
    npm.script('proxy', [], options), // Auto reloading proxy using Browsersync
    watch(options)
  )
