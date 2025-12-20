import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const usePekerjaanStore = defineStore('pekerjaan', {
  state: () => ({
    loadingSave: false,
    items: [],
    params: {
      q: null
    },
    form: {
      pekerjaan: ''
    }
  }),
  actions: {
    search (val) {
      this.params.q = val
    },
    refresh () {
      this.params.q = null
    },
    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/master/pekerjaan/save', this.form)

        if (resp.success === true) {
          this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message)
          this.loadingSave = false
          this.initForm()

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
    initForm() {
      this.form = {
        pekerjaan: ''
      }
    }
  }
})
