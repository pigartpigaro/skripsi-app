<template>
  <q-card flat bordered>
    <q-card-section class="text-weight-bold">
      Pemeriksaan Laboratorium
    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <q-file v-model="store.lab.file" label="Upload  PDF" accept=".pdf" outlined dense :max-file-size="1048576"
        @rejected="onFileRejected" />


      <q-input v-model="store.lab.lainnya" type="textarea" label="Hasil Bacaan" outlined autogrow />

      <div v-if="pasien?.laboratorium?.path" class="q-mt-sm">
        <!-- <q-btn label="Lihat Dokumen" color="primary" flat :href="pasien?.laboratorium?.dokumen_url" target="_blank" /> -->
        <q-img v-if="isImage(pasien?.laboratorium)" :src="pasien?.laboratorium?.path" />
        <iframe v-else :src="pasien?.laboratorium?.dokumen_url" style="width:100%; height:80vh;"></iframe>
      </div>
      <div v-if="pasien?.laboratorium?.lainnya" class="q-mt-sm">
        <div class="row">
          <div class="col-4">Hasil Bacaan</div>
          <div class="col-8">
            {{ pasien?.laboratorium?.lainnya }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn v-if="pasien?.laboratorium?.path" label="Hapus" color="negative" flat
        @click="store.hapusLab(pasien, pasien?.laboratorium?.id)" />
      <q-btn label="Simpan" color="primary" :loading="store.loadingLab" :disable="!store.lab.file"
        @click="store.simpanLab(pasien)" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePenunjangStore } from 'src/stores/master/pelayanan/penunjang'

defineProps({
  pasien: {
    type: Object,
    default: null
  },
})

const $q = useQuasar()
function isImage (val) {
  const type = val?.path.split('.')
  console.log('val', val, type[1])
  return type[1] !== 'pdf'

}
function onFileRejected () {
  $q.notify({
    type: 'negative',
    message: 'File terlalu besar atau format tidak sesuai (maks 1MB PDF).'
  })
}

const store = usePenunjangStore()
</script>
