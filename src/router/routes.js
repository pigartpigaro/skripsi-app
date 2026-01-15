const routes = [

  {
    path: '/login',
    meta: {
      requiresAuth: false
    },
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
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue')
      }
    ]
  },
  {
    path: '/master',
    meta: {
      requiresAuth: true
    },
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
        path: 'pekerjaan',
        name: 'master.pekerjaan',
        component: () => import('pages/master/pekerjaan/IndexPage.vue')
      },
      {
        path: 'pendidikan',
        name: 'master.pendidikan',
        component: () => import('pages/master/pendidikan/IndexPage.vue')
      },
      {
        path: 'cara-masuk',
        name: 'master.cara-masuk',
        component: () => import('pages/master/caramasuk/IndexPage.vue')
      },
      {
        path: 'asuransi',
        name: 'master.asuransi',
        component: () => import('pages/master/asuransi/IndexPage.vue')
      },
      {
        path: 'ruangan',
        name: 'master.ruangan',
        component: () => import('pages/master/ruangan/IndexPage.vue')
      },
      {
        path: 'agama',
        name: 'master.agama',
        component: () => import('pages/master/agama/IndexPage.vue')
      }
    ]
  },
  {
    path: '/pendaftaran',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'pasienbaru',
        name: 'pendaftaran.pasienbaru',
        component: () => import('pages/pendaftaran/pasienbaru/IndexPage.vue')
      }
    ]
  },
  {
    path: '/pelayanan',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'anastesi',
        name: 'pelayanan.anastesi',
        component: () => import('pages/pelayanan/anastesi/IndexPage.vue')
      }
    ]
  },

  {
    path: '/logout',
    meta: {
      requiresAuth: true
    },
    beforeEnter: async () => {
       console.log('BEFORE ENTER LOGOUT')
      const { useAuthStore } = await import('src/stores/auth/auth.js')
      const store = useAuthStore()

      await store.logout()

      return { path: '/login', replace: true }
    }
  },


  // {
  //   path: '/',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   redirect: '/dashboard'
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
