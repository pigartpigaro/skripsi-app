<template>
  <q-card flat bordered>
    <q-card-section class="text-weight-bold">
      Pemeriksaan Laboratorium
    </q-card-section>

    <q-card-section>
      <q-file v-model="store.lab.file" label="Upload  PDF" accept=".pdf" outlined dense :max-file-size="1048576"
        @rejected="onFileRejected" />

      <div v-if="pasien?.laboratorium?.path" class="q-mt-sm">
        <!-- <q-btn label="Lihat Dokumen" color="primary" flat :href="pasien?.laboratorium?.dokumen_url" target="_blank" /> -->
        <q-img v-if="isImage(pasien?.laboratorium)" :src="pasien?.laboratorium?.path" />
        <iframe v-else :src="pasien?.laboratorium?.dokumen_url" style="width:100%; height:80vh;"></iframe>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Hapus" color="negative" flat @click="store.hapusLab(pasien?.laboratorium?.id)" />
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
