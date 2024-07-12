// @ts-nocheck
import * as cityFrontend from '../city/city-frontend.min.js'

// Maintain window global for compatibility
window.cityFrontend = cityFrontend

if (
  window.cityPrototypeKit &&
  window.cityPrototypeKit.documentReady &&
  window.cityPrototypeKit.majorVersion >= 13
) {
  window.cityPrototypeKit.documentReady(() => {
    window.cityFrontend.initAll()
  })
}
