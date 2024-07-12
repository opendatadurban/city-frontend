const { compileSassString } = require('@city-frontend/helpers/tests')
const { outdent } = require('outdent')

describe('@mixin city-exports', () => {
  it('will only output a named section once', async () => {
    const sass = `
      @import "tools/exports";

      @include city-exports(foo) {
        .foo {
          color: red;
        }
      }

      @include city-exports(foo) {
        .foo {
          color: blue;
        }
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          color: red;
        }
      `
    })
  })

  it('will export differently named sections', async () => {
    const sass = `
      @import "tools/exports";

      @include city-exports(foo) {
        .foo {
          color: red;
        }
      }

      @include city-exports(bar) {
        .bar {
          color: blue;
        }
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          color: red;
        }

        .bar {
          color: blue;
        }
      `
    })
  })
})
