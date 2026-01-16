import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccessVue } from 'src/modules/utils'
import { useListPasienAnastesiStore } from '../master/pelayanan/listpasienanastesi'

export const useAskanPraAnestesiStore = defineStore('askan-pra-anestesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    items: [],
    pasien: {},
    itemsaskanpraanestesi: [],
    meta: {},
    form: {
      noreg: null,
      fase: '',
      askan_data: {
        masalah_kesehatan_anestesi: null,
        waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
        intervensi: null,
        implementasi: null,
        evaluasi: {
          s: null,
          o: null,
          a: null,
          p: null,
        },
        nama_ttd: null,
      }
    },
    formpasca: {
      noreg: null,
      fase: '',
      askan_data: {
        masalah_kesehatan_anestesi: null,
        waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
        intervensi: null,
        implementasi: null,
        evaluasi: {
          s: null,
          o: null,
          a: null,
          p: null,
        },
        nama_ttd: null,
      }
    },
    formintra: {
      noreg: null,
      fase: '',
      askan_data: {
        masalah_kesehatan_anestesi: null,
        waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
        intervensi: null,
        implementasi: null,
        evaluasi: {
          s: null,
          o: null,
          a: null,
          p: null,
        },
        nama_ttd: null,
      }
    },
  }),
  actions: {
    async simpanData() {
      this.loadingSave = true
       let payload = null
      if(this.form.fase === 'Pra'){
         payload = {
          noreg: this.form.noreg,
          fase: this.form.fase, // "Pra" | "Intra" | "Post"

          askan_data: [
            {
              masalah_kesehatan_anestesi: this.form.askan_data.masalah_kesehatan_anestesi,
              waktu: this.form.askan_data.waktu,
              intervensi: this.form.askan_data.intervensi,
              implementasi: this.form.askan_data.implementasi,

              evaluasi: {
                s: this.form.askan_data.s,
                o: this.form.askan_data.o,
                a: this.form.askan_data.a,
                p: this.form.askan_data.p
              },

              nama_ttd: this.form.askan_data.nama_ttd
            }
          ]
        }
      }else if(this.formpasca.fase === 'Pasca'){
         payload = {
          noreg: this.formpasca.noreg,
          fase: this.formpasca.fase, // "Pra" | "Intra" | "Post"

          askan_data: [
            {
              masalah_kesehatan_anestesi: this.formpasca.askan_data.masalah_kesehatan_anestesi,
              waktu: this.formpasca.askan_data.waktu,
              intervensi: this.formpasca.askan_data.intervensi,
              implementasi: this.formpasca.askan_data.implementasi,

              evaluasi: {
                s: this.formpasca.askan_data.s,
                o: this.formpasca.askan_data.o,
                a: this.formpasca.askan_data.a,
                p: this.formpasca.askan_data.p
              },

              nama_ttd: this.formpasca.askan_data.nama_ttd
            }
          ]
        }
      }else if(this.formintra.fase === 'Intra'){
         payload = {
          noreg: this.formintra.noreg,
          fase: this.formintra.fase, // "Pra" | "Intra" | "Post"

          askan_data: [
            {
              masalah_kesehatan_anestesi: this.formintra.askan_data.masalah_kesehatan_anestesi,
              waktu: this.formintra.askan_data.waktu,
              intervensi: this.formintra.askan_data.intervensi,
              implementasi: this.formintra.askan_data.implementasi,

              evaluasi: {
                s: this.formintra.askan_data.s,
                o: this.formintra.askan_data.o,
                a: this.formintra.askan_data.a,
                p: this.formintra.askan_data.p
              },

              nama_ttd: this.formintra.askan_data.nama_ttd
            }
          ]
        }
      }

      try {
        const resp = await api.post('v1/transaksi/askan-anestesi/simpan', payload)
        if (resp.status === 200) {
          console.log('resp', resp?.data?.data)
          this.items = resp?.data?.data

          const storepasien = useListPasienAnastesiStore()
          storepasien.insertToPasien(this.pasien,'askan_anastesi',null)
          this.isiForm(this.items)
          notifSuccessVue(resp?.data.message)
          this.loadingSave = false

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
    initresponse(val) {
      console.log('initresponse', val)
      console.log('val.fase', val.fase)
      if(val?.fase === 'Pra'){
        this.form.noreg = val.noreg
        this.form.fase = val.fase
        const data = val.askan_data[0]
        this.form.askan_data = {
          masalah_kesehatan_anestesi: data.masalah_kesehatan_anestesi ?? '',
          waktu: data.waktu ?? '',
          intervensi: data.intervensi ?? '',
          implementasi: data.implementasi ?? '',
          nama_ttd: data.nama_ttd ?? '',

          // evaluasi dipetakan aman
          s: data.evaluasi?.s ?? '',
          o: data.evaluasi?.o ?? '',
          a: data.evaluasi?.a ?? '',
          p: data.evaluasi?.p ?? ''
        }
      }else if(val?.fase === 'Pasca'){
        this.formpasca.noreg = val.noreg
        this.formpasca.fase = val.fase
        const data = val.askan_data[0]
        this.formpasca.askan_data = {
          masalah_kesehatan_anestesi: data.masalah_kesehatan_anestesi ?? '',
          waktu: data.waktu ?? '',
          intervensi: data.intervensi ?? '',
          implementasi: data.implementasi ?? '',
          nama_ttd: data.nama_ttd ?? '',

          // evaluasi dipetakan aman
          s: data.evaluasi?.s ?? '',
          o: data.evaluasi?.o ?? '',
          a: data.evaluasi?.a ?? '',
          p: data.evaluasi?.p ?? ''
        }
      }

    },
    isiForm(val) {
      const temp = val?.askan_anastesi?.find(
        item => item.fase === 'Pra'
      )
       if (!temp || !temp.askan_data?.length) return

      const data = temp.askan_data[0]

      this.form.askan_data = {
        masalah_kesehatan_anestesi: data.masalah_kesehatan_anestesi ?? '',
        waktu: data.waktu ?? '',
        intervensi: data.intervensi ?? '',
        implementasi: data.implementasi ?? '',
        nama_ttd: data.nama_ttd ?? '',

        // evaluasi dipetakan aman
        s: data.evaluasi?.s ?? '',
        o: data.evaluasi?.o ?? '',
        a: data.evaluasi?.a ?? '',
        p: data.evaluasi?.p ?? ''
      }

      const temppasca = val?.askan_anastesi?.find(
        item => item.fase === 'Pasca'
      )
       if (!temppasca || !temppasca.askan_data?.length) return

      const datapasca = temppasca.askan_data[0]

      this.formpasca.askan_data = {
        masalah_kesehatan_anestesi: datapasca.masalah_kesehatan_anestesi ?? '',
        waktu: datapasca.waktu ?? '',
        intervensi: datapasca.intervensi ?? '',
        implementasi: datapasca.implementasi ?? '',
        nama_ttd: datapasca.nama_ttd ?? '',

        // evaluasi dipetakan aman
        s: datapasca.evaluasi?.s ?? '',
        o: datapasca.evaluasi?.o ?? '',
        a: datapasca.evaluasi?.a ?? '',
        p: datapasca.evaluasi?.p ?? ''
      }

      const tempintra = val?.askan_anastesi?.find(
        item => item.fase === 'Intra'
      )
       if (!tempintra || !tempintra.askan_data?.length) return

      const dataintra = tempintra.askan_data[0]

      this.formintra.askan_data = {
        masalah_kesehatan_anestesi: dataintra.masalah_kesehatan_anestesi ?? '',
        waktu: dataintra.waktu ?? '',
        intervensi: dataintra.intervensi ?? '',
        implementasi: dataintra.implementasi ?? '',
        nama_ttd: dataintra.nama_ttd ?? '',

        // evaluasi dipetakan aman
        s: dataintra.evaluasi?.s ?? '',
        o: dataintra.evaluasi?.o ?? '',
        a: dataintra.evaluasi?.a ?? '',
        p: dataintra.evaluasi?.p ?? ''
      }

    }
  }
})
