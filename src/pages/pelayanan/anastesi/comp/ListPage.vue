<template>
  <div>
    <div v-if="props?.loading === true" class="column flex-center text-white" style="min-height:400px">
      <q-spinner-dots color="primary" size="30px" />
    </div>
    <div v-else-if="!props?.items?.length" class="column flex-center text-dark" style="min-height:400px">
      No Data Available
    </div>
    <q-list
  v-else
  bordered
  class="bg-grey-1 rounded-borders q-pa-xs"
  separator
>
  <q-item
    v-for="(row, i) in props.items"
    :key="i"
    clickable
    v-ripple
    class="q-py-sm q-px-md list-item-modern"
  >
    <!-- AVATAR -->
    <q-item-section avatar>
      <q-avatar size="42px">
        <img :src="getAvatar(row.kelamin)" />
      </q-avatar>
    </q-item-section>

    <!-- NAMA -->
    <q-item-section>
      <div class="text-weight-medium text-dark">
        {{ row.nama }}
      </div>
      <div class="text-caption text-grey-6">
        {{ row.kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}
      </div>
    </q-item-section>

    <!-- ACTION -->
    <q-item-section side>
      <q-btn
        flat
        round
        size="sm"
        icon="edit"
        color="primary"
        @click="openRincian(row)"
      >
        <q-tooltip>Edit Data</q-tooltip>
      </q-btn>
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

const getAvatar = (kelamin) => {
  if (kelamin === 'L') {
    return 'https://api.dicebear.com/7.x/personas/svg?seed=male'
  }
  if (kelamin === 'P') {
     return 'https://api.dicebear.com/7.x/avataaars/svg'
  }
  return 'https://api.dicebear.com/7.x/personas/svg?seed=unknown'
}

</script>
<style scoped>
.list-item-modern {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.list-item-modern:hover {
  background-color: #f5f7fa;
  transform: translateY(-1px);
}


</style>
