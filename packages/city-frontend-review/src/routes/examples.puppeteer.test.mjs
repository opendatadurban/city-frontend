import { join } from 'path'

import { paths } from '@city-frontend/config'
import { getProperty, goTo } from '@city-frontend/helpers/puppeteer'
import { getDirectories } from '@city-frontend/lib/files'

describe('Other examples', () => {
  it('should load correctly', async () => {
    const exampleNames = await getDirectories(
      join(paths.app, 'src/views/examples')
    )

    // Exclude examples with known errors
    const exampleNamesFiltered = exampleNames.filter(
      (exampleName) => !['javascript-errors'].includes(exampleName)
    )

    // Check the page responded correctly
    for (const exampleName of exampleNamesFiltered) {
      await goTo(page, `/examples/${exampleName}`)

      // Find title text
      const $title = await page.$('title')
      const titleText = await getProperty($title, 'textContent')

      // Check for matching title
      expect(titleText).toMatch(/GOV.UK/)
    }
  })
})
