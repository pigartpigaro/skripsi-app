import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { useRouter } from 'vue-router'

export const useAuthStores = defineStore('auths', {
  state: () => ({
    loading:false,
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  }),

  actions: {
    async logout () {
        console.log('LOGOUT')
      // const router = useRouter()
      this.loading=true
      try {
        await api.post('v1/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).then((resp)=>{
          console.log('then',resp);

          this.token = null
          this.user = null

          localStorage.removeItem('token')
          localStorage.removeItem('user')
        })
      } catch (err) {
        console.warn('Logout API failed:', err)
      } finally {
        this.loading=false
        // router.replace({ name: 'login' })
      }
    }
  }
})
