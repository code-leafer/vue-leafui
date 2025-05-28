import { App } from 'vue'
import { version } from './version'

import * as components from './component'

const install = (app: App, options = {}) => {
  // Register components
  Object.entries(components).forEach(([key, component]) => {
    app.component(key, component)
  })

  // Apply global options if any
  if (options) {
    // Future: handle global options like custom themes, locale, etc.
  }

  return app
}

export default {
  version,
  install
} 