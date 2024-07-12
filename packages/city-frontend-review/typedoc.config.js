const { join, relative } = require('path')

const { paths } = require('@city-frontend/config')
const {
  packageResolveToPath,
  packageNameToPath
} = require('@city-frontend/lib/names')
const slash = require('slash')

const basePath = join(packageNameToPath('city-frontend'), 'src')
const workspacePath = slash(relative(paths.root, basePath))
const { HEROKU_APP, HEROKU_BRANCH = 'main' } = process.env

/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  disableGit: !!HEROKU_APP,
  emit: 'both',
  name: 'city-frontend',
  sourceLinkTemplate: HEROKU_APP
    ? `https://github.com/alphagov/city-frontend/blob/${HEROKU_BRANCH}/${workspacePath}/{path}#L{line}`
    : `https://github.com/alphagov/city-frontend/blob/{gitRevision}/{path}#L{line}`,

  // Configure paths
  basePath,
  entryPoints: [packageResolveToPath('city-frontend/src/city/all.mjs')],
  tsconfig: packageResolveToPath('city-frontend/tsconfig.build.json'),
  out: './dist/docs/jsdoc',

  // Turn off strict checks for JSDoc output
  // since `lint:types` will already log issues
  compilerOptions: {
    strict: false
  },

  // Ignore known undocumented types (@internal, @private etc)
  intentionallyNotExported: ['I18n', 'TranslationPluralForms']
}
