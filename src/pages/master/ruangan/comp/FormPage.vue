<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <div>
      <q-input v-model="store.form.nama" outlined dense label="Ruangan"
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

// import { api } from 'src/boot/axios';
import { useMasterRuanganStore } from 'src/stores/master/ruangan/mainstore';
import { onMounted } from 'vue';

const store = useMasterRuanganStore()

function simpan() {
  store.simpanData()
}

onMounted(async () => {
  init()
})

</script>
