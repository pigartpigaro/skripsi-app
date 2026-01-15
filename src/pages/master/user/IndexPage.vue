<template>
  <q-page class="column full-height">
    <div class="q-pa-sm">
      <header-page />
    </div>

    <div class="q-pa-sm scroll" style="height: calc(100vh - 200px);">
      <list-page :items="store.items" :loading="store.loadingcari" />
    </div>
    <!--
    <div class="q-pa-sm absolute-bottom">
      <footer-page :meta="store.meta" @go-to="goTo($event)" />
    </div> -->
  </q-page>
</template>

<script setup>
import { useMasterUserStore } from 'src/stores/master/user/mainstore';

import HeaderPage from './comp/HeaderPage.vue';
import ListPage from './comp/ListPage.vue';
import { onMounted } from 'vue';
// import FooterPage from './comp/FooterPage.vue';
const store = useMasterUserStore()

onMounted(() => {
  store.getData()
  store.init()
})
</script>
