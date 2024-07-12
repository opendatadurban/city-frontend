const crypto = require('crypto')

require('html-validate/jest')

const { nunjucksEnv, renderTemplate } = require('@city-frontend/lib/components')

function replacePageWith(contents) {
  document.open()
  document.write(contents)
  document.close()
}

describe('Template', () => {
  describe('with default nunjucks configuration', () => {
    it('should not have any whitespace before the doctype', () => {
      const env = nunjucksEnv([], {
        trimBlocks: false,
        lstripBlocks: false
      })

      const output = env.render('./city/template.njk')
      expect(output.charAt(0)).toBe('<')
    })
  })

  describe('with nunjucks block trimming enabled', () => {
    it('should not have any whitespace before the doctype', () => {
      const env = nunjucksEnv([], {
        trimBlocks: true,
        lstripBlocks: true
      })

      const output = env.render('./city/template.njk')
      expect(output.charAt(0)).toBe('<')
    })
  })

  describe('<html>', () => {
    it('defaults to lang="en"', () => {
      replacePageWith(renderTemplate('city/template.njk'))
      expect(document.documentElement).toHaveAttribute('lang', 'en')
    })

    it('can have a custom lang set using htmlLang', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          context: {
            htmlLang: 'zu'
          }
        })
      )

      expect(document.documentElement).toHaveAttribute('lang', 'zu')
    })

    it('can have custom classes added using htmlClasses', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          context: {
            htmlClasses: 'my-custom-class'
          }
        })
      )

      expect(document.documentElement).toHaveClass('my-custom-class')
    })

    it('renders valid HTML', () => {
      expect(renderTemplate('city/template.njk')).toHTMLValidate({
        extends: ['html-validate:document'],
        rules: {
          // Allow optional subresource integrity (SRI)
          'require-sri': 'off'
        }
      })
    })
  })

  describe('<head>', () => {
    it('can have custom social media icons specified using the headIcons block', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          blocks: {
            headIcons: '<link rel="city-icon" href="/images/ytf-icon.png">'
          }
        })
      )

      // Build a list of the rel values of all links with a rel ending 'icon'
      const icons = Array.from(
        document.querySelectorAll('link[rel$="icon"]')
      ).map((link) => link.getAttribute('rel'))

      expect(icons).toEqual(['city-icon'])
    })

    it('can have additional content added to the <head> using the head block', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          blocks: {
            head: '<meta property="foo" content="bar">'
          }
        })
      )

      const $meta = document.querySelector('head meta[property="foo"]')

      expect($meta).toHaveAttribute('content', 'bar')
    })

    it('uses a default assets path of /assets', () => {
      replacePageWith(renderTemplate('city/template.njk'))
      const $icon = document.querySelector('link[rel="icon"][sizes="48x48"]')

      expect($icon).toHaveAttribute('href', '/assets/images/favicon.ico')
    })

    it('can have the assets path overridden using assetPath', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          context: {
            assetPath: '/whatever'
          }
        })
      )
      const $icon = document.querySelector('link[rel="icon"][sizes="48x48"]')

      expect($icon).toHaveAttribute('href', '/whatever/images/favicon.ico')
    })

    describe('favicons', () => {
      beforeAll(() => {
        replacePageWith(renderTemplate('city/template.njk'))
      })

      it('has an .ico icon', () => {
        const $icon = document.querySelector('link[rel="icon"][href$=".ico"]')

        expect($icon).toHaveAttribute('sizes', '48x48')
        expect($icon).toHaveAttribute('href', '/assets/images/favicon.ico')
      })

      it('has an .svg icon', () => {
        const $icon = document.querySelector('link[rel="icon"][href$=".svg"]')

        expect($icon).toHaveAttribute('sizes', 'any')
        expect($icon).toHaveAttribute('href', '/assets/images/favicon.svg')
      })

      it('has a mask-icon', () => {
        const $icon = document.querySelector('link[rel="mask-icon"]')

        expect($icon).toHaveAttribute('color', '#0b0c0c')
        expect($icon).toHaveAttribute(
          'href',
          '/assets/images/city-icon-mask.svg'
        )
      })

      it('has an apple-touch-icon', () => {
        const $icon = document.querySelector('link[rel="apple-touch-icon"]')

        expect($icon).toHaveAttribute(
          'href',
          '/assets/images/city-icon-180.png'
        )
      })

      it('has a linked web manifest file', () => {
        const $icon = document.querySelector('link[rel="manifest"]')

        expect($icon).toHaveAttribute('href', '/assets/manifest.json')
      })
    })

    describe('opengraph image', () => {
      it('is not included if neither assetUrl nor opengraphImageUrl are set', () => {
        replacePageWith(renderTemplate('city/template.njk'))

        const $ogImage = document.querySelector('meta[property="og:image"]')

        expect($ogImage).toBeNull()
      })

      it('is included using default path and filename if assetUrl is set', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              assetUrl: 'https://foo.com/my-assets'
            }
          })
        )

        const $ogImage = document.querySelector('meta[property="og:image"]')

        expect($ogImage).toHaveAttribute(
          'content',
          'https://foo.com/my-assets/images/city-opengraph-image.png'
        )
      })

      it('is included if opengraphImageUrl is set', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              opengraphImageUrl: 'https://foo.com/custom/og-image.png'
            }
          })
        )

        const $ogImage = document.querySelector('meta[property="og:image"]')

        expect($ogImage).toHaveAttribute(
          'content',
          'https://foo.com/custom/og-image.png'
        )
      })
    })

    describe('<meta name="theme-color">', () => {
      it('has a default content of #0b0c0c', () => {
        replacePageWith(renderTemplate('city/template.njk'))
        const $themeColor = document.querySelector('meta[name="theme-color"]')

        expect($themeColor).toHaveAttribute('content', '#0b0c0c')
      })

      it('can be overridden using themeColor', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              themeColor: '#ff69b4'
            }
          })
        )
        const $themeColor = document.querySelector('meta[name="theme-color"]')

        expect($themeColor).toHaveAttribute('content', '#ff69b4')
      })
    })

    // These tests use a select that specifically looks for a <title> within the <head> of the page
    // to prevent them from matching <title> elements within embedded SVGs.
    describe('<title>', () => {
      describe('by default', () => {
        let $title

        beforeAll(() => {
          replacePageWith(renderTemplate('city/template.njk'))
          $title = document.querySelector('head > title')
        })

        const expectedTitle =
          'GOV.UK - The best place to find government services and information'

        it(`is '${expectedTitle}'`, () => {
          expect($title).toHaveTextContent(expectedTitle)
        })

        it('does not have a lang attribute', () => {
          expect($title).not.toHaveAttribute('lang')
        })
      })

      it('can be overridden using the pageTitle block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              pageTitle: 'Foo'
            }
          })
        )
        const $title = document.querySelector('head > title')

        expect($title).toHaveTextContent('Foo')
      })

      it('can have a lang attribute specified using pageTitleLang', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              pageTitleLang: 'zu'
            }
          })
        )
        const $title = document.querySelector('head > title')

        expect($title).toHaveAttribute('lang', 'zu')
      })
    })
  })

  describe('<body>', () => {
    it('can have custom classes added using bodyClasses', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          context: {
            bodyClasses: 'custom-body-class'
          }
        })
      )

      expect(document.body).toHaveClass('custom-body-class')
    })

    it('can have custom attributes added using bodyAttributes', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          context: {
            bodyAttributes: { 'data-foo': 'bar' }
          }
        })
      )

      expect(document.body).toHaveAttribute('data-foo', 'bar')
    })

    it('can have additional content added after the opening tag using bodyStart block', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          blocks: {
            bodyStart: '<div>bodyStart</div>'
          }
        })
      )

      expect(
        document.querySelector('body > div:first-of-type')
      ).toHaveTextContent('bodyStart')
    })

    it('can have additional content added before the closing tag using bodyEnd block', () => {
      replacePageWith(
        renderTemplate('city/template.njk', {
          blocks: {
            bodyEnd: '<div>bodyEnd</div>'
          }
        })
      )

      expect(
        document.querySelector('body > div:last-of-type')
      ).toHaveTextContent('bodyEnd')
    })

    describe('inline script that adds "js-enabled" and "city-frontend-supported" classes', () => {
      it('should match the hash published in docs', () => {
        replacePageWith(renderTemplate('city/template.njk'))

        // Create a base64 encoded hash of the contents of the script tag
        const hash = crypto
          .createHash('sha256')
          .update(document.querySelector('body > script').innerHTML)
          .digest('base64')

        // A change to the inline script would be a breaking change, and it would also require
        // updating the hash published in https://frontend.design-system.service.gov.uk/import-javascript/#use-a-hash-to-unblock-inline-javascript
        expect(`sha256-${hash}`).toBe(
          'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='
        )
      })

      it('should not have a nonce attribute by default', () => {
        replacePageWith(renderTemplate('city/template.njk'))
        const $script = document.querySelector('body > script')

        expect($script).not.toHaveAttribute('nonce')
      })

      it('should have a nonce attribute when nonce is provided', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              cspNonce: 'abcdef'
            }
          })
        )
        const $script = document.querySelector('body > script')

        expect($script).toHaveAttribute('nonce', 'abcdef')
      })
    })

    describe('skip link', () => {
      it('can be overridden using the skipLink block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              skipLink: '<div class="my-skip-link">skipLink</div>'
            }
          })
        )

        expect(document.querySelector('.my-skip-link')).toBeInTheDocument()
        expect(document.querySelector('.city-skip-link')).toBeNull()
      })
    })

    describe('header', () => {
      it('can be overridden using the header block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              header: '<div class="my-header">header</div>'
            }
          })
        )

        expect(document.querySelector('.my-header')).toBeInTheDocument()
        expect(document.querySelector('.city-header')).toBeNull()
      })
    })

    describe('<main>', () => {
      it('can have custom classes added using mainClasses', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              mainClasses: 'custom-main-class'
            }
          })
        )

        expect(document.querySelector('main')).toHaveClass('custom-main-class')
      })

      it('does not have a lang attribute by default', () => {
        replacePageWith(renderTemplate('city/template.njk'))

        expect(document.querySelector('main')).not.toHaveAttribute('lang')
      })

      it('can have a lang attribute specified using mainLang', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            context: {
              mainLang: 'zu'
            }
          })
        )

        expect(document.querySelector('main')).toHaveAttribute('lang', 'zu')
      })

      it('can be overridden using the main block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              main: '<main class="my-main">header</main>'
            }
          })
        )

        expect(document.querySelectorAll('main')).toHaveLength(1)
        expect(document.querySelector('main')).toHaveClass('my-main')
      })

      it('can have content injected before it using the beforeContent block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              beforeContent: '<div class="before-content">beforeContent</div>'
            }
          })
        )

        const $beforeContent = document.querySelector('.before-content')
        const $main = document.querySelector('main')

        expect($beforeContent.nextElementSibling).toBe($main)
      })

      it('can have content specified using the content block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              content: 'Foo'
            }
          })
        )

        expect(document.querySelector('main')).toHaveTextContent('Foo')
      })
    })

    describe('footer', () => {
      it('can be overridden using the footer block', () => {
        replacePageWith(
          renderTemplate('city/template.njk', {
            blocks: {
              footer: '<div class="my-footer">footer</div>'
            }
          })
        )

        expect(document.querySelector('.my-footer')).toBeInTheDocument()
        expect(document.querySelector('.city-footer')).toBeNull()
      })
    })
  })
})
