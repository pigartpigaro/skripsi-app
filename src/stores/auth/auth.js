import { defineStore } from 'pinia'
import api from 'src/boot/axios'
import { useRouter } from 'vue-router'

export const useAuthStores = defineStore('auths', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  }),

  actions: {
    async logout () {
      console.log('LOGOUT')
    const router = useRouter()

    try {
      if (this.token) {
        await api.post('v1/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      }
    } catch (err) {
      console.warn('Logout API failed:', err)
    } finally {
      this.token = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      router.replace({ name: 'login' })
    }
  }
}
})
