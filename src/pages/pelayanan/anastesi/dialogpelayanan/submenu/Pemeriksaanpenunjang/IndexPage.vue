<template>
  <PenunjangLaboratorium :pasien="pasien" />
  <PenunjangRadiologi :pasien="pasien" />
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const PenunjangLaboratorium = defineAsyncComponent(() =>
  import('./PenunjangLaboratorium.vue')
)

const PenunjangRadiologi = defineAsyncComponent(() =>
  import('./PenunjangRadiologi.vue')
)
defineProps({
  pasien: {
    type: Object,
    default: null
  },
})
</script>
