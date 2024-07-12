const { compileSassString } = require('@city-frontend/helpers/tests')
const { outdent } = require('outdent')

describe('@function image-url', () => {
  it('by default concatenates the image path and the filename', async () => {
    const sass = `
      @import "tools/image-url";

      $city-images-path: '/path/to/images/';

      .foo {
        background-image: city-image-url("baz.png");
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          background-image: url("/path/to/images/baz.png");
        }
      `
    })
  })

  it('can be overridden to use a defined Sass function', async () => {
    const sass = `
      @import "tools/image-url";

      $city-image-url-function: 'to-upper-case';

      .foo {
        background-image: city-image-url("baz.png");
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          background-image: "BAZ.PNG";
        }
      `
    })
  })

  it('can be overridden to use a custom function', async () => {
    const sass = `
      @import "tools/image-url";

      @function custom-url-handler($filename) {
        @return url("/custom/#{$filename}");
      }

      $city-images-path: '/assets/fonts/';
      $city-image-url-function: 'custom-url-handler';

      .foo {
        background-image: city-image-url("baz.png");
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          background-image: url("/custom/baz.png");
        }
      `
    })
  })
})
