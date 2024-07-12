import gulp from 'gulp'

import * as build from './tasks/build/index.mjs'
import { options, targets } from './tasks/build/options.mjs'
import {
  assets,
  fixtures,
  scripts,
  styles,
  templates,
  watch
} from './tasks/index.mjs'

/**
 * Build target tasks
 */
gulp.task('build:package', build.package(targets.package))
gulp.task('build:release', build.release(targets.release))
gulp.task('dev', build.dev(options))

/**
 * Utility tasks
 */
gulp.task('assets', assets(options))
gulp.task('fixtures', fixtures(options))
gulp.task('scripts', scripts(options))
gulp.task('styles', styles(options))
gulp.task('templates', templates(options))
gulp.task('watch', watch(options))
