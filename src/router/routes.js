const routes = [
  // {
  //   path: '/',
  //   // component: () => import('layouts/MainLayout.vue'),
  //   component: () => import('layouts/Auth/AuthLayout.vue'),
  //   children: [
  //     // { path: '', component: () => import('pages/IndexPage.vue') }
  //     { path: '', redirect: '/login/form-login' },
  //     { path: '/login', redirect: '/login/form-login' },
  //     { path: '/login/:mode', name: 'login-mode', component: () => import('pages/auth/LoginPageV2.vue') }
  //   ]
  // },

  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/auth/LoginPageV2.vue')
      }
    ]
  },

  {
    path: '/',
    redirect: '/login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
