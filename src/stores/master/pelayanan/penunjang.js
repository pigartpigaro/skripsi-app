import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue, notifErrVue } from 'src/modules/utils'
import { useListPasienAnastesiStore } from './listpasienanastesi'

export const usePenunjangStore = defineStore('penunjang-store', {
  state: () => ({
    loadingLab: false,
    loadingRadiologi: false,

    lab: {
      dokumen: null,
      file: null
    },

    radiologi: {
      dokumen: null,
      file: null,
      hasil_bacaan: ''
    }
  }),

  actions: {
    /* ===================== LAB ===================== */
    async fetchLabDokumen(pasien) {
      try {
        const resp = await api.get(
          'v1/transaksi/penunjang-laborat/dokumen',
          { params: { noreg:pasien?.noreg } }
        )
        this.lab.dokumen = resp.data?.data || null
      } catch (e) {
        console.error(e)
      }
    },
    kunjungan(){return useListPasienAnastesiStore()},
    async simpanLab(pasien) {
      // const kunjungan=useListPasienAnastesiStore()
      console.log('kunj',this.kunjungan()?.pasien);

      this.loadingLab = true
      try {
        const fd = new FormData()
        fd.append('noreg', pasien?.noreg)
        fd.append('norm', pasien?.norm)
        if (this.lab.file) fd.append('dokumen', this.lab.file)

        const resp = await api.post(
          'v1/transaksi/penunjang-laborat/simpan',
          fd
        )

        notifSuccessVue(resp.data?.message)
        this.lab.dokumen = resp.data?.data
        this.kunjungan().insertToPasien(pasien,'laboratorium',resp.data?.data)
        this.lab.file = null
      } catch (e) {
        notifErrVue(e?.response?.data?.message)
      } finally {
        this.loadingLab = false
      }
    },

    async hapusLab(id) {
      try {
        await api.post('v1/transaksi/penunjang-laborat/delete', { id })
         this.kunjungan().insertToPasien(pasien,'laboratorium',null)
        this.lab.dokumen = null
        notifSuccessVue('Dokumen laboratorium berhasil dihapus')
      } catch (e) {
        notifErrVue(e?.response?.data?.message)
      }
    },

    resetLabForm() {
      this.lab.file = null
    },

    /* ================== RADIOLOGI ================== */
    async fetchRadiologiDokumen(pasien) {
      try {
        const resp = await api.get(
          'v1/transaksi/penunjang-radiologi/dokumen',
          { params: { noreg:pasien?.noreg } }
        )
        this.radiologi.dokumen = resp.data?.data || null
      } catch (e) {
        console.error(e)
      }
    },

    async simpanRadiologi(pasien) {
      this.loadingRadiologi = true
      try {
        const fd = new FormData()
        fd.append('noreg', pasien?.noreg)
        fd.append('norm', pasien?.norm)
        fd.append('hasil_bacaan', this.radiologi.hasil_bacaan)
        if (this.radiologi.file) fd.append('dokumen', this.radiologi.file)

        const resp = await api.post(
          'v1/transaksi/penunjang-radiologi/simpan',
          fd
        )

        notifSuccessVue(resp.data?.message)
        this.radiologi.dokumen = resp.data?.data
        this.kunjungan().insertToPasien(pasien,'radiologi',resp.data?.data)
        this.resetRadiologiForm()
      } catch (e) {
        notifErrVue(e?.response?.data?.message)
      } finally {
        this.loadingRadiologi = false
      }
    },

    async hapusRadiologi(id) {
      try {
        await api.post('v1/transaksi/penunjang-radiologi/delete', { id })
        this.radiologi.dokumen = null
         this.kunjungan().insertToPasien(pasien,'radiologi',null)
        notifSuccessVue('Dokumen radiologi berhasil dihapus')
      } catch (e) {
        notifErrVue(e?.response?.data?.message)
      }
    },

    resetRadiologiForm() {
      this.radiologi.file = null
      this.radiologi.hasil_bacaan = ''
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePenunjangStore, import.meta.hot)
  )
}
