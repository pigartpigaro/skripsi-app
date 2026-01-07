<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- PASIEN INFO -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-weight-bold text-h6 text-center">Serah Terima Pre Operasi</div>
      </q-card-section>
    </q-card>

    <!-- AMPLE -->
    <q-card class="q-mb-sm">

      <q-card-section>
        <div class="col-12 col-md-12">
          <div class="text-subtitle2 q-mb-sm">
            A. Kesadaran :
          </div>
          <div class="q-pl-md row q-col-gutter-md">
            <!-- <div v-for="opt in OpsiKesadaran" :key="opt?.label" class="col-12 col-md-3">
              <q-radio class="text-caption" v-model="store.form.kesadaran" :val="opt?.label" :label="opt?.label"
                dense />

            </div> -->
            <q-option-group v-model="store.form.kesadaran" inline :options="OpsiKesadaran" />
          </div>
        </div>
        <div class="col-12 col-md-12 q-pt-md">
          <div class="text-subtitle2 q-mb-sm">
            B. Riwayat Penyakit:
          </div>
          <div class="q-pl-md row q-col-gutter-md">
            <!-- <div v-for="opt in OpsiPenyakit" :key="opt?.value" class="col-12 col-md-3">
              <q-checkbox class="text-caption" v-model="store.form.riwayat_penyakit" :val="opt?.value"
                :label="opt?.label" dense />
            </div> -->
            <q-option-group v-model="store.form.riwayat_penyakit" type="checkbox" inline :options="OpsiPenyakit"
              @update:model-value="modelPenyakit" />

            <div v-if="store.form.riwayat_penyakit.includes('Lain-lain')" class="col-6 items-center no-wrap">
              <q-input v-model="store.form.riwayat_penyakit_lain" label="Sebutkan Penyakit Lainnya" outlined dense
                :rules="[val => !!val || 'Harap Diisi']" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-12 q-pt-md">
          <div class="text-subtitle2 q-mb-sm">
            C. Riwayat Alergi Obat :
          </div>
          <div class="q-pl-md row q-col-gutter-sm">
            <div class="col-2">
              <q-option-group class="q-col-gutter-md" v-model="store.form.riwayat_alergi_obat" type="checkbox"
                :options="OpsiRiwayatAlergi" @update:model-value="modelRiwayatAlergi" />
            </div>
            <div class="col-8">
              <q-input v-if="store.form.riwayat_alergi_obat.includes('Jenis')" v-model="store.form.jenis_alergi_obat"
                label="Jenis Alergi" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
              <div style="height:60px"
                v-if="store.form.riwayat_alergi_obat.includes('Reaksi') && !store.form.riwayat_alergi_obat.includes('Jenis')" />
              <q-input v-if="store.form.riwayat_alergi_obat.includes('Reaksi')" v-model="store.form.reaksi_alergi_obat"
                label="Reaksi Alergi" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
            </div>
          </div>

        </div>

        <div class="col-12 col-md-12 q-pt-md">
          <div class="text-subtitle2 q-mb-sm">
            D. Persiapan Operasi :
          </div>
          <div class="q-pl-md row q-col-gutter-sm">
            <div class="col-2">
              <q-option-group class="q-col-gutter-md" v-model="store.form.persiapan_operasi" type="checkbox"
                :options="OpsiPersiapanOperasi" @update:model-value="modelPersiapanOperasi" />
            </div>
            <div class="col-8">
              <div style="height:60px" />
              <div style="height:60px" />

              <q-input v-if="store.form.persiapan_operasi.includes('Puasa')" v-model="store.form.mulai_puasa"
                label="Mulai Puasa" outlined dense :rules="[val => !!val || 'Harap Diisi']" />
              <div style="height:60px"
                v-if="store.form.persiapan_operasi.includes('Alat Kesehatan') && !store.form.persiapan_operasi.includes('Puasa')" />

              <div style="height:60px" />
              <div style="height:60px" />
              <div style="height:60px" />
              <div style="height:60px" />
              <div style="height:50px" />
              <div style="height:50px" />
              <div style="height:50px" />
              <q-input v-if="store.form.persiapan_operasi.includes('Alat Kesehatan')"
                v-model="store.form.alat_kesehatan_lainnya" label="Alat Lainnya" outlined dense
                :rules="[val => !!val || 'Harap Diisi']" />
              <div style="height:60px"
                v-if="!store.form.persiapan_operasi.includes('Puasa') && !store.form.persiapan_operasi.includes('Alat Kesehatan')" />
              <div style="height:60px"
                v-if="store.form.persiapan_operasi.includes('Jenis Darah') && !store.form.persiapan_operasi.includes('Alat Kesehatan')" />
              <div class="row">
                <q-option-group v-if="store.form.persiapan_operasi.includes('Jenis Darah')" class="q-col-gutter-md"
                  v-model="store.form.jenis_darah" inline type="checkbox" :options="OpsiJenisDarah"
                  @update:model-value="modelJenisDarah" />
                <q-input v-if="store.form.persiapan_operasi.includes('Jenis Darah')" class="q-pl-md col-4"
                  v-model="store.form.jumlah_darah" label="Jumlah" outlined dense
                  :rules="[val => !!val || 'Harap Diisi']" />
              </div>
            </div>
          </div>
          <div style="height:25px" v-if="!store.form.persiapan_operasi.includes('Jenis Darah')" />
          <div class="q-pl-lg row q-col-gutter-sm">
            <div class="col-2 q-pl-md q-pt-md">
              <div>Tanda-tanda Vital :</div>
            </div>
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
      </q-card-section>
    </q-card>
    <!-- ACTION -->
    <q-card>
      <q-card-actions align="right">
        <q-btn color="primary" label="Simpan Data" @click="simpan" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>
import { useSerahterimaPreOperasiStore } from 'src/stores/master/pelayanan/serahterimapreoperasi'

const store = useSerahterimaPreOperasiStore()
defineProps({
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
  if (!val.includes('Jenis')) store.form.jenis_alergi_obat = null
  if (!val.includes('Reaksi')) store.form.reaksi_alergi_obat = null
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
}

const OpsiJenisDarah = [
  { value: 'PRC', label: 'PRC' },
  { value: 'WB', label: 'WB' },
  { value: 'Trombocyte', label: 'Trombocyte' },
  { value: 'Plasma', label: 'Plasma' }
]
function modelJenisDarah() {
  if (!OpsiPersiapanOperasi.value.includes('Jenis Darah')) store.form.jumlah_darah = null
}
function simpan() {
  console.log('DATA FORM:', store.form)
}
</script>
