<template>
  <q-toolbar class="bg-primary text-white shadow-2 rounded-borders">
    <!-- Toggle Drawer -->
    <q-btn flat dense round icon="menu" @click="emits('toggleLeftDrawer')" class="q-mr-md"
      aria-label="Toggle Left Drawer" />

    <!-- Toolbar Title / Info -->
    <q-toolbar-title class="text-h6 q-pa-none">
      <div class="row items-center justify-between no-wrap">
        <!-- Petugas Info -->
        <div class="text-subtitle2">
          <q-icon name="person" class="q-mr-xs" />
          Petugas: <span class="text-bold">{{ props.user?.nama || '-' }}</span>
        </div>
        <div class="text-subtitle2">
          <q-icon name="person" class="q-mr-xs" />
          Dr. Operator: <span class="text-bold">{{ props?.pasien?.dokter_operator || '-' }}</span>
        </div>
        <div class="text-subtitle2">
          <q-icon name="person" class="q-mr-xs" />
          Dr. Anastesi: <span class="text-bold">{{ props?.pasien?.dokter_anastesi || '-' }}</span>
        </div>
        <div class="text-subtitle2">
          <q-icon name="person" class="q-mr-xs" />
          Penata Anastesi: <span class="text-bold">{{ props?.pasien?.penata_anastesi || '-' }}</span>
        </div>

        <!-- Separator -->
        <q-separator vertical color="white" class="q-mx-md" />

        <!-- Asuransi Info -->
        <!-- <div class="row items-center no-wrap">
          <q-badge color="lime-10" text-color="dark" class="text-bold q-pa-xs shadow-1">
            Sistem Bayar: {{ pasien?.nama_asuransi || '-' }}
          </q-badge>
        </div> -->
      </div>
    </q-toolbar-title>

    <!-- Action Buttons -->
    <div class="row items-center q-gutter-sm">
      <!-- Selesaikan Layanan -->
      <!-- <q-btn v-if="pasien?.dokter && (pasien?.flagpelayanan === '' || pasien?.flagpelayanan === '2')"
        label="Selesaikan Layanan" color="negative" dense rounded class="text-white" :loading="loadingFinish"
        :disable="loadingFinish" @click="selesaikanLayanan" />

      <q-btn v-else-if="pasien?.status === '3'" label="LAYANAN TELAH BATAL" color="warning" dense rounded flat />

      <q-btn v-else label="SUDAH DILAYANI" color="grey-3" text-color="black" dense rounded outline disable /> -->

      <!-- Close Toolbar -->
      <q-btn dense flat round icon="close" :disable="store.loading || store.loadingObat" v-close-popup class="q-ml-md">
        <q-tooltip class="bg-white text-primary">
          Close
        </q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup>
import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi'

const store = useListPasienAnastesiStore()

const emits = defineEmits(['toggleLeftDrawer', 'gantidpjp', 'layananSelesai'])

const props = defineProps({
  pasien: { type: Object, default: null },
  user: { type: Object, default: null },
  loadingFinish: { type: Boolean, default: false }
})

// function selesaikanLayanan() {
//   emits('layananSelesai')
// }
</script>

<style scoped>
/* Modern minimal look */
.q-toolbar {
  border-radius: 8px 8px 0 0;
  padding: 0.5rem 1rem;
}

.text-subtitle2 {
  font-size: 0.9rem;
}

.q-btn[flat] {
  transition: 0.2s ease;
}

.q-btn[flat]:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
