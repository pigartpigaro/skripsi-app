<template>
  <div>
    <div v-if="props?.loading === true" class="column flex-center text-white" style="min-height:400px">
      <q-spinner-dots color="white" size="30px" />
    </div>
    <div v-else-if="!props?.listmaster?.length" class="column flex-center text-white" style="min-height:400px">
      No Data Available
    </div>

    <q-list v-else bordered class="rounded-borders bg-white" separator square>
      <q-item class="bg-primary text-white">
        <!-- <q-item-section style="max-width: 20px;">No.</q-item-section> -->
        <q-item-section>Kode</q-item-section>
        <q-item-section>Pekerjaan</q-item-section>
        <q-item-section side>
          #
        </q-item-section>
      </q-item>
      <q-item v-for="(row, i) in props?.listmaster" :key="row?.no || i" v-ripple class="q-py-xs">
        <!-- <q-item-section style="max-width: 20px;"> {{ i + 1 }}. </q-item-section> -->
        <q-item-section>{{ row.kode }}</q-item-section>
        <q-item-section>{{ row.nama }}</q-item-section>
        <q-item-section side>
          <div class="row q-gutter-xs">
            <!-- <q-btn flat icon="layers" size="sm" round color="primary" @click="openRincian(row)" /> -->
            <q-btn flat icon="edit" size="sm" round color="primary" @click="emits('edit', row)" />
            <q-btn flat icon="delete" size="sm" round color="negative" @click="emits('delete', row)" />
          </div>
        </q-item-section>
      </q-item>
      <div>
        <footer-page :meta="props.meta" @go-to="goTo($event)"/>
      </div>
    </q-list>

    <!-- <lihat-rincian v-model="showRincian" :listrincian="selectedRincian" /> -->
  </div>
</template>
<script setup>
import FooterPage from './FooterPage.vue';


// const LihatRincian = defineAsyncComponent(() => import('./DialogRincian.vue'))
const props = defineProps({
  listmaster: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  meta: {
    type: Object,
    default: () => ({})
  }
})
function goTo(page) {
  emits('goTo', page)
}


const emits = defineEmits(['edit', 'delete', 'goTo'])
</script>
