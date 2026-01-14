<template>
  <q-card flat bordered>
    <q-card-section class="text-weight-bold">
      Pemeriksaan Radiologi
    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <q-file v-model="store.radiologi.file" label="Upload PDF" accept=".pdf" outlined dense :max-file-size="1048576"
        @rejected="onFileRejected" />

      <q-input v-model="store.radiologi.hasil_bacaan" type="textarea" label="Hasil Bacaan" outlined autogrow />

      <div v-if="store.radiologi.dokumen">
        <q-img v-if="isImage(pasien?.radiologi)" :src="pasien?.radiologi?.dokumen_url" />
        <iframe v-else :src="pasien?.radiologi?.dokumen_url" style="width:100%; height:80vh;"></iframe>
        <!-- <q-btn label="Lihat Dokumen" color="primary" flat :href="store.radiologi.dokumen.url" target="_blank" /> -->
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn v-if="store.radiologi.dokumen" label="Hapus" color="negative" flat
        @click="store.hapusRadiologi(store.radiologi.dokumen.id)" />
      <q-btn label="Simpan" color="primary" :loading="store.loadingRadiologi" @click="store.simpanRadiologi(pasien)" />
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
