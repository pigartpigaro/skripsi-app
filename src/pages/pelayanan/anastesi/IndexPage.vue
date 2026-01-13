<template>
  <q-page class="column full-height">
    <div class="q-pa-sm">
      <header-page />
    </div>

    <div class="q-pa-sm scroll" style="height: calc(100vh - 200px);">
      <list-page :items="store.items" :loading="store.loadingcari" @rinci="opendialog($event)" />
    </div>
    <div class="q-pa-sm absolute-bottom">
      <footer-page :meta="store.meta" @go-to="goTo($event)" />
    </div>
    <index-page :pasien="store.pasien" />
  </q-page>

</template>
<script setup>
import HeaderPage from './comp/HeaderPage.vue';
import FooterPage from './comp/FooterPage.vue';
import ListPage from './comp/ListPage.vue';

import { onMounted } from 'vue';
import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi';
import IndexPage from './dialogpelayanan/IndexPage.vue';
const store = useListPasienAnastesiStore()

function opendialog(pasien) {
  store.pasien = pasien
  console.log('pasien', pasien)
  store.terimadata(pasien.id)
  store.dialogPelayanan = true
}

onMounted(() => {
  store.getData()
  // store.init()
})
</script>
