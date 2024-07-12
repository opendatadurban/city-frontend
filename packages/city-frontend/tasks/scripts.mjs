import { join, resolve } from 'path'

import { pkg } from '@city-frontend/config'
import { configs, scripts, task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * JavaScripts task (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Compile GOV.UK Frontend JavaScript for component entry points
     */
    task.name("compile:js 'components'", () =>
      scripts.compile('**/components/*/!(*.test).mjs', {
        ...options,

        srcPath: join(options.srcPath, 'city'),
        destPath: join(options.destPath, 'city'),
        configPath: join(options.basePath, 'rollup.publish.config.mjs')
      })
    ),

    /**
     * Compile GOV.UK Frontend JavaScript for main entry point only
     */
    task.name("compile:js 'entry'", () =>
      scripts.compile('**/all.mjs', {
        ...options,

        srcPath: join(options.srcPath, 'city'),
        destPath: join(options.destPath, 'city'),
        configPath: join(options.basePath, 'rollup.publish.config.mjs')
      })
    ),

    /**
     * Compile GOV.UK Frontend JavaScript (minified) for main entry point only
     */
    task.name("compile:js 'minified'", () =>
      scripts.compile('**/all.mjs', {
        ...options,

        srcPath: join(options.srcPath, 'city'),
        destPath: join(options.destPath, 'city'),
        configPath: join(options.basePath, 'rollup.release.config.mjs'),

        // Rename using package name and `*.min.js` extension due to
        // web server ES module `*.mjs` Content-Type header support
        filePath({ dir, name }) {
          return join(dir, `${name.replace(/^all/, pkg.name)}.min.js`)
        }
      })
    ),

    /**
     * Compile GOV.UK Prototype Kit config
     */
    task.name("compile:js 'city-prototype-kit'", () =>
      configs.compile('city-prototype-kit.config.mjs', {
        srcPath: join(options.srcPath, 'city-prototype-kit'),
        destPath: resolve(options.destPath, '../') // Top level (not dist) for compatibility
      })
    )
  )
