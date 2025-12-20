import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess, notifSuccessVue } from "src/modules/utils";

export const useMasterPekerjaanStore = defineStore('master-pekerjaan-store', {
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
  }),
  actions: {
    goTo(page) {
      this.params.page = page
      this.getData()
    },
    setForm(key, val) {
      this.form[key] = val
    },
    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/master/pekerjaan/simpan', this.form)

        if (resp.success === true) {
          this.form.kode = resp?.data?.data?.kode
          this.items = resp?.data?.data

        }
        notifSuccessVue(resp?.data?.message)
        this.init()
        this.getData()
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },
    async getData() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/master/pekerjaan/get-list', params)
      // console.log('resp Data Store', resp)
      if (resp.status === 200) {
        this.items = resp?.data?.data
        this.meta = resp?.data?.meta
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      this.form.id = val.id
      this.form.kode = val.kode
      this.form.nama = val.nama

    },
    async deleteData(id) {
      this.loadingDelete = true
      const payload = { id }
      try {
        const resp = await api.post('/v1/master/pekerjaan/delete', payload)
        if (resp.status === 200) {
          // this.items = resp?.data?.data
          notifSuccess(resp)
          this.getData()
        }
        this.loadingDelete = false
      }
      catch (error) {
        notifErr(error)
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
