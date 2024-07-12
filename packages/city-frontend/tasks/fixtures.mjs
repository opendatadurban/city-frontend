import { components, task } from '@city-frontend/tasks'
import gulp from 'gulp'

/**
 * Component fixtures and macro options (for watch)
 *
 * @type {import('@city-frontend/tasks').TaskFunction}
 */
export const compile = (options) =>
  gulp.series(
    /**
     * Generate GOV.UK Frontend fixtures.json from ${componentName}.yaml
     */
    task.name('compile:fixtures', () =>
      components.generateFixtures('**/*.yaml', options)
    ),

    /**
     * Generate GOV.UK Frontend macro-options.json from ${componentName}.yaml
     */
    task.name('compile:macro-options', () =>
      components.generateMacroOptions('**/*.yaml', options)
    )
  )
