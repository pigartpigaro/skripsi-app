import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const useListPasienAnastesiStore = defineStore('list-pasien-anastesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    items: [],
    params: {
      q: '',
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglsampai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    },
    tanggaldisplay: {
      tgldari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tglsampai: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    formcari: {
      pekerjaan: ''
    }
  }),
  actions: {
    // search (val) {
    //   this.params.q = val

    // },
    // refresh () {
    //   this.params.q = null
    // },
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
    // initForm() {
    //   this.form = {
    //     pekerjaan: ''
    //   }
    // }
  }
})
