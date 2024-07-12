import { join } from 'path'

import { paths } from '@city-frontend/config'

import {
  componentNameToClassName,
  componentNameToConfigName,
  componentNameToMacroName,
  packageResolveToPath,
  packageTypeToPath,
  packageNameToPath
} from './names.js'

describe('componentNameToClassName', () => {
  const components = [
    {
      name: 'button',
      className: 'Button'
    },
    {
      name: 'radios',
      className: 'Radios'
    },
    {
      name: 'skip-link',
      className: 'SkipLink'
    },
    {
      name: 'character-count',
      className: 'CharacterCount'
    }
  ]

  it.each(components)(
    "transforms component '$name' to class '$className'",
    ({ name, className }) => {
      expect(componentNameToClassName(name)).toBe(className)
    }
  )
})

describe('componentNameToConfigName', () => {
  const components = [
    {
      name: 'button',
      configName: 'button'
    },
    {
      name: 'radios',
      configName: 'radios'
    },
    {
      name: 'skip-link',
      configName: 'skipLink'
    },
    {
      name: 'character-count',
      configName: 'characterCount'
    }
  ]

  it.each(components)(
    "transforms component '$name' to class '$configName'",
    ({ name, configName }) => {
      expect(componentNameToConfigName(name)).toBe(configName)
    }
  )
})

describe('componentNameToMacroName', () => {
  const components = [
    {
      name: 'button',
      macroName: 'cityButton'
    },
    {
      name: 'radios',
      macroName: 'cityRadios'
    },
    {
      name: 'skip-link',
      macroName: 'citySkipLink'
    },
    {
      name: 'character-count',
      macroName: 'cityCharacterCount'
    }
  ]

  it.each(components)(
    "transforms component '$name' to macro '$macroName'",
    ({ name, macroName }) => {
      expect(componentNameToMacroName(name)).toBe(macroName)
    }
  )
})

describe('packageResolveToPath', () => {
  const packages = [
    {
      packageEntry: 'city-frontend/package.json',
      resolvedPath: join(paths.package, 'package.json')
    },
    {
      packageEntry: 'city-frontend/src/city/all.mjs',
      resolvedPath: join(paths.package, 'src/city/all.mjs')
    },
    {
      packageEntry: 'city-frontend/src/city/all.mjs',
      options: { modulePath: 'i18n.mjs' },
      resolvedPath: join(paths.package, 'src/city/i18n.mjs')
    },
    {
      packageEntry: 'city-frontend/src/city/all.mjs',
      options: { modulePath: 'components/accordion/accordion.mjs' },
      resolvedPath: join(
        paths.package,
        'src/city/components/accordion/accordion.mjs'
      )
    }
  ]

  it.each(packages)(
    "locates path for npm package entry '$packageEntry'",
    ({ packageEntry, options, resolvedPath }) => {
      expect(packageResolveToPath(packageEntry, options)).toBe(resolvedPath)
    }
  )
})

describe('packageTypeToPath', () => {
  const packages = [
    {
      packageName: 'city-frontend',
      resolvedPath: join(paths.package, 'dist/city/all.bundle.js')
    },
    {
      packageName: 'city-frontend',
      options: { type: 'module' },
      resolvedPath: join(paths.package, 'dist/city/all.mjs')
    },
    {
      packageName: 'city-frontend',
      options: { modulePath: 'i18n.mjs', type: 'module' },
      resolvedPath: join(paths.package, 'dist/city/i18n.mjs')
    },
    {
      packageName: 'city-frontend',
      options: { modulePath: 'components/accordion/accordion.bundle.js' },
      resolvedPath: join(
        paths.package,
        'dist/city/components/accordion/accordion.bundle.js'
      )
    },
    {
      packageName: 'city-frontend',
      options: {
        modulePath: 'components/accordion/accordion.bundle.mjs',
        type: 'module'
      },
      resolvedPath: join(
        paths.package,
        'dist/city/components/accordion/accordion.bundle.mjs'
      )
    }
  ]

  it.each(packages)(
    "locates path for npm package '$packageName' field '$packageField'",
    ({ packageName, options, resolvedPath }) => {
      expect(packageTypeToPath(packageName, options)).toBe(resolvedPath)
    }
  )
})

describe('packageNameToPath', () => {
  const packages = [
    {
      packageName: 'city-frontend',
      resolvedPath: paths.package
    },
    {
      packageName: '@city-frontend/review',
      resolvedPath: paths.app
    }
  ]

  it.each(packages)(
    "locates path for npm package '$packageName'",
    ({ packageName, resolvedPath }) => {
      expect(packageNameToPath(packageName)).toBe(resolvedPath)
    }
  )
})

describe("packageNameToPath (with custom 'node_module' paths)", () => {
  const packages = [
    {
      packageName: 'city-frontend',
      options: { moduleRoot: paths.root },
      resolvedPath: paths.package
    },
    {
      packageName: '@city-frontend/review',
      options: { moduleRoot: paths.root },
      resolvedPath: paths.app
    },
    {
      packageName: 'autoprefixer',
      options: { moduleRoot: paths.package },
      resolvedPath: join(paths.root, 'node_modules/autoprefixer')
    },
    {
      packageName: 'postcss',
      options: { moduleRoot: paths.app },
      resolvedPath: join(paths.root, 'node_modules/postcss')
    }
  ]

  it.each(packages)(
    "locates path for npm package '$packageName'",
    ({ packageName, options = {}, resolvedPath }) => {
      expect(packageNameToPath(packageName, options)).toBe(resolvedPath)
    }
  )
})
