import { acceptHMRUpdate, defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import { notifErrVue, notifSuccessVue } from "src/modules/utils";

export const useLaporananastesiStore = defineStore('laporan-anastesi-store', {
state: () => ({
  loadingSave: false,
  loadingSavetabel: false,
  form: {
    noreg: null,
    infus_tempat_ukuran: {
      atas: '',
      bawah: ''
    },
    posisi_pasien: {
      atas: [],   // checkbox group
      bawah: []   // checkbox manual
    },
    premedikasi:{
      oral: null,
      iv: null,
      im: null
    },
    induksi: {
      inhalasi: null,
      intravena: null,
    },
    klasifikasi_asa: [],
    tata_laksana_jalan_napas: {
      face_mask: null,
      ett: null,
      lma: null,
      nonkinkin: false,
      fiksasi: false,
      cm: null,
      bronkospifiberoptik: null,
      glidescope: null,
      trakeostomi: null,
      jenis: null,
    },
    intubasi: [],
    ventilasi: {
      spontan: false,
      kendali: false,
      ventilator: false,
      tv: null,
      rr: null,
      peep: null,
      konversi: null,
    },
    regional_anestesi: {
      spinalanastesi: false,
      epiduralanastesi: false,
      lainnya: false,
      lainnya_text: null,
      lokasi: null,
      jenisjarum: null,
      obat: null,
      komplikasi: null,
      hasil_total: false,
      hasil_partial: false,
      hasil_gagal: false,
    },
    komplikasi_anestesi: null,
    tanggal_mulai: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    tanggal_selesai: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
  },
  formtabel:{
    noreg: null,
    monitoring_anestesi: []
    // monitoring_anestesi: {
    //   waktu: '',
    //   operasi: '',
    //   anestesi: '',
    //   sistole: '',
    //   diastole: '',
    //   nadi: '',
    //   spo2: '',
    //   rr: '',
    //   mode_ventilator: '',
    //   ekg: '',
    //   suhu: '',
    //   etco2: '',
    //   n2o_o2: '',
    //   flow: '',
    //   gas_anestesi: '',
    //   mac: '',
    //   obat: '',
    //   cairan: '',
    // },
  },
  itemstabel: [],

}),
  actions: {
    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/transaksi/laporan-anestesi/simpan', this.form)
        console.log('resp', resp)
        if (resp.status === 200) {
          // this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message)
          this.loadingSave = false
          // this.initForm()
        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
    async simpanDataTabel () {
      this.loadingSavetabel = true

      try {
        // 1️⃣ ambil input baru (clone biar aman)
        const rowBaru = {
          ...this.formtabel.monitoring_anestesi
        }

        // 2️⃣ gabungkan dengan data lama (di depan)
        const monitoringGabungan = [
          rowBaru,
          ...this.itemstabel
        ]

        // 3️⃣ susun payload kirim SEMUA DATA
        const payload = {
          noreg: this.formtabel.noreg,
          monitoring_anestesi: monitoringGabungan
        }

        // 4️⃣ kirim ke backend
        const resp = await api.post(
          'v1/transaksi/laporan-anestesi/simpan-monitoring',
          payload
        )

        console.log('resp', resp)

        if (resp.status === 200) {
          // 5️⃣ update tabel frontend (clone biar aman)
          this.itemstabel = monitoringGabungan.map(item => ({ ...item }))

          notifSuccessVue(resp?.data?.message)

          // 6️⃣ reset form input (TANPA ganggu data lama)
          Object.keys(this.formtabel.monitoring_anestesi)
            .forEach(k => this.formtabel.monitoring_anestesi[k] = '')
        }

      } catch (error) {
        console.log(error)
        notifErrVue(error?.response?.data?.message)
      } finally {
        this.loadingSavetabel = false
      }
    },

    isiForm(val) {
      // console.log('val', val)
    if (!val || typeof val !== 'object') {
      console.warn('isiForm: val bukan object', val)
      return
    }

      const temp = val?.laporan_anastesi
      if (!temp) {
        console.warn('laporan_anastesi kosong', val)
        return
      }

      // RESET dulu biar gak dobel
      this.itemstabel = []

      // monitoring_anestesi HARUS array
      if (Array.isArray(temp.monitoring_anestesi)) {
        this.itemstabel.push(...temp.monitoring_anestesi)
      }

        this.form = {
          noreg: val?.noreg,
          infus_tempat_ukuran: {
            atas: temp?.infus_tempat_ukuran?.atas,
            bawah: temp?.infus_tempat_ukuran?.bawah
          },
          posisi_pasien: {
            atas: temp?.posisi_pasien?.atas ?? [],   // checkbox group
            bawah: temp?.posisi_pasien?.bawah ?? []  // checkbox manual
          },
          premedikasi:{
            oral: temp?.premedikasi?.oral,
            iv: temp?.premedikasi?.iv,
            im: temp?.premedikasi?.im
          },
          induksi: {
            inhalasi: temp?.induksi?.inhalasi,
            intravena: temp?.induksi?.intravena,
          },
          klasifikasi_asa: temp?.klasifikasi_asa ?? [],
          komplikasi_anestesi: temp?.komplikasi_anestesi,
          tata_laksana_jalan_napas: {
            face_mask: temp?.tata_laksana_jalan_napas?.face_mask,
            ett: temp?.tata_laksana_jalan_napas?.ett,
            lma: temp?.tata_laksana_jalan_napas?.lma,
            nonkinkin: temp?.tata_laksana_jalan_napas?.nonkinkin ?? false,
            fiksasi: temp?.tata_laksana_jalan_napas?.fiksasi ?? false,
            cm: temp?.tata_laksana_jalan_napas?.cm,
            bronkospifiberoptik: temp?.tata_laksana_jalan_napas?.bronkospifiberoptik,
            glidescope: temp?.tata_laksana_jalan_napas?.glidescope,
            trakeostomi: temp?.tata_laksana_jalan_napas?.trakeostomi,
            jenis: temp?.tata_laksana_jalan_napas?.jenis,
          },
          intubasi: temp?.intubasi ?? [],
          ventilasi: {
            spontan: temp?.ventilasi?.spontan ?? false,
            kendali: temp?.ventilasi?.kendali ?? false,
            ventilator: temp?.ventilasi?.ventilator ?? false,
            tv: temp?.ventilasi?.tv,
            rr: temp?.ventilasi?.rr,
            peep: temp?.ventilasi?.peep,
            konversi: temp?.ventilasi?.konversi,
          },
          regional_anestesi: {
            spinalanastesi: temp?.regional_anestesi?.spinalanastesi ?? false,
            epiduralanastesi: temp?.regional_anestesi?.epiduralanastesi ?? false,
            lainnya: temp?.regional_anestesi?.lainnya ?? false,
            lainnya_text: temp?.regional_anestesi?.lainnya_text,
            lokasi: temp?.regional_anestesi?.lokasi,
            jenisjarum: temp?.regional_anestesi?.jenisjarum,
            obat: temp?.regional_anestesi?.obat,
            komplikasi: temp?.regional_anestesi?.komplikasi,
            hasil_total: temp?.regional_anestesi?.hasil_total ?? false,
            hasil_partial: temp?.regional_anestesi?.hasil_partial ?? false,
            hasil_gagal: temp?.regional_anestesi?.hasil_gagal ?? false,
          },
        }
      // this.itemstabel = temp?.monitoring_anestesi
    },
    async hapusitemtabel() {
      this.loadingSavetabel = true
      const payload = {
          noreg: this.form.noreg,
          monitoring_anestesi: this.itemstabel
        }
        console.log('payload', payload)
        try {
          const resp = await api.post('v1/transaksi/laporan-anestesi/hapusitemtabel', payload)

          if (resp.status === 200) {
            // this.itemstabel = this.itemstabel.filter(item => item.id !== id)
            notifSuccessVue(resp?.data?.message)
          }
        } catch (error) {
          console.log(error)
          notifErrVue(error?.response?.data?.message)
        } finally {
          this.loadingSavetabel = false
        }
    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaporananastesiStore, import.meta.hot))

}
