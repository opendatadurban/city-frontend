const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Summary list', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('summary-list')
  })

  describe('custom options', () => {
    it('renders classes', async () => {
      const $ = render('summary-list', examples['no-border'])

      const $component = $('.city-summary-list')
      expect($component.hasClass('city-summary-list--no-border')).toBeTruthy()
    })

    it('renders with attributes', () => {
      const $ = render('summary-list', examples.attributes)

      const $component = $('.city-summary-list')
      expect($component.attr('data-attribute-1')).toBe('value-1')
      expect($component.attr('data-attribute-2')).toBe('value-2')
    })
  })

  describe('rows', () => {
    it('renders list without falsy values', async () => {
      const $ = render('summary-list', examples['with falsy values'])

      const $component = $('.city-summary-list')
      const $row = $component.find('.city-summary-list__row')
      expect($row).toHaveLength(2)
    })

    it('renders classes', async () => {
      const $ = render('summary-list', examples['rows with classes'])

      const $component = $('.city-summary-list')
      const $row = $component.find('.city-summary-list__row')
      expect($row.hasClass('app-custom-class')).toBeTruthy()
    })

    describe('keys', () => {
      it('renders text', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.city-summary-list')
        const $key = $component.find('dt.city-summary-list__key')

        expect($key.html()).toContain('Name')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['key with html'])

        const $component = $('.city-summary-list')
        const $key = $component.find('dt.city-summary-list__key')

        expect($key.html()).toContain('<b>Name</b>')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['key with classes'])

        const $component = $('.city-summary-list')
        const $key = $component.find('dt.city-summary-list__key')
        expect($key.hasClass('app-custom-class')).toBeTruthy()
      })
    })

    describe('values', () => {
      it('renders text', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.city-summary-list')
        const $value = $component.find('dd.city-summary-list__value')

        expect($value.html()).toContain('Firstname Lastname')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['value with html'])

        const $component = $('.city-summary-list')
        const $value = $component.find('dd.city-summary-list__value')

        expect($value.html()).toContain('<span>email@email.com</span>')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['overridden-widths'])

        const $component = $('.city-summary-list')
        const $value = $component.find('dd.city-summary-list__value')
        expect($value.hasClass('city-!-width-one-quarter')).toBeTruthy()
      })
    })

    describe('actions', () => {
      it('renders href', async () => {
        const $ = render('summary-list', examples['actions href'])

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')

        expect($actionLink.attr('href')).toBe('https://www.gov.uk')
      })

      it('renders text', async () => {
        const $ = render('summary-list', examples['with actions'])

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')

        expect($actionLink.text().trim()).toContain('Change date of birth')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['actions with html'])

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')

        expect($actionLink.html()).toContain(
          'Edit<span class="visually-hidden"> name</span>'
        )
      })

      it('allows the visually hidden prefix to be removed and then manually added with HTML', async () => {
        const $ = render('summary-list', examples.translated)

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')

        expect($actionLink.html()).toContain(
          'Golygu<span class="city-visually-hidden"> dyddiad geni</span>'
        )
      })

      it('renders custom accessible name', async () => {
        const $ = render('summary-list', examples['with actions'])

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')
        expect($actionLink.text().trim()).toContain('Change date of birth')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['actions with classes'])

        const $component = $('.city-summary-list')
        const $actionList = $component.find('.city-summary-list__actions')

        expect($actionList.hasClass('app-custom-class')).toBeTruthy()
      })

      it('renders attributes', async () => {
        const $ = render('summary-list', examples['actions with attributes'])

        const $component = $('.city-summary-list')
        const $actionLink = $component.find('.city-summary-list__actions > a')

        expect($actionLink.attr('data-test-attribute')).toBe('value')
        expect($actionLink.attr('data-test-attribute-2')).toBe('value-2')
      })

      it('renders a single anchor with one action', async () => {
        const $ = render('summary-list', examples['single action with anchor'])

        const $component = $('.city-summary-list')
        const $action = $component.find('.city-summary-list__actions > a')

        expect($action.html().trim()).toBe('First action')
      })

      it('renders a list with mutliple actions', async () => {
        const $ = render('summary-list', examples['with some actions'])

        const $component = $('.city-summary-list')
        const $actionList = $component.find('.city-summary-list__actions')
        const $secondAction = $actionList.find(
          '.city-summary-list__actions-list-item:last-child'
        )

        expect($secondAction.text().trim()).toBe('Delete name')
      })

      it('renders classes on actions', async () => {
        const $ = render('summary-list', examples['classes on items'])

        const $component = $('.city-summary-list')
        const $action = $component.find('.city-summary-list__actions > a')

        expect($action.hasClass('city-link--no-visited-state')).toBeTruthy()
      })

      it('skips the action column when no array is provided', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.city-summary-list')
        const $action = $component.find('.city-summary-list__actions')

        expect($action).toHaveLength(0)
      })

      it('skips the action column when no items are in the array provided', async () => {
        const $ = render('summary-list', examples['empty items array'])

        const $component = $('.city-summary-list')
        const $action = $component.find('.city-summary-list__actions')

        expect($action).toHaveLength(0)
      })

      describe('when only some rows have actions', () => {
        let $
        let $component

        beforeAll(() => {
          $ = render('summary-list', examples['with some actions'])
          $component = $('.city-summary-list')
        })

        it('does not add no-actions modifier class to rows with actions', () => {
          // The first row has actions
          const $firstRow = $component.find(
            '.city-summary-list__row:first-child'
          )
          expect(
            $firstRow.hasClass('city-summary-list__row--no-actions')
          ).toBeFalsy()
        })

        it('adds no-actions modifier class to rows without actions', () => {
          // The second row does not have actions
          const $secondRow = $component.find(
            '.city-summary-list__row:nth-child(2)'
          )
          expect(
            $secondRow.hasClass('city-summary-list__row--no-actions')
          ).toBeTruthy()
        })
      })

      describe('when no rows have actions', () => {
        let $
        let $component

        beforeAll(() => {
          $ = render('summary-list', examples.default)
          $component = $('.city-summary-list')
        })

        it('does not add no-actions modifier class to any of the rows', () => {
          // The first row has actions
          const $rows = $component.find('.city-summary-list__row')
          expect(
            $rows.hasClass('city-summary-list__row--no-actions')
          ).toBeFalsy()
        })
      })
    })
  })

  describe('summary card', () => {
    // We only test if the actions are present in the summary card and if the logic
    // for single actions works, not the function of the actions themselves.
    // This is because the card actions use the same _actionLink macro that the
    // list actions do.
    // This is already tested in depth in the 'actions' describe above.
    describe('actions', () => {
      it('renders actions', () => {
        const $ = render(
          'summary-list',
          examples['as a summary card with actions']
        )

        const $actionItems = $('.city-summary-card__action')
        expect($actionItems).toHaveLength(2)
      })

      it('does not render a list if only one action is present', () => {
        const $ = render(
          'summary-list',
          examples['summary card with only 1 action']
        )

        const $singleAction = $('.city-summary-card__actions > a')
        const $actionItems = $('.city-summary-card__action')
        expect($actionItems).toHaveLength(0)
        expect($singleAction.text().trim()).toBe(
          'My lonely action (Undergraduate teaching assistant)'
        )
      })
    })

    describe('title', () => {
      it('renders with a text title', () => {
        const $ = render(
          'summary-list',
          examples['as a summary card with a text header']
        )

        const $title = $('.city-summary-card__title')
        expect($title.text()).toContain('Undergraduate teaching assistant')
      })

      it('renders with a html title', () => {
        const $ = render(
          'summary-list',
          examples['as a summary card with a html header']
        )

        const $title = $('.city-summary-card__title')
        expect($title.html()).toContain(
          '<em>Undergraduate teaching assistant</em>'
        )
      })

      it('renders with a custom heading level', () => {
        const $ = render(
          'summary-list',
          examples['as a summary card with a custom header level']
        )

        const $title = $('.city-summary-card__title')
        expect($title.get(0).tagName).toBe('h3')
      })
    })

    describe('custom options', () => {
      it('renders custom classes on the summary card', () => {
        const $ = render(
          'summary-list',
          examples['summary card with custom classes']
        )

        const $list = $('.city-summary-list')
        const $card = $('.city-summary-card')
        expect($list.hasClass('custom-class')).toBeFalsy()
        expect($card.hasClass('custom-class')).toBeTruthy()
      })

      it('renders with attributes on the summary card', () => {
        const $ = render(
          'summary-list',
          examples['summary card with custom attributes']
        )

        const $list = $('.city-summary-list')
        const $card = $('.city-summary-card')
        expect($list.attr('data-attribute-1')).toBeFalsy()
        expect($list.attr('data-attribute-2')).toBeFalsy()
        expect($card.attr('data-attribute-1')).toBe('value-1')
        expect($card.attr('data-attribute-2')).toBe('value-2')
      })
    })
  })
})
