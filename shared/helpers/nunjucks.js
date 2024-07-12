const components = require('@city-frontend/lib/components')
const cheerio = require('cheerio')

/**
 * Render component HTML into cheerio
 *
 * @param {string} componentName - Component name
 * @param {MacroRenderOptions} [options] - Nunjucks macro render options
 * @returns {import('cheerio').CheerioAPI} HTML rendered by the macro
 */
function render(componentName, options) {
  return cheerio.load(components.render(componentName, options))
}

/**
 * Render template HTML into cheerio
 *
 * @param {string} templatePath - Nunjucks template path
 * @param {TemplateRenderOptions} [options] - Nunjucks template render options
 * @returns {import('cheerio').CheerioAPI} Nunjucks template output
 */
function renderTemplate(templatePath, options) {
  return cheerio.load(components.renderTemplate(templatePath, options))
}

module.exports = {
  render,
  renderTemplate
}

/**
 * @typedef {import('@city-frontend/lib/components').MacroOptions} MacroOptions
 * @typedef {import('@city-frontend/lib/components').MacroRenderOptions} MacroRenderOptions
 * @typedef {import('@city-frontend/lib/components').TemplateRenderOptions} TemplateRenderOptions
 */
