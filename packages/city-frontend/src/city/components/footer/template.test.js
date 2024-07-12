const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('footer', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('footer')
  })

  it('renders attributes correctly', () => {
    const $ = render('footer', examples.attributes)

    const $component = $('.city-footer')
    expect($component.attr('data-test-attribute')).toBe('value')
    expect($component.attr('data-test-attribute-2')).toBe('value-2')
  })

  it('renders classes', () => {
    const $ = render('footer', examples.classes)

    const $component = $('.city-footer')
    expect($component.hasClass('app-footer--custom-modifier')).toBeTruthy()
  })

  it('renders custom container classes', () => {
    const $ = render('footer', examples['with container classes'])

    const $component = $('.city-footer')
    const $container = $component.find('.city-width-container')

    expect($container.hasClass('app-width-container')).toBeTruthy()
  })

  describe('meta', () => {
    it('renders heading', () => {
      const $ = render('footer', examples['with meta'])

      const $component = $('.city-footer')
      const $heading = $component.find('h2.city-visually-hidden')
      expect($heading.text()).toBe('Items')
    })

    it('renders default heading when none supplied', () => {
      const $ = render('footer', examples['with empty meta'])

      const $component = $('.city-footer')
      const $heading = $component.find('h2.city-visually-hidden')
      expect($heading.text()).toBe('Support links')
    })

    it("doesn't render footer link list when no items are provided", () => {
      const $ = render('footer', examples['with empty meta items'])

      expect($('.city-footer__inline-list')).toHaveLength(0)
    })

    it('renders links', () => {
      const $ = render('footer', examples['with meta'])

      const $list = $('ul.city-footer__inline-list')
      const $items = $list.find('li.city-footer__inline-list-item')
      const $firstItem = $items.find('a.city-footer__link:first-child')
      expect($items).toHaveLength(3)
      expect($firstItem.attr('href')).toBe('#1')
      expect($firstItem.text()).toContain('Item 1')
    })

    it('renders custom meta text', () => {
      const $ = render('footer', examples['with custom meta'])

      const $custom = $('.city-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders custom meta html as text', () => {
      const $ = render('footer', examples['meta html as text'])

      const $custom = $('.city-footer__meta-custom')
      expect($custom.text()).toContain(
        'GOV.UK Prototype Kit <strong>v7.0.1</strong>'
      )
    })

    it('renders custom meta html', () => {
      const $ = render('footer', examples['with meta html'])

      const $custom = $('.city-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders attributes on meta links', () => {
      const $ = render('footer', examples['with meta item attributes'])

      const $metaLink = $('.city-footer__meta .city-footer__link')
      expect($metaLink.attr('data-attribute')).toBe('my-attribute')
      expect($metaLink.attr('data-attribute-2')).toBe('my-attribute-2')
    })
  })

  describe('navigation', () => {
    it('no items displayed when no item array is provided', () => {
      const $ = render('footer', examples['with empty navigation'])

      expect($('.city-footer__navigation')).toHaveLength(0)
    })

    it('renders headings', () => {
      const $ = render('footer', examples['with navigation'])

      const $firstSection = $('.city-footer__section:first-child')
      const $lastSection = $('.city-footer__section:last-child')
      const $firstHeading = $firstSection.find('h2.city-footer__heading')
      const $lastHeading = $lastSection.find('h2.city-footer__heading')
      expect($firstHeading.text()).toBe('Two column list')
      expect($lastHeading.text()).toBe('Single column list')
    })

    it('renders lists of links', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.city-footer__list')
      const $items = $list.find('li.city-footer__list-item')
      const $firstItem = $items.find('a.city-footer__link:first-child')
      expect($items).toHaveLength(9)
      expect($firstItem.attr('href')).toBe('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders attributes on links', () => {
      const $ = render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.city-footer__list .city-footer__link')
      expect($navigationLink.attr('data-attribute')).toBe('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toBe('my-attribute-2')
    })

    it('renders lists in columns', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.city-footer__list')
      expect($list.hasClass('city-footer__list--columns-2')).toBeTruthy()
    })

    it('renders one-column section full width by default', () => {
      const $ = render(
        'footer',
        examples['with default width navigation (one column)']
      )

      const $section = $('.city-footer__section')
      expect($section.hasClass('city-grid-column-full')).toBeTruthy()
    })

    it('renders two-column section full width by default', () => {
      const $ = render(
        'footer',
        examples['with default width navigation (two columns)']
      )

      const $section = $('.city-footer__section')
      expect($section.hasClass('city-grid-column-full')).toBeTruthy()
    })

    it('renders section custom width when width specified', () => {
      const $ = render('footer', examples['with navigation'])

      const $section = $('.city-footer__section')
      expect($section.hasClass('city-grid-column-two-thirds')).toBeTruthy()
    })
  })

  describe('section break', () => {
    it('renders when there is a navigation', () => {
      const $ = render('footer', examples['with navigation'])

      const $sectionBreak = $('hr.city-footer__section-break')
      expect($sectionBreak.length).toBeTruthy()
    })

    it('renders nothing when there is only meta', () => {
      const $ = render('footer', examples['with meta'])

      const $sectionBreak = $('hr.city-footer__section-break')
      expect($sectionBreak.length).toBeFalsy()
    })
  })

  describe('content licence', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $licenceMessage = $('.city-footer__licence-description')
      expect($licenceMessage.text()).toContain('Open Government Licence v3.0')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render(
        'footer',
        examples['with custom text content licence and copyright notice']
      )

      const $licenceMessage = $('.city-footer__licence-description')
      expect($licenceMessage.text()).toContain(
        'Drwydded y Llywodraeth Agored v3.0'
      )
    })

    it('can be customised with `html` parameter', () => {
      const $ = render(
        'footer',
        examples['with custom HTML content licence and copyright notice']
      )

      const $licenceMessage = $('.city-footer__licence-description')
      expect($licenceMessage.html()).toContain(
        '<a class="city-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license">Drwydded y Llywodraeth Agored v3.0</a>'
      )
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $licenceMessage = $('.city-footer__licence-description')
      expect($licenceMessage.html()).toContain(
        '&lt;a class="city-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license"&gt;Drwydded y Llywodraeth Agored v3.0&lt;/a&gt;'
      )
    })
  })

  describe('crown copyright', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $copyrightMessage = $('.city-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Crown copyright')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render(
        'footer',
        examples['with custom text content licence and copyright notice']
      )

      const $copyrightMessage = $('.city-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Hawlfraint y Goron')
    })

    it('can be customised with `html` parameter', () => {
      const $ = render(
        'footer',
        examples['with custom HTML content licence and copyright notice']
      )

      const $copyrightMessage = $('.city-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain(
        '<span>Hawlfraint y Goron</span>'
      )
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $copyrightMessage = $('.city-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain(
        '&lt;span&gt;Hawlfraint y Goron&lt;/span&gt;'
      )
    })
  })
})
