const { join } = require('path')

const { paths } = require('@city-frontend/config')
const { compileSassFile } = require('@city-frontend/helpers/tests')
const { getListing } = require('@city-frontend/lib/files')

describe('Components', () => {
  let sassFiles

  beforeAll(async () => {
    sassFiles = await getListing('**/src/city/components/**/*.scss', {
      cwd: paths.package,
      ignore: ['**/_all.scss', '**/_index.scss']
    })
  })

  describe('Sass render', () => {
    it('renders CSS for all components', () => {
      const file = join(paths.package, 'src/city/components/_index.scss')

      return expect(compileSassFile(file)).resolves.toMatchObject({
        css: expect.any(String),
        loadedUrls: expect.arrayContaining([expect.any(URL)])
      })
    })

    it('renders CSS for each component', () => {
      const sassTasks = sassFiles.map((sassFilePath) => {
        const file = join(paths.package, sassFilePath)

        return expect(compileSassFile(file)).resolves.toMatchObject({
          css: expect.any(String),
          loadedUrls: expect.arrayContaining([expect.any(URL)])
        })
      })

      return Promise.all(sassTasks)
    })
  })
})
