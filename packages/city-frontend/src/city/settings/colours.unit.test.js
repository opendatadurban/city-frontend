const { compileSassString } = require('@city-frontend/helpers/tests')

describe('Organisation colours', () => {
  it('should define websafe colours that meet contrast requirements', async () => {
    const sass = `
      @import "settings/colours-palette";
      @import "settings/colours-organisations";
      @import "settings/colours-applied";
      @import "helpers/colour";

      @import "sass-color-helpers/stylesheets/color-helpers";

      $minimum-contrast: 4.5;

      @each $organisation in map-keys($city-colours-organisations) {

        $colour: city-organisation-colour($organisation);
        $contrast: ch-color-contrast($city-body-background-colour, $colour);

        @if ($contrast < $minimum-contrast) {
          @error "Contrast ratio for #{$organisation} too low."
          + " #{$colour} on #{$city-body-background-colour} has a contrast of: #{$contrast}."
          + " Must be higher than #{$minimum-contrast} for WCAG AA support.";
        }
      }
    `

    await expect(compileSassString(sass)).resolves.not.toThrow()
  })
})
