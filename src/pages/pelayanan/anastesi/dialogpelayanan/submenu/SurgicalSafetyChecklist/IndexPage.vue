<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- HEADER PASIEN -->
      <q-card flat class="q-mb-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">
            Check List Keselamatan Operasi
          </div>
        </q-card-section>
      </q-card>

      <!-- IDENTITAS PASIEN -->
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
                <div class="col-5 label">Dokter Bedah</div>
                <div class="col-7">: {{ pasien?.dr_operator?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tindakan</div>
                <div class="col-7">: {{ pasien?.tindakan_operasi }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- SIGN IN -->
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <div class="text-subtitle2 text-bold q-mb-sm">Sign In (Sebelum Induksi Anestesi)</div>

          <div class="q-mb-sm">
            <div class="text-weight-bold">* Pasien telah dikonfirmasi :</div>
            <q-option-group v-model="store.form.konfirmasi_pasien" type="checkbox" inline
              :options="opsiKonfirmasiPasien" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Lokasi Operasi sudah diberi tanda :</div>
            <q-option-group v-model="store.form.lokasi_operasi_ditandai" inline :options="opsiLokasiOperasi" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Mesin Anestesi dan obat - obatan anestesi sudah lengkap?</div>
            <q-option-group v-model="store.form.mesin_anestesi_lengkap" inline :options="opsiMesinAnestesi" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Pulse Oxymeter sudah terpasang dan berfungsi?</div>
            <q-option-group v-model="store.form.pulse_oxymeter_berfungsi" inline :options="opsiPulseterpasang" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Riwayat Alergi yang diketahui?</div>
            <q-option-group v-model="store.form.riwayat_alergi" inline :options="opsiRiwayatAlergi" />
            <q-input v-if="store.form.riwayat_alergi === 'Ya'" v-model="store.form.keterangan_alergi" dense outlined
              placeholder="Keterangan alergi" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Resiko kesulitan jalan napas / resiko aspirasi?</div>
            <q-option-group v-model="store.form.resiko_jalan_napas" inline :options="opsiResikoNapas" />
            <q-input v-if="store.form.resiko_jalan_napas === 'Ya'" v-model="store.form.ketersediaan_alat_bantuan" dense
              outlined placeholder="Keterangan alat bantu" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Resiko Kehilangan darah > 500ml (7ml/kg BB pada anak) :</div>
            <q-option-group v-model="store.form.resiko_kehilangan_darah" inline :options="opsiResikoKehilanganDarah" />
          </div>
        </q-card-section>
      </q-card>

      <!-- TIME OUT -->
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <div class="text-subtitle2 text-bold q-mb-sm">Time Out (Dilakukan Sebelum Insisi Kulit)</div>
          <div class="q-mb-sm">
            <q-checkbox v-model="store.form.konfirmasi_tim" true-value="Ya" false-value=""
              label="Konfirmasi anggota tim telah menyebutkan nama dan peran masing-masing" dense />
          </div>
          <div class="q-mb-sm">
            <q-checkbox v-model="store.form.konfirmasi_pasien_prosedur_lokasi" true-value="Ya" false-value=""
              label="Konfirmasi nama pasien, prosedur dan lokasi insisi yang akan dilakukan" dense />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">Antibiotik profilaksi diberikan 60 menit sebelumnya?</div>
            <q-option-group v-model="store.form.antibiotik_profilaksis" inline :options="opsiAntibiotik" />
            <div class="row q-col-gutter-sm">
              <q-input class="col-4" v-model="store.form.nama_antibiotik" dense outlined label="Nama Antibiotik" />
              <q-input v-model="store.form.jam_antibiotik" dense outlined label="Jam" />
              <q-input v-model="store.form.dosis_antibiotik" dense outlined label="Dosis" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- ANTISIPASI KRITIS -->
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <div class="text-subtitle2 text-bold q-mb-sm">* Antisipasi Kejadian Kritis</div>
          <div class="q-col-gutter-sm q-mb-sm">
            <div class="text-subtitle2 text-bold">Dokter Bedah :</div>
            <q-input v-model="store.form.langkah_kondisi_kritis" dense outlined
              label="Langkah yang dilakukan bila kondisi kritis" />
            <q-input v-model="store.form.estimasi_lama_operasi" dense outlined label="Estimasi Lama Operasi" />
            <q-input v-model="store.form.antisipasi_kehilangan_darah" dense outlined
              label="Antisipasi kehilangan darah" />
          </div>
          <div class="q-col-gutter-sm q-mb-sm">
            <div class="text-subtitle2 text-bold">Tim Anestesi :</div>
            <q-input v-model="store.form.catatan_tim_anestesi" dense outlined
              label="Adakah terdapat hal penting mengenai pasien yang perlu diperhatikan:" />
          </div>
          <div class="q-col-gutter-sm q-mb-sm">
            <div class="text-subtitle2 text-bold">Tim Keperawatan :</div>
            <q-checkbox v-model="store.form.peralatan_steril" true-value="Ya" false-value=""
              label="Peralatan sudah steril" dense />
            <q-input v-model="store.form.alat_perlu_perubahan_khusus" dense outlined
              label="Alat-alat yang perlu perubahan khusus" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">* Apakan foto rontgen/CT Scan/MRI telah ditayangkan?</div>
            <q-option-group v-model="store.form.foto_penunjang" inline :options="opsiFotoPenunjang" />
          </div>

        </q-card-section>
      </q-card>

      <!-- SIGN OUT -->
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <div class="text-subtitle2 text-bold q-mb-sm">Sign Out (Pasca Operasi)</div>

          <div class="q-mb-sm">
            <div class="text-weight-bold">1. Perawat melakukan konfirmasi secara verbal dengan tim</div>
            <q-option-group v-model="store.form.konfirmasi_verbal" type="checkbox" :options="opsiKonfirmasiVerbal" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">2. Dokter operator, dokter anestesi dan perawat melakukan review masalah utama
              yang harus diperhatikan untuk penyembuhan dan manajemen pasien selanjutnya</div>
            <q-input v-model="store.form.review_masalah_utama" dense outlined label="Review masalah utama" />
          </div>
          <div class="q-mb-sm">
            <div class="text-weight-bold">2. Jenis dan Kode Implan</div>
            <div class="row q-col-gutter-sm">
              <q-input class="col-4" v-model="store.form.jenis_implan" dense outlined label="Jenis Implan" />
              <q-input class="col-4" v-model="store.form.kode_implan" dense outlined label="Kode Implan" />
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>

    <!-- ACTION BUTTONS -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" :loading="store.loadingSave" label="Simpan Data" @click="simpan" />
        <q-btn label="Cetak" color="yellow-9" v-print="printObj" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useChecklistKeselamatanPasienStore } from 'src/stores/master/pelayanan/checklistkeselamatanpasien';

const store = useChecklistKeselamatanPasienStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function simpan() {
  store.form.noreg = props.pasien.noreg
  store.simpanData()
}
const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Checklist Keselamatan Pasien',
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

const opsiKonfirmasiPasien = [
  { label: 'Identitas', value: 'Identitas' },
  { label: 'Gelang Pasien', value: 'Gelang Pasien' },
  { label: 'Prosedur', value: 'Prosedur' },
  { label: 'Prosedur Operasi', value: 'Operasi' }
]

const opsiLokasiOperasi = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak dapat diterapkan', value: 'Tidak' }
]
const opsiMesinAnestesi = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
]
const opsiPulseterpasang = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
]
const opsiRiwayatAlergi = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
]
const opsiResikoNapas = [
  { label: 'Ya, Peralatan/bantuan sudah tersedia', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
]
const opsiResikoKehilanganDarah = [
  { label: 'Ya dan dua akses IV dan rencana terapi cairan', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
]
const opsiAntibiotik = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak Berlaku', value: 'Tidak' },
]
const opsiFotoPenunjang = [
  { label: 'Ya', value: 'Ya' },
  { label: 'Tidak', value: 'Tidak' },
  { label: 'Belum', value: 'Belum' }
]
const opsiKonfirmasiVerbal = [
  { label: 'Nama prosedur tindakan telah dicatat', value: 'Nama' },
  { label: 'Instrumen, sponge/kasa dan jarum telah dihitung dengan benar', value: 'Instrumen' },
  { label: 'Specimen tidak diberi label', value: 'Specimen' },
  { label: 'Apakah ada masalah peralatan yang harus ditangani', value: 'Masalah' }
]

watch(
  () => props.pasien?.check_list_keselamatan_operasi,
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
  .print-only {
    display: block;
  }

  .q-btn,
  .q-card-actions {
    display: none !important;
  }
}
</style>
