import { pkg } from '@city-frontend/config'

import configFn from './city-prototype-kit.config.mjs'

describe('GOV.UK Prototype Kit config', () => {
  /** @type {import('./city-prototype-kit.config.mjs').PrototypeKitConfig} */
  let config

  beforeAll(async () => {
    config = await configFn()
  })

  it('includes metadata from `package.json`', () => {
    expect(config.meta).toEqual({
      description: pkg.description,
      urls: {
        documentation: 'https://design-system.service.gov.uk/',
        releaseNotes: expect.stringContaining(`/releases/tag/v${pkg.version}`),
        versionHistory: expect.stringContaining('/releases')
      }
    })
  })

  it('includes paths for assets, scripts, sass', () => {
    expect(config.assets).toEqual([
      '/dist/city/assets',
      '/dist/city/city-frontend.min.js.map'
    ])

    expect(config.sass).toEqual(['/dist/city-prototype-kit/init.scss'])

    expect(config.scripts).toEqual([
      {
        path: '/dist/city/city-frontend.min.js',
        type: 'module'
      },
      {
        path: '/dist/city-prototype-kit/init.js',
        type: 'module'
      }
    ])
  })

  describe('Nunjucks', () => {
    it('includes macros list', () => {
      expect(config.nunjucksMacros).toEqual([
        {
          importFrom: 'city/components/accordion/macro.njk',
          macroName: 'cityAccordion'
        },
        {
          importFrom: 'city/components/back-link/macro.njk',
          macroName: 'cityBackLink'
        },
        {
          importFrom: 'city/components/breadcrumbs/macro.njk',
          macroName: 'cityBreadcrumbs'
        },
        {
          importFrom: 'city/components/button/macro.njk',
          macroName: 'cityButton'
        },
        {
          importFrom: 'city/components/character-count/macro.njk',
          macroName: 'cityCharacterCount'
        },
        {
          importFrom: 'city/components/checkboxes/macro.njk',
          macroName: 'cityCheckboxes'
        },
        {
          importFrom: 'city/components/cookie-banner/macro.njk',
          macroName: 'cityCookieBanner'
        },
        {
          importFrom: 'city/components/date-input/macro.njk',
          macroName: 'cityDateInput'
        },
        {
          importFrom: 'city/components/details/macro.njk',
          macroName: 'cityDetails'
        },
        {
          importFrom: 'city/components/error-message/macro.njk',
          macroName: 'cityErrorMessage'
        },
        {
          importFrom: 'city/components/error-summary/macro.njk',
          macroName: 'cityErrorSummary'
        },
        {
          importFrom: 'city/components/exit-this-page/macro.njk',
          macroName: 'cityExitThisPage'
        },
        {
          importFrom: 'city/components/fieldset/macro.njk',
          macroName: 'cityFieldset'
        },
        {
          importFrom: 'city/components/file-upload/macro.njk',
          macroName: 'cityFileUpload'
        },
        {
          importFrom: 'city/components/footer/macro.njk',
          macroName: 'cityFooter'
        },
        {
          importFrom: 'city/components/header/macro.njk',
          macroName: 'cityHeader'
        },
        {
          importFrom: 'city/components/hint/macro.njk',
          macroName: 'cityHint'
        },
        {
          importFrom: 'city/components/input/macro.njk',
          macroName: 'cityInput'
        },
        {
          importFrom: 'city/components/inset-text/macro.njk',
          macroName: 'cityInsetText'
        },
        {
          importFrom: 'city/components/label/macro.njk',
          macroName: 'cityLabel'
        },
        {
          importFrom: 'city/components/notification-banner/macro.njk',
          macroName: 'cityNotificationBanner'
        },
        {
          importFrom: 'city/components/pagination/macro.njk',
          macroName: 'cityPagination'
        },
        {
          importFrom: 'city/components/panel/macro.njk',
          macroName: 'cityPanel'
        },
        {
          importFrom: 'city/components/password-input/macro.njk',
          macroName: 'cityPasswordInput'
        },
        {
          importFrom: 'city/components/phase-banner/macro.njk',
          macroName: 'cityPhaseBanner'
        },
        {
          importFrom: 'city/components/radios/macro.njk',
          macroName: 'cityRadios'
        },
        {
          importFrom: 'city/components/select/macro.njk',
          macroName: 'citySelect'
        },
        {
          importFrom: 'city/components/skip-link/macro.njk',
          macroName: 'citySkipLink'
        },
        {
          importFrom: 'city/components/summary-list/macro.njk',
          macroName: 'citySummaryList'
        },
        {
          importFrom: 'city/components/table/macro.njk',
          macroName: 'cityTable'
        },
        {
          importFrom: 'city/components/tabs/macro.njk',
          macroName: 'cityTabs'
        },
        {
          importFrom: 'city/components/tag/macro.njk',
          macroName: 'cityTag'
        },
        {
          importFrom: 'city/components/task-list/macro.njk',
          macroName: 'cityTaskList'
        },
        {
          importFrom: 'city/components/textarea/macro.njk',
          macroName: 'cityTextarea'
        },
        {
          importFrom: 'city/components/warning-text/macro.njk',
          macroName: 'cityWarningText'
        }
      ])
    })

    it('includes paths', () => {
      expect(config.nunjucksPaths).toEqual(['/dist'])
    })
  })
})
