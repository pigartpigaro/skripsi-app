<template>
<q-page class="column full-height">
  <div class="q-pa-sm">
    <header-page />
  </div>

  <div class="q-pa-sm">
    <list-page :items="store.items" :loading="store.loadingcari"/>
  </div>
  <div class="q-pa-sm absolute-bottom z-top">
      <footer-page :meta="store.meta" @go-to="goTo($event)"/>
    </div>
</q-page>
</template>
<script setup>
  import HeaderPage from './comp/HeaderPage.vue';
  import FooterPage from './comp/FooterPage.vue';
import ListPage from './comp/ListPage.vue';
import { onMounted } from 'vue';
import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi';
const store = useListPasienAnastesiStore()

onMounted(() => {
  store.getData()
  // store.init()
})
</script>
