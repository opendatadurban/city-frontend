import { render } from '@city-frontend/lib/components'

/**
 * Component HTML code (formatted)
 *
 * @this {{ env: import('nunjucks').Environment }}
 * @param {string} componentName - Component name
 * @param {MacroRenderOptions} [options] - Nunjucks macro render options
 * @returns {string} HTML rendered by the component
 */
export function getHTMLCode(componentName, options) {
  return render(componentName, { ...options, env: this.env })
}

/**
 * @typedef {import('@city-frontend/lib/components').MacroRenderOptions} MacroRenderOptions
 */
