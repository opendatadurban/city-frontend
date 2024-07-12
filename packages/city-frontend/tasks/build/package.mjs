import { paths } from '@city-frontend/config'
import { npm, task } from '@city-frontend/tasks'
import gulp from 'gulp'

import { assets, fixtures, scripts, styles, templates } from '../index.mjs'

/**
 * Build package task
 * Prepare packages/city-frontend/dist folder for publishing
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export default (options) =>
  gulp.series(
    npm.script('clean', [], { basePath: paths.stats }),
    npm.script('clean:package', [], options),

    assets(options),
    fixtures(options),
    scripts(options),
    styles(options),
    templates(options),

    // Copy GOV.UK Prototype Kit JavaScript
    task.name("copy:files 'city-prototype-kit'", () =>
      gulp
        .src('city-prototype-kit/**/*.js', {
          base: options.srcPath,
          cwd: options.srcPath
        })
        .pipe(gulp.dest(options.destPath))
    )
  )
