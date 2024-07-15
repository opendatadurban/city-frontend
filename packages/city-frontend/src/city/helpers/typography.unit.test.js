const { compileSassString } = require('@city-frontend/helpers/tests')
const { outdent } = require('outdent')
const { sassNull } = require('sass-embedded')

// Create a mock warn function that we can use to override the native @warn
// function, that we can make assertions about post-render.
const mockWarnFunction = jest.fn().mockReturnValue(sassNull)

const sassConfig = {
  logger: {
    warn: mockWarnFunction
  }
}

const sassBootstrap = `
  $city-breakpoints: (
    desktop: 30em
  );

  $city-typography-scale: (
    12: (
      null: (
        font-size: 12px,
        line-height: 15px
      ),
      print: (
        font-size: 14pt,
        line-height: 1.5
      )
    ),
    14: (
      null: (
        font-size: 12px,
        line-height: 15px
      ),
      desktop: (
        font-size: 14px,
        line-height: 20px
      )
    ),
    16: (
      null: (
        font-size: 14px,
        line-height: 15px
      ),
      desktop: (
        font-size: 16px,
        line-height: 20px
      ),
      deprecation: (
        key: "test-key",
        message: "This point on the scale is deprecated."
      )
    )
  );

  @import "base";
`

describe('@mixin city-typography-common', () => {
  it('should output a @font-face declaration by default', async () => {
    const sass = `
      @import "settings";
      @import "helpers";

      :root {
        @include city-typography-common;
      }
      :root {
        @include city-typography-common($font-family: Helvetica);
      }
    `

    const results = compileSassString(sass)

    await expect(results).resolves.toMatchObject({
      css: expect.stringContaining('@font-face')
    })

    await expect(results).resolves.toMatchObject({
      css: expect.stringContaining('font-family: "Montserrat"')
    })
  })

  it('should not output a @font-face declaration when the user has changed their font', async () => {
    const sass = `
      $city-font-family: Helvetica, Arial, sans-serif;
      $city-font-family-tabular: monospace;
      @import "settings";
      @import "helpers";

      :root {
        @include city-typography-common;
      }
      :root {
        @include city-typography-common($font-family: $city-font-family-tabular);
      }
    `

    const results = compileSassString(sass)

    await expect(results).resolves.toMatchObject({
      css: expect.not.stringContaining('@font-face')
    })

    await expect(results).resolves.toMatchObject({
      css: expect.not.stringContaining('font-family: "GDS Transport"')
    })
  })

  it('should not output a @font-face declaration when the user has turned off this feature', async () => {
    const sass = `
      $city-include-default-font-face: false;
      @import "settings";
      @import "helpers";

      :root {
        @include city-typography-common;
      }
      :root {
        @include city-typography-common($font-family: Helvetica);
      }
    `

    const results = compileSassString(sass)

    await expect(results).resolves.toMatchObject({
      css: expect.not.stringContaining('@font-face')
    })

    await expect(results).resolves.toMatchObject({
      css: expect.stringContaining('font-family: "GDS Transport"')
    })
  })
})

describe('@mixin city-font-tabular-numbers', () => {
  it('enables tabular numbers opentype feature flags', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-tabular-numbers;
      }
    `

    const results = compileSassString(sass)

    await expect(results).resolves.toMatchObject({
      css: expect.stringContaining('font-variant-numeric: tabular-nums;')
    })
  })

  it('marks font-variant-numeric as important if $important is set to true', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-tabular-numbers($important: true);
      }
    `

    const results = compileSassString(sass)

    await expect(results).resolves.toMatchObject({
      css: expect.stringContaining(
        'font-variant-numeric: tabular-nums !important;'
      )
    })
  })
})

