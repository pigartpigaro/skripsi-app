<script setup>
import { useSerahTerimaPascaOpStore } from 'src/stores/master/pelayanan/serahTerimaPascaOp'
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    required: true
  }
})

const store = useSerahTerimaPascaOpStore()
onMounted(() => {
  const sr = props.pasien?.serah_terima_pasca_op
  console.log('moun rr', sr)

  if (sr?.length) {
    const form = sr.find(f => f.tujuan == 'RR')
    if (form) store.form = form
  }
})
watch(() => props.pasien, () => {
  const sr = props.pasien?.serah_terima_pasca_op
  // console.log('wathc rr')
  if (sr?.length) {
    const form = sr.find(f => f.tujuan == 'RR')
    if (form) store.form = form
  }
}, { deep: true })
const simpan = () => {
  store.form.tujuan = 'RR'
  store.simpan(props.pasien, 'RR')
}
const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Serah Terima OK RR',
  preview: false
}))
</script>

<template>
  <q-page class="q-pa-md bg-grey-6">
    <div id="printData" class="q-pa-md full-width full-height bg-white">
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">SERAH TERIMA OK RR</div>
        </q-card-section>
      </q-card>


      <!-- IDENTITAS   -->
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
                <div class="col-7">: {{ pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tgl Pemeriksaan</div>
                <div class="col-7">: {{ pasien?.tgl_mrs }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang Tindakan</div>
                <div class="col-7">: {{ pasien?.ruang_tindakan ?? '-' }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tindakan Operasi</div>
                <div class="col-7">: {{ pasien?.tindakan_operasi ?? '-' }}</div>
              </div>
            </div>
          </div>

          <q-separator spaced style="border-top: 1px solid #000" />

        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-pa-md">

        <!-- S -->
        <q-input v-model="store.form.situation" type="textarea" autogrow label="(S) Situation" class="q-mb-md" />

        <!-- B -->
        <q-input v-model="store.form.background" type="textarea" autogrow label="(B) Background" class="q-mb-md" />

        <!-- A -->
        <q-input v-model="store.form.assessment" type="textarea" autogrow label="(A) Assessment" class="q-mb-md" />

        <!-- R -->
        <q-input v-model="store.form.recommendation" type="textarea" autogrow label="(R) Recommendation"
          class="q-mb-lg" />

        <q-separator class="q-my-md" />

        <div class="row q-col-gutter-md q-mb-sm">
          <!-- PENYERAH -->
          <div class="col-6">
            <q-input v-model="store.form.penyerah_nama" label="Yang Menyerahkan (Nama)" />
          </div>
          <!-- PENERIMA -->
          <div class="col-6">
            <q-input v-model="store.form.penerima_nama" label="Yang Menerima (Nama)" />
          </div>
        </div>


        <div class="text-right">
          <q-btn color="primary" label="Simpan" :loading="store.loadingSave" :disable="store.loadingSave"
            @click="simpan" />
          <q-btn label="Cetak" class="q-mx-md" color="red" v-print="printObj" />
        </div>

      </q-card>
    </div>

  </q-page>
</template>

<style scoped>
.paraf-space {
  padding-top: 18px;
  color: #555;
}
</style>
