<template>
  <!-- <pre>{{ props.pasien?.asessement_pra_induksi }}</pre> -->
  <q-page class="q-pa-md bg-grey-6">
    <div id="printData" class="q-pa-md full-width full-height bg-white">
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">LAPORAN ANASTESI</div>
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
      <q-form class="q-gutter-sm">
        <div class="text-weight-bold q-mb-xs">Infus – Tempat dan Ukuran</div>
        <div class="q-ml-md">
          <div class="q-ml-xs row items-center no-wrap">
            <div class="q-mr-sm">
              1.
            </div>
            <q-input dense type="number" autogrow />
            <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
          </div>
          <div class="q-ml-xs row items-center no-wrap">
            <div class="q-mr-sm">
              2.
            </div>
            <q-input dense type="number" autogrow />
            <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
          </div>
        </div>

        <!-- POSISI PASIEN -->
        <div class="text-weight-bold q-mt-md">Posisi Pasien</div>
        <div class="row q-gutter-sm q-ml-md">
          <q-checkbox v-for="p in posisi1" :key="p" :label="p" dense />
        </div>
        <div class="row q-gutter-sm q-ml-md">
          <q-checkbox v-for="p in posisi2" :key="p" :label="p" dense />
        </div>

        <!-- PREMEDIKASI -->
        <div class="text-weight-bold q-mt-md">Premedikasi</div>
        <div class="q-ml-md column q-gutter-sm">
          <div class="row items-center">
            <div class="col-12">
              <q-input dense type="text" label="Oral" class="q-ml-sm" autogrow />
            </div>
            <div class="col-12">
              <q-input dense type="text" label="IV" class="q-ml-sm" autogrow />
            </div>
            <div class="col-12">
              <q-input dense type="text" label="IM" class="q-ml-sm" autogrow />
            </div>
          </div>
        </div>

        <!-- INDUKSI -->
        <div class="text-weight-bold q-mt-md">Induksi</div>
        <div class="q-ml-md column q-gutter-sm">
          <div class="row items-center">
            <q-checkbox dense label="Inhalasi" />
            <span class="line flex"></span>
          </div>
          <div class="row items-center">
            <q-checkbox dense label="Intravena" />
            <span class="line flex"></span>
          </div>
        </div>

        <!-- ASA -->
        <div class="text-weight-bold q-mt-md">Klasifikasi ASA</div>
        <div class="row q-gutter-lg q-ml-md">
          <q-checkbox v-for="asa in ['I', 'II', 'III', 'IV', 'V', 'VI', 'E']" :key="asa" :label="asa" dense />
        </div>

        <!-- AIRWAY -->
        <div class="text-weight-bold q-mt-md">Tata Laksana Jalan Napas</div>
        <div class="q-ml-md">
          <div>Face Mask : No <span class="line-sm"></span> Oro / Nasopharing</div>
          <div>ETT : No <span class="line-sm"></span> Jenis Kinkin ☐ Nonkinkin ☐ Fiksasi <span class="line-sm"></span>
            cm</div>
          <div>LMA : No <span class="line-sm"></span> Jenis <span class="line"></span></div>
          <div>Trakeostomi : <span class="line"></span></div>
          <div>Bronkoskopi Fiberoptik : <span class="line"></span></div>
          <div>Glidescope : <span class="line"></span></div>
        </div>

        <!-- INTUBASI -->
        <div class="text-weight-bold q-mt-md">Intubasi</div>
        <div class="row q-gutter-sm q-ml-md">
          <q-checkbox v-for="i in intubasi1" :key="i" :label="i" dense />
        </div>
        <div class="row q-gutter-sm q-ml-md q-mt-xs">
          <q-checkbox v-for="i in intubasi2" :key="i" :label="i" dense />
        </div>

        <!-- VENTILASI -->
        <div class="text-weight-bold q-mt-md">Ventilasi</div>
        <div class="row q-gutter-md q-ml-md">
          <q-checkbox label="Spontan" dense />
          <q-checkbox label="Kendali" dense />
          <q-checkbox label="Ventilator" dense />
          <span>TV: <span class="line-sm"></span></span>
          <span>RR: <span class="line-sm"></span></span>
          <span>PEEP: <span class="line-sm"></span></span>
        </div>
        <div class="q-ml-md q-mt-xs">
          Konversi: <span class="line"></span>
        </div>

        <!-- REGIONAL -->
        <div class="text-weight-bold q-mt-md">Regional Anestesi</div>
        <div class="row q-gutter-md q-ml-md">
          <q-checkbox label="Spinal Anestesi" dense />
          <q-checkbox label="Epidural Anestesi" dense />
          <q-checkbox label="Lain-lain" dense />
          <span class="line flex"></span>
        </div>

        <div class="q-ml-md q-mt-xs">Lokasi : <span class="line"></span></div>
        <div class="q-ml-md q-mt-xs">Jenis Jarum / No : <span class="line"></span></div>
        <div class="q-ml-md q-mt-xs">Obat : <span class="line"></span></div>

        <div class="row q-gutter-lg q-ml-md q-mt-xs">
          <q-checkbox label="Total" dense />
          <q-checkbox label="Partial" dense />
          <q-checkbox label="Gagal" dense />
        </div>

        <div class="q-ml-md q-mt-xs">Komplikasi : <span class="line"></span></div>

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
import { useLaporananastesiStore } from 'src/stores/transaksi/laporananastesi';

const store = useLaporananastesiStore()
defineProps({
  pasien: {
    type: Object,
    default: null
  },
})

const posisi1 = ['Supine', 'Lithotomy', 'Prone', 'Jack Knife', 'Knee Chest']
const posisi2 = ['Trendelenburg', 'Reverse Trendelenburg', 'Lateral', 'Ka', 'Ki', 'Fracture Table']

const intubasi1 = ['Sesudah Tidur', 'Blind', 'Oral', 'Nasal', 'Ka', 'Ki']
const intubasi2 = ['Trakeostomi', 'Sulit Ventilasi', 'Sulit Intubasi', 'Dengan Stilet', 'Cuff', 'Level ETT', 'Pack']
</script>
<style scoped>
.line {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 100%;
  min-width: 200px;
  margin-left: 6px;
}

.line-sm {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 60px;
  margin: 0 6px;
}
</style>
