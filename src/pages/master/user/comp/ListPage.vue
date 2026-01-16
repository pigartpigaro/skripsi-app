<template>
  <div>
    <div v-if="props?.loading === true" class="column flex-center text-white" style="min-height:400px">
      <q-spinner-dots color="primary" size="30px" />
    </div>
    <div v-else-if="!props?.items?.length" class="column flex-center text-dark" style="min-height:400px">
      No Data Available
    </div>
    <q-list v-else bordered class="bg-grey-1 rounded-borders q-pa-xs" separator>
      <q-item v-for="(row, i) in props.items" :key="i" v-ripple class="q-py-sm q-px-md list-item-modern">
        <!-- AVATAR -->
        <!-- <q-item-section avatar>
          <q-avatar size="42px">
            <img :src="getAvatar(row.kelamin)" />
          </q-avatar>
        </q-item-section> -->

        <!-- NAMA -->
        <q-item-section>
          <div class="text-weight-medium text-dark">
            NAMA: {{ row.nama }}
          </div>
          <div class="text-caption">
            Kode: {{ row.kode }}
          </div>
          <div class="text-caption">
            Email: {{ row.email }}
          </div>
        </q-item-section>

        <q-item-section>
          <div class="text-weight-medium text-weight-bold text-dark">
            User Name : {{ row.username }}
          </div>
          <div class="q-mb-sm">
            <div class="text-caption text-dark text-weight-bold row items-center q-gutter-xs">
              Pass:
              <span>{{ showPass[row.id] ? row.pass : '**********' }}</span>

              <q-btn flat round size="sm" icon="visibility" color="primary" @click="togglePass(row.id)" />
            </div>
          </div>


        </q-item-section>

        <!-- ACTION -->
        <!-- <q-item-section side>
          <q-btn flat round size="sm" icon="edit" color="primary" @click="emits('rinci', row)">
            <q-tooltip>Edit Data</q-tooltip>
          </q-btn>
        </q-item-section> -->
      </q-item>
    </q-list>
  </div>

</template>
<script setup>
import { ref } from 'vue';



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

const showPass = ref({})

const togglePass = (id) => {
  showPass.value[id] = true
  setTimeout(() => {
    showPass.value[id] = false
  }, 5000)
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
