<template>
  <q-dialog v-model="store.dialogPelayanan" persistent maximized transition-show="slide-up"
    transition-hide="slide-down">
    <q-card square flat class="container-no-header">
      <q-layout view="lHr Lpr lFf" container class="shadow-2 rounded-borders z-top">
        <q-header elevated class="bg-primary">
          <header-layout :pasien="props.pasien" :loading-finish="store.loading"
            @toggle-left-drawer="() => drawer = !drawer" @layanan-selesai="store.setLayananSelesai(pasien)"
            :user="user" />
        </q-header>

        <!-- LEFT DRAWER ======================================================================================-->
        <!-- <q-drawer v-model="drawer" elevated bordered show-if-above :width="230" :breakpoint="400">
          <LeftDrawer :key="pasien" :pasien="pasien" :menus="filteredMenus" :menu="menu"
            @click-menu="(val) => menuDiganti(val)" @icare="getIcare" @history-pasien="historyPasien" />
        </q-drawer> -->

        <!-- RIGHT DRAWER ======================================================================================-->
        <!-- <q-drawer v-model="drawerRight" side="right" show-if-above overlay bordered :width="845" :breakpoint="500">
          <RightDrawer :key="pasien" :pasien="pasien" @close="drawerRight = false" />
        </q-drawer> -->

        <!-- CONTAINER ============================================================================================-->
        <!-- <q-page-container>
          <q-page class="contain bg-grey-3">
            <Suspense :key="menu.comp" timeout="0">
              <template #default>
                <component :is="menu.comp" :key="pasien" :pasien="pasien" :loadingaja="loadingaja"
                  :ruangranap="store.ruangranaps" depo="igd" />
              </template>
<template #fallback>
                <AppLoader />
              </template>
</Suspense>
</q-page>
</q-page-container> -->
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>

import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi'
import HeaderLayout from './comp/HeaderLayout.vue';

const store = useListPasienAnastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const data = localStorage.getItem('user')
const user = JSON.parse(data)

function menuDiganti(val) {
  menu.value = val
}
</script>

<style scoped>
.menu-card {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
