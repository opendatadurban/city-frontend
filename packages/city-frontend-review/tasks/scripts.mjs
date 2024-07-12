import { join } from 'path'

import { scripts, task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * JavaScripts task (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const compile = (options) =>
  gulp.series(
    task.name('compile:js', () =>
      scripts.compile('**/*.mjs', {
        ...options,

        srcPath: join(options.srcPath, 'javascripts'),
        destPath: join(options.destPath, 'javascripts'),
        configPath: join(options.basePath, 'rollup.config.mjs')
      })
    )
  )
