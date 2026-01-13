import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const usePemantauanPascaAnestesiStore = defineStore('pemantauan-pasca-anestesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    form: {
      noreg: null,
      tanggal: null,
        jam_masuk_rr: date.formatDate(new Date(), 'HH:mm'),
        jam_keluar_rr: null,

        jalan_napas: null,
        alat_bantu_napas: null,
        pernapasan: null,
        bila_spontan: null,
        kesadaran: null,

        pemantauan_vital: [],

        posisi_pasien: null,
        makan_minum: null,
        infus_transfusi: null,
        obat_obatan: null,
        pemantauan_ttv: null,
        lain_lain: null

    },
    displaytanggal: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },

  }),
  actions: {

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/pemantauan-pasca-anastesi/simpan', this.form)

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
