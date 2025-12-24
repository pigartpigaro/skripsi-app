import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import { notifSuccess, notifSuccessVue } from "src/modules/utils";

export const useMasterPasienStore = defineStore('master-pasien-store', {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    loadingSave: false,
    loadingDelete: false,
    disabled: false,
    form: {
      id: '',
      nama: '',
      nik: '',
      tgl_lahir: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kelamin: '',
      agama: '',
      suku: '',
      pendidikan: '',
      pekerjaan: '',
      status_perkawinan: '',
      tlp: '',
      nama_asuransi: '',
      nomor_asuransi: '',
      alamat: '',
      desa: '',
      kecamatan: '',
      kabupaten: '',
      provinsi: '',
      negara: '',
    },
    kelaminOptions: [
      { label: 'Laki - Laki', value: 'L' },
      { label: 'Perempuan', value: 'P' },
    ],
    agamaOptions: [
      { label: 'Islam', value: 'Islam' },
      { label: 'Kristen', value: 'Kristen' },
      { label: 'Katolik', value: 'Katolik' },
      { label: 'Hindu', value: 'Hindu' },
      { label: 'Buddha', value: 'Buddha' },
      { label: 'Konghucu', value: 'Konghucu' },
    ],
    statusPerkawinanOptions: [
      { label: 'Belum Kawin', value: 'Belum Kawin' },
      { label: 'Kawin', value: 'Kawin' },
      { label: 'Cerai Hidup', value: 'Cerai Hidup' },
      { label: 'Cerai Mati', value: 'Cerai Mati' },
    ],
    pendidikanOptions: [
      { label: 'Tidak/Belum Sekolah', value: 'Tidak/Belum Sekolah' },
      { label: 'SD/Sederajat', value: 'SD' },
      { label: 'SMP/Sederajat', value: 'SMP' },
      { label: 'SMA/Sederajat', value: 'SMA' },
      { label: 'Diploma', value: 'Diploma' },
      { label: 'Sarjana', value: 'Sarjana' },
      { label: 'Pasca Sarjana', value: 'Pasca Sarjana' },
    ],
    pekerjaanOptions: [
      { label: 'Tidak Bekerja', value: 'Tidak Bekerja' },
      { label: 'Pelajar/Mahasiswa', value: 'Pelajar/Mahasiswa' },
      { label: 'PNS', value: 'PNS' },
      { label: 'TNI/POLRI', value: 'TNI/POLRI' },
      { label: 'Karyawan Swasta', value: 'Karyawan Swasta' },
      { label: 'Wiraswasta', value: 'Wiraswasta' },
      { label: 'Lain - Lain', value: 'Lain - Lain' },
    ],
    displaytanggal: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    },
    options: [],
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
      console.log('this.form', this.form)
      try {
        const resp = await api.post('v1/master/pasien/simpan', this.form)

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
      const resp = await api.get('/v1/master/pasien/get-list', params)
      console.log('resp List Data', resp)
      if (resp.status === 200) {
        this.items = resp?.data?.data
        this.meta = resp?.data?.meta
        this.loading = false
      }
      this.loading = false
    },
    editForm(val) {
      this.form.id = val.id
      this.form.nama = val.nama
      this.form.nik = val.nik
      this.form.pendidikan = val.pendidikan
      this.form.kelamin = val.kelamin
      this.form.agama = val.agama
      this.form.pekerjaan = val.pekerjaan
      this.form.suku = val.suku
      this.form.status_perkawinan = val.status_perkawinan
      this.form.tlp = val.tlp
      this.form.tgl_lahir = val.tgl_lahir
      this.form.nama_asuransi = val.nama_asuransi
      this.form.nomor_asuransi = val.nomor_asuransi
      this.form.alamat = val.alamat
      this.form.desa = val.desa
      this.form.kecamatan = val.kecamatan
      this.form.kabupaten = val.kabupaten
      this.form.provinsi = val.provinsi
      this.form.negara = val.negara

    },
    async deleteData(id) {
      this.loadingDelete = true
      const payload = { id }
      try {
        const resp = await api.post('/v1/master/pasien/delete', payload)
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
        nama: '',
        nik: '',
        pendidikan: '',
        kelamin: '',
        agama: '',
        pekerjaan: '',
        suku: '',
        status_perkawinan: '',
        tlp: '',
        nama_asuransi: '',
        nomor_asuransi: '',
        alamat: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        negara: '',
        tgl_lahir: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      }
    }
  }
})
