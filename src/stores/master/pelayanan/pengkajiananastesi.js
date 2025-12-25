import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const usePengkajianAnastesiStore = defineStore('pengkajian-anastesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    falergi: {
      makanan: null,
      obat: null,
      lainnya: ''
    },
    falergiobat: {
      hipertensi: null,
      antidiabetik: null,
      diuretik: null,
      antikoagulan: null,
      digitalis: null,
      lainnya: ''
    },
    formcari: {
      pekerjaan: ''
    }
  }),
  actions: {

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
  }
})
