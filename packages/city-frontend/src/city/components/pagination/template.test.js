const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Pagination', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('pagination')
  })

  describe('default examples', () => {
    it('renders the correct URLs for each link', () => {
      const $ = render('pagination', examples.default)
      const $previous = $('.city-pagination__prev .city-pagination__link')
      const $next = $('.city-pagination__next .city-pagination__link')
      const $firstNumber = $(
        '.city-pagination__item:first-child .city-pagination__link'
      )
      const $secondNumber = $(
        '.city-pagination__item:nth-child(2) .city-pagination__link'
      )
      const $thirdNumber = $(
        '.city-pagination__item:last-child .city-pagination__link'
      )

      expect($previous.attr('href')).toBe('/previous')
      expect($next.attr('href')).toBe('/next')
      expect($firstNumber.attr('href')).toBe('/page/1')
      expect($secondNumber.attr('href')).toBe('/page/2')
      expect($thirdNumber.attr('href')).toBe('/page/3')
    })

    it('renders the correct number within each pagination item', () => {
      const $ = render('pagination', examples.default)
      const $firstNumber = $('.city-pagination__item:first-child')
      const $secondNumber = $('.city-pagination__item:nth-child(2)')
      const $thirdNumber = $('.city-pagination__item:last-child')

      expect($firstNumber.text().trim()).toBe('1')
      expect($secondNumber.text().trim()).toBe('2')
      expect($thirdNumber.text().trim()).toBe('3')
    })

    // The current item is marked up with a visually hidden span and an aria-hidden span side by side
    // Instead of the aria-label solution used for the links in the pagination because of issues caused
    // by aria-label on non-interactive elements like li's
    it('marks up the current item correctly', () => {
      const $ = render('pagination', examples.default)
      const $currentNumber = $('.city-pagination__item--current')
      const $currentNumberLink = $currentNumber.find('.city-pagination__link')

      expect($currentNumberLink.attr('aria-current')).toBe('page')
    })

    it('marks up pagination items as ellipses when specified', () => {
      const $ = render('pagination', examples['with many pages'])
      const $firstEllipsis = $(
        '.city-pagination__item:nth-child(2).city-pagination__item--ellipses'
      )

      expect($firstEllipsis).toBeTruthy()
      // Test for the unicode character of &ctdot;
      expect($firstEllipsis.text().trim()).toBe('\u22ef')
    })
  })

  describe('with custom text, labels and landmarks', () => {
    it('renders a custom navigation landmark', () => {
      const $ = render(
        'pagination',
        examples['with custom navigation landmark']
      )
      const $nav = $('.city-pagination')

      expect($nav.attr('aria-label')).toBe('search')
    })

    it('renders custom pagination item and prev/next link text', () => {
      const $ = render('pagination', examples['with custom link and item text'])
      const $previous = $('.city-pagination__prev')
      const $next = $('.city-pagination__next')
      const $firstNumber = $('.city-pagination__item:first-child')
      const $secondNumber = $('.city-pagination__item:nth-child(2)')
      const $thirdNumber = $('.city-pagination__item:last-child')

      expect($previous.text().trim()).toBe('Previous page')
      expect($next.text().trim()).toBe('Next page')
      expect($firstNumber.text().trim()).toBe('one')
      expect($secondNumber.text().trim()).toBe('two')
      expect($thirdNumber.text().trim()).toBe('three')
    })

    it('renders custom accessible labels for pagination items', () => {
      const $ = render(
        'pagination',
        examples['with custom accessible labels on item links']
      )
      const $firstNumber = $(
        '.city-pagination__item:first-child .city-pagination__link'
      )
      const $secondNumber = $(
        '.city-pagination__item:nth-child(2) .city-pagination__link'
      )
      const $thirdNumber = $(
        '.city-pagination__item:last-child .city-pagination__link'
      )

      expect($firstNumber.attr('aria-label')).toBe('1st page')
      expect($secondNumber.attr('aria-label')).toBe(
        '2nd page (you are currently on this page)'
      )
      expect($thirdNumber.attr('aria-label')).toBe('3rd page')
    })
  })

  describe('previous and next links', () => {
    it('applies the correct rel attribute to each link so that they communicate to search engines the intent of the links', () => {
      const $ = render('pagination', examples.default)
      const $previous = $('.city-pagination__prev .city-pagination__link')
      const $next = $('.city-pagination__next .city-pagination__link')

      expect($previous.attr('rel')).toBe('prev')
      expect($next.attr('rel')).toBe('next')
    })

    it('sets aria-hidden="true" to each link so that they are ignored by assistive technology', () => {
      const $ = render('pagination', examples.default)
      const $previousSvg = $('.city-pagination__icon--prev')
      const $nextSvg = $('.city-pagination__icon--next')

      expect($previousSvg.attr('aria-hidden')).toBe('true')
      expect($nextSvg.attr('aria-hidden')).toBe('true')
    })

    it('sets focusable="false" so that IE does not treat it as an interactive element', () => {
      const $ = render('pagination', examples.default)
      const $previousSvg = $('.city-pagination__icon--prev')
      const $nextSvg = $('.city-pagination__icon--next')

      expect($previousSvg.attr('focusable')).toBe('false')
      expect($nextSvg.attr('focusable')).toBe('false')
    })
  })

  describe('prev/next only view', () => {
    it('changes the display to prev/next only if no items are provided', () => {
      const $ = render('pagination', examples['with prev and next only'])
      const $blockNav = $('.city-pagination--block')
      const $previous = $('.city-pagination__prev')
      const $next = $('.city-pagination__next')

      expect($blockNav).toBeTruthy()
      expect($previous).toBeTruthy()
      expect($next).toBeTruthy()
    })

    it('applies labels when provided', () => {
      const $ = render(
        'pagination',
        examples['with prev and next only and labels']
      )
      const $prevLabel = $(
        '.city-pagination__prev .city-pagination__link-label'
      )
      const $nextLabel = $(
        '.city-pagination__next .city-pagination__link-label'
      )

      expect($prevLabel.text()).toBe('Paying VAT and duty')
      expect($nextLabel.text()).toBe('Registering an imported vehicle')
    })

    // This is for when pagination is in block mode but there isn't a label
    // We apply a decoration class and add a hover state to the main link text instead
    // of the label so that there's a clear underline hover state on the link
    it('adds the decoration class to the link title if no label is present', () => {
      const $ = render('pagination', examples['with prev and next only'])
      const $decoratedPreviousLinkTitle = $(
        '.city-pagination__prev .city-pagination__link-title--decorated'
      )
      const $decoratedNextLinkTitle = $(
        '.city-pagination__next .city-pagination__link-title--decorated'
      )

      expect($decoratedPreviousLinkTitle).toBeTruthy()
      expect($decoratedNextLinkTitle).toBeTruthy()
    })
  })

  describe('custom classes and attributes', () => {
    it('renders with custom additional classes', () => {
      const $ = render('pagination', examples['with custom classes'])

      expect($('.city-pagination').hasClass('my-custom-class')).toBeTruthy()
    })

    it('renders with custom attributes', () => {
      const $ = render('pagination', examples['with custom attributes'])
      const $nav = $('.city-pagination')

      expect($nav.attr('data-attribute-1')).toBe('value-1')
      expect($nav.attr('data-attribute-2')).toBe('value-2')
    })
  })
})
