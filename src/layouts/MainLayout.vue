<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <!-- <q-img :src="img" spinner-color="white" style="width:20px; height:20px"/> -->
             <img src="src/assets/images/udumbara2.png" style="height:32px; width:auto;">
          </q-avatar>
          Emars App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="200">
      <q-scroll-area class="fit">
        <q-list>
          <q-expansion-item>
            <template #header>
              <q-item-section avatar>
                <q-icon name="source" />
              </q-item-section>
              <q-item-section>Master</q-item-section>
            </template>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'Dokter'"
                @click="link = 'Dokter'"
                active-class="submenu-link"
                to="/dokter"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Dokter</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'Pasien'"
                @click="link = 'Pasien'"
                active-class="submenu-link"
                to="/pasien"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Pasien</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

        </q-list>

      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const link = ref('')
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// const img = computed(() => {
//   return new URL('../../../assets/images/udumbara2.png', import.meta.url).href
// })
</script>
