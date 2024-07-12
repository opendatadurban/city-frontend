import { axe, render } from '@city-frontend/helpers/puppeteer'
import { getExamples } from '@city-frontend/lib/components'

describe('/components/tag', () => {
  let axeRules

  beforeAll(() => {
    axeRules = {
      /**
       * Ignore 'Element has insufficient color contrast' for WCAG Level AAA
       *
       * Affects '.city-tag--green' tag
       */
      'color-contrast-enhanced': { enabled: false }
    }
  })

  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('tag')

      for (const exampleName in examples) {
        await render(page, 'tag', examples[exampleName])
        await expect(axe(page, axeRules)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
