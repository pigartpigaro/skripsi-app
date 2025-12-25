  import { defineStore } from 'pinia'
  import { date } from 'quasar'
  import { api } from 'src/boot/axios'
  import { notifSuccessVue } from 'src/modules/utils'

  export const useListPasienAnastesiStore = defineStore('list-pasien-anastesi-store', {
    state: () => ({
      loadingcari: false,
      loadingSave: false,
      dialogPelayanan: false,
      pasien: {},
      items: [],
      meta: {},
      params: {
        q: '',
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        page: 1,
        per_page: 10
      },
      tanggaldisplay: {
        tgldari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        tglsampai: date.formatDate(Date.now(), 'DD MMMM YYYY')
      },
      formcari: {
        pekerjaan: ''
      }
    }),
    actions: {
      search (val) {
        this.params.q = val
        this.getData()
      },
      refresh () {
        this.getData()
      },
      async getData() {
        this.loadingcari = true
        const params = { params: this.params }
        const resp = await api.get('/v1/transaksi/kunjungan/get-list', params)
        // console.log('resp Data Store', resp)
        if (resp.status === 200) {
          this.items = resp?.data?.data
          this.meta = resp?.data?.meta
          this.loadingcari = false
        }
        this.loadingcari = false
      },
      async simpanData() {
        this.loadingSave = true
        try {
          const resp = await api.post('v1/master/pekerjaan/save', this.form)

          if (resp.success === true) {
            this.items.unshift(resp?.data?.data)
            notifSuccessVue(resp?.data?.message)
            this.loadingSave = false
            this.initForm()

          }
        } catch (error) {
          console.log(error)
          this.loadingSave = false
          notifErrVue(error?.response?.data?.message)
        }
      },
      // initForm() {
      //   this.form = {
      //     pekerjaan: ''
      //   }
      // }
    }
  })
