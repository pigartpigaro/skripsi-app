<template>
  <q-page class="column" style="height: 90%;">
    <!-- Header dengan tinggi tetap -->
    <div class="q-pa-sm bg-primary text-white" style="height: 60px; flex-shrink: 0;">
      <HeaderPage />
    </div>

    <!-- Konten scroll area mengisi sisa ruang -->
    <q-card  style="flex: 1 1 auto;">
      <q-scroll-area style="height: 90%;">
        <ListPage />
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import HeaderPage from './HeaderPage.vue'
import ListPage from './ListPage.vue'
</script>
