import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const useAssesmentPraInduksiStore = defineStore('assesment-pra-induksi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    itemsprainduksi: [],
    meta: {},
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // kesadaran: [],
      td: null,
      n: null,
      rr: null,
      suhu: null,
      saturasi: null,
      ekg: null,
      ivline: null,
      cairaninfus: null,
      darah: null,
      ga: null,
      scope: null,
      tube: null,
      airway: null,
      tape: null,
      introducer: null,
      connector: null,
      suction: null,
      regionalanastesi: null,
      alatyangdisiapkan: null,
      obatanestesi: null,
      obatemergency: null,
      penyakityangdiderita: null,
      alergi: null,
      keteranganalergi: null,
      lensakontak: null,
      keteranganlensakontak: null,
      penggunaanobatsebelumnya: null,
      keteranganpenggunaanobatsebelumnya: null,
      catatan: null,
    },
    tanggaldisplay: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },


  }),
  actions: {

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/asessement-pra-induksi/simpan', this.form)
        console.log('resp', resp)
        if (resp.data.status === true) {
          this.itemsprainduksi = resp?.data?.data
          notifSuccessVue(resp?.data.message)
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
