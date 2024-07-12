import { axe, render } from '@city-frontend/helpers/puppeteer'
import { getExamples } from '@city-frontend/lib/components'

describe('/components/character-count', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('character-count')

      for (const exampleName in examples) {
        await render(page, 'character-count', examples[exampleName])
          // Log errors for invalid examples
          .catch(({ message }) => console.warn(message))

        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
