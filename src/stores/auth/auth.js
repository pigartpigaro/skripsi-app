import { defineStore } from 'pinia'
import api from 'src/boot/axios'

export const useAuthStores = defineStore('auths', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  }),

  actions: {
    async logout () {
      try {
        await api.post('v1/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      } catch (e) {
        // backend boleh gagal
      }

      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
