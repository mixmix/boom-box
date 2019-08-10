import App from '../app.js'

// this module has to be transpiled to be run by node (because of the es6 imports)

const sass = getStyles(App)

console.log(sass)

function getStyles (node, results = '') {
  results += node.styles || ''

  if (node.components) {
    results += Object.values(node.components)
      .map(child => {
        return getStyles(child, results)
      })
      .join('\n')
  }

  return results
}
