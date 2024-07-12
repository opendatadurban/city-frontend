const { render } = require('@city-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@city-frontend/helpers/tests')
const { getExamples } = require('@city-frontend/lib/components')

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Checkboxes', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('checkboxes')
  })

  it('render example with minimum required name and items', () => {
    const $ = render('checkboxes', examples.default)

    const $component = $('.city-checkboxes')

    const $firstInput = $component.find(
      '.city-checkboxes__item:first-child input'
    )
    const $firstLabel = $component.find(
      '.city-checkboxes__item:first-child label'
    )
    expect($firstInput.attr('name')).toBe('nationality')
    expect($firstInput.val()).toBe('british')
    expect($firstLabel.text()).toContain('British')

    const $lastInput = $component.find(
      '.city-checkboxes__item:last-child input'
    )
    const $lastLabel = $component.find(
      '.city-checkboxes__item:last-child label'
    )
    expect($lastInput.attr('name')).toBe('nationality')
    expect($lastInput.val()).toBe('other')
    expect($lastLabel.text()).toContain('Citizen of another country')
  })

  it('render example without falsy values', () => {
    const $ = render('checkboxes', examples['with falsy values'])

    const $component = $('.city-checkboxes')
    const $items = $component.find('.city-checkboxes__item')

    expect($items).toHaveLength(2)
  })

  it('render example with a divider and ‘None’ checkbox with exclusive behaviour', () => {
    const $ = render('checkboxes', examples['with divider and None'])

    const $component = $('.city-checkboxes')

    const $divider = $component.find('.city-checkboxes__divider').first()
    expect($divider.text().trim()).toBe('or')

    const $items = $component.find('.city-checkboxes__item')
    expect($items).toHaveLength(4)

    const $orItemInput = $items.last().find('input').first()
    expect($orItemInput.attr('data-behaviour')).toBe('exclusive')
  })

  it('render additional label classes', () => {
    const $ = render('checkboxes', examples['with label classes'])

    const $component = $('.city-checkboxes')
    const $label = $component.find('.city-checkboxes__item label')
    expect($label.hasClass('bold')).toBeTruthy()
  })

  it('render classes', () => {
    const $ = render('checkboxes', examples.classes)

    const $component = $('.city-checkboxes')

    expect($component.hasClass('app-checkboxes--custom-modifier')).toBeTruthy()
  })

  it('renders initial aria-describedby on fieldset', () => {
    const $ = render('checkboxes', examples['with fieldset describedBy'])

    const $fieldset = $('.city-fieldset')
    expect($fieldset.attr('aria-describedby')).toMatch('test-target-element')
  })

  it('render attributes', () => {
    const $ = render('checkboxes', examples.attributes)

    const $component = $('.city-checkboxes')

    expect($component.attr('data-attribute')).toBe('value')
    expect($component.attr('data-second-attribute')).toBe('second-value')
  })

  it('renders with a form group wrapper', () => {
    const $ = render('checkboxes', examples.default)

    const $formGroup = $('.city-form-group')
    expect($formGroup.length).toBeTruthy()
  })

  it('render a custom class on the form group', () => {
    const $ = render(
      'checkboxes',
      examples['with optional form-group classes showing group error']
    )

    const $formGroup = $('.city-form-group')
    expect($formGroup.hasClass('city-form-group--error')).toBeTruthy()
  })

  describe('items', () => {
    it('render a matching label and input using name by default', () => {
      const $ = render('checkboxes', examples.default)

      const $component = $('.city-checkboxes')

      const $firstInput = $component.find(
        '.city-checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.city-checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toBe('nationality')
      expect($firstLabel.attr('for')).toBe('nationality')

      const $lastInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      const $lastLabel = $component.find(
        '.city-checkboxes__item:last-child label'
      )
      expect($lastInput.attr('id')).toBe('nationality-3')
      expect($lastLabel.attr('for')).toBe('nationality-3')
    })

    it('render a matching label and input using custom idPrefix', () => {
      const $ = render('checkboxes', examples['with idPrefix'])

      const $component = $('.city-checkboxes')

      const $firstInput = $component.find(
        '.city-checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.city-checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toBe('nationality')
      expect($firstLabel.attr('for')).toBe('nationality')

      const $lastInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      const $lastLabel = $component.find(
        '.city-checkboxes__item:last-child label'
      )
      expect($lastInput.attr('id')).toBe('nationality-2')
      expect($lastLabel.attr('for')).toBe('nationality-2')
    })

    it('render explicitly passed item ids', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.city-checkboxes')

      const $lastInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      expect($lastInput.attr('id')).toBe('with-id-and-name-3')

      const $firstInput = $component.find(
        '.city-checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.city-checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toBe('item_british')
      expect($firstLabel.attr('for')).toBe('item_british')
    })

    it('render explicitly passed item names', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.city-checkboxes')

      const $lastInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      expect($lastInput.attr('name')).toBe('custom-name-scottish')
    })

    it('render disabled', () => {
      const $ = render('checkboxes', examples['with disabled item'])

      const $component = $('.city-checkboxes')

      const $disabledInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      expect($disabledInput.attr('disabled')).toBe('disabled')
    })

    it('render checked', () => {
      const $ = render('checkboxes', examples['with checked item'])

      const $component = $('.city-checkboxes')
      const $secondInput = $component.find(
        '.city-checkboxes__item:nth-child(2) input'
      )
      const $lastInput = $component.find(
        '.city-checkboxes__item:last-child input'
      )
      expect($secondInput.attr('checked')).toBe('checked')
      expect($lastInput.attr('checked')).toBe('checked')
    })

    it('checks the checkboxes in values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.city-checkboxes')
      const $british = $component.find('input[value="british"]')
      expect($british.attr('checked')).toBe('checked')

      const $other = $component.find('input[value="other"]')
      expect($other.attr('checked')).toBe('checked')
    })

    it('allows item.checked to override values', () => {
      const $ = render('checkboxes', examples['item checked overrides values'])

      const $green = $('.city-checkboxes').find('input[value="green"]')
      expect($green.attr('checked')).toBeUndefined()
    })

    describe('when they include attributes', () => {
      it('renders the attributes', () => {
        const $ = render('checkboxes', examples['items with attributes'])

        const $component = $('.city-checkboxes')

        const $firstInput = $component.find(
          '.city-checkboxes__item:first-child input'
        )
        expect($firstInput.attr('data-attribute')).toBe('ABC')
        expect($firstInput.attr('data-second-attribute')).toBe('DEF')

        const $lastInput = $component.find(
          '.city-checkboxes__item:last-child input'
        )
        expect($lastInput.attr('data-attribute')).toBe('GHI')
        expect($lastInput.attr('data-second-attribute')).toBe('JKL')
      })
    })
  })

  describe('when a radio button includes a hint', () => {
    it('renders the hint text', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      const $firstHint = $('.city-checkboxes__hint').first()
      expect($firstHint.text().trim()).toContain(
        "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before."
      )
    })

    it('renders the correct id attribute for the hint', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.city-checkboxes__hint').attr('id')).toBe(
        'government-gateway-item-hint'
      )
    })

    it('the input describedBy attribute matches the item hint id', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.city-checkboxes__input').attr('aria-describedby')).toBe(
        'government-gateway-item-hint'
      )
    })
  })

  describe('render conditionals', () => {
    it('hidden by default when not checked', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.city-checkboxes')

      const $firstConditional = $component
        .find('.city-checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect(
        $firstConditional.hasClass('city-checkboxes__conditional--hidden')
      ).toBeTruthy()
    })
    it('visible by default when checked', () => {
      const $ = render('checkboxes', examples['with conditional item checked'])

      const $component = $('.city-checkboxes')

      const $firstConditional = $component
        .find('.city-checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect(
        $firstConditional.hasClass('city-checkboxes__conditional--hidden')
      ).toBeFalsy()
    })

    it('visible when checked with pre-checked values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.city-checkboxes')

      const $firstConditional = $component
        .find('.city-checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Country')
      expect(
        $firstConditional.hasClass('city-checkboxes__conditional--hidden')
      ).toBeFalsy()
    })

    it('with association to the input they are controlled by', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.city-checkboxes')

      const $lastInput = $component.find('.city-checkboxes__input').last()
      const $lastConditional = $component
        .find('.city-checkboxes__conditional')
        .last()

      expect($lastInput.attr('data-aria-controls')).toBe(
        'conditional-how-contacted-3'
      )
      expect($lastConditional.attr('id')).toBe('conditional-how-contacted-3')
    })

    it('omits empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $component = $('.city-checkboxes')
      expect($component.find('.city-checkboxes__conditional')).toHaveLength(0)
    })

    it('does not associate checkboxes with empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $input = $('.city-checkboxes__input').first()
      expect($input.attr('data-aria-controls')).toBeFalsy()
    })

    // Indentation in nunjucks can mutate the value of textareas, since
    // textarea value is defined between the html tags
    it('does not add space to the input value of textareas inside conditionals', () => {
      const $ = render('checkboxes', examples['textarea in conditional'])

      const $textarea = $('#conditional-textarea')
      expect($textarea.text()).toBe('test\n')
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', () => {
      const $ = render('checkboxes', examples['with error message'])

      expect(htmlWithClassName($, '.city-error-message')).toMatchSnapshot()
    })

    it('uses the idPrefix for the error message id if provided', () => {
      const $ = render('checkboxes', examples['with error and idPrefix'])

      const errorMessageId = $('.city-error-message').attr('id')
      expect(errorMessageId).toBe('id-prefix-error')
    })

    it('falls back to using the name for the error message id', () => {
      const $ = render('checkboxes', examples['with error message'])

      const errorMessageId = $('.city-error-message').attr('id')
      expect(errorMessageId).toBe('waste-error')
    })

    it('associates the fieldset as "described by" the error message', () => {
      const $ = render(
        'checkboxes',
        examples['with fieldset and error message']
      )

      const $fieldset = $('.city-fieldset')
      const errorMessageId = $('.city-error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', () => {
      const $ = render(
        'checkboxes',
        examples['with error message and fieldset describedBy']
      )

      const $fieldset = $('.city-fieldset')
      const errorMessageId = $('.city-error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}test-target-element${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('does not associate each input as "described by" the error message', () => {
      const $ = render(
        'checkboxes',
        examples['with error message and hints on items']
      )

      const $inputs = $('input')

      $inputs.each((index, input) => {
        let expectedDescribedById = `waste-${index + 1}-item-hint`
        if (index === 0) {
          expectedDescribedById = 'waste-item-hint'
        }
        expect($(input).attr('aria-describedby')).toEqual(expectedDescribedById)
      })
    })

    it('renders with a form group wrapper that has an error state', () => {
      const $ = render('checkboxes', examples['with error message'])

      const $formGroup = $('.city-form-group')
      expect($formGroup.hasClass('city-form-group--error')).toBeTruthy()
    })
  })

  describe('when the fieldset includes a hint', () => {
    it('renders the hint', () => {
      const $ = render('checkboxes', examples['multiple hints'])

      expect(htmlWithClassName($, '.city-hint')).toMatchSnapshot()
    })

    it('associates the fieldset as "described by" the hint', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $fieldset = $('.city-fieldset')
      const hintId = $('.city-hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`
      )
      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', () => {
      const $ = render('checkboxes', examples['with fieldset describedBy'])

      const $fieldset = $('.city-fieldset')
      const hintId = $('.city-hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', () => {
      const $ = render('checkboxes', examples['with error message and hint'])

      const $fieldset = $('.city-fieldset')

      const errorMessageId = $('.city-error-message').attr('id')
      const hintId = $('.city-hint').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedByCombined)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', () => {
      const $ = render(
        'checkboxes',
        examples['with error, hint and fieldset describedBy']
      )

      const $fieldset = $('.city-fieldset')
      const hintId = $('.city-hint').attr('id')
      const errorMessageId = $('.city-error-message').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}test-target-element${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedByCombined)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      const $component = $(
        '.city-form-group > .city-fieldset > .city-checkboxes'
      )
      expect($component.length).toBeTruthy()
    })

    it('passes through label params without breaking', () => {
      const $ = render('checkboxes', examples['label with attributes'])

      expect(htmlWithClassName($, '.city-checkboxes__label')).toMatchSnapshot()
    })

    it('passes through fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      expect(htmlWithClassName($, '.city-fieldset')).toMatchSnapshot()
    })

    it('passes through html fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset html params'])

      expect(htmlWithClassName($, '.city-fieldset')).toMatchSnapshot()
    })
  })

  describe('single checkbox without a fieldset', () => {
    it('adds aria-describedby to input if there is an error', () => {
      const exampleName = "with single option set 'aria-describedby' on input"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch('t-and-c-error')
    })

    it('adds aria-describedby to input if there is an error and parent fieldset', () => {
      const exampleName =
        "with single option set 'aria-describedby' on input, and describedBy"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch(
        'test-target-element t-and-c-error'
      )
    })
  })

  describe('single checkbox (with hint) without a fieldset', () => {
    it('adds aria-describedby to input if there is an error and a hint', () => {
      const exampleName =
        "with single option (and hint) set 'aria-describedby' on input"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch(
        't-and-c-with-hint-error t-and-c-with-hint-item-hint'
      )
    })

    it('adds aria-describedby to input if there is an error, hint and parent fieldset', () => {
      const exampleName =
        "with single option (and hint) set 'aria-describedby' on input, and describedBy"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch(
        'test-target-element t-and-c-with-hint-error t-and-c-with-hint-item-hint'
      )
    })
  })
})
