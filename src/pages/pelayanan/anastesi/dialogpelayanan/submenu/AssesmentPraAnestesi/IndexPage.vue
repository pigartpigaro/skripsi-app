<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- JUDUL -->
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">ASSESMENT PRA ANASTESI</div>
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
                <div class="col-8">: {{ storepasien.pasien.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">No RM</div>
                <div class="col-8">: {{ storepasien.pasien.norm }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">NIK</div>
                <div class="col-8">: {{ storepasien.pasien.nik }}</div>
              </div>
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ storepasien.pasien.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tgl Pemeriksaan</div>
                <div class="col-7">: {{ storepasien.pasien.tgl_mrs }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang</div>
                <div class="col-7">: {{ storepasien.pasien.ruang_ranap }}</div>
              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>

      <!-- PERTIMBANGAN Anastesi -->
      <q-card flat class="q-mb-xs">
        <q-card-section>

          <div class="text-weight-bold">Klasifikasi ASA</div>

          <q-option-group class="q-mb-sm" v-model="store.form.klassifikasi_asa" inline type="radio"
            :options="opsiASA" />

          <div class="text-weight-bold">Pertimbangan Anastesi</div>

          <!-- JENIS -->
          <div class="row items-center q-mb-sm">
            <div class="col-3">Jenis Anastesi</div>
            <div class="col">
              <q-option-group v-model="store.form.jenis_anastesi" inline :options="opsiJenisAnastesi" />
            </div>
          </div>

          <!-- TEKNIK -->
          <div class="row q-mb-sm">
            <div class="col-3">Teknik Anastesi</div>
            <div class="col">
              <q-input v-model="store.form.teknik_anastesi" type="textarea" dense outlined />
            </div>
          </div>

          <!-- INDIKASI -->
          <div class="row">
            <div class="col-3">Indikasi</div>
            <div class="col">
              <q-input v-model="store.form.indikasi" type="textarea" dense outlined />
            </div>
          </div>

        </q-card-section>
      </q-card>
      <q-card flat class="q-mt-xs no-print">
        <q-card-section>
          <div class="text-weight-bold">Pelaksana Anastesi</div>

          <q-input v-model="store.form.nama_pelaksana" label="Nama Terang & Gelar" dense outlined />
        </q-card-section>
      </q-card>
      <div class="ttd-print">
        <div class="text-weight-bold">Pelaksana Anastesi</div>
        <div style="height:60px"></div>
        <div class="ttd-line"></div>
        <div class="q-mt-xs text-weight-bold">
          {{ store.form.nama_pelaksana }}
        </div>
      </div>


    </div>

    <!-- ACTION -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" :loading="store.loadingSave" label="Simpan" @click="simpan" />
        <q-btn color="yellow-9" label="Cetak" v-print="printObj" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>
<script setup>
import { useAssasementPraAnastesiStore } from 'src/stores/master/pelayanan/assesment_pra_anastesi'
import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi'
import { computed } from 'vue'
const store = useAssasementPraAnastesiStore()
const storepasien = useListPasienAnastesiStore()


const opsiASA = [
  { label: 'I', value: 'I' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
  { label: 'V', value: 'V' },
  { label: 'VI', value: 'VI' },
  { label: 'E', value: 'E' }
]

const opsiJenisAnastesi = [
  { label: 'General Anastesi', value: 'General Anastesi' },
  { label: 'Regional Anastesi', value: 'Regional Anastesi' }
]

function simpan() {
  store.form.noreg = storepasien.pasien.noreg
  store.simpanData()
}

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Asesmen Pra Anastesi',
  preview: false
}))
</script>
<style>
.label {
  font-weight: 500;
}

.ttd-line {
  width: 220px;
  border-bottom: 1px solid #000;
}

/* default */
.print-only,
.ttd-print {
  display: none;
}

@media print {
  @page {
    size: A4;
    margin: 15mm;
  }

  .print-only {
    display: block;
  }

  .no-print {
    display: none !important;
  }

  .ttd-print {
    display: block;
    position: absolute;
    /* jarak dari bawah kertas */
    right: 20mm;
    /* jarak dari kanan kertas */
    text-align: center;
  }

  body {
    background: white !important;
  }

  #printData {
    width: 210mm;
    min-height: 297mm;
    font-size: 12px;
    position: relative;
    padding: 15px;
  }

  .q-card {
    box-shadow: none !important;
    border: none !important;
  }

  .q-btn,
  .q-card-actions {
    display: none !important;
  }

}
</style>
