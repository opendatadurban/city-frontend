import { join, relative } from 'path'

import { paths } from '@city-frontend/config'

/**
 * Default build paths
 *
 * @type {import('@city-frontend/tasks').TaskOptions}
 */
export const options = {
  basePath: paths.package,
  srcPath: join(paths.package, 'src'),
  destPath: join(paths.package, 'dist'),
  workspace: relative(paths.root, paths.package)
}

/**
 * Customised build paths by target
 */
export const targets = {
  release: { ...options, destPath: join(paths.root, 'dist') },
  package: options
}
