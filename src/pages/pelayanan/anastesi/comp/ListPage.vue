<template>
  <div>
    <div v-if="props?.loading === true" class="column flex-center text-white" style="min-height:400px">
      <q-spinner-dots color="primary" size="30px" />
    </div>
    <div v-else-if="!props?.items?.length" class="column flex-center text-dark" style="min-height:400px">
      No Data Available
    </div>
    <q-list v-else bordered class="rounded-borders bg-white" separator square>
      <q-item v-for="(row, i) in props.items" :key="row?.no" v-ripple class="q-py-xs">
        <q-item-section style="max-width: 20px;"> {{ i + 1 }} </q-item-section>
        <q-item-section>{{ row.nama }}</q-item-section>
        <q-item-section side>
          <div class="row q-gutter-xs">
            <q-btn flat icon="edit" size="sm" round color="primary" @click="openRincian(row)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
 const props = defineProps({
  items: {
    type: Array,
    default: () => ([])
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
