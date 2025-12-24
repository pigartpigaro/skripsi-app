<template>
  <q-toolbar>
    <q-btn flat dense icon="icon-mat-sort" @click="emits('toggleLeftDrawer')" />
    <q-toolbar-title class="f-14">
      <div class="row items-center q-gutter-md">
        <div class="col">
          Petugas : {{ props.user?.user?.nama }}
        </div>
        <q-separator vertical color="orange" class="q-ml-sm" />
        <div class="col-3">

          <div class="row items-center no-wrap q-gutter-sm text-white">
            <div class="column f-12">
              <div>
                <q-badge color="lime-12" text-color="dark" class="text-bold">
                  Sistem Bayar : {{ pasien?.nama_asuransi }}
                </q-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-toolbar-title>
    <div v-if="pasien?.dokter !== ''">
      <q-btn v-if="pasien?.flagpelayanan === '' || pasien?.flagpelayanan === '2'" label="selesaikan layanan"
        color="negative" class="q-mr-lg q-px-lg" dense :loading="loadingFinish" :disable="loadingFinish"
        @click="selesaikanLayanan" />
      <q-btn v-else-if="pasien?.status === '3'" label="LAYANAN TELAH BATAL" color="negative" class="q-mr-lg q-px-lg"
        dense />
      <q-btn v-else label="SUDAH DILAYANI" color="white" class="q-mr-lg q-px-lg" dense outline disable />
    </div>
    <q-btn v-close-popup dense flat icon="close" :disable="store.loading || store.loadingObat">
      <q-tooltip class="bg-white text-primary">
        Close
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script setup>

import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi'



const store = useListPasienAnastesiStore()

const emits = defineEmits(['toggleLeftDrawer', 'gantidpjp', 'layananSelesai'])


const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  user: {
    type: Object,
    default: null
  },
  loadingFinish: {
    type: Boolean,
    default: false
  }
})

function selesaikanLayanan() {
  // console.log('ok')
  emits('layananSelesai')
}
</script>
