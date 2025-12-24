<template>
  <q-page class="column full-height" style="overflow: hidden;">
    <q-card flat square class="col column q-ma-sm full-height">
      <q-card-section class="col-auto">
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div class="flex flex-column items-center flex-center">
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Data Identitas Pasien
                </div>
                <!-- <div class="title-desc">
                  Master Data Pendidikan
                </div> -->
              </div>
            </div>
          </div>
          <div class="bg-white col-grow">
            <div class="flex flex-column items-center flex-center">
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Data Penanggung Jawab
                </div>
                <!-- <div class="title-desc">
                  Master Data Pendidikan
                </div> -->
              </div>
            </div>
          </div>
          <!-- <div class="flex q-gutter-sm">
            <q-input v-model="store.params.q" placeholder="Cari ..." dense outlined style="min-width:200px"
              debounce="800" :loading="store.loading" @update:model-value="store.search" standout="bg-yellow-3" clearable>
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div> -->
        </div>
      </q-card-section>
      <q-separator />

      <div class="col-grow full-height relative-position">
        <div class="absolute full-width full-height">
          <div class="row full-height q-pb-sm">
            <q-form ref="formRef" @submit="simpan" class="row full-height q-px-sm q-pt-sm q-pb-xl">
              <div class="col-6 full-height scroll q-pa-sm">
                <FormPage />
              </div>
              <div class="col-6 full-height scroll q-pa-sm">
                <FormPageKanan />
              </div>
              <div class="q-pt-md q-pb-md text-right">
                <q-btn label="Simpan" type="submit" color="primary" :loading="store.loadingSave" />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FormPage from './comp/FormPage.vue';
import FormPageKanan from './comp/FormPageKanan.vue';

// import { useQuasar } from 'quasar';
import { useKunjunganPasienStore } from 'src/stores/pendaftaran/pasienbaru/mainstore';
const store = useKunjunganPasienStore()
// const $q = useQuasar()
const formRef = ref(null)

function simpan() {
  console.log('store.form sebelum simpan:', store.form);
  store.simpanData().then(() => {
    formRef.value.resetValidation()
  })
}
onMounted(() => {
  // store.getData()
  store.init()
})

</script>
