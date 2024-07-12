import { join } from 'path'

import { pkg } from '@city-frontend/config'
import { styles, task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * Stylesheets task (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Compile GOV.UK Frontend Sass
     */
    task.name('compile:scss', () =>
      styles.compile('all.scss', {
        ...options,

        srcPath: join(options.srcPath, 'city'),
        destPath: join(options.destPath, 'city'),
        configPath: join(options.basePath, 'postcss.config.mjs'),

        // Rename using package name and `*.min.css` extension
        filePath({ dir }) {
          return join(dir, `${pkg.name}.min.css`)
        }
      })
    ),

    /**
     * Apply CSS prefixes to GOV.UK Frontend Sass
     */
    task.name('postcss:scss', () =>
      styles.compile('**/*.scss', {
        ...options,

        srcPath: join(options.srcPath, 'city'),
        destPath: join(options.destPath, 'city'),
        configPath: join(options.basePath, 'postcss.config.mjs')
      })
    ),

    /**
     * Apply CSS prefixes to GOV.UK Prototype Kit Sass
     */
    task.name("postcss:scss 'city-prototype-kit'", () =>
      styles.compile('init.scss', {
        ...options,

        srcPath: join(options.srcPath, 'city-prototype-kit'),
        destPath: join(options.destPath, 'city-prototype-kit'),
        configPath: join(options.basePath, 'postcss.config.mjs')
      })
    )
  )
