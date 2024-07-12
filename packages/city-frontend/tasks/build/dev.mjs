import gulp from 'gulp'

import { watch } from '../index.mjs'

/**
 * Dev task
 * Runs a sequence of tasks on start
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export default (options) => gulp.series(watch(options))
