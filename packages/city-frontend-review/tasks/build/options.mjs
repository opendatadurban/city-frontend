import { join, relative } from 'path'

import { paths } from '@city-frontend/config'

/**
 * Default build paths
 *
 * @type {import('@city-frontend/tasks').TaskOptions}
 */
export const options = {
  basePath: paths.app,
  srcPath: join(paths.app, 'src'),
  destPath: join(paths.app, 'dist'),
  workspace: relative(paths.root, paths.app)
}
