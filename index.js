// attach all modules to document.__modules
// this must be done first
import './lib/yo-yo.js'
import './lib/dat-archive.js'
import './lib/beaker.js'

import App from './app.js'

App()
  .then(app => document.body.appendChild(app))
