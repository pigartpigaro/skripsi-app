<template>
  <q-layout view="hHh LpR fFf">

    <!-- HEADER (tanpa tombol menu) -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar size="32px">
            <img src="~assets/images/udumbara2.png" style="height:24px; width:auto;">
          </q-avatar>
          Emars App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- LEFT DRAWER -->
    <q-drawer
  show-if-above
  side="left"
  bordered
  :mini="miniState"
  mini-width="64"
  :width="220"
  @mouseover="miniState = false"
  @mouseleave="miniState = true"
>
  <q-scroll-area class="fit">

    <q-list padding>

      <!-- MASTER -->
      <q-expansion-item
        icon="source"
        label="Master"
        expand-separator
        :expand-icon="miniState ? '' : 'keyboard_arrow_down'"
      >

        <!-- SUBMENU -->
        <q-item
          clickable
          v-ripple
          to="/dokter"
          class="submenu-item"
        >
          <!-- BULLET -->
          <q-item-section
            avatar
            v-if="!miniState"
            class="submenu-bullet"
          />

          <!-- LABEL -->
          <q-item-section v-if="!miniState">
            <q-item-label>Dokter</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/pasien"
          class="submenu-item"
        >
          <q-item-section
            avatar
            v-if="!miniState"
            class="submenu-bullet"
          />
          <q-item-section v-if="!miniState">
            <q-item-label>Pasien</q-item-label>
          </q-item-section>
        </q-item>

      </q-expansion-item>

    </q-list>

  </q-scroll-area>
</q-drawer>

    <!-- PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const miniState = ref(true) // true = icon only
</script>
<style scoped>
.submenu-item {
  padding-left: 40px; /* MENJOROK KE KANAN */
}

.submenu-bullet {
  min-width: 10px;
  max-width: 10px;
}

.submenu-bullet::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(0, 0, 0);
  display: inline-block;
}
</style>
