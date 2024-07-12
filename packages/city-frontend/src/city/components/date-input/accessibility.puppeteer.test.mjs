import { axe, render } from '@city-frontend/helpers/puppeteer'
import { getExamples } from '@city-frontend/lib/components'

describe('/components/date-input', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('date-input')

      for (const exampleName in examples) {
        await render(page, 'date-input', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
