const routes = [

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
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue')
      }
    ]
  },
  {
    path: '/master',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dokter',
        name: 'master.dokter',
        component: () => import('pages/master/dokter/IndexPage.vue')
      },
      {
        path: 'pasien',
        name: 'master.pasien',
        component: () => import('pages/master/pasien/IndexPage.vue')
      },
      {
        path: 'pendidikan',
        name: 'master.pendidikan',
        component: () => import('pages/master/pendidikan/IndexPage.vue')
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
