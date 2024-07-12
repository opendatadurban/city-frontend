import { browser } from '@city-frontend/tasks'
import gulp from 'gulp'

import * as build from './tasks/build/index.mjs'
import { options } from './tasks/build/options.mjs'
import { scripts, styles, watch } from './tasks/index.mjs'

/**
 * Build target tasks
 */
gulp.task('build', build.dist(options))
gulp.task('dev', build.dev(options))

/**
 * Utility tasks
 */
gulp.task('scripts', scripts(options))
gulp.task('styles', styles(options))
gulp.task('watch', watch(options))

/**
 * Screenshots task
 * Sends screenshots to Percy for visual regression testing
 */
gulp.task('screenshots', browser.screenshots)
