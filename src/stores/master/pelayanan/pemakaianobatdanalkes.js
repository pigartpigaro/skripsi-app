import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const usePemakaianObatdanAlkesStore = defineStore('pemakaian-obat-alkes-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    form: {
      noreg: null,
      cairan: [],
      obat: [],
      alkes: [],

    },
  }),
  actions: {
    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/pemakaian-obat-alkes/simpan', this.form)

        if (resp.success === true || resp.status === 200) {
          this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message || resp?.message)


        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
  }
})
