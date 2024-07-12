const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')
const { indent } = require('nunjucks/src/filters')
const { outdent } = require('outdent')

describe('Notification-banner', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('notification-banner')
  })

  describe('default example', () => {
    it('aria-labelledby attribute matches the title id', () => {
      const $ = render('notification-banner', examples.default)
      const ariaAttr = $('.city-notification-banner').attr('aria-labelledby')
      const titleId = $('.city-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })

    it('has role=region attribute', () => {
      const $ = render('notification-banner', examples.default)
      const $component = $('.city-notification-banner')

      expect($component.attr('role')).toBe('region')
    })

    it('has data-module attribute to initialise JavaScript', () => {
      const $ = render('notification-banner', examples.default)
      const $component = $('.city-notification-banner')

      expect($component.attr('data-module')).toBe('city-notification-banner')
    })

    it('renders header container', () => {
      const $ = render('notification-banner', examples.default)
      const $header = $('.city-notification-banner__header')

      expect($header.length).toBeTruthy()
    })

    it('renders default heading level', () => {
      const $ = render('notification-banner', examples.default)
      const $title = $('.city-notification-banner__title')

      expect($title.get(0).tagName).toBe('h2')
    })

    it('renders default title text', () => {
      const $ = render('notification-banner', examples.default)
      const $title = $('.city-notification-banner__title')

      expect($title.html().trim()).toBe('Important')
    })

    it('renders content', () => {
      const $ = render('notification-banner', examples.default)
      const $content = $('.city-notification-banner__heading')

      expect($content.html().trim()).toBe(
        'This publication was withdrawn on 7 March 2014.'
      )
    })
  })

  describe('custom options', () => {
    it('renders custom title', () => {
      const $ = render('notification-banner', examples['custom title'])
      const $title = $('.city-notification-banner__title')

      expect($title.html().trim()).toBe('Important information')
    })

    it('renders custom content', () => {
      const $ = render('notification-banner', examples['custom text'])
      const $content = $('.city-notification-banner__heading')

      expect($content.html().trim()).toBe(
        'This publication was withdrawn on 7 March 2014.'
      )
    })

    it('renders custom heading level', () => {
      const $ = render(
        'notification-banner',
        examples['custom title heading level']
      )
      const $title = $('.city-notification-banner__title')

      expect($title.get(0).tagName).toBe('h3')
    })

    it('renders custom role', () => {
      const $ = render('notification-banner', examples['custom role'])
      const $component = $('.city-notification-banner')

      expect($component.attr('role')).toBe('banner')
    })

    it('renders aria-labelledby attribute matching the title id when role overridden to region', () => {
      const $ = render(
        'notification-banner',
        examples['role=alert overridden to role=region, with type as success']
      )
      const ariaAttr = $('.city-notification-banner').attr('aria-labelledby')
      const titleId = $('.city-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })

    it('renders custom title id', () => {
      const $ = render('notification-banner', examples['custom title id'])
      const $title = $('.city-notification-banner__title')

      expect($title.attr('id')).toBe('my-id')
    })

    it('has an aria-labelledby attribute matching the title id', () => {
      const $ = render('notification-banner', examples['custom title id'])
      const ariaAttr = $('.city-notification-banner').attr('aria-labelledby')

      expect(ariaAttr).toBe('my-id')
    })

    it('adds data-disable-auto-focus="true" if disableAutoFocus is true', () => {
      const $ = render(
        'notification-banner',
        examples['auto-focus disabled, with type as success']
      )

      const $component = $('.city-notification-banner')
      expect($component.attr('data-disable-auto-focus')).toBe('true')
    })

    it('adds data-disable-auto-focus="false" if disableAutoFocus is false', () => {
      const $ = render(
        'notification-banner',
        examples['auto-focus explicitly enabled, with type as success']
      )

      const $component = $('.city-notification-banner')
      expect($component.attr('data-disable-auto-focus')).toBe('false')
    })

    it('renders classes', () => {
      const $ = render('notification-banner', examples.classes)

      const $component = $('.city-notification-banner')
      expect($component.hasClass('app-my-class')).toBeTruthy()
    })

    it('renders attributes', () => {
      const $ = render('notification-banner', examples.attributes)

      const $component = $('.city-notification-banner')
      expect($component.attr('my-attribute')).toBe('value')
    })
  })

  describe('html', () => {
    it('renders title as escaped html when passed as text', () => {
      const $ = render('notification-banner', examples['title html as text'])
      const $title = $('.city-notification-banner__title')

      expect($title.html().trim()).toBe(
        '&lt;span&gt;Important information&lt;/span&gt;'
      )
    })

    it('renders nested components using `call`', () => {
      const $ = render('notification-banner', {
        callBlock: '<div class="app-nested-component"></div>'
      })

      expect(
        $('.city-notification-banner .app-nested-component').length
      ).toBeTruthy()
    })

    it('renders title as html', () => {
      const $ = render('notification-banner', examples['title as html'])
      const $title = $('.city-notification-banner__title')

      expect($title.html().trim()).toBe('<span>Important information</span>')
    })

    it('renders content as escaped html when passed as text', () => {
      const $ = render('notification-banner', examples['html as text'])
      const $content = $('.city-notification-banner__content')

      expect($content.html().trim()).toEqual(
        indent(
          outdent`
            <p class="city-notification-banner__heading">
              &lt;span&gt;This publication was withdrawn on 7 March 2014.&lt;/span&gt;
            </p>
          `
        )
      )
    })

    it('renders content as html', () => {
      const $ = render('notification-banner', examples['with text as html'])
      const $contentHtml = $('.city-notification-banner__content')

      expect($contentHtml.html().trim()).toEqual(
        indent(
          outdent`
            <h3 class="city-notification-banner__heading">
              This publication was withdrawn on 7 March 2014
            </h3>
            <p class="city-body">
              Archived and replaced by the <a href="#" class="city-notification-banner__link">new planning guidance</a> launched 6 March 2014 on an external website
            </p>
          `
        )
      )
    })
  })

  describe('when success type is passed', () => {
    it('renders with appropriate class', () => {
      const $ = render('notification-banner', examples['with type as success'])

      const $component = $('.city-notification-banner')
      expect(
        $component.hasClass('city-notification-banner--success')
      ).toBeTruthy()
    })

    it('has role=alert attribute', () => {
      const $ = render('notification-banner', examples['with type as success'])

      const $component = $('.city-notification-banner')
      expect($component.attr('role')).toBe('alert')
    })

    it('does render aria-labelledby', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $component = $('.city-notification-banner')

      expect($component.attr('aria-labelledby')).toBe(
        'city-notification-banner-title'
      )
    })

    it('renders a title id for aria-labelledby', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $component = $('.city-notification-banner__title')

      expect($component.attr('id')).toBe('city-notification-banner-title')
    })

    it('renders default success title text', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $title = $('.city-notification-banner__title')

      expect($title.html().trim()).toBe('Success')
    })

    it('renders custom title id and aria-labelledby', () => {
      const $ = render(
        'notification-banner',
        examples['custom title id with type as success']
      )
      const $component = $('.city-notification-banner')
      const $title = $('.city-notification-banner__title')

      expect($component.attr('aria-labelledby')).toBe('my-id')
      expect($title.attr('id')).toBe('my-id')
    })
  })

  describe('when type that is invalid is passed', () => {
    it('has role=region attribute', () => {
      const $ = render('notification-banner', examples['with invalid type'])
      const $component = $('.city-notification-banner')

      expect($component.attr('role')).toBe('region')
    })

    it('aria-labelledby attribute matches the title id', () => {
      const $ = render('notification-banner', examples['with invalid type'])
      const ariaAttr = $('.city-notification-banner').attr('aria-labelledby')
      const titleId = $('.city-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })
  })
})
