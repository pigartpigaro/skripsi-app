<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-5 q-pr-sm">
        <IndexForm />
      </div>
      <q-separator vertical />
      <div class="col q-pl-sm">
        <IndexList />
      </div>
    </div>
  </div>
</template>
<script setup>
import IndexForm from './comp/form/IndexForm.vue';
import IndexList from './comp/list/IndexList.vue';

</script>
