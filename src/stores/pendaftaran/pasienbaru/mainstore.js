import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import { notifSuccess, notifSuccessVue } from "src/modules/utils";

export const useKunjunganPasienStore = defineStore('master-kunjungan-pasien-store', {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    loadingSave: false,
    loadingDelete: false,
    disabled: false,
    tipePasien: 'lama',
    norm: '',
    noreg: '',
    form: {
      id: '',
      norm: '',
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
    formkunjungan: {
      tgl_mrs: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      tgl_pengkajian: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jam_pengkajian: date.formatDate(Date.now(), 'HH:mm'),
      diagnosa: '',
      rencana_tindakan: '',
      ruang_ranap: '',
      kelas: '',
      cara_masuk: '',
      pintu_masuk: '',
      alergi: '',
      rs: '',
    },
    formpendamping: {
      nama: '',
      tgl_lahir: '',
      kelamin: '',
      tlp: '',
      agama: '',
      pendidikan: '',
      pekerjaan: '',
      suku: '',
      hubungan_dengan_pasien: '',
      alamat: '',
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
    caramasukOptions: [
      { label: 'Datang Sendiri', value: 'Datang Sendiri' },
      { label: 'Rujukan Dokter/Bidan/Klinik', value: 'Rujukan Dokter/Bidan/Klinik' },
      { label: 'Rujukan RS/Puskesmas/Klinik', value: 'Rujukan RS/Puskesmas/Klinik' },
      { label: 'Kasus Polisi', value: 'Kasus Polisi' },
    ],
    pintumasukOptions: [
      { label: 'IRJ', value: 'IRJ' },
      { label: 'IGD', value: 'IGD' },
      { label: 'Langsung', value: 'Langsung' }
    ],
    displaytanggal: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      mrs: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      pengkajian: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    },
  }),
  actions: {
    goTo(page) {
      this.params.page = page
      this.getData()
    },
    setForm(key, val) {
      this.form[key] = val
      this.formkunjungan[key] = val
      this.formpendamping[key] = val
    },
    async simpanData() {
      this.loadingSave = true
      let payload = {}
      if (this.tipePasien === 'lama') {
         payload = {
          norm: this.norm,
          pasien: {},
          kunjungan: this.formkunjungan,
          pendamping: this.formpendamping
        }
      } else {
        payload = {
          norm: '',
          pasien: this.form,
          kunjungan: this.formkunjungan,
          pendamping: this.formpendamping
        }
      }
      console.log('payload simpanData', payload)
      try {
        const resp = await api.post('v1/transaksi/kunjungan/simpan', payload)
        console.log('resp simpanData', resp)
        if (resp.success === true) {
          // this.form.norm = resp?.data?.data?.kode
          this.noreg = resp?.data?.kunjungan?.noreg
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
      }
      this.formkunjungan = {
        tgl_mrs: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        tgl_pengkajian: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        jam_pengkajian: date.formatDate(Date.now(), 'HH:mm'),
        diagnosa: '',
        rencana_tindakan: '',
        ruang_ranap: '',
        kelas: '',
        cara_masuk: '',
        pintu_masuk: '',
        alergi: '',
        rs: '',
      }
      this.formpendamping = {
        nama: '',
        tgl_lahir: '',
        kelamin: '',
        tlp: '',
        agama: '',
        pendidikan: '',
        pekerjaan: '',
        suku: '',
        hubungan_dengan_pasien: '',
        alamat: ''
      }
    }
  }
})