describe('@function _city-line-height', () => {
  it('preserves line-height if already unitless', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _city-line-height($line-height: 3.141, $font-size: 20px);
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          line-height: 3.141;
        }
      `
    })
  })

  it('preserves line-height if using different units', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _city-line-height($line-height: 2em, $font-size: 20px);
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          line-height: 2em;
        }
      `
    })
  })

  it('converts line-height to a relative number', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _city-line-height($line-height: 30px, $font-size: 20px);
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          line-height: 1.5;
        }
      `
    })
  })
})

describe('@mixin city-font-size', () => {
  it('outputs CSS with suitable media queries', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-size($size: 14)
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          font-size: 0.75rem;
          line-height: 1.25;
        }
        @media (min-width: 30em) {
          .foo {
            font-size: 0.875rem;
            line-height: 1.4285714286;
          }
        }
      `
    })
  })

  it('outputs CSS with suitable media queries for print', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-size($size: 12)
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          font-size: 0.75rem;
          line-height: 1.25;
        }
        @media print {
          .foo {
            font-size: 14pt;
            line-height: 1.5;
          }
        }
      `
    })
  })

  it('outputs CSS when passing size as a string', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-size($size: "14")
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          font-size: 0.75rem;
          line-height: 1.25;
        }
        @media (min-width: 30em) {
          .foo {
            font-size: 0.875rem;
            line-height: 1.4285714286;
          }
        }
      `
    })
  })

  it('outputs CSS using points as strings', async () => {
    const sass = `
      $city-breakpoints: (
        desktop: 30em
      );

      $city-typography-scale: (
        "small": (
          null: (
            font-size: 12px,
            line-height: 15px
          ),
          print: (
            font-size: 14pt,
            line-height: 1.5
          )
        )
      );

      @import "base";

      .foo {
        @include city-font-size($size: "small")
      }
    `

    await expect(compileSassString(sass)).resolves.toMatchObject({
      css: outdent`
        .foo {
          font-size: 0.75rem;
          line-height: 1.25;
        }
        @media print {
          .foo {
            font-size: 14pt;
            line-height: 1.5;
          }
        }
      `
    })
  })

  it('throws an exception when passed a size that is not in the scale', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-size(3.1415926536)
      }
    `

    await expect(compileSassString(sass, sassConfig)).rejects.toThrow(
      'Unknown font size `3.1415926536` - expected a point from the type scale.'
    )
  })

  it('throws a deprecation warning if a point on the scale is deprecated', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include city-font-size($size: 16)
      }
    `

    await compileSassString(sass, sassConfig)

    // Expect our mocked @warn function to have been called once with a single
    // argument, which should be the deprecation notice
    expect(mockWarnFunction.mock.calls[0]).toEqual(
      expect.arrayContaining([
        'This point on the scale is deprecated. To silence this warning, update $city-suppressed-warnings with key: "test-key"'
      ])
    )
  })

  describe('when $important is set to true', () => {
    it('marks font size and line height as important', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font-size($size: 14, $important: true);
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: outdent`
          .foo {
            font-size: 0.75rem !important;
            line-height: 1.25 !important;
          }
          @media (min-width: 30em) {
            .foo {
              font-size: 0.875rem !important;
              line-height: 1.4285714286 !important;
            }
          }
        `
      })
    })

    it('marks font-size and line-height as important for print media', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font-size($size: 12, $important: true);
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: outdent`
          .foo {
            font-size: 0.75rem !important;
            line-height: 1.25 !important;
          }
          @media print {
            .foo {
              font-size: 14pt !important;
              line-height: 1.5 !important;
            }
          }
        `
      })
    })
  })

  describe('when $line-height is set', () => {
    it('overrides the line height', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font-size($size: 14, $line-height: 21px);
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: outdent`
          .foo {
            font-size: 0.75rem;
            line-height: 1.75;
          }
          @media (min-width: 30em) {
            .foo {
              font-size: 0.875rem;
              line-height: 1.5;
            }
          }
        `
      })
    })
  })

  describe('@mixin city-font', () => {
    it('outputs all required typographic CSS properties', async () => {
      const sass = `
        // Avoid font face being output in tests
        $city-include-default-font-face: false;
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: outdent`
          .foo {
            font-family: "GDS Transport", arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-weight: 400;
            font-size: 0.75rem;
            line-height: 1.25;
          }
          @media print {
            .foo {
              font-family: sans-serif;
            }
          }
          @media (min-width: 30em) {
            .foo {
              font-size: 0.875rem;
              line-height: 1.4285714286;
            }
          }
        `
      })
    })

    it('enables tabular numbers opentype feature flags if $tabular: true', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14, $tabular: true)
        }
      `

      const results = compileSassString(sass)

      await expect(results).resolves.toMatchObject({
        css: expect.stringContaining('font-variant-numeric: tabular-nums;')
      })
    })

    it('sets font-size based on $size', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font($size: 12)
        }
      `

      const results = compileSassString(sass)

      await expect(results).resolves.toMatchObject({
        css: expect.stringContaining('font-size: 0.75rem')
      })

      await expect(results).resolves.toMatchObject({
        css: expect.not.stringContaining('font-size: 0.875rem')
      })
    })

    it('does not output font-size if $size: false', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-font($size: false)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('font-size')
      })
    })

    it('sets font-weight based on $weight', async () => {
      const sass = `
        // Avoid font face being output in tests
        $city-include-default-font-face: false;
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14, $weight: bold)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.stringContaining('font-weight: 700')
      })
    })

    it('does not output font-weight if $weight: false', async () => {
      const sass = `
        // Avoid font face being output in tests
        $city-include-default-font-face: false;
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14, $weight: false)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('font-weight')
      })
    })

    it('ignores undefined font-weights', async () => {
      const sass = `
        // Avoid font face being output in tests
        $city-include-default-font-face: false;
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14, $weight: superdupermegabold)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.not.stringContaining('font-weight')
      })
    })

    it('sets line-height based on $line-height', async () => {
      const sass = `
        // Avoid font face being output in tests
        $city-include-default-font-face: false;
        ${sassBootstrap}

        .foo {
          @include city-font($size: 14, $line-height: 1.337)
        }
      `

      await expect(compileSassString(sass)).resolves.toMatchObject({
        css: expect.stringContaining('line-height: 1.337;')
      })
    })
  })

  // city-typography-responsive is the previous, deprecated version of city-font-size
  describe('@mixin city-typography-responsive', () => {
    it('outputs the same CSS as city-font-size', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-typography-responsive(
            $size: 14,
            $override-line-height: 40px,
            $important: true
          )
        }
      `

      const expectedSass = `
        ${sassBootstrap}

        .foo {
          @include city-font-size(
            $size: 14,
            $line-height: 40px,
            $important: true
          )
        }
      `

      await expect(compileSassString(sass, sassConfig)).resolves.toMatchObject({
        css: (await compileSassString(expectedSass)).css
      })
    })

    it('throws a deprecation warning if city-typography-responsive is used', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include city-typography-responsive($size: 14)
        }
      `

      await compileSassString(sass, sassConfig)

      // Expect our mocked @warn function to have been called once with a single
      // argument, which should be the deprecation notice
      expect(mockWarnFunction.mock.calls[0]).toEqual(
        expect.arrayContaining([
          'city-typography-responsive is deprecated. Use city-font-size instead. ' +
            'To silence this warning, update $city-suppressed-warnings with key: ' +
            '"city-typography-responsive"'
        ])
      )
    })
  })
})
