const devServerOptions = require('./jest-dev-server.config.js')

/**
 * @type {import('jest-environment-puppeteer').JestPuppeteerConfig}
 */
module.exports = {
  browserContext: 'incognito',

  /**
   * Workaround for jest-environment-puppeteer 'uncaughtException'
   * see error handling in '@city-frontend/helpers/jest/environment/puppeteer.mjs'
   */
  exitOnPageError: false,

  /**
   * Puppeteer launch options
   */
  launch: {
    args: [
      /**
       * Allow tests to use file:// paths
       */
      '--allow-file-access-from-files',

      /**
       * Prevent empty Chrome startup window
       * Tests use their own `browser.newPage()` instead
       */
      '--no-startup-window'
    ],

    /**
     * Allow headless mode switching using `HEADLESS=false`
     *
     * {@link https://developer.chrome.com/articles/new-headless/}
     */
    headless: process.env.HEADLESS !== 'false',

    // See launch arg '--no-startup-window'
    waitForInitialPage: false
  },

  /**
   * Development server options
   */
  server: devServerOptions
}
