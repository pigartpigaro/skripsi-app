<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="dark?'':'page-light'"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()

const dark = computed(() => $q.dark.isActive)
</script>

<style lang="scss" scoped>
// .bg-img {
//   background-image: url("../../assets/images/bg-login.png");
// }
</style>
