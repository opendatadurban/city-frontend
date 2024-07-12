const { compileSassString } = require('@city-frontend/helpers/tests')

describe('$city-include-default-font-face', () => {
  it('is true if $city-font-family is default', async () => {
    const sass = `
      @import "settings/typography-font";
      :root {
        --result: #{$city-include-default-font-face}
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('--result: true')
    })
  })

  it('is true if $city-font-family includes GDS Transport', async () => {
    const sass = `
      $city-font-family: "GDS Transport", "Comic Sans MS", "Comic Sans", cursive;
      @import "settings/typography-font";
      :root {
        --result: #{$city-include-default-font-face}
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('--result: true')
    })
  })

  it('is false if $city-font-family does not include GDS Transport', async () => {
    const sass = `
      $city-font-family: "Comic Sans MS", "Comic Sans", cursive;
      @import "settings/typography-font";
      :root {
        --result: #{$city-include-default-font-face}
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('--result: false')
    })
  })
})
