const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Details', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('details')
  })

  it('renders a details element', () => {
    const $ = render('details', examples.default)

    const $component = $('.city-details')
    expect($component.get(0).tagName).toBe('details')
  })

  it('renders with a custom id', () => {
    const $ = render('details', examples.id)

    const $component = $('.city-details')
    expect($component.attr('id')).toBe('my-details-element')
  })

  it('is collapsed by default', () => {
    const $ = render('details', examples.default)

    const $component = $('.city-details')
    expect($component.attr('open')).toBeFalsy()
  })

  it('can be opened by default', () => {
    const $ = render('details', examples.expanded)

    const $component = $('.city-details')
    expect($component.attr('open')).toBeTruthy()
  })

  it('includes a nested summary', () => {
    const $ = render('details', examples.default)

    // Look for the summary element _within_ the details element
    const $summary = $('.city-details .city-details__summary')
    expect($summary.get(0).tagName).toBe('summary')
  })

  it('renders nested components using `call`', () => {
    const $ = render('details', {
      callBlock: '<div class="app-nested-component"></div>'
    })

    expect($('.city-details .app-nested-component').length).toBeTruthy()
  })

  it('allows text to be passed whilst escaping HTML entities', () => {
    const $ = render('details', examples['html as text'])

    const detailsText = $('.city-details__text').html().trim()
    expect(detailsText).toBe('More about the greater than symbol (&gt;)')
  })

  it('allows HTML to be passed un-escaped', () => {
    const $ = render('details', examples.html)

    const detailsText = $('.city-details__text').html().trim()
    expect(detailsText).toBe('More about <b>bold text</b>')
  })

  it('allows summary text to be passed whilst escaping HTML entities', () => {
    const $ = render('details', examples['summary html as text'])

    const detailsText = $('.city-details__summary-text').html().trim()
    expect(detailsText).toBe('The greater than symbol (&gt;) is the best')
  })

  it('allows summary HTML to be passed un-escaped', () => {
    const $ = render('details', examples['summary html'])

    const detailsText = $('.city-details__summary-text').html().trim()
    expect(detailsText).toBe('Use <b>bold text</b> sparingly')
  })

  it('allows additional classes to be added to the details element', () => {
    const $ = render('details', examples.classes)

    const $component = $('.city-details')
    expect($component.hasClass('some-additional-class')).toBeTruthy()
  })

  it('allows additional attributes to be added to the details element', () => {
    const $ = render('details', examples.attributes)

    const $component = $('.city-details')
    expect($component.attr('data-some-data-attribute')).toBe('i-love-data')
    expect($component.attr('another-attribute')).toBe('foo')
  })
})
