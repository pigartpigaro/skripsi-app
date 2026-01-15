<template>
  <q-page class="q-pa-md bg-white">
    <div class="q-text-weight-bold text-h6 text-center q-pb-md bg-white">ASKAN PASCA ANESTESI</div>
    <q-separator spaced style="border-top: 1px solid #000" />
    <q-form @submit="simpan">
      <div class="row">
        <div class="col">
          Masalah Kesehatan Anestesi :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Waktu :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Intervensi :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Implementasi :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="q-pt-lg q-pb-lg">Evaluasi</div>
      <div class="row">
        <div class="col">
          S :
        </div>
        <div class="col-10">
          <q-input v-model="soap" type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          O :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          A :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          P :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Nama TTD :
        </div>
        <div class="col-10">
          <q-input dense type="text" autogrow />
        </div>
      </div>
      <div class="q-mt-md text-right q-gutter-sm print-hide">
        <q-btn label="Simpan" type="submit" color="red" />
        <q-btn label="Cetak" color="red" v-print="printObj" />
      </div>
    </q-form>
  </q-page>

</template>
<script setup>
import { ref } from 'vue';

defineProps({
  pasien: {
    type: Object,
    default: null
  },
})
const soap = ref("")
function simpan() {
  alert(soap.value)
}
</script>
