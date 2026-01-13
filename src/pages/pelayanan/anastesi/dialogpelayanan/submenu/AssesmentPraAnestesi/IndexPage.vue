<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- JUDUL -->
      <q-card flat class="q-mb-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">ASESMEN PRA ANESTESI</div>
        </q-card-section>
      </q-card>

      <!-- KLASIFIKASI ASA -->
      <q-card flat class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold q-mb-sm">Klasifikasi ASA</div>

          <q-option-group v-model="form.klassifikasi_asa" inline type="radio" :options="opsiASA" />
        </q-card-section>
      </q-card>

      <!-- PERTIMBANGAN ANESTESI -->
      <q-card flat class="q-mb-sm">
        <q-card-section>

          <div class="text-weight-bold q-mb-sm">Pertimbangan Anestesi</div>

          <!-- JENIS -->
          <div class="row items-center q-mb-sm">
            <div class="col-3">Jenis Anestesi</div>
            <div class="col">
              <q-option-group v-model="form.jenis_anastesi" inline type="checkbox" :options="opsiJenisAnestesi" />
            </div>
          </div>

          <!-- TEKNIK -->
          <div class="row q-mb-sm">
            <div class="col-3">Teknik Anestesi</div>
            <div class="col">
              <q-input v-model="form.teknik_anastesi" type="textarea" dense outlined />
            </div>
          </div>

          <!-- INDIKASI -->
          <div class="row">
            <div class="col-3">Indikasi</div>
            <div class="col">
              <q-input v-model="form.indikasi" type="textarea" dense outlined />
            </div>
          </div>

        </q-card-section>
      </q-card>
      <q-card flat class="q-mt-lg no-print">
        <q-card-section>
          <div class="text-weight-bold">Pelaksana Anestesi</div>

          <q-input v-model="form.nama_pelaksana" label="Nama Terang & Gelar" dense outlined />
        </q-card-section>
      </q-card>
      <div class="ttd-print">
        <div class="text-weight-bold">Pelaksana Anestesi</div>
        <div style="height:60px"></div>
        <div class="ttd-line"></div>
        <div class="q-mt-xs text-weight-bold">
          {{ form.nama_pelaksana }}
        </div>
      </div>


    </div>

    <!-- ACTION -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" label="Simpan" @click="simpan" />
        <q-btn color="yellow-9" label="Cetak" v-print="printObj" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>
<script setup>
import { reactive, computed } from 'vue'

const form = reactive({
  nama: null,
  no_rm: null,
  nik: null,
  diagnosis: null,
  tanggal: null,
  ruang: null,
  klassifikasi_asa: null,
  jenis_anastesi: [],
  teknik_anastesi: null,
  indikasi: null,
  nama_pelaksana: null,
  kode_user: null
})

const opsiASA = [
  { label: 'I', value: 'I' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
  { label: 'V', value: 'V' },
  { label: 'VI', value: 'VI' },
  { label: 'E', value: 'E' }
]

const opsiJenisAnestesi = [
  { label: 'General Anestesi', value: 'General Anestesi' },
  { label: 'Regional Anestesi', value: 'Regional Anestesi' }
]

function simpan() {
  console.log('DATA ASESMEN:', form)
}

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Asesmen Pra Anestesi',
  preview: false
}))
</script>
<style>
.ttd-line {
  width: 220px;
  border-bottom: 1px solid #000;
}

/* default */
.ttd-print {
  display: none;
}

@media print {
  @page {
    size: A4;
    margin: 15mm;
  }

  .no-print {
    display: none !important;
  }

  .ttd-print {
    display: block;
    position: absolute;
    bottom: 100mm;
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
