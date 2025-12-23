<template>
<q-page class="column full-height" style="overflow: hidden;">
  <div class="q-pa-sm">
    <header-page />
  </div>
  <div class="q-pa-sm">
    list
  </div>
  <div class="q-pa-sm">
    <footer-page/>
  </div>
</q-page>
</template>
<script setup>
  import HeaderPage from './comp/HeaderPage.vue';
  import FooterPage from './comp/FooterPage.vue';
</script>
