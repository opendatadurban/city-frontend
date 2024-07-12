const { render } = require('@city-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@city-frontend/helpers/tests')
const { getExamples } = require('@city-frontend/lib/components')

describe('Phase banner', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('phase-banner')
  })

  describe('by default', () => {
    it('allows additional classes to be added to the component', () => {
      const $ = render('phase-banner', examples.classes)

      const $component = $('.city-phase-banner')
      expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
    })

    it('renders banner text', () => {
      const $ = render('phase-banner', examples.text)
      const phaseBannerText = $('.city-phase-banner__text').text().trim()

      expect(phaseBannerText).toBe(
        'This is a new service – your feedback will help us to improve it'
      )
    })

    it('allows body text to be passed whilst escaping HTML entities', () => {
      const $ = render('phase-banner', examples['html as text'])

      const phaseBannerText = $('.city-phase-banner__text').html().trim()
      expect(phaseBannerText).toBe(
        'This is a new service - your &lt;a href="#" class="city-link"&gt;feedback&lt;/a&gt; will help us to improve it.'
      )
    })

    it('allows body HTML to be passed un-escaped', () => {
      const $ = render('phase-banner', examples.default)

      const phaseBannerText = $('.city-phase-banner__text').html().trim()
      expect(phaseBannerText).toBe(
        'This is a new service - your <a href="#" class="city-link">feedback</a> will help us to improve it.'
      )
    })

    it('allows additional attributes to be added to the component', () => {
      const $ = render('phase-banner', examples.attributes)

      const $component = $('.city-phase-banner')
      expect($component.attr('first-attribute')).toBe('foo')
      expect($component.attr('second-attribute')).toBe('bar')
    })
  })

  describe('with dependant components', () => {
    it('renders the tag component text', () => {
      const $ = render('phase-banner', examples.default)

      expect(
        htmlWithClassName($, '.city-phase-banner__content__tag')
      ).toMatchSnapshot()
    })

    it('renders the tag component html', () => {
      const $ = render('phase-banner', examples['tag html'])

      expect(
        htmlWithClassName($, '.city-phase-banner__content__tag')
      ).toMatchSnapshot()
    })

    it('renders the tag component classes', () => {
      const $ = render('phase-banner', examples['tag classes'])

      expect(
        htmlWithClassName($, '.city-phase-banner__content__tag')
      ).toMatchSnapshot()
    })
  })
})
