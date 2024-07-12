const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('fieldset', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('fieldset')
  })

  it('creates a fieldset', () => {
    const $ = render('fieldset', examples.default)

    const $component = $('fieldset.city-fieldset')
    expect($component.get(0).tagName).toContain('fieldset')
  })

  it('includes a legend element which captions the fieldset', () => {
    const $ = render('fieldset', examples.default)

    const $legend = $('.city-fieldset__legend')
    expect($legend.get(0).tagName).toBe('legend')
  })

  it('nests the legend within the fieldset', () => {
    const $ = render('fieldset', examples.default)

    const $legend = $('.city-fieldset__legend')
    expect($legend.parent().get(0).tagName).toBe('fieldset')
  })

  it('allows you to set the legend text', () => {
    const $ = render('fieldset', examples.default)

    const $legend = $('.city-fieldset__legend')
    expect($legend.text().trim()).toBe('What is your address?')
  })

  it('allows you to set the aria-describedby attribute', () => {
    const $ = render('fieldset', examples['with describedBy'])

    const $component = $('.city-fieldset')
    expect($component.attr('aria-describedby')).toBe('test-target-element')
  })

  it('escapes HTML in the text argument', () => {
    const $ = render('fieldset', examples['html as text'])

    const $legend = $('.city-fieldset__legend')
    expect($legend.html()).toContain('&lt;b&gt;your&lt;/b&gt;')
  })

  it('does not escape HTML in the html argument', () => {
    const $ = render('fieldset', examples.html)

    const $legend = $('.city-fieldset__legend')
    expect($legend.html()).toContain('<b>your</b>')
  })

  it('nests the legend text in an H1 if the legend is a page heading', () => {
    const $ = render('fieldset', examples['as page heading l'])

    const $headingInsideLegend = $('.city-fieldset__legend > h1')
    expect($headingInsideLegend.text().trim()).toBe('What is your address?')
  })

  it('renders html when passed as fieldset content', () => {
    const $ = render('fieldset', examples['html fieldset content'])

    expect($('.city-fieldset .my-content').text().trim()).toBe(
      'This is some content to put inside the fieldset'
    )
  })

  it('renders nested components using `call`', () => {
    const $ = render('fieldset', {
      callBlock: '<div class="app-nested-component"></div>'
    })

    expect($('.city-fieldset .app-nested-component').length).toBeTruthy()
  })

  it('can have additional classes on the legend', () => {
    const $ = render('fieldset', examples['legend classes'])

    const $legend = $('.city-fieldset__legend')
    expect($legend.hasClass('my-custom-class')).toBeTruthy()
  })

  it('can have additional classes on the fieldset', () => {
    const $ = render('fieldset', examples.classes)

    const $component = $('.city-fieldset')
    expect($component.hasClass('app-fieldset--custom-modifier')).toBeTruthy()
  })

  it('can have an explicit role', () => {
    const $ = render('fieldset', examples.role)

    const $component = $('.city-fieldset')
    expect($component.attr('role')).toBe('group')
  })

  it('can have additional attributes', () => {
    const $ = render('fieldset', examples.attributes)

    const $component = $('.city-fieldset')
    expect($component.attr('data-attribute')).toBe('value')
  })
})
