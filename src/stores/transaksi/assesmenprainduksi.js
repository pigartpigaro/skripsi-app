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
      iv_line: null,
      infus_darah: null,
      jenis_infus_darah: null,
      mesin_anastesi: null,
      ga: null,
      // scope: null,
      // tube: null,
      // airway: null,
      // tape: null,
      // introducer: null,
      // connector: null,
      // suction: null,
      ra: null,
      ra_array: null,
      obat_anastesi_array: null,
      obat_emergensi_array: null,
      penyakit: null,
      nama_penyakit: null,
      alergi: null,
      nama_alergi: null,
      gigi_palsu: null,
      lensa_kontak: null,
      keteranganlensakontak: null,
      obat_sebelum: null,
      nama_obat_sebelum: null,
      catatan_lain: null,
      ga_array: [
    { key: 'scope', label: 'Scope', value: null },
    { key: 'tube', label: 'Tube', value: null },
    { key: 'airway', label: 'Airway', value: null },
    { key: 'tape', label: 'Tape', value: null },
    { key: 'introducer', label: 'Introducer', value: null },
    { key: 'connector', label: 'Connector', value: null },
    { key: 'suction', label: 'Suction', value: null }
  ],
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
