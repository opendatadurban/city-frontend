const { render } = require('@city-frontend/helpers/nunjucks')
const { getExamples } = require('@city-frontend/lib/components')

describe('Table', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('table')
  })

  it('can have additional classes', () => {
    const $ = render('table', examples.classes)

    expect($('.city-table').hasClass('custom-class-goes-here')).toBeTruthy()
  })

  it('can have additional attributes', () => {
    const $ = render('table', examples.attributes)

    expect($('.city-table').attr('data-foo')).toBe('bar')
  })

  // =========================================================
  // Captions
  // =========================================================

  describe('captions', () => {
    it('can have custom text', () => {
      const $ = render('table', examples['table with head and caption'])
      const $caption = $('.city-table__caption')

      expect($caption.text()).toBe('Caption 1: Months and rates')
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['table with head and caption'])
      const $caption = $('.city-table__caption')

      expect($caption.hasClass('city-table__caption--m')).toBeTruthy()
    })
  })

  // =========================================================
  // Column headers
  // =========================================================

  describe('column headers', () => {
    it('can be specified', () => {
      const args = examples['table with head']
      const $ = render('table', args)

      const headings = $('.city-table')
        .find('thead tr th')
        .map((_, e) => $(e).text())
        .get()

      expect(headings).toEqual([
        'Month you apply',
        'Rate for bicycles',
        'Rate for vehicles'
      ])
    })

    it('have HTML escaped when passed as text', () => {
      const $ = render('table', examples['html as text'])

      const $th = $('.city-table thead tr th')

      expect($th.html()).toBe(
        'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
      )
    })

    it('allow HTML when passed as HTML', () => {
      const $ = render('table', examples.html)

      const $th = $('.city-table thead tr th')

      expect($th.html()).toBe('Foo <span>bar</span>')
    })

    it('can have a format specified', () => {
      const $ = render('table', examples['table with head'])

      const $th = $('.city-table thead tr th')

      expect($th.hasClass('city-table__header--numeric')).toBeTruthy()
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['head with classes'])

      const $th = $('.city-table thead tr th')

      expect($th.hasClass('my-custom-class')).toBeTruthy()
    })

    it('can have rowspan specified', () => {
      const $ = render('table', examples['head with rowspan and colspan'])

      const $th = $('.city-table thead tr th')

      expect($th.attr('rowspan')).toBe('2')
    })

    it('can have colspan specified', () => {
      const $ = render('table', examples['head with rowspan and colspan'])

      const $th = $('.city-table thead tr th')

      expect($th.attr('colspan')).toBe('2')
    })

    it('can have additional attributes', () => {
      const $ = render('table', examples['head with attributes'])

      const $th = $('.city-table thead tr th')

      expect($th.attr('data-fizz')).toBe('buzz')
    })
  })

  // =========================================================
  // Row headers
  // =========================================================

  describe('row headers', () => {
    describe('when firstCellIsHeader is false', () => {
      it('are not included', () => {
        const $ = render('table', examples.default)

        const cells = $('.city-table')
          .find('tbody tr td')
          .map((_, e) => $(e).text())
          .get()

        expect(cells).toEqual([
          'January',
          '£85',
          '£95',
          'February',
          '£75',
          '£55',
          'March',
          '£165',
          '£125'
        ])
      })
    })

    describe('when firstCellIsHeader is true', () => {
      it('are included', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const headings = $('.city-table')
          .find('tbody tr th')
          .map((_, e) => $(e).text())
          .get()

        expect(headings).toEqual(['January', 'February', 'March'])
      })

      it('have HTML escaped when passed as text', () => {
        const $ = render(
          'table',
          examples['firstCellIsHeader with html as text']
        )

        const $th = $('.city-table tbody tr th')

        expect($th.html()).toBe(
          'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
        )
      })

      it('allow HTML when passed as HTML', () => {
        const $ = render('table', examples['firstCellIsHeader with html'])

        const $th = $('.city-table tbody tr th')

        expect($th.html()).toBe('Foo <span>bar</span>')
      })

      it('are associated with their rows using scope="row"', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const $th = $('.city-table').find('tbody tr th')

        expect($th.attr('scope')).toBe('row')
      })

      it('have the city-table__header class', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const $th = $('.city-table').find('tbody tr th')

        expect($th.hasClass('city-table__header')).toBeTruthy()
      })

      it('can have additional classes', () => {
        const $ = render('table', examples['firstCellIsHeader with classes'])

        const $th = $('.city-table').find('tbody tr th')

        expect($th.hasClass('my-custom-class')).toBeTruthy()
      })

      it('can have rowspan specified', () => {
        const $ = render(
          'table',
          examples['firstCellIsHeader with rowspan and colspan']
        )

        const $th = $('.city-table').find('tbody tr th')

        expect($th.attr('rowspan')).toBe('2')
      })

      it('can have colspan specified', () => {
        const $ = render(
          'table',
          examples['firstCellIsHeader with rowspan and colspan']
        )

        const $th = $('.city-table').find('tbody tr th')

        expect($th.attr('colspan')).toBe('2')
      })

      it('can have additional attributes', () => {
        const $ = render('table', examples['firstCellIsHeader with attributes'])

        const $th = $('.city-table').find('tbody tr th')

        expect($th.attr('data-fizz')).toBe('buzz')
      })
    })
  })

  // =========================================================
  // Cells
  // =========================================================

  describe('cells', () => {
    it('can be specified', () => {
      const $ = render('table', examples.default)

      const cells = $('.city-table')
        .find('tbody tr')
        .map((_, tr) => {
          return [
            $(tr)
              .find('td')
              .map((_, td) => $(td).text())
              .get()
          ]
        })
        .get()

      expect(cells).toEqual([
        ['January', '£85', '£95'],
        ['February', '£75', '£55'],
        ['March', '£165', '£125']
      ])
    })

    it('can be skipped when falsy', () => {
      const $ = render('table', examples['with falsy items'])

      const cells = $('.city-table')
        .find('tbody tr')
        .map((_, tr) => {
          return [
            $(tr)
              .find('td')
              .map((_, td) => $(td).text())
              .get()
          ]
        })
        .get()

      expect(cells).toEqual([
        ['A', '1'],
        ['B', '2'],
        ['C', '3']
      ])
    })

    it('have HTML escaped when passed as text', () => {
      const $ = render('table', examples['html as text'])

      const $td = $('.city-table td')

      expect($td.html()).toBe(
        'Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;'
      )
    })

    it('allow HTML when passed as HTML', () => {
      const $ = render('table', examples.html)

      const $td = $('.city-table td')

      expect($td.html()).toBe('Foo <span>bar</span>')
    })

    it('can have a format specified', () => {
      const $ = render('table', examples.default)

      const $td = $('.city-table td')

      expect($td.hasClass('city-table__cell--numeric')).toBeTruthy()
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['rows with classes'])

      const $td = $('.city-table td')

      expect($td.hasClass('my-custom-class')).toBeTruthy()
    })

    it('can have rowspan specified', () => {
      const $ = render('table', examples['rows with rowspan and colspan'])

      const $td = $('.city-table td')

      expect($td.attr('rowspan')).toBe('2')
    })

    it('can have colspan specified', () => {
      const $ = render('table', examples['rows with rowspan and colspan'])

      const $td = $('.city-table td')

      expect($td.attr('colspan')).toBe('2')
    })

    it('can have additional attributes', () => {
      const $ = render('table', examples['rows with attributes'])

      const $td = $('.city-table td')

      expect($td.attr('data-fizz')).toBe('buzz')
    })
  })
})
