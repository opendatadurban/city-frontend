const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Task List', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('task-list')
  })

  it('renders the default example', () => {
    const $ = render('task-list', examples.default)

    const $component = $('.city-task-list')
    expect($component.get(0).tagName).toBe('ul')
  })

  it('allows for custom classes on the root of the component', () => {
    const $ = render('task-list', examples['custom classes'])

    const $component = $('.city-task-list')
    expect($component.hasClass('custom-class-on-component')).toBeTruthy()
  })

  it('allows for custom classes on each task', () => {
    const $ = render('task-list', examples['custom classes'])

    const $listItem = $('.city-task-list__item')
    expect($listItem.hasClass('custom-class-on-task')).toBeTruthy()
  })

  it('allows for custom classes on each status', () => {
    const $ = render('task-list', examples['custom classes'])

    const $status = $('.city-task-list__status')
    expect($status.hasClass('custom-class-on-status')).toBeTruthy()
  })

  it('allows for custom attributes', () => {
    const $ = render('task-list', examples['custom attributes'])

    const $component = $('.city-task-list')
    expect($component.attr('data-custom-attribute')).toBe('custom-value')
  })

  describe('when a task has an href set', () => {
    let $component

    beforeAll(function () {
      const $ = render('task-list', examples.default)
      $component = $('.city-task-list')
    })

    it('wraps the task title in a link', async () => {
      const $itemLink = $component.find('a.city-task-list__link')
      expect($itemLink.attr('href')).toBe('#')
    })

    it('adds a with-link modifier class to the task', async () => {
      const $itemLink = $component.find('.city-task-list__item')
      expect($itemLink.hasClass('city-task-list__item--with-link')).toBeTruthy()
    })

    it('associates the task name link with the status using aria', async () => {
      const $itemLink = $component.find('.city-task-list__link')
      const $statusWithId = $component.find(
        `#${$itemLink.attr('aria-describedby')}`
      )

      expect($statusWithId.text()).toContain('Completed')
    })

    it('applies title classes to the link', () => {
      const $ = render('task-list', examples['custom classes'])

      const $itemWithLink = $('.city-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.city-task-list__link')
      expect(
        $itemWithLinkTitle.hasClass('custom-class-on-linked-title')
      ).toBeTruthy()
    })

    it('escapes the title when passed as text', () => {
      const $ = render('task-list', examples['html passed as text'])

      const $itemWithLink = $('.city-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.city-task-list__link')
      expect($itemWithLinkTitle.text().trim()).toBe(
        '<strong>Linked Title</strong>'
      )
    })

    it('allows HTML in the title when passed as html', () => {
      const $ = render('task-list', examples.html)

      const $itemWithLink = $('.city-task-list__item:first-child')
      const $itemWithLinkTitle = $itemWithLink.find('.city-task-list__link')
      expect($itemWithLinkTitle.html().trim()).toBe(
        '<strong>Linked Title</strong>'
      )
    })
  })

  describe('when a task does not have an href set', () => {
    it('does not link the task title', () => {
      const $ = render(
        'task-list',
        examples['example with hint text and additional states']
      )

      const $itemWithNoLink = $('.city-task-list__item:last-child')
      const $itemWithNoLinkTitle = $itemWithNoLink.find('div')
      expect($itemWithNoLinkTitle.text()).toContain('Payment')
    })

    it('applies title classes to the title wrapper div', () => {
      const $ = render('task-list', examples['custom classes'])

      const $itemWithNoLink = $('.city-task-list__item:last-child')
      const $itemWithNoLinkTitle = $itemWithNoLink.find(
        '.city-task-list__name-and-hint div'
      )
      expect(
        $itemWithNoLinkTitle.hasClass('custom-class-on-unlinked-title')
      ).toBeTruthy()
    })

    it('escapes the title when passed as text', () => {
      const $ = render('task-list', examples['html passed as text'])

      const $itemWithoutLink = $('.city-task-list__item:last-child')
      const $itemWithoutLinkTitle = $itemWithoutLink.find(
        '.city-task-list__name-and-hint'
      )
      expect($itemWithoutLinkTitle.text()).toContain(
        '<strong>Unlinked Title</strong>'
      )
    })

    it('allows HTML in the title when passed as html', () => {
      const $ = render('task-list', examples.html)

      const $itemWithoutLink = $('.city-task-list__item:last-child')
      const $itemWithoutLinkTitle = $itemWithoutLink.find(
        '.city-task-list__name-and-hint'
      )
      expect($itemWithoutLinkTitle.html()).toContain(
        '<strong>Unlinked Title</strong>'
      )
    })
  })

  describe('when a task has a tag status', () => {
    it('escapes the tag when passed as text', () => {
      const $ = render('task-list', examples['html passed as text'])

      const $tag = $('.city-tag')
      expect($tag.text()).toContain('<strong>Tag</strong>')
    })

    it('allows HTML in the tag when passed as html', () => {
      const $ = render('task-list', examples.html)

      const $tag = $('.city-tag')
      expect($tag.html()).toContain('<strong>Tag</strong>')
    })

    it('allows for custom classes on tags', () => {
      const $ = render('task-list', examples['custom classes'])

      const $tag = $('.city-task-list__status .city-tag')
      expect($tag.hasClass('custom-class-on-tag')).toBeTruthy()
    })

    it('allows for custom attributes on tags', () => {
      const $ = render('task-list', examples['custom attributes'])

      const $component = $('.city-tag')
      expect($component.attr('data-tag-attribute')).toBe('tag-value')
    })
  })

  describe('when a task has a non-tag status', () => {
    it('escapes the status when passed as text', () => {
      const $ = render('task-list', examples['html passed as text'])

      const $status = $('.city-task-list__status')
      expect($status.text()).toContain('<strong>Status</strong>')
    })

    it('allows HTML in the tag when passed as html', () => {
      const $ = render('task-list', examples.html)

      const $status = $('.city-task-list__status')
      expect($status.html()).toContain('<strong>Status</strong>')
    })
  })

  describe('when a task has a hint', () => {
    let $component

    beforeAll(function () {
      const $ = render(
        'task-list',
        examples['example with hint text and additional states']
      )
      $component = $('.city-task-list')
    })

    it('renders the hint', () => {
      const $hintText = $component.find('.city-task-list__hint')
      expect($hintText.text()).toContain(
        'Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.'
      )
    })

    it('associates the hint text with the task link using aria', () => {
      const $hintText = $component.find('.city-task-list__hint')
      expect($hintText.attr('id')).toBe('task-list-3-hint')

      const $itemAssociatedWithHint = $component.find(
        `.city-task-list__link[aria-describedby~="${$hintText.attr('id')}"]`
      )
      expect($itemAssociatedWithHint.text()).toContain('Business plan')
    })

    it('escapes the hint when passed as text', () => {
      const $ = render('task-list', examples['html passed as text'])

      const $hint = $('.city-task-list__hint')
      expect($hint.text()).toContain('<strong>Hint</strong>')
    })

    it('allows HTML in the hint when passed as html', () => {
      const $ = render('task-list', examples.html)

      const $hint = $('.city-task-list__hint')
      expect($hint.html()).toContain('<strong>Hint</strong>')
    })
  })

  describe('when a custom idPrefix is used', () => {
    let $component

    beforeAll(function () {
      const $ = render('task-list', examples['custom id prefix'])
      $component = $('.city-task-list')
    })

    it('uses the id prefix for the hint id', () => {
      const $hint = $component.find('.city-task-list__hint')
      expect($hint.attr('id')).toBe('my-custom-id-1-hint')
    })

    it('uses the id prefix for the status', () => {
      const $hint = $component.find('.city-task-list__status')
      expect($hint.attr('id')).toBe('my-custom-id-1-status')
    })

    it('uses the id prefix for the aria-describedby association', () => {
      const $hint = $component.find('.city-task-list__link')
      expect($hint.attr('aria-describedby')).toBe(
        'my-custom-id-1-hint my-custom-id-1-status'
      )
    })
  })
})
