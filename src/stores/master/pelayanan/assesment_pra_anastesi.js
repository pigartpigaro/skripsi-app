import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const useAssasementPraAnastesiStore = defineStore('assasement-pra-anastesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    form: {
      noreg: null,
      nama: null,
      no_rm: null,
      nik: null,
      diagnosis: null,
      tanggal: null,
      ruang: null,
      klassifikasi_asa: null,
      jenis_anastesi: [],
      teknik_anastesi: null,
      indikasi: null,
      nama_pelaksana: null,
      kode_user: null
    },

  }),
  actions: {

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/assasement-pra-anastesi/simpan', this.form)

        if (resp.success === true) {
          this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message)
          this.loadingSave = false

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
  }
})
