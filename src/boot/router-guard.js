import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'

export default boot(({  }) => {
  const authStore = useAuthStore()

  // pastikan store sudah restore token dari localStorage
  authStore.fetchUser?.()
  // const router = createRouter({
  //   scrollBehavior: () => ({ left: 0, top: 0 }),
  //   router,
  //   history: createHistory(process.env.VUE_ROUTER_BASE)
  // })

  // router.beforeEach((to, from, next) => {
  //   // kalau user sudah login tapi akses halaman guest (login/register)
  //   if (to.meta.guest && authStore.isLoggedIn) {
  //     return next({ name: 'dashboard' })
  //   }

  //   // kalau halaman butuh auth tapi belum login
  //   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
  //     return next({ name: 'login' })
  //   }

  //   next()
  // })
})
