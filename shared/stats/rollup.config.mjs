import { dirname, join, parse } from 'path'

import { paths } from '@city-frontend/config'
import { packageTypeToPath } from '@city-frontend/lib/names'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'rollup'
import { visualizer } from 'rollup-plugin-visualizer'

import { modulePaths, packageOptions } from './src/index.mjs'

// Locate GOV.UK Frontend
const packagePath = packageTypeToPath('city-frontend', packageOptions)

/**
 * Rollup config with stats output
 */
export default defineConfig(
  modulePaths.map(
    (modulePath) =>
      /** @satisfies {import('rollup').RollupOptions} */ ({
        input: packageTypeToPath('city-frontend', {
          ...packageOptions,
          modulePath
        }),

        /**
         * Output options
         */
        output: {
          file: join('dist', modulePath),
          format: 'es',
          sourcemap: true,

          /**
           * Output plugins
           *
           * Note: File sizes in both Rollup stats and the Review app are
           * smaller than GOV.UK Frontend GitHub releases because classes,
           * functions and export names are mangled by Terser defaults
           *
           * {@link file://./../../packages/city-frontend/rollup.release.config.mjs}
           */
          plugins: [
            terser({
              // Allow Terser to remove @preserve comments
              format: { comments: false },

              // Include sources content from source maps to inspect
              // GOV.UK Frontend and other dependencies' source code
              sourceMap: {
                includeSources: true
              },

              // Compatibility workarounds
              safari10: true
            })
          ]
        },

        /**
         * Input plugins
         */
        plugins: [
          resolve({ rootDir: paths.stats }),

          // Stats: File size
          visualizer({
            emitFile: true,
            filename: `${parse(modulePath).name}.yaml`,
            projectRoot: dirname(packagePath),
            template: 'list',

            // Skip sourcemaps to use original file sizes
            sourcemap: false
          }),

          // Stats: File size (minified)
          visualizer({
            emitFile: true,
            filename: `${parse(modulePath).name}.min.yaml`,
            projectRoot: dirname(packagePath),
            template: 'list',

            // Use sourcemaps to calculate minified sizes
            sourcemap: true
          }),

          // Stats: Module tree map
          visualizer({
            emitFile: true,
            filename: `${parse(modulePath).name}.html`,
            projectRoot: dirname(packagePath),
            template: 'treemap',

            // Use sourcemaps to calculate minified sizes
            sourcemap: true
          })
        ]
      })
  )
)
