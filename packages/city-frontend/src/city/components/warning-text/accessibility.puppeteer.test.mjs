import { axe, render } from '@city-frontend/helpers/puppeteer'
import { getExamples } from '@city-frontend/lib/components'

describe('/components/warning-text', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('warning-text')

      for (const exampleName in examples) {
        await render(page, 'warning-text', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
