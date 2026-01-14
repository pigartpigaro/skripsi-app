import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const useSerahterimaPreOperasiStore = defineStore('serahterima-preoperasi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    form: {
      noreg: null,
      kesadaran: [],
      riwayat_penyakit: [],
      riwayat_penyakit_lain: null,
      riwayat_alergi_obat: null,
      jenis_alergi_obat: null,
      reaksi_alergi_obat: null,
      persiapan_operasi: [],
      mulai_puasa: null,
      alat_kesehatan: [],
      alat_kesehatan_lainnya: null,
      jenis_darah: [],
      jumlah_darah: null,
      vital_td: null,
      vital_n: null,
      vital_s: null,
      vital_rr: null,
    },

  }),
  actions: {

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/serah-terima-pre-operasi/simpan', this.form)

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
