<template>
  <div class="row justify-between items-center q-pa-sm bg-primary text-white">
    <div class="row items-center">
      <div>
        <q-input v-model="store.params.q" placeholder="Cari Pasien..." dense outlined dark color="white"
          style="min-width:200px" debounce="800" :loading="store.loadingcari" @update:model-value="store.search"
          clearable>
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- <div class="q-ml-sm">
        <app-input-date-human :model="store.tanggaldisplay.tgldari" label="Tgl Dari" color="white" dark dense outlined
          @db-model="setTo" @set-display="setToDisp" />
      </div>
      <div class="q-ml-sm">
        <app-input-date-human :model="store.tanggaldisplay.tglsampai" label="Tgl Dari" color="white" dark dense outlined
          @db-model="setTox" @set-display="setToDispx" />
      </div> -->
    </div>
    <div>
      <q-btn class="q-ml-sm" unelevated color="white" flat size="sm" padding="xs" icon="refresh" @click="store.refresh">
        <q-tooltip class="primary" :offset="[10, 10]">
          Refresh Data
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>

import { useMasterUserStore } from 'src/stores/master/user/mainstore';

const store = useMasterUserStore()


</script>
