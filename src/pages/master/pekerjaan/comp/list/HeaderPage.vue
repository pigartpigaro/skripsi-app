<template>
  <div class="row items-center justify-between  q-gutter-xs" style="height: 40px;">

    <!-- Search Input -->
    <q-input
      v-model="store.params.q"
      placeholder="Cari Pekerjaan..."
      dense
      outlined
      debounce="800"
      :loading="store.loading"
      @update:model-value="store.search"
      style="min-width: 200px; max-width: 300px;"
      color="orange"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Refresh Button -->
    <q-btn
      flat
      unelevated
      color="orange"
      size="xs"
      icon="refresh"
      @click="store.refresh"
    >
      <q-tooltip anchor="top middle" self="bottom middle">
        Refresh Data
      </q-tooltip>
    </q-btn>

  </div>
</template>

<script setup>
import { usePekerjaanStore } from 'src/stores/master/pekerjaan'

const store = usePekerjaanStore()
</script>
