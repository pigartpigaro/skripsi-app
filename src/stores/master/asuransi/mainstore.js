import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErrVue, notifSuccessVue } from "src/modules/utils";

export const useMasterAsuransiStore = defineStore('master-asuransi-store', {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    loadingSave: false,
    loadingDelete: false,
    form: {
      id: '',
      kode: '',
      nama: '',
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
    },
    akuns: [],
    bidangs: [],
    optionrekening: [],
  }),
  actions: {
    goTo(page) {
      this.params.page = page
      this.getData()
    },
    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/master/asuransi/simpan', this.form)
        console.log('resp', resp.data.data)
        if (resp.status === 200) {
          //this.items = resp?.data?.data
          if(this.form.id === '') this.items.unshift(resp?.data?.data)
            else {
              const index = this.items.findIndex(item => item.id === this.form.id)
              this.items[index] = resp?.data?.data
            }
          notifSuccessVue(resp?.data?.message)
          this.init()
          this.loadingSave = false

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/master/asuransi/get-list', params)
      // console.log('resp Kegiatan BLUD', resp)
      if (resp.status === 200) {
        this.items = resp?.data?.data
        this.meta = resp?.data?.meta
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      // console.log('valedit', val)
      this.form.id = val.id
      this.form.kode = val.kode
      this.form.nama = val.nama
      // this.form.group = val?.groups?.toString()

    },
    async deleteData(id) {
      this.loadingDelete = true
      const payload = { id }
      try {
        const resp = await api.post('/v1/master/asuransi/delete', payload)
        if (resp.status === 200) {
          // this.items = resp?.data?.data
          this.items = this.items.filter(item => item.id !== id)
          notifSuccessVue(resp?.data?.message)
        }
        this.loadingDelete = false
      }
      catch (error) {
        notifErrVue(error)
        this.loadingDelete = false
      }
    },
    search(val) {
      this.params.q = val
      this.getData()
    },
    init() {
      this.form = {
        id: '',
        kode: '',
        nama: '',
      }
    }
  }
})
