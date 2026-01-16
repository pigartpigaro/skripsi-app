<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- JUDUL -->
      <q-card flat class="q-mb-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">
            PEMANTAUAN PASCA ANESTESI
          </div>
        </q-card-section>
      </q-card>

      <!-- IDENTITAS -->
      <q-card flat class="q-mb-xs print-only">
        <q-card-section>
          <div class="row q-col-gutter-xl">
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
                <div class="col-4 label">Umur</div>
                <div class="col-8">: {{ pasien?.pasien?.usia }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">NIK</div>
                <div class="col-8">: {{ pasien?.pasien?.nik }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Jenis Kelamin</div>
                <div class="col-7">: {{ pasien?.pasien?.kelamin }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang</div>
                <div class="col-7">: {{ pasien?.ruang_ranap }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tindakan</div>
                <div class="col-7">: {{ pasien?.tindakan_operasi }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- WAKTU -->
      <q-card flat class="q-mb-sm">
        <q-card-section class="row q-col-gutter-sm">
          <app-input-date-human v-model="store.displaytanggal.tanggal" label="Tanggal" outlined
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" :disable="store.tipePasien === 'lama'"
            @db-model="modelTanggal" @set-display="displayTanggal" />
          <q-input dense outlined v-model="store.form.jam_masuk_rr" label="Jam Masuk RR" mask="##:##" fill-mask
            @focus="showJamMasuk = true">
            <q-popup-proxy v-model="showJamMasuk">
              <q-time v-model="store.form.jam_masuk_rr" format24h>
                <div class="row items-center justify-end q-gutter-sm q-pa-sm">
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-input>

          <q-input dense outlined v-model="store.form.jam_keluar_rr" label="Jam Keluar RR" mask="##:##" fill-mask
            @focus="showJamKeluar = true">
            <q-popup-proxy v-model="showJamKeluar">
              <q-time v-model="store.form.jam_keluar_rr" format24h>
                <div class="row items-center justify-end q-gutter-sm q-pa-sm">
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-input>

          <!--
          <q-input dense outlined class="col" v-model="store.form.jam_masuk_rr" label="Jam Masuk RR" />
          <q-input dense outlined class="col" v-model="store.form.jam_keluar_rr" label="Jam Keluar RR" /> -->
        </q-card-section>
      </q-card>

      <!-- KONDISI -->
      <q-card flat class="q-mb-sm">
        <q-card-section>

          <div class="text-subtitle2">Jalan Napas</div>
          <q-option-group v-model="store.form.jalan_napas" type="radio" inline :options="opsiJalanNapas" />

          <q-input v-if="store.form.jalan_napas === 'Terpasang alat bantu'" v-model="store.form.alat_bantu_napas"
            label="Jenis alat bantu" dense outlined />

          <div class="text-subtitle2 q-mt-sm">Pernapasan</div>
          <q-option-group v-model="store.form.pernapasan" type="radio" inline :options="opsiPernapasan"
            @update:model-value="modelPernapasan" />

          <template v-if="store.form.pernapasan === 'Spontan'">
            <div class="text-subtitle2 q-mt-sm">Bila Spontan</div>
            <q-option-group v-model="store.form.bila_spontan" type="radio" inline :options="opsiSpontan" />
          </template>

          <div class="text-subtitle2 q-mt-sm">Kesadaran</div>
          <q-option-group v-model="store.form.kesadaran" type="radio" inline :options="opsiKesadaran" />

        </q-card-section>
      </q-card>

      <!-- TABEL PEMANTAUAN -->
      <q-card flat class="q-mb-sm">
        <q-card-section>
          <q-table flat bordered dense :rows="store.form.pemantauan_vital" :columns="columns" row-key="id" hide-bottom>
            <template #body-cell="props">
              <q-td :props="props">
                <q-input dense v-model="props.row[props.col.name]" />
              </q-td>
            </template>
          </q-table>

          <q-btn flat icon="add" label="Tambah Waktu" @click="tambahBaris" />
        </q-card-section>
      </q-card>

      <!-- INSTRUKSI -->
      <q-card flat>
        <q-card-section>
          <div class="q-col-gutter-sm">
            <div class="text-subtitle2 q-mb-sm">Istruksi Pasca Anestesi</div>
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.posisi_pasien"
              label="Posisi Pasien" />
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.makan_minum"
              label="Makan / Minum" />
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.infus_transfusi"
              label="Infus / Transfusi" />
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.obat_obatan"
              label="Obat-obatan" />
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.pemantauan_ttv"
              label="Pemantauan Tanda Vital" />
            <q-input class="q-gutter-sm" autogrow outlined type="textarea" v-model="store.form.lain_lain"
              label="Lain-lain" />
          </div>

        </q-card-section>
      </q-card>

    </div>

    <!-- ACTION -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" label="Simpan" :loading="store.loadingSave" @click="simpan" />
        <q-btn color="yellow-9" label="Cetak" v-print="printObj" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>


<script setup>
import { date } from 'quasar'
import { usePemantauanPascaAnestesiStore } from 'src/stores/master/pelayanan/pemantauanpascaanestesi.'
import { computed, ref, watch } from 'vue'
const showJamMasuk = ref(false)
const showJamKeluar = ref(false)
const store = usePemantauanPascaAnestesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const columns = [
  { name: 'waktu', label: 'Waktu', field: 'waktu', align: 'left' },
  { name: 'sistole', label: 'Sistole', field: 'sistole', align: 'left' },
  { name: 'diastole', label: 'Diastole', field: 'diastole', align: 'left' },
  { name: 'nadi', label: 'Nadi', field: 'nadi', align: 'left' },
  { name: 'spo2', label: 'SpO2', field: 'spo2', align: 'left' },
  { name: 'rr', label: 'RR', field: 'rr', align: 'left' },
  { name: 'obat', label: 'Obat', field: 'obat', align: 'left' },
  { name: 'cairan', label: 'Cairan', field: 'cairan', align: 'left' }
]
const opsiJalanNapas = [
  { label: 'Bersih dan lapang', value: 'Bersih dan lapang' },
  { label: 'Terpasang alat bantu', value: 'Terpasang alat bantu' }
]
const opsiPernapasan = [
  { label: 'Spontan', value: 'Spontan' },
  { label: 'Dibantu', value: 'Dibantu' }
]
const opsiSpontan = [
  { label: 'Adekuat bersuara', value: 'Adekuat bersuara' },
  { label: 'Penyumbatan', value: 'Penyumbatan' },
  { label: 'Membutuhkan bantuan alat', value: 'Membutuhkan bantuan alat' }
]

function modelPernapasan(val) {
  // if (!val === 'Spontan') store.form.bila_spontan = null
  if (val === 'Dibantu') store.form.bila_spontan = null
  // if (!val === 'Reaksi') store.form.reaksi_alergi_obat = null
}
const opsiKesadaran = [
  { label: 'Sadar betul', value: 'Sadar betul' },
  { label: 'Belum sadar', value: 'Belum sadar' },
  { label: 'Tidur dalam', value: 'Tidur dalam' }
]
function tambahBaris() {
  if (!Array.isArray(store.form.pemantauan_vital)) {
    store.form.pemantauan_vital = []
  }

  // store.form.pemantauan_vital.push({
  //   id: Date.now() + Math.random(),
  //   waktu: '',
  //   sistole: '',
  //   diastole: '',
  //   nadi: '',
  //   spo2: '',
  //   rr: '',
  //   obat: '',
  //   cairan: ''
  // })

  const lastRow =
    store.form.pemantauan_vital.length > 0
      ? store.form.pemantauan_vital[store.form.pemantauan_vital.length - 1]
      : {
        waktu: '',
        sistole: '',
        diastole: '',
        nadi: '',
        spo2: '',
        rr: '',
        obat: '',
        cairan: ''
      }

  store.form.pemantauan_vital.push({
    id: Date.now() + Math.random(),
    ...JSON.parse(JSON.stringify(lastRow)) // deep clone biar gak nyangkut reactive
  })
}
function modelTanggal(val) {
  if (!val) return
  const dates = new Date(val)
  store.form.tanggal = date.formatDate(dates, 'YYYY-MM-DD')
}
function displayTanggal(val) {
  store.displaytanggal.tanggal = val
}
function simpan() {
  store.form.noreg = props.pasien.noreg
  store.simpanData()
}

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Pemantauan Pasca Anestesi',
  preview: false,
  extraCss: '',
  extraHead: '',
  beforeOpenCallback() {
    console.log('wait...')
  },
  openCallback() {
    console.log('opened')
  },
  closeCallback() {
    console.log('closePrint')
    emit('close')
  }
}))
watch(
  () => props.pasien?.pemantauan_pasca_anastesi,
  (val) => {
    if (!val) return
    Object.assign(store.form, val)
  },
  { immediate: true }
)
</script>
<style>
.print-only {
  display: none;
}

@media print {
  @page {
    size: A4;
    margin: 15mm;
    padding: 5mm;
  }

  .print-only {
    display: block;
  }

  body {
    background: white !important;
  }

  /* Area yang dicetak */
  #printData {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    font-size: 12px;
  }

  /* Hilangkan shadow/card */
  .q-card {
    box-shadow: none !important;
    border: none !important;
  }

  /* Tombol tidak ikut tercetak */
  .q-btn,
  .q-card-actions {
    display: none !important;
  }
}
</style>
