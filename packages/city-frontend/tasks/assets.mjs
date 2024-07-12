import { task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * Copy City Frontend assets (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const assets = (options) =>
  gulp.series(
    task.name('copy:assets', () =>
      gulp
        .src('city/assets/**/*', {
          base: options.srcPath,
          cwd: options.srcPath,
          encoding: false
        })
        .pipe(gulp.dest(options.destPath))
    )
  )
