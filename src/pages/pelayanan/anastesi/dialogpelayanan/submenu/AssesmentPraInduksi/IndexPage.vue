<template>
  <!-- <pre>{{ props.pasien?.asessement_pra_induksi }}</pre> -->
  <q-page class="q-pa-md bg-grey-6">
    <div id="printData" class="q-pa-md full-width full-height bg-white">
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">ASSESMENT PRA INDUKSI</div>
        </q-card-section>
      </q-card>

      <!-- IDENTITAS -->
      <q-card flat class="q-mb-xs print-only">
        <q-card-section>

          <div class="row q-col-gutter-xl">
            <!-- KIRI -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-4 label">Nama</div>
                <div class="col-8">: {{ pasien?.pasien?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">No RM</div>
                <div class="col-8">: {{ pasien?.pasien?.norm }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">NIK</div>
                <div class="col-8">: {{ pasien.pasien?.nik }}</div>
              </div>
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien.pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tgl Pemeriksaan</div>
                <div class="col-7">: {{ pasien.pasien?.tgl_mrs }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang</div>
                <div class="col-7">: {{ pasien.pasien?.ruang_ranap }}</div>
              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>
      <q-separator spaced style="border-top: 1px solid #000" />
      <q-form @submit="simpan" class="q-gutter-sm">
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm text-weight-medium">
            Tanggal:
          </div>
          <q-input v-model="store.form.tanggal" dense type="text" autogrow @db-model="setTo" @set-display="setToDisp">
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="store.form.tanggal" mask="YYYY-MM-DD" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <app-input-date-human :model="store.tanggaldisplay.tgldari" label="Tanggal" dense autogrow @db-model="setTo"
          @set-display="setToDisp" /> -->
        </div>
        <div class="q-ml-md row q-mt-md items-center no-wrap">
          <div class="q-mr-sm text-weight-medium">
            Kesadaran:
          </div>
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            TD:
          </div>
          <q-input v-model="store.form.td" dense type="number" autogrow />
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            N:
          </div>
          <q-input v-model="store.form.n" dense type="number" autogrow />
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            RR:
          </div>
          <q-input v-model="store.form.rr" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Suhu:
          </div>
          <q-input v-model="store.form.suhu" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Saturasi O₂:
          </div>
          <q-input v-model="store.form.saturasi" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Gambaran EKG:
          </div>
          <q-input v-model="store.form.ekg" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Pemasangan IV Line:
          </div>
          <q-radio v-model="store.form.iv_line" val="1" label="1 buah" />
          <q-radio v-model="store.form.iv_line" val="2" label="2 buah" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Cairan infus & darah:
          </div>
          <q-radio v-model="store.form.infus_darah" val="tidak" label="Tidak" />
          <q-radio v-model="store.form.infus_darah" val="siap" label="Siap" />
          <q-input dense v-if="store.form.infus_darah === 'siap'" v-model="store.form.
            jenis_infus_darah" placeholder="Jenis" class="q-ml-sm" style="max-width:200px" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Mesin Anastesi:
          </div>
          <q-radio v-model="store.form.mesin_anastesi" val="siap" label="Siap" />
          <q-radio v-model="store.form.mesin_anastesi" val="tidak" label="Tidak" />
        </div>

        <!-- GENERAL ANESTESI -->
        <div class="q-mt-md">
          <div class="text-weight-bold q-ml-md">Kesiapan Peralatan Anestesi</div>
          <div class="q-ml-md row items-center no-wrap">
            <div class="q-mr-sm">
              General Anestesi:
            </div>
            <q-radio v-model="store.form.ga" val="siap" label="Siap" />
            <q-radio v-model="store.form.ga" val="tidak" label="Tidak" />
          </div>
          <div class="q-ml-lg q-mt-sm">
            <q-input v-for="item in store.form.ga_array" :key="item.key" dense v-model="item.value"
              :label="item.label" />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Regional Anestesi:
          </div>
          <q-radio v-model="store.form.ra" val="siap" label="Siap" />
          <q-radio v-model="store.form.ra" val="tidak" label="Tidak" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Alat Yang disiapkan:
          </div>
          <q-radio v-model="store.form.ra_array" val="siap" label="Siap" />
          <q-radio v-model="store.form.ra_array" val="tidak" label="Tidak" />
        </div>
        <!-- <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm">
          Alat Yang disiapkan:
        </div>
        <q-radio v-model="store.form.ga" val="siap" label="Siap" />
        <q-radio v-model="store.form.ga" val="tidak" label="Tidak" />
      </div> -->
        <div class="q-ml-md row items-center no-wrap">
          <div class="col-2 q-mr-sm">
            Obat Anastesi:
          </div>
          <div class="col-9">
            <q-input dense v-model="store.form.obat_anastesi_array" autogrow />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="col-2 q-mr-sm">
            Obat Emergency:
          </div>
          <div class="col-9">
            <q-input dense v-model="store.form.obat_emergensi_array" autogrow />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Penyakit Yang Diderita:
          </div>
          <q-radio v-model="store.form.penyakit" val="tidak" label="Tidak" />
          <q-radio v-model="store.form.penyakit" val="ada" label="Ada" />
          <q-input dense v-if="store.form.penyakit === 'ada'" v-model="store.form.nama_penyakit" placeholder="Jenis"
            class="q-ml-sm" style="max-width:200px" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Gigi Palsu:
          </div>
          <q-radio v-model="store.form.gigi_palsu" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.gigi_palsu" val="Ada, Permanen" label="Ada, Permanen" />
          <q-radio v-model="store.form.gigi_palsu" val="Ada, Sudah Dilepas" label="Ada, Sudah Dilepas" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Alergi:
          </div>
          <q-radio v-model="store.form.alergi" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.alergi" val="Ada" label="Ada" />
          <q-input dense v-if="store.form.alergi === 'Ada'" v-model="store.form.nama_alergi" placeholder="Jenis"
            class="q-ml-sm" style="max-width:200px" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Lensa Kontak:
          </div>
          <q-radio v-model="store.form.lensa_kontak" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.lensa_kontak" val="Ada Sudah Dilepas" label="Ada Sudah Dilepas" />
        </div>
        <div class="q-ml-md row items-center no-wrap ">
          <div class="q-mr-sm">
            Penggunaan Obat sebelumnya:
          </div>
          <q-radio v-model="store.form.obat_sebelum" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.obat_sebelum" val="Ada" label="Ada" />
          <div class="q-mr-sm">
            <q-input dense v-if="store.form.obat_sebelum === 'Ada'" v-model="store.form.nama_obat_sebelum"
              placeholder="Jelaskan" class="q-ml-md" style="width:500px" autogrow />
          </div>
        </div>

        <div class="q-ml-md row items-center q-mt-sm">
          <div class="col-auto">Catatan Lain</div>
          <div class="col-9">
            <q-input dense v-model="store.form.catatan_lain" />
          </div>
        </div>

        <div class="q-mt-md text-right q-gutter-sm print-hide">
          <q-btn label="Simpan" type="submit" color="red" :loading="store.loadingSave" :disabled="store.loadingSave" />
          <q-btn label="Cetak" color="red" v-print="printObj" />
        </div>
      </q-form>
      <!-- </div> -->
    </div>
  </q-page>
</template>
<script setup>

import { useAssesmentPraInduksiStore } from 'src/stores/transaksi/assesmenprainduksi';
import { computed, onMounted } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useAssesmentPraInduksiStore()
function setTo(val) {
  store.form.tanggal = val
}

function setToDisp(val) {
  store.tanggaldisplay.tanggal = val
}

function simpan() {
  store.form.noreg = props.pasien.noreg
  store.simpanData()
}

onMounted(() => {
  store.form.noreg = props.pasien.noreg
  const rinci = props.pasien?.asessement_pra_induksi
  store.form.td = rinci?.td
  store.form.n = rinci?.n
  store.form.rr = rinci?.rr
  store.form.suhu = rinci?.suhu
  store.form.saturasi = rinci?.saturasi
  store.form.ekg = rinci?.ekg
  store.form.iv_line = rinci?.iv_line
  store.form.infus_darah = rinci?.infus_darah
  store.form.jenis_infus_darah = rinci?.jenis_infus_darah
  store.form.mesin_anastesi = rinci?.mesin_anastesi
  store.form.ga = rinci?.ga
  store.form.ga_array = rinci?.ga_array

  // store.form.scope = rinci?.scope
  // store.form.tube = rinci?.tube
  // store.form.airway = rinci?.airway
  // store.form.tape = rinci?.tape
  // store.form.introducer = rinci?.introducer
  // store.form.connector = rinci?.connector
  // store.form.suction = rinci?.suction
  store.form.ra = rinci?.ra
  store.form.ra_array = rinci?.ra_array
  store.form.obat_anastesi_array = rinci?.obat_anastesi_array
  store.form.obat_emergensi_array = rinci?.obat_emergensi_array
  store.form.penyakit = rinci?.penyakit
  store.form.nama_penyakit = rinci?.nama_penyakit
  store.form.gigi_palsu = rinci?.gigi_palsu
  store.form.obat_sebelum = rinci?.obat_sebelum
  store.form.alergi = rinci?.alergi
  store.form.nama_alergi = rinci?.nama_alergi
  store.form.lensa_kontak = rinci?.lensa_kontak
  store.form.keteranganlensakontak = rinci?.keteranganlensakontak
  store.form.nama_obat_sebelum = rinci?.nama_obat_sebelum
  store.form.keteranganpenggunaanobatsebelumnya = rinci?.keteranganpenggunaanobatsebelumnya
  store.form.catatan_lain = rinci?.catatan_lain

})

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Asesmen Pra Anastesi',
  preview: false
}))
</script>
<style>
.print-only,
.ttd-print {
  display: none;
}

@media print {
  .text-h6 {
    padding-left: 5mm;
    padding-right: 5mm;
  }

  body {
    background: white !important;
  }

  .print-only,
  .ttd-print {
    display: block !important;
  }

  .no-print,
  .q-btn,
  .q-card-actions {
    display: none !important;
  }

  #printData {
    width: 100%;
    padding: 0;
    /* ⬅️ padding dipindah ke @page */
    box-sizing: border-box;
    font-size: 12px;
  }

  .q-card {
    box-shadow: none !important;
    border: none !important;
  }

  .ttd-line {
    width: 200px;
    border-bottom: 1px solid #000;
  }
}
</style>
