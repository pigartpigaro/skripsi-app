import { boot } from 'quasar/wrappers'

let routerInstance = null

export default boot(({ router }) => {
  routerInstance = router
})

export function getRouter() {
  if (!routerInstance) {
    throw new Error('Router belum di-initialisasi!')
  }
  return routerInstance
}

export { routerInstance }
