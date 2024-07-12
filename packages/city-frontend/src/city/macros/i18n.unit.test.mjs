import { renderMacro } from '@city-frontend/lib/components'

describe('i18n.njk', () => {
  describe('cityI18nAttributes', () => {
    it('renders a single plural type', () => {
      const attributes = renderMacro(
        'cityI18nAttributes',
        'city/macros/i18n.njk',
        {
          context: {
            key: 'translation-key',
            messages: {
              other: 'You have %{count} characters remaining.'
            }
          }
        }
      )

      // Note the starting space so we ensure it doesn't stick to possible other previous attributes
      expect(attributes).toBe(
        ' data-i18n.translation-key.other="You have %{count} characters remaining."'
      )
    })

    it('renders multiple plural types', () => {
      const attributes = renderMacro(
        'cityI18nAttributes',
        'city/macros/i18n.njk',
        {
          context: {
            key: 'translation-key',
            messages: {
              other: 'You have %{count} characters remaining.',
              one: 'One character remaining'
            }
          }
        }
      )

      expect(attributes).toBe(
        ' data-i18n.translation-key.other="You have %{count} characters remaining." data-i18n.translation-key.one="One character remaining"'
      )
    })

    it('outputs nothing if there are no translations', () => {
      const attributes = renderMacro(
        'cityI18nAttributes',
        'city/macros/i18n.njk',
        {
          context: {
            key: 'translation-key'
          }
        }
      )

      expect(attributes).toBe('')
    })
  })
})
