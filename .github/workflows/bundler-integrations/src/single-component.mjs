// An example of importing a single component from city-frontend and initialising it
import { Button } from 'city-frontend'

const $buttons = document.querySelectorAll('[data-module="city-button"]')

$buttons.forEach(($button) => {
  /* eslint-disable-next-line no-new */
  new Button($button)
})
