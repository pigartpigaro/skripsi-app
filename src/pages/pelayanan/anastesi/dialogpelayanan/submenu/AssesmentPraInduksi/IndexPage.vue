<template>
  <q-page class="q-pa-md bg-grey-6">
    <div id="printMe" class="q-pa-md full-width full-height bg-white">
      <div class="text-weight-bold text-h6 text-center q-pb-md">Assesment Pra Induksi</div>
      <q-separator spaced style="border-top: 1px solid #000" />
    </div>
    <div class="row">
      <div class="col-12">Tanggal & Jam : <q-input v-model="store.tgljam" label="Tanggal & Jam" dense type="text"
          autogrow />
      </div>
      <div class="col-12">> Riwayat alergi Obat-obatan :
        <q-radio v-model="store.falergi.obat" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.falergi.obat" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="col-2">> Riwayat Lainnya : </div>
      <div class="col-9">
        <q-input v-model="store.falergi.lainnya" label="Keterangan" dense type="text" autogrow />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useAssesmentPraInduksiStore } from 'src/stores/master/pelayanan/assesmentprainduksi'

const store = useAssesmentPraInduksiStore()

</script>
