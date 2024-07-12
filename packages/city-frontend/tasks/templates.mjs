import { task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * Copy GOV.UK Frontend template files (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const templates = (options) =>
  gulp.series(
    task.name('copy:templates', () =>
      gulp
        .src('city/**/*.{md,njk}', {
          base: options.srcPath,
          cwd: options.srcPath
        })
        .pipe(gulp.dest(options.destPath))
    )
  )
