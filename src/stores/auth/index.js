import { defineStore } from 'pinia'
import { api } from 'boot/axios'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(payload) {
      this.loading = true
      try {
        const res = await api.post('/v1/auth/login', payload)

        if(res.status != 200){
          throw new Error('Login failed')
        }else{
          this.token = res.data.token
          this.user = res.data.user

          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))
          console.log('index.js', this.user)
          api.defaults.headers.common.Authorization = `Bearer ${this.token}`
        }


        // const router = getRouter()
        // if (router) router.push('/dashboard')

        return true
      } catch (err) {
        console.log('err login', err)
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        delete api.defaults.headers.common.Authorization

        throw err.response?.data || err
        // return false
      } finally {
        this.loading = false
      }
    },

    // async getprofil() {
    //   try {
    //     const res = await api.post('/v1/auth/profile')
    //     this.user = res.data
    //     localStorage.setItem('user', JSON.stringify(this.user))
    //   } catch (err) {
    //     throw err.response?.data || err
    //   }
    // },


    async register (payload) {
      this.loading = true
      try {
        const res = await api.post('/v1/auth/register', payload)
        if(res.status == 200){
         notifSuccess('Register Berhasil, Silahkan Login')
        }
      } catch (err) {
        throw err.response?.data || err
      } finally {
        this.loading = false
      }
    },

    // async register (payload) {
    //   this.loading = true
    //   try {
    //     const res = await api.post('/register', payload)

    //     this.token = res.data.token
    //     this.user = res.data.user

    //     localStorage.setItem('token', this.token)
    //     api.defaults.headers.common.Authorization = `Bearer ${this.token}`

    //     return res
    //   } catch (err) {
    //     throw err.response?.data || err
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // async fetchUser () {
    //   if (!this.token) return

    //   api.defaults.headers.common.Authorization = `Bearer ${this.token}`

    //   try {
    //     const res = await api.get('/me')
    //     this.user = res.data
    //   } catch {
    //     this.logout()
    //   }
    // },

    logout () {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common.Authorization
    }
  }
})
