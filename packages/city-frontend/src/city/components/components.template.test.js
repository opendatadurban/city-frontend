const { join } = require('path')

const { paths } = require('@city-frontend/config')
const {
  getComponentsFixtures,
  getComponentNames,
  nunjucksEnv,
  render
} = require('@city-frontend/lib/components')
const validatorConfig = require('city-frontend/.htmlvalidate.js')
const { HtmlValidate } = require('html-validate')
const { outdent } = require('outdent')

describe('Components', () => {
  let nunjucksEnvCustom
  let nunjucksEnvDefault

  let componentNames

  beforeAll(async () => {
    // Create a new Nunjucks environment that uses the `src/city` directory as
    // its first search path, rather than default to `src` (no 'city' prefix)
    nunjucksEnvCustom = nunjucksEnv([join(paths.package, 'src/city')])
    nunjucksEnvDefault = nunjucksEnv()

    // Components list
    componentNames = await getComponentNames()
  })

  describe('Nunjucks environment', () => {
    it('renders template for each component', () => {
      return Promise.all(
        componentNames.map((componentName) =>
          expect(() => {
            nunjucksEnvDefault.render(
              `city/components/${componentName}/template.njk`,
              {}
            )
          }).not.toThrow()
        )
      )
    })

    it('renders template for each component (different base path)', () => {
      return Promise.all(
        componentNames.map((componentName) =>
          expect(() => {
            nunjucksEnvCustom.render(
              `components/${componentName}/template.njk`,
              {}
            )
          }).not.toThrow()
        )
      )
    })
  })

  describe('Nunjucks HTML validation', () => {
    const validator = new HtmlValidate(validatorConfig)

    it('renders valid HTML for each component example', async () => {
      const componentsFixtures = await getComponentsFixtures()

      // Validate component examples
      for (const { component: componentName, fixtures } of componentsFixtures) {
        const fixtureTasks = fixtures.map(async (fixture) => {
          const html = outdent`
            ${render(componentName, {
              context: fixture.options,
              fixture
            })}

            <!--
              Target for references in examples (e.g. aria-controls)
              https://html-validate.org/rules/no-missing-references.html
            -->
            <div id="test-target-element"></div>
          `

          // Validate HTML
          return expect({
            componentName,
            exampleName: fixture.name,
            report: await validator.validateString(html)
          }).toEqual({
            componentName,
            exampleName: fixture.name,
            report: expect.objectContaining({ valid: true })
          })
        })

        // Validate all component examples in parallel
        await Promise.all(fixtureTasks)
      }
    }, 30000)
  })
})
