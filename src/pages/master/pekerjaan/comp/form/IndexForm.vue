<template>
  <div class="q-pa-md" style="max-width: 500px; margin: auto;">
    <q-card flat bordered>

      <q-card-section class="text-h6">
        Tambah Pekerjaan
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="submitForm">

          <q-input
            dense
            filled
            v-model="store.form.pekerjaan"
            label="Nama Pekerjaan"
            lazy-rules
            :rules="[val => !!val || 'Nama Pekerjaan wajib diisi']"
          />

          <q-input
            dense
            filled
            v-model="store.form.keterangan"
            label="Keterangan"
            class="q-mt-md"
          />

          <q-card-actions align="right" class="q-mt-md">
            <q-btn
              label="Batal"
              color="secondary"
              flat
              @click="resetForm"
            />
            <q-btn
              label="Simpan"
              color="primary"
              type="submit"
              unelevated
            />
          </q-card-actions>

        </q-form>
      </q-card-section>

    </q-card>
  </div>
</template>

<script setup>
import { usePekerjaanStore } from 'src/stores/master/pekerjaan'


const store = usePekerjaanStore()

function submitForm() {
  // contoh aksi simpan
  console.log('Form Data:', store.form)
}

function resetForm() {
  store.form.pekerjaan = ''
  store.form.keterangan = ''
}
</script>
