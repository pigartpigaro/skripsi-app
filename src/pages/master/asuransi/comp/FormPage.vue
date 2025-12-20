<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <div>
      <q-input v-model="store.form.nama" outlined dense label="Nama Asuransi"
        :disable="store.loadingSave" :loading="store.loadingSave" :rules="[
    val => !!val || 'Data tidak boleh kosong'
  ]"/>
    </div>
    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn label="Simpan" type="submit" color="primary" :loading="store.loadingSave" />
    </div>
  </q-form>
</template>
<script setup>

import { useMasterAsuransiStore } from 'src/stores/master/asuransi/mainstore';
import { onMounted } from 'vue';

const store = useMasterAsuransiStore()

function simpan() {
  store.simpanData()
}

onMounted(async () => {
  store.init()
})

</script>
