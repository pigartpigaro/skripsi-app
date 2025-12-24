// vite

import _ from 'lodash'
import { boot } from 'quasar/wrappers'

// Remove eager loading
const globalComponents = import.meta.glob('components/~global/*.vue')
// eslint-disable-next-line no-unused-vars
const startIndex = '/~global/'.length

export default boot(({ app }) => {
  const componentPromises = Object.keys(globalComponents).map(async (key) => {
    const component = await globalComponents[key]()
    const componentName = _.upperFirst(
      _.camelCase(key.split('/').pop().replace(/\.\w+$/, ''))
    )

    // Register component
    app.component(componentName, component.default)
  })

  // Wait for all components to be registered
  return Promise.all(componentPromises)
})
