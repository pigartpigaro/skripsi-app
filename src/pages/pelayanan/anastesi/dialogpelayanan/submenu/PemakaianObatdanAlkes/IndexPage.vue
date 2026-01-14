<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- JUDUL -->
      <q-card flat class="q-mb-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">
            PEMAKAIAN OBAT DAN ALAT KESEHATAN
          </div>
        </q-card-section>
      </q-card>

      <!-- IDENTITAS (PRINT ONLY) -->
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

      <!-- CAIRAN -->
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Cairan Infus & Transfusi</div>
          <div class="full-width">
            <q-markup-table dense flat bordered>
              <thead>
                <tr>
                  <th class="text-left" style="width:40%">Nama</th>
                  <th class="text-left" style="width:20%">Ukuran</th>
                  <th class="text-left" style="width:20%">Jumlah</th>
                  <th class="text-left" style="width:20%">Satuan</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in cairan" :key="row.id">
                  <td>{{ row.nama }}</td>

                  <td>
                    <q-input v-model="row.ukuran" dense outlined style="width:120px" placeholder="" />
                  </td>

                  <td>
                    <q-input v-model.number="row.jumlah" type="number" dense outlined style="width:120px" />
                  </td>

                  <td>{{ row.satuan }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>

      <!-- ALKES -->
      <q-card flat class="q-mb-xs print-page">
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Alat Kesehatan</div>

          <div class="full-width">
            <q-markup-table dense flat bordered>
              <thead>
                <tr>
                  <th class="text-left" style="width:40%">Nama</th>
                  <th class="text-left" style="width:20%">Ukuran</th>
                  <th class="text-left" style="width:20%">Jumlah</th>
                  <th class="text-left" style="width:20%">Satuan</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in alkes" :key="row.id">
                  <td>{{ row.nama }}</td>
                  <td>
                    <q-input v-model="row.ukuran" dense outlined style="width:120px" />
                  </td>
                  <td>
                    <q-input v-model.number="row.jumlah" type="number" dense outlined style="width:120px" />
                  </td>

                  <td>{{ row.satuan }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>

      <!-- OBAT -->
      <q-card flat class="print-page">
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Obat-obatan</div>

          <div class="full-width">
            <q-markup-table dense flat bordered>
              <thead>
                <tr>
                  <th class="text-left" style="width:40%">Nama</th>
                  <th class="text-left" style="width:20%">Ukuran</th>
                  <th class="text-left" style="width:20%">Jumlah</th>
                  <th class="text-left" style="width:20%">Satuan</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in obat" :key="row.id">
                  <td>{{ row.nama }}</td>

                  <td>
                    <q-input v-model="row.ukuran" dense outlined style="width:120px" />
                  </td>

                  <td>
                    <q-input v-model.number="row.jumlah" type="number" dense outlined style="width:120px" />
                  </td>

                  <td>{{ row.satuan }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>

    </div>

    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" label="Simpan" :loading="store.loadingSave" @click="simpan" />
        <q-btn color="yellow-9" label="Cetak" v-print="printObj" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { usePemakaianObatdanAlkesStore } from 'src/stores/master/pelayanan/pemakaianobatdanalkes'

const store = usePemakaianObatdanAlkesStore()

const props = defineProps({
  pasien: { type: Object, default: null }
})


const cairan = reactive([
  { id: 1, nama: 'Aquabides', ukuran: '25 ml', jumlah: null, satuan: 'flabot' },
  { id: 2, nama: 'Asering', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 3, nama: 'Dextrose 5%', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 4, nama: 'D5 1/2 NS', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 5, nama: 'D5 1/4 NS', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 6, nama: 'D10', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 7, nama: 'Gelafusal', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 8, nama: 'KA-EN 3 A', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 9, nama: 'KA-EN 3 B', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 10, nama: 'NaCl 0,9%', ukuran: '25 ml', jumlah: null, satuan: 'flabot' },
  { id: 11, nama: 'NaCl 0,9%', ukuran: '100 ml', jumlah: null, satuan: 'flabot' },
  { id: 12, nama: 'NaCl 0,9%', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 13, nama: 'Ringer Lactate', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 14, nama: 'Ringer Fundin', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 15, nama: 'Terastarch', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 16, nama: 'Tutosol', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 17, nama: 'Volulyte', ukuran: '500 ml', jumlah: null, satuan: 'flabot' },
  { id: 18, nama: 'Whole Blood (WB)', ukuran: null, jumlah: null, satuan: 'unit' },
  { id: 19, nama: 'Packed Red Cell (PRC)', ukuran: null, jumlah: null, satuan: 'unit' },
  { id: 20, nama: 'Trombosit Concentrate (TC)', ukuran: null, jumlah: null, satuan: 'unit' },
  { id: 21, nama: 'Fresh Frozen Plasma (FFP)', ukuran: null, jumlah: null, satuan: 'unit' },
  { id: 22, nama: 'Anti-Hemophilic Factor (AHF)', ukuran: null, jumlah: null, satuan: 'unit' },
  { id: 23, nama: 'Granulosit', ukuran: null, jumlah: null, satuan: 'unit' }
])


const alkes = reactive([
  { id: 1, nama: 'Alkohol swab', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 2, nama: 'Alkohol 70%', ukuran: '-', jumlah: null, satuan: 'cc' },
  { id: 3, nama: 'Betadin', ukuran: '-', jumlah: null, satuan: 'cc' },
  { id: 4, nama: 'Electrode', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 5, nama: 'ETT kingking', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 6, nama: 'ETT non kingking', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 7, nama: 'Handsaplast', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 8, nama: 'Handscoon Steril', ukuran: null, jumlah: null, satuan: 'pasang' },
  { id: 9, nama: 'Infus set', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 10, nama: 'LMA', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 11, nama: 'Nasal O2', ukuran: 'dewasa', jumlah: null, satuan: 'pcs' },
  { id: 12, nama: 'Nasal O2', ukuran: 'anak', jumlah: null, satuan: 'pcs' },
  { id: 13, nama: 'Needle', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 14, nama: 'NGT', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 15, nama: 'NRM', ukuran: 'dewasa', jumlah: null, satuan: 'pcs' },
  { id: 16, nama: 'NRM', ukuran: 'anak', jumlah: null, satuan: 'pcs' },
  { id: 17, nama: 'Perfusor tubing white', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 18, nama: 'Perifik ephidural', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 19, nama: 'Spinal needle', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 20, nama: 'Spuit', ukuran: '1 cc', jumlah: null, satuan: 'pcs' },
  { id: 21, nama: 'Spuit', ukuran: '3 cc', jumlah: null, satuan: 'pcs' },
  { id: 22, nama: 'Spuit', ukuran: '5 cc', jumlah: null, satuan: 'pcs' },
  { id: 23, nama: 'Spuit', ukuran: '10 cc', jumlah: null, satuan: 'pcs' },
  { id: 24, nama: 'Spuit', ukuran: '20 cc', jumlah: null, satuan: 'pcs' },
  { id: 25, nama: 'Spuit', ukuran: '50 cc', jumlah: null, satuan: 'pcs' },
  { id: 26, nama: 'Suction', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 27, nama: 'OPA', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 28, nama: 'Transfusi set', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 29, nama: 'Three Way Stopcock (dengan selang)', ukuran: '-', jumlah: null, satuan: 'pcs' },
  { id: 30, nama: 'Three Way Stopcock (tanpa selang)', ukuran: '-', jumlah: null, satuan: 'pcs' }
])


const obat = reactive([
  { id: 1, nama: 'Aminophilin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 2, nama: 'Amiodarone', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 3, nama: 'Asam tranexamat', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 4, nama: 'Atracurium', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 5, nama: 'Atropin sulfat', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 6, nama: 'Bupivakain 0,5%', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 7, nama: 'Ceftriaxone', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 8, nama: 'Cefotaxime', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 9, nama: 'Cefazoline', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 10, nama: 'Dexamethason', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 11, nama: 'Dexketoprofen', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 12, nama: 'Ephedrin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 13, nama: 'Epinefrin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 14, nama: 'Fentanyl', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 15, nama: 'Furosemide', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 16, nama: 'Granisetron', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 17, nama: 'Ibuprofen', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 18, nama: 'Ketorolac', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 19, nama: 'Ketamin', ukuran: null, jumlah: null, satuan: 'mg' },
  { id: 20, nama: 'Levobupivakain', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 21, nama: 'Lidocain 2%', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 22, nama: 'Lidodex (Lidocain 5%)', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 23, nama: 'Metamizole', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 24, nama: 'Metronidazole', ukuran: null, jumlah: null, satuan: 'flabot' },
  { id: 25, nama: 'Metoclopramide', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 26, nama: 'Methylegometrine', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 27, nama: 'Midazolam', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 28, nama: 'Morfin', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 29, nama: 'Naloxone', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 30, nama: 'Neostigmin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 31, nama: 'Norepinefrin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 32, nama: 'N2O', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 33, nama: 'O2', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 34, nama: 'Sevoflurane', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 35, nama: 'Isoflurane', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 36, nama: 'Desflurane', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 37, nama: 'Oxytocin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 38, nama: 'Paracetamol', ukuran: null, jumlah: null, satuan: 'flabot' },
  { id: 39, nama: 'Pethidin', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 40, nama: 'Phenytoin sodium', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 41, nama: 'Phytomenadione', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 42, nama: 'Pronalges Suppositoria', ukuran: null, jumlah: null, satuan: 'pcs' },
  { id: 43, nama: 'Propofol', ukuran: null, jumlah: null, satuan: 'cc' },
  { id: 44, nama: 'Ranitidine', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 45, nama: 'Rocuronium', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 46, nama: 'Sugammadex', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 47, nama: 'Tramadol', ukuran: null, jumlah: null, satuan: 'ampul' },
  { id: 48, nama: 'Thiopental', ukuran: null, jumlah: null, satuan: 'mg' }
])


function simpan() {
  store.form.noreg = props.pasien?.noreg
  store.form.cairan = cairan
  store.form.alkes = alkes
  store.form.obat = obat
  store.simpanData()
}

// load ulang jika sudah ada data
watch(
  () => props.pasien?.pemakaian_obat_alkes,
  (val) => {
    if (!val) return

    // sync cairan
    cairan.forEach(r => {
      const s = val.cairan?.find(x => x.id === r.id)
      r.jumlah = s ? s.jumlah : null
      r.ukuran = s ? s.ukuran : r.ukuran
      r.nama = s ? s.nama : r.nama
    })

    // sync alkes
    alkes.forEach(r => {
      const s = val.alkes?.find(x => x.id === r.id)
      r.jumlah = s ? s.jumlah : null
      r.ukuran = s ? s.ukuran : r.ukuran
      r.nama = s ? s.nama : r.nama
    })

    // sync obat
    obat.forEach(r => {
      const s = val.obat?.find(x => x.id === r.id)
      r.jumlah = s ? s.jumlah : null
      r.ukuran = s ? s.ukuran : r.ukuran
      r.nama = s ? s.nama : r.nama
    })
  },
  { immediate: true }
)

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Pemakaian Obat dan Alkes'
}))
</script>
<style>
.print-only {
  display: none;
}

.q-markup-table .q-field,
.q-markup-table .q-field__inner,
.q-markup-table .q-field__control {
  min-height: 22px !important;
  height: 22px !important;
}

/* control benar-benar rapat */
.q-markup-table .q-field__control {
  padding: 0 !important;
  align-items: center !important;
}

/* teks input */
.q-markup-table .q-field__native {
  padding: 0 6px !important;
  margin: 0 !important;
  height: 20px !important;
  min-height: 0 !important;
  line-height: 20px !important;
  font-size: 12px;
}

/* angka kanan */
.q-markup-table input[type="number"] {
  text-align: right;
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

  .q-card {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none !important;
    border: none !important;
  }

  /* paksa card baru mulai halaman baru (opsional) */
  .print-page {
    page-break-before: always;
  }

  .q-btn,
  .q-card-actions {
    display: none !important;
  }


  .q-markup-table .q-field--outlined .q-field__control::before,
  .q-markup-table .q-field--outlined .q-field__control::after {
    border: none !important;
  }

  .q-markup-table .q-field__control {
    background: transparent !important;
    box-shadow: none !important;
  }

  .q-markup-table .q-field__native {
    padding: 0 !important;
    line-height: 1.1 !important;
  }

  .q-markup-table input {
    caret-color: transparent;
  }
}
</style>
