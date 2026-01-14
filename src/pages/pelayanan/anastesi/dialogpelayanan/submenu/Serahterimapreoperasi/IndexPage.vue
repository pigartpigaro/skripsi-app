<template>
  <q-page class="q-pa-md bg-grey-2">

    <div id="printData">
      <q-card class="q-mb-sm" flat>
        <q-card-section>
          <div class="text-weight-bold text-h6 text-center">Serah Terima Pasien Pre Operasi</div>
        </q-card-section>
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
                <div class="col-8">: {{ pasien?.pasien?.nik }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">Tanggal/Jam Masuk</div>
                <div class="col-8">: {{ dateFullFormat(pasien?.tgl_mrs) }} {{ jamTnpDetik(pasien?.tgl_mrs) }} </div>
              </div>
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Dokter Bedah</div>
                <div class="col-7">: {{ pasien?.dr_operator?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang</div>
                <div class="col-7">: {{ pasien?.ruang_tindakan }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang RS</div>
                <div class="col-7">: {{ pasien?.ruang_ranap }}</div>
              </div>
            </div>
          </div>

        </q-card-section>

        <q-card-section>
          <div class="col-12 col-md-12">
            <div class="text-subtitle2 q-mb-sm">
              A. Kesadaran :
            </div>
            <div class="q-pl-md row q-col-gutter-md">
              <q-option-group v-model="store.form.kesadaran" type="checkbox" inline :options="OpsiKesadaran" />
            </div>
          </div>
          <div class="col-12 col-md-10 q-pt-md">
            <div class="text-subtitle2 q-mb-sm">
              B. Riwayat Penyakit:
            </div>
            <div class="q-pl-md row q-col-gutter-md">
              <q-option-group v-model="store.form.riwayat_penyakit" type="checkbox" inline :options="OpsiPenyakit"
                @update:model-value="modelPenyakit" />

              <div v-if="store.form.riwayat_penyakit.includes('Lain-lain')" class="col-6 items-center no-wrap">
                <q-input v-model="store.form.riwayat_penyakit_lain" label="Sebutkan Penyakit Lainnya" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
              </div>
            </div>
          </div>
          <!-- <div class="col-12 col-md-12 q-pt-sm">
            <div class="text-subtitle2 q-mb-sm">
              C. Riwayat Alergi Obat :
            </div>
            <div class="q-pl-sm row q-col-gutter-sm">
              <div class="col">
                <q-option-group class="q-col-gutter-md" v-model="store.form.riwayat_alergi_obat"
                  :options="OpsiRiwayatAlergi" @update:model-value="modelRiwayatAlergi" />
              </div>
              <div class="q-pl-xl col-9">
                <q-input v-if="store.form.riwayat_alergi_obat === 'Jenis'" v-model="store.form.jenis_alergi_obat"
                  label="Jenis Alergi" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
                <div style="height:60px" v-if="store.form.riwayat_alergi_obat === 'Reaksi'" />
                <q-input v-if="store.form.riwayat_alergi_obat === 'Reaksi'" v-model="store.form.reaksi_alergi_obat"
                  label="Reaksi Alergi" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
              </div>
            </div>

          </div> -->

          <div class="col-12 q-pt-sm">
            <div class="text-subtitle2 q-mb-sm">
              C. Riwayat Alergi Obat :
            </div>

            <div class="column q-gutter-sm">

              <!-- JENIS -->
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-radio v-model="store.form.riwayat_alergi_obat" val="Jenis" label="Jenis" />
                </div>

                <div class="col-4">
                  <q-input v-if="store.form.riwayat_alergi_obat === 'Jenis'" v-model="store.form.jenis_alergi_obat"
                    label="Jenis Alergi" outlined dense />
                </div>
              </div>

              <!-- REAKSI -->
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-radio v-model="store.form.riwayat_alergi_obat" val="Reaksi" label="Reaksi" />
                </div>

                <div class="col-4">
                  <q-input v-if="store.form.riwayat_alergi_obat === 'Reaksi'" v-model="store.form.reaksi_alergi_obat"
                    label="Reaksi Alergi" outlined dense />
                </div>
              </div>

            </div>
          </div>
          <!-- <div class="col-12 col-md-12 q-pt-sm">
            <div class="text-subtitle2 q-mb-sm">
              D. Persiapan Operasi :
            </div>
            <div class="q-pl-sm row q-col-gutter-sm">
              <div class="col">
                <q-option-group class="q-col-gutter-sm" v-model="store.form.persiapan_operasi" type="checkbox"
                  :options="OpsiPersiapanOperasi" @update:model-value="modelPersiapanOperasi" />
              </div>
              <div class="q-pl-xl col-9">
                <div style="height:50px" />
                <div style="height:50px" />

                <q-input v-if="store.form.persiapan_operasi.includes('Puasa')" v-model="store.form.mulai_puasa"
                  label="Mulai Puasa" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
                <div style="height:60px"
                  v-if="store.form.persiapan_operasi.includes('Alat Kesehatan') && !store.form.persiapan_operasi.includes('Puasa')" />

                <div style="height:50px" />
                <div style="height:50px" />
                <div style="height:50px" />
                <div style="height:50px" />
                <div style="height:40px" />
                <div style="height:40px" />
                <div style="height:40px" />
                <q-input v-if="store.form.persiapan_operasi.includes('Alat Kesehatan')"
                  v-model="store.form.alat_kesehatan_lainnya" label="Alat Lainnya" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
                <div style="height:60px"
                  v-if="store.form.persiapan_operasi.includes('Jenis Darah') && !store.form.persiapan_operasi.includes('Alat Kesehatan') || !store.form.persiapan_operasi.includes('Puasa') && !store.form.persiapan_operasi.includes('Alat Kesehatan')" />
                <div class="row">
                  <q-option-group v-if="store.form.persiapan_operasi.includes('Jenis Darah')" class="q-col-gutter-sm"
                    v-model="store.form.jenis_darah" inline type="checkbox" :options="OpsiJenisDarah"
                    @update:model-value="modelJenisDarah" />
                  <q-input v-if="store.form.persiapan_operasi.includes('Jenis Darah')" class="q-pl-md col"
                    v-model="store.form.jumlah_darah" label="Jumlah" outlined dense
                    :rules="[val => !!val || 'Harap Diisi']" />
                </div>
              </div>
            </div>
            <div style="height:25px" v-if="!store.form.persiapan_operasi.includes('Jenis Darah')" />
            <div class="q-pl-lg row q-col-gutter-sm">

              <div>Tanda-tanda Vital :</div>
              <div class="col-4">
                <q-input class="col-4" v-model="store.form.vital_td" label="Tekanan Darah" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
                <q-input class="col-4" v-model="store.form.vital_n" label="Nadi/Detak Jantung" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
                <q-input class="col-4" v-model="store.form.vital_s" label="Suhu" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
                <q-input class="col-4" v-model="store.form.vital_rr" label="Respiratory Rate" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
              </div>


            </div>

          </div> -->


          <div class="col-12 q-pt-sm">
            <div class="text-subtitle2 q-mb-sm">
              D. Persiapan Operasi :
            </div>

            <div class="column q-gutter-xs">

              <!-- SURAT PERSETUJUAN OPERASI -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Surat Persetujuan Operasi"
                label="Surat Persetujuan Operasi" @update:model-value="modelPersiapanOperasi" />

              <!-- SURAT PERSETUJUAN ANESTESI -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Surat Persetujuan Anestesi"
                label="Surat Persetujuan Anestesi" @update:model-value="modelPersiapanOperasi" />

              <!-- PUASA -->
              <div class="row items-center">
                <div class="col-auto">
                  <q-checkbox v-model="store.form.persiapan_operasi" val="Puasa" label="Puasa"
                    @update:model-value="modelPersiapanOperasi" />
                </div>
                <div class="col-3 q-pl-sm">
                  <q-input v-if="store.form.persiapan_operasi.includes('Puasa')" v-model="store.form.mulai_puasa"
                    label="Mulai Puasa" outlined dense />
                </div>
              </div>

              <!-- PENGOSONGAN KANDUNG KEMIH -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Pengosongan Kandung Kemih"
                label="Pengosongan Kandung Kemih" @update:model-value="modelPersiapanOperasi" />

              <!-- GIGI PALSU -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Gigi Palsu" label="Gigi Palsu"
                @update:model-value="modelPersiapanOperasi" />

              <!-- PERHIASAN -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Perhiasan" label="Perhiasan"
                @update:model-value="modelPersiapanOperasi" />

              <!-- KOSMETIK -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Kosmetik / Cat Kuku"
                label="Kosmetik / Cat Kuku" />

              <!-- PENCUKURAN -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Pencukuran Daerah Operasi"
                label="Pencukuran Daerah Operasi" @update:model-value="modelPersiapanOperasi" />

              <!-- PENANDAAN -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Penandaan (Marker)" label="Penandaan (Marker)"
                @update:model-value="modelPersiapanOperasi" />

              <!-- HASIL PEMERIKSAAN -->
              <q-checkbox v-model="store.form.persiapan_operasi" val="Hasil Pemeriksaan" label="Hasil Pemeriksaan"
                @update:model-value="modelPersiapanOperasi" />

              <!-- ALAT KESEHATAN -->
              <div class="row items-center ">
                <div class="col-auto">
                  <q-checkbox v-model="store.form.persiapan_operasi" val="Alat Kesehatan" label="Alat Kesehatan"
                    @update:model-value="modelPersiapanOperasi" />
                </div>
                <div class="col-4 q-pl-sm">
                  <q-input v-if="store.form.persiapan_operasi.includes('Alat Kesehatan')"
                    v-model="store.form.alat_kesehatan_lainnya" label="Alat Kesehatan Lainnya" outlined dense />
                </div>
              </div>

              <!-- JENIS DARAH -->
              <div class="row items-start">
                <div class="col-auto q-pt-xs">
                  <q-checkbox v-model="store.form.persiapan_operasi" val="Jenis Darah" label="Jenis Darah"
                    @update:model-value="modelPersiapanOperasi" />
                </div>

                <div class="col-auto q-pl-xl q-pt-md q-gutter-xs">
                  <div class="row items-center q-col-gutter-sm">
                    <q-checkbox v-model="store.form.jenis_darah" val="PRC" label="PRC" dense />
                    <q-checkbox v-model="store.form.jenis_darah" val="WB" label="WB" dense />
                    <q-checkbox v-model="store.form.jenis_darah" val="Trombocyte" label="Trombocyte" dense />
                    <q-checkbox v-model="store.form.jenis_darah" val="Plasma" label="Plasma" dense />
                    <q-input v-if="store.form.jenis_darah?.length" v-model="store.form.jumlah_darah" label="Jumlah"
                      outlined dense class="col-4" />
                  </div>


                </div>
              </div>
              <div class="q-pl-lg q-pt-md row q-col-gutter-sm">

                <div>Tanda-tanda Vital :</div>
                <div class="col-4">
                  <q-input class="col-4" v-model="store.form.vital_td" label="Tekanan Darah" outlined dense
                    :rules="[val => !!val || 'Harap Diisi']" />
                  <q-input class="col-4" v-model="store.form.vital_n" label="Nadi/Detak Jantung" outlined dense
                    :rules="[val => !!val || 'Harap Diisi']" />
                  <q-input class="col-4" v-model="store.form.vital_s" label="Suhu" outlined dense
                    :rules="[val => !!val || 'Harap Diisi']" />
                  <q-input class="col-4" v-model="store.form.vital_rr" label="Respiratory Rate" outlined dense
                    :rules="[val => !!val || 'Harap Diisi']" />
                </div>


              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>

    </div>
    <!-- ACTION -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" :loading="store.loadingSave" label="Simpan Data" @click="simpan" />
        <q-btn label="Cetak" color="yellow-9" v-print="printObj" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>
import { dateFullFormat, jamTnpDetik } from 'src/modules/formatter'
import { useSerahterimaPreOperasiStore } from 'src/stores/master/pelayanan/serahterimapreoperasi'
import { computed, watch } from 'vue'
const store = useSerahterimaPreOperasiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const OpsiKesadaran = [
  { value: 'Composmentis', label: 'Composmentis' },
  { value: 'Apatis', label: 'Apatis' },
  { value: 'Delirium', label: 'Delirium' },
  { value: 'Somnolen', label: 'Somnolen' },
  { value: 'Stupor', label: 'Stupor' },
  { value: 'Koma', label: 'Koma' }
]
const OpsiPenyakit = [
  { value: 'DM', label: 'DM' },
  { value: 'Hipertensi', label: 'Hipertensi' },
  { value: 'Asma', label: 'Asma' },
  { value: 'Hepatitis', label: 'Hepatitis' },
  { value: 'Ginjal', label: 'Ginjal' },
  { value: 'Lain-lain', label: 'Lain-lain' }
]
function modelPenyakit(val) {
  if (!val.includes('Lain-lain')) store.form.riwayat_penyakit_lain = null
}
const OpsiRiwayatAlergi = [
  { value: 'Jenis', label: 'Jenis' },
  { value: 'Reaksi', label: 'Reaksi' }
]
function modelRiwayatAlergi(val) {
  if (!val === 'Jenis') store.form.jenis_alergi_obat = null
  if (!val === 'Reaksi') store.form.reaksi_alergi_obat = null
}
const OpsiPersiapanOperasi = [
  { value: 'Surat Persetujuan Operasi', label: 'Surat Persetujuan Operasi' },
  { value: 'Surat Persetujuan Anestesi', label: 'Surat Persetujuan Anestesi' },
  { value: 'Puasa', label: 'Puasa' },
  { value: 'Pengosongan Kandung Kemih', label: 'Pengosongan Kandung Kemih' },
  { value: 'Gigi Palsu', label: 'Gigi Palsu' },
  { value: 'Perhiasan', label: 'Perhiasan' },
  { value: 'Kosmetik / Cat Kuku', label: 'Kosmetik / Cat Kuku' },
  { value: 'Pencukuran Daerah Operasi', label: 'Pencukuran Daerah Operasi' },
  { value: 'Penandaan (Marker)', label: 'Penandaan (Marker)' },
  { value: 'Hasil Pemeriksaan', label: 'Hasil Pemeriksaan' },
  { value: 'Alat Kesehatan', label: 'Alat Kesehatan' },
  { value: 'Jenis Darah', label: 'Jenis Darah' },
]
function modelPersiapanOperasi(val) {
  if (!val.includes('Puasa')) store.form.mulai_puasa = null
  if (!val.includes('Alat Kesehatan')) store.form.alat_kesehatan_lainnya = null
  if (!val.includes('Jenis Darah')) {
    store.form.jenis_darah = []
    store.form.jumlah_darah = null
  }
}

const OpsiJenisDarah = [
  { value: 'PRC', label: 'PRC' },
  { value: 'WB', label: 'WB' },
  { value: 'Trombocyte', label: 'Trombocyte' },
  { value: 'Plasma', label: 'Plasma' }
]
function modelJenisDarah() {
  if (!store.form.persiapan_operasi.includes('Jenis Darah')) store.form.jumlah_darah = null
}
function simpan() {
  store.form.noreg = props.pasien.noreg
  store.simpanData()
}

const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Serah Terima Pre Operasi',
  preview: false,
  extraCss: '',
  extraHead: '',
  beforeOpenCallback() {
    console.log('wait...')
  },
  openCallback() {
    console.log('opened')
  }
}))

watch(
  () => props.pasien?.sertipreop,
  (val) => {
    if (!val) return

    // mapping langsung ke form
    store.form.noreg = val.noreg ?? null
    store.form.kesadaran = val.kesadaran ?? null

    store.form.riwayat_penyakit = val.riwayat_penyakit ?? null
    store.form.riwayat_penyakit_lain = val.riwayat_penyakit_lain ?? null
    store.form.riwayat_alergi_obat = val.riwayat_alergi_obat ?? null
    store.form.jenis_alergi_obat = val.jenis_alergi_obat ?? null
    store.form.reaksi_alergi_obat = val.reaksi_alergi_obat ?? null
    store.form.persiapan_operasi = val.persiapan_operasi ?? null
    store.form.mulai_puasa = val.mulai_puasa ?? null
    store.form.alat_kesehatan = val.alat_kesehatan ?? null
    store.form.alat_kesehatan_lainnya = val.alat_kesehatan_lainnya ?? null
    store.form.jenis_darah = val.jenis_darah ?? null
    store.form.jumlah_darah = val.jumlah_darah ?? null
    store.form.vital_td = val.vital_td ?? null
    store.form.vital_n = val.vital_n ?? null
    store.form.vital_s = val.vital_s ?? null
    store.form.vital_rr = val.vital_rr ?? null
  },
  { immediate: true }
)
</script>
<style>
.print-only,
.ttd-print {
  display: none;
}

@media print {
  @page {
    size: A4;
    margin: 15mm;
    padding: 5mm;
  }

  .print-keep {
    break-inside: avoid;
    page-break-inside: avoid;
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
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* HILANGKAN OUTLINE INPUT */
  .q-field--outlined .q-field__control:before,
  .q-field--outlined .q-field__control:after {
    display: none !important;
  }

  /* Tombol tidak ikut tercetak */
  .q-btn,
  .q-card-actions {
    display: none !important;
  }
}
</style>
