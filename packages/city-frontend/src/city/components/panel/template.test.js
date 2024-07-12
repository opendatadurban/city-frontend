const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Panel', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('panel')
  })

  describe('default example', () => {
    it('renders title text', () => {
      const $ = render('panel', examples.default)
      const panelTitle = $('.city-panel__title').text().trim()

      expect(panelTitle).toBe('Application complete')
    })

    it('renders title as h1 (as the default heading level)', () => {
      const $ = render('panel', examples.default)
      const panelTitleHeadingLevel = $('.city-panel__title')[0].name

      expect(panelTitleHeadingLevel).toBe('h1')
    })

    it('renders body text', () => {
      const $ = render('panel', examples.default)
      const panelBodyText = $('.city-panel__body').text().trim()

      expect(panelBodyText).toBe('Your reference number: HDJ2123F')
    })

    it('doesnt render panel body if no body text is passed', () => {
      const $ = render('panel', examples['title with no body text'])
      const panelBody = $('.city-panel__body').length

      expect(panelBody).toBeFalsy()
    })
  })

  describe('custom options', () => {
    it('allows title text to be passed whilst escaping HTML entities', () => {
      const $ = render('panel', examples['title html as text'])

      const panelTitle = $('.city-panel__title').html().trim()
      expect(panelTitle).toBe(
        'Application &lt;strong&gt;not&lt;/strong&gt; complete'
      )
    })

    it('renders title as specified heading level', () => {
      const $ = render('panel', examples['custom heading level'])
      const panelTitleHeadingLevel = $('.city-panel__title')[0].name

      expect(panelTitleHeadingLevel).toBe('h2')
    })

    it('allows title HTML to be passed un-escaped', () => {
      const $ = render('panel', examples['title html'])

      const panelTitle = $('.city-panel__title').html().trim()
      expect(panelTitle).toBe('Application <strong>not</strong> complete')
    })

    it('renders nested components using `call`', () => {
      const $ = render('panel', {
        callBlock: '<div class="app-nested-component"></div>'
      })

      expect($('.city-panel .app-nested-component').length).toBeTruthy()
    })

    it('allows body text to be passed whilst escaping HTML entities', () => {
      const $ = render('panel', examples['body html as text'])

      const panelBodyText = $('.city-panel__body').html().trim()
      expect(panelBodyText).toBe(
        'Your reference number&lt;br&gt;&lt;strong&gt;HDJ2123F&lt;/strong&gt;'
      )
    })

    it('allows body HTML to be passed un-escaped', () => {
      const $ = render('panel', examples['body html'])

      const panelBodyText = $('.city-panel__body').html().trim()
      expect(panelBodyText).toBe(
        'Your reference number<br><strong>HDJ2123F</strong>'
      )
    })

    it('allows additional classes to be added to the component', () => {
      const $ = render('panel', examples.classes)

      const $component = $('.city-panel')
      expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
    })

    it('allows additional attributes to be added to the component', () => {
      const $ = render('panel', examples.attributes)

      const $component = $('.city-panel')
      expect($component.attr('first-attribute')).toBe('foo')
      expect($component.attr('second-attribute')).toBe('bar')
    })
  })
})
