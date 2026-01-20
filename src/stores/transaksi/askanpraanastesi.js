import { defineStore } from 'pinia'
// import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'
import { useListPasienAnastesiStore } from '../master/pelayanan/listpasienanastesi'

export const useAskanPraIntraPascaAnestesiStore = defineStore('askan-praintrapasca-anestesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    items: [],
    pasien: {},
    itemsaskanpraanestesi: [],
    meta: {},
    // form: {
    //   noreg: null,
    //   fase: '',
    //   askan_data: [{
    //     masalah_kesehatan_anestesi: null,
    //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    //     intervensi: null,
    //     implementasi: null,
    //     evaluasi: {
    //       s: null,
    //       o: null,
    //       a: null,
    //       p: null,
    //     },
    //     nama_ttd: null,
    //   }]
    // },
    // formpasca: {
    //   noreg: null,
    //   fase: '',
    //   askan_data: {
    //     masalah_kesehatan_anestesi: null,
    //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    //     intervensi: null,
    //     implementasi: null,
    //     evaluasi: {
    //       s: null,
    //       o: null,
    //       a: null,
    //       p: null,
    //     },
    //     nama_ttd: null,
    //   }
    // },
    // formintra: {
    //   noreg: null,
    //   fase: '',
    //   askan_data: {
    //     masalah_kesehatan_anestesi: null,
    //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    //     intervensi: null,
    //     implementasi: null,
    //     evaluasi: {
    //       s: null,
    //       o: null,
    //       a: null,
    //       p: null,
    //     },
    //     nama_ttd: null,
    //   }
    // },
    form: {
      noreg: null,
      fase: 'Pra',
      askan_data: []
    },
    formpasca: {
      noreg: null,
      fase: 'Pasca',
      askan_data: []
    },
    formintra: {
      noreg: null,
      fase: 'Intra',
      askan_data: []
    }
  }),
  actions: {
    async simpanData (faseAktif) {
      this.loadingSave = true

      const source =
        faseAktif === 'Pra' ? this.form :
        faseAktif === 'Pasca' ? this.formpasca :
        this.formintra

      const payload = {
        noreg: source.noreg,
        fase: source.fase,
        askan_data: source.askan_data.map(row => ({
          data: row.data,
          masalah_kesehatan_anestesi: row.masalah_kesehatan_anestesi,
          waktu: row.waktu,
          intervensi: row.intervensi,
          implementasi: row.implementasi,
          evaluasi: {
            s: row.s,
            o: row.o,
            a: row.a,
            p: row.p
          },
          nama_ttd: row.nama_ttd
        }))
      }
      console.log('payload', payload)
      try {
        const resp = await api.post('v1/transaksi/askan-anestesi/simpan', payload)

        const storepasien = useListPasienAnastesiStore()
        storepasien.insertToPasien(this.pasien,'askan_anastesi',null)
        this.isiForm(this.items)
        notifSuccessVue(resp?.data.message)
        // this.loadingSave = false
      } catch (e) {
        notifErrVue(e.response?.data?.message)
      } finally {
        this.loadingSave = false
      }
    },
    initresponse (val) {
      const target =
        val.fase === 'Pra' ? this.form :
        val.fase === 'Pasca' ? this.formpasca :
        this.formintra

      target.noreg = val.noreg
      target.fase = val.fase

      target.askan_data = val.askan_data.map(item => ({
        id: Date.now() + Math.random(),
        data: item.data ?? '',
        masalah_kesehatan_anestesi: item.masalah_kesehatan_anestesi ?? '',
        waktu: item.waktu ?? '',
        intervensi: item.intervensi ?? '',
        implementasi: item.implementasi ?? '',
        s: item.evaluasi?.s ?? '',
        o: item.evaluasi?.o ?? '',
        a: item.evaluasi?.a ?? '',
        p: item.evaluasi?.p ?? '',
        nama_ttd: item.nama_ttd ?? ''
      }))
    },
    isiForm (val) {
      const mapAskan = (fase, target) => {
        const temp = val?.askan_anastesi?.find(i => i.fase === fase)
        if (!temp || !temp.askan_data?.length) return

        target.noreg = val.noreg
        target.fase = fase

        target.askan_data = temp.askan_data.map(item => ({
          id: Date.now() + Math.random(),
          data: item.data ?? '',
          masalah_kesehatan_anestesi: item.masalah_kesehatan_anestesi ?? '',
          waktu: item.waktu ?? '',
          intervensi: item.intervensi ?? '',
          implementasi: item.implementasi ?? '',
          s: item.evaluasi?.s ?? '',
          o: item.evaluasi?.o ?? '',
          a: item.evaluasi?.a ?? '',
          p: item.evaluasi?.p ?? '',
          nama_ttd: item.nama_ttd ?? ''
        }))
      }

      mapAskan('Pra', this.form)
      mapAskan('Pasca', this.formpasca)
      mapAskan('Intra', this.formintra)
    }
  }
})
