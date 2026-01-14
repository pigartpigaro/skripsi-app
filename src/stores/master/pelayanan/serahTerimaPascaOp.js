import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue, notifErrVue } from 'src/modules/utils'
import { useListPasienAnastesiStore } from './listpasienanastesi'

export const useSerahTerimaPascaOpStore = defineStore('serah-terima-pasaca-op', {
  state: () => ({
    loadingSave: false,

    form: {
      tujuan:'',
      situation: '',
      background: '',
      assessment: '',
      recommendation: '',
      penyerah_nama: '',
      penerima_nama: '',
    }
  }),

  actions: {
    resetForm (tujuan) {
      this.form = {
        tujuan:tujuan,
        situation: '',
        background: '',
        assessment: '',
        recommendation: '',
        penyerah_nama: '',
        penerima_nama: '',
      }
    },


    async simpan (pasien,tujuan) {
      this.loadingSave = true
      const kunj=useListPasienAnastesiStore()
      try {
        const payload = {
          noreg:pasien?.noreg,
          ...this.form
        }

        const resp = await api.post(
          'v1/transaksi/serah-terima-pasca/simpan',
          payload
        )

        notifSuccessVue(resp?.data?.message || 'Data berhasil disimpan')
        kunj.insertToPasienWithParam(pasien,'serah_terima_pasca_op',resp?.data?.data,'tujuan',tujuan)
        // this.resetForm(tujuan)
      } catch (err) {
        notifErrVue(err?.response?.data?.message || 'Gagal menyimpan data')
      } finally {
        this.loadingSave = false
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useSerahTerimaPascaOpStore, import.meta.hot)
  )
}
