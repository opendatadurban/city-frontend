import { axe, render } from '@city-frontend/helpers/puppeteer'
import { getExamples } from '@city-frontend/lib/components'

describe('/components/panel', () => {
  describe('component examples', () => {
    it('passes accessibility tests', async () => {
      const examples = await getExamples('panel')

      for (const exampleName in examples) {
        await render(page, 'panel', examples[exampleName])
        await expect(axe(page)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
