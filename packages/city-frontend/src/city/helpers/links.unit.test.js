const { compileSassString } = require('@city-frontend/helpers/tests')

describe('@mixin city-link-decoration', () => {
  it('sets text-decoration-thickness', async () => {
    const sass = `
      $city-link-underline-thickness: 1px;
      @import "base";

      .foo {
        @include city-link-decoration;
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('text-decoration-thickness: 1px;')
    })
  })

  it('sets text-underline-offset', async () => {
    const sass = `
      $city-link-underline-offset: .1em;
      @import "base";

      .foo {
        @include city-link-decoration;
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('text-underline-offset: 0.1em;')
    })
  })

  describe('when $city-link-underline-thickness is falsy', () => {
    it('does not set text-decoration-thickness', async () => {
      const sass = `
        $city-link-underline-thickness: false;
        @import "base";

        .foo {
          @include city-link-decoration;
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('text-decoration-thickness')
      })
    })
  })

  describe('when $city-link-underline-offset is falsy', () => {
    it('does not set text-decoration-offset', async () => {
      const sass = `
      $city-link-underline-offset: false;
      @import "base";

      .foo {
          @include city-link-decoration;
      }
    `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('text-underline-offset')
      })
    })
  })
})

describe('@mixin city-link-hover-decoration', () => {
  it('sets a hover state', async () => {
    const sass = `
      @import "base";

      .foo:hover {
        @include city-link-hover-decoration;
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: expect.stringContaining('.foo:hover')
    })
  })

  describe('when $city-link-hover-underline-thickness is falsy', () => {
    it('does not set a hover state', async () => {
      const sass = `
      $city-link-hover-underline-thickness: false;
      @import "base";

      // The mixin shouldn't return anything, so this selector ends up empty and
      // is omitted from the CSS
      .foo:hover {
          @include city-link-hover-decoration;
      }
    `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('.foo:hover')
      })
    })
  })
})

describe('@mixin city-link-style-text', () => {
  describe('when $city-text-colour is a colour', () => {
    it('applies the rgba function', async () => {
      const sass = `
        $city-text-colour: black;
        @import "base";

        a {
            @include city-link-style-text;
        }
      `

      const results = compileSassString(sass)

      await expect(results).resolves.toMatchObject({
        css: expect.stringContaining(':hover')
      })

      await expect(results).resolves.toMatchObject({
        css: expect.stringContaining('color:')
      })

      await expect(results).resolves.toMatchObject({
        css: expect.stringContaining('rgba(')
      })
    })
  })

  describe('when $city-text-colour is inherit', () => {
    it('does NOT apply the rgba function', async () => {
      const sass = `
        $city-text-colour: inherit;
        @import "base";

        a {
            @include city-link-style-text;
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('rgba(')
      })
    })
  })
})
