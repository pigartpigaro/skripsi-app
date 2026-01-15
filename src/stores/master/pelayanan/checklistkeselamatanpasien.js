import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const useChecklistKeselamatanPasienStore = defineStore('checklist-keselamatan-pasien-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    form: {
      noreg: null,
      konfirmasi_pasien: [],
      lokasi_operasi_ditandai: null,
      mesin_anestesi_lengkap: null,
      pulse_oxymeter_berfungsi: null,
      riwayat_alergi: null,
      keterangan_alergi: null,
      resiko_jalan_napas: null,
      ketersediaan_alat_bantuan: null,
      resiko_kehilangan_darah: null,
      dua_akses_iv: null,
      rencana_terapi_cairan: null,

      // TIME OUT
      konfirmasi_tim: '',
      konfirmasi_pasien_prosedur_lokasi: '',
      antibiotik_profilaksis: null,
      nama_antibiotik: null,
      jam_antibiotik: null,
      dosis_antibiotik: null,

      // ANTISIPASI KRITIS
      langkah_kondisi_kritis: null,
      estimasi_lama_operasi: null,
      antisipasi_kehilangan_darah: null,
      catatan_tim_anestesi: null,
      peralatan_steril: '',
      alat_perlu_perubahan_khusus: null,
      foto_penunjang: null,

      // SIGN OUT
      konfirmasi_verbal: [],
      review_masalah_utama: null,
      jenis_implan: null,
      kode_implan: null,


    },
    displaytanggal: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },

  }),
  actions: {

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/checklist-keselamatan-operasi/simpan', this.form)

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
