const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Label', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('label')
  })

  describe('by default', () => {
    it('renders a label element', () => {
      const $ = render('label', examples.default)

      const $component = $('.city-label')
      expect($component.get(0).tagName).toBe('label')
    })

    it('does not output anything if no html or text is provided', () => {
      const $ = render('label', examples.empty)

      const $component = $('.city-label')

      expect($component).toHaveLength(0)
    })

    it('allows additional classes to be added to the component', () => {
      const $ = render('label', examples.classes)

      const $component = $('.city-label')
      expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
    })

    it('renders label text', () => {
      const $ = render('label', examples.default)
      const labelText = $('.city-label').text().trim()

      expect(labelText).toBe('National Insurance number')
    })

    it('allows label text to be passed whilst escaping HTML entities', () => {
      const $ = render('label', examples['html as text'])

      const labelText = $('.city-label').html().trim()
      expect(labelText).toBe(
        'National Insurance number, &lt;em&gt;NINO&lt;/em&gt;'
      )
    })

    it('allows label HTML to be passed un-escaped', () => {
      const $ = render('label', examples.html)

      const labelText = $('.city-label').html().trim()
      expect(labelText).toBe('National Insurance number <em>NINO</em>')
    })

    it('renders for attribute if specified', () => {
      const $ = render('label', examples.for)

      const labelForAttr = $('.city-label').attr('for')
      expect(labelForAttr).toBe('test-target-element')
    })

    it('can be nested inside an H1 using isPageHeading', () => {
      const $ = render('label', examples['as page heading l'])

      const $selector = $('h1 > .city-label')
      expect($selector.length).toBeTruthy()
    })

    it('allows additional attributes to be added to the component', () => {
      const $ = render('label', examples.attributes)

      const $component = $('.city-label')
      expect($component.attr('first-attribute')).toBe('foo')
      expect($component.attr('second-attribute')).toBe('bar')
    })
  })
})
