import { defineStore } from "pinia";
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
      nonkinkin: null,
      fiksasi: null,
      cm: null,
      bronkospifiberoptik: null,
      glidescope: null,
      trakeostomi: null,
      jenis: null,
    },
    intubasi: [],
    ventilasi: {
      spontan: null,
      kendali: null,
      ventilator: null,
      tv: null,
      rr: null,
      peep: null,
      konversi: null,
    },
    regional_anestesi: {
      spinalanastesi: null,
      epiduralanastesi: null,
      lainnya: null,
      lainnya_text: null,
      lokasi: null,
      jenisjarum: null,
      obat: null,
      komplikasi: null,
      hasil_total: '',
      hasil_partial: '',
      hasil_gagal: '',
    },
    komplikasi_anestesi: null,
    tanggal_mulai: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
    tanggal_selesai: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
  },
  formtabel:{
    noreg: null,
    monitoring_anestesi: {
      waktu: '',
      operasi: '',
      anestesi: '',
      sistole: '',
      diastole: '',
      nadi: '',
      spo2: '',
      rr: '',
      mode_ventilator: '',
      ekg: '',
      suhu: '',
      etco2: '',
      n2o_o2: '',
      flow: '',
      gas_anestesi: '',
      mac: '',
      obat: '',
      cairan: '',
    },
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
  async simpanDataTabel() {
    this.loadingSavetabel = true
    try {
      const resp = await api.post('v1/transaksi/laporan-anestesi/simpan-monitoring', this.formtabel)
      console.log('resp', resp)
      if (resp.status === 200) {
        // this.items.unshift(resp?.data?.data)
        // this.itemstabel = resp?.data?.data?.monitoring_anestesi
        this.itemstabel.unshift(resp?.data?.data?.monitoring_anestesi)
        notifSuccessVue(resp?.data?.message)
        this.loadingSavetabel = false
        // this.initForm()
      }
    } catch (error) {
      console.log(error)
      this.loadingSavetabel = false
      notifErrVue(error?.response?.data?.message)
    }
  },
  isiForm(val) {
    // console.log('val', val)
    const temp = val?.laporan_anastesi
    this.itemstabel.push({
      ...temp.monitoring_anestesi
    })

    this.form = {
      noreg: val?.noreg,
      infus_tempat_ukuran: {
        atas: temp?.infus_tempat_ukuran?.atas,
        bawah: temp?.infus_tempat_ukuran?.bawah
      },
      posisi_pasien: {
        atas: temp?.posisi_pasien?.atas,   // checkbox group
        bawah: temp?.posisi_pasien?.bawah   // checkbox manual
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
      klasifikasi_asa: temp?.klasifikasi_asa,
      tata_laksana_jalan_napas: {
        face_mask: temp?.tata_laksana_jalan_napas?.face_mask,
        ett: temp?.tata_laksana_jalan_napas?.ett,
        lma: temp?.tata_laksana_jalan_napas?.lma,
        nonkinkin: temp?.tata_laksana_jalan_napas?.nonkinkin,
        fiksasi: temp?.tata_laksana_jalan_napas?.fiksasi,
        cm: temp?.tata_laksana_jalan_napas?.cm,
        bronkospifiberoptik: temp?.tata_laksana_jalan_napas?.bronkospifiberoptik,
        glidescope: temp?.tata_laksana_jalan_napas?.glidescope,
        trakeostomi: temp?.tata_laksana_jalan_napas?.trakeostomi,
        jenis: temp?.tata_laksana_jalan_napas?.jenis,
      },
      intubasi: temp?.intubasi,
      ventilasi: {
        spontan: temp?.ventilasi?.spontan,
        kendali: temp?.ventilasi?.kendali,
        ventilator: temp?.ventilasi?.ventilator,
        tv: temp?.ventilasi?.tv,
        rr: temp?.ventilasi?.rr,
        peep: temp?.ventilasi?.peep,
        konversi: temp?.ventilasi?.konversi,
      },
      regional_anestesi: {
        spinalanastesi: temp?.regional_anestesi?.spinalanastesi,
        epiduralanastesi: temp?.regional_anestesi?.epiduralanastesi,
        lainnya: temp?.regional_anestesi?.lainnya,
        lainnya_text: temp?.regional_anestesi?.lainnya_text,
        lokasi: temp?.regional_anestesi?.lokasi,
        jenisjarum: temp?.regional_anestesi?.jenisjarum,
        obat: temp?.regional_anestesi?.obat,
        komplikasi: temp?.regional_anestesi?.komplikasi,
        hasil_total: temp?.regional_anestesi?.hasil_total,
        hasil_partial: temp?.regional_anestesi?.hasil_partial,
        hasil_gagal: temp?.regional_anestesi?.hasil_gagal,
      },
    }
    // this.itemstabel = temp?.monitoring_anestesi
  }
}
})
