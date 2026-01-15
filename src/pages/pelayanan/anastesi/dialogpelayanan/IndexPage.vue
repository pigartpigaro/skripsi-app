<template>
  <q-dialog v-model="store.dialogPelayanan" persistent maximized transition-show="slide-up"
    transition-hide="slide-down">
    <!-- <pre>{{ menu }}</pre> -->
    <q-card square flat class="container-no-header">
      <q-layout view="lHr Lpr lFf" container class="shadow-2 rounded-borders z-top">
        <q-header elevated class="bg-primary">
          <header-layout :pasien="props.pasien" :loading-finish="store.loading"
            @toggle-left-drawer="() => drawer = !drawer" @layanan-selesai="store.setLayananSelesai(pasien)"
            :user="user" />
        </q-header>

        <!-- LEFT DRAWER ======================================================================================-->
        <q-drawer v-model="drawer" elevated bordered show-if-above :width="230" :breakpoint="400">
          <LeftDrawer :key="pasien" :pasien="pasien" :menus="filteredMenus" :menu="menu"
            @clickMenu="(val) => menuDiganti(val)" />
        </q-drawer>

        <!-- RIGHT DRAWER ======================================================================================-->
        <!-- <q-drawer v-model="drawerRight" side="right" show-if-above overlay bordered :width="845" :breakpoint="500">
          <RightDrawer :key="pasien" :pasien="pasien" @close="drawerRight = false" />
        </q-drawer> -->

        <!-- CONTAINER ============================================================================================-->
        <q-page-container>
          <q-page class="contain bg-grey-3">
            <Suspense :key="menu?.comp" timeout="0">
              <template #default>
                <component :is="menu?.comp" :key="pasien" :pasien="pasien" />
              </template>
              <template #fallback>
                <AppLoader />
              </template>
            </Suspense>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>

import { useListPasienAnastesiStore } from 'src/stores/master/pelayanan/listpasienanastesi'
import HeaderLayout from './comp/HeaderLayout.vue';
import LeftDrawer from './comp/LeftDrawer.vue';
import { defineAsyncComponent, onMounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

const store = useListPasienAnastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})


const menus = ref([
  {
    name: 'SerahTerimaPreOperasi ',
    label: 'Serah Terima Pasien Pre Operasi',
    icon: 'medication',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/Serahterimapreoperasi/IndexPage.vue')))
  },
  {
    name: 'PengkajianPreAnestesi ',
    label: 'Pengkajian Pre Anestesi ',
    icon: 'medical_information',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/Pengkajiananastesi/IndexPage.vue')))
  },
  {
    name: 'PemeriksaanPenunjang',
    label: 'Pemeriksaan Penunjang',
    icon: 'diversity_2',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/Pemeriksaanpenunjang/IndexPage.vue')))
  },
  {
    name: 'AssesmentPraAnestesi',
    label: 'Assesment Pra Anestesi',
    icon: 'analytics',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/AssesmentPraAnestesi/IndexPage.vue')))
  },
  {
    name: 'AssesmentPraInduksi',
    label: 'Assesment Pra Induksi',
    icon: 'local_hospital',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/AssesmentPraInduksi/IndexPage.vue')))
  },
  {
    name: 'SurgicalSafetyChecklist',
    label: 'Checklist Keselamatan Operasi',
    icon: 'transfer_within_a_station',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/SurgicalSafetyChecklist/IndexPage.vue')))
  },
  {
    name: 'LaporanAnestesi',
    label: 'Laporan Anestesi',
    icon: 'description',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/LaporanAnestesi/IndexPage.vue')))
  },
  {
    name: 'AskanPraAnestesi',
    label: 'Askan Pra Anestesi',
    icon: 'vaccines',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/AskanPraAnestesi/IndexPage.vue')))
  },
  {
    name: 'AskanIntraAnestesi',
    label: 'Askan Intra Anestesi',
    icon: 'monitor_heart',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/AskanIntraAnestesi/IndexPage.vue')))
  },
  {
    name: 'AskanPascaanastesi',
    label: 'Askan Pasca Anestesi',
    icon: 'cancel_presentation',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/AskanPascaAnestesi/IndexPage.vue')))
  },
  {
    name: 'SerahterimaOKkeRR',
    label: 'Serah Terima OK ke RR',
    icon: 'queue_play_next',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/SerahterimaOK_RR/IndexPage.vue')))
  },
  {
    name: 'ScorePascaAnestesi',
    label: 'Score Pasca Anestesi',
    icon: 'credit_score',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/ScorePascaAnestesi/IndexPage.vue')))
  },
  {
    name: 'SerahterimaRRkeRanap',
    label: 'Serah Terima RR ke Ranap',
    icon: 'bento',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/SerahterimaRR_Ranap/IndexPage.vue')))
  },
  {
    name: 'PemantauanPascaAnestesi',
    label: 'Pemantauan Pasca Anestesi',
    icon: 'padding',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/PemantauanPascaAnestesi/IndexPage.vue')))
  },
  {
    name: 'PemakaianObatdanAlkes',
    label: 'Pemakaian Obat dan Alkes',
    icon: 'medication_liquid',
    route: ['anastesi'],
    comp: shallowRef(defineAsyncComponent(() => import('./submenu/PemakaianObatdanAlkes/IndexPage.vue')))
  },
  // {
  //   name: 'AssesmentPage',
  //   label: 'Assesment',
  //   icon: 'icon-mat-analytics',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../layanan/assesment/AssesmentPage.vue')))
  // },
  // {
  //   name: 'penunjang-page',
  //   label: 'Penunjang',
  //   icon: 'icon-my-local_hospital',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../layanan/penunjang/PenunjangPage.vue')))
  // },
  // {
  //   name: 'konsulspesialis',
  //   label: 'Konsul Spesialis',
  //   icon: 'icon-mat-textsms',
  //   nakes: ['1'],
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('./konsul/IndexPage.vue')))
  // },
  // {
  //   name: 'tinjauanulang',
  //   label: 'Tinjauan Ulang',
  //   icon: 'icon-mat-transfer_within_a_station',
  //   nakes: ['1'],
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('./tinjauanulang/IndexPage.vue')))
  // },
  // {
  //   name: 'plann-page',
  //   label: 'Plan',
  //   icon: 'icon-mat-next_plan',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../layanan/plann/IndexPage.vue')))
  // },
  // {
  //   name: 'pemakaianobat-page',
  //   label: 'Pemaikaian Obat/Cairan',
  //   icon: 'icon-fa-mortar-pestle-solid',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../layanan/pemakaianobat/PemakaianObatPage.vue')))
  // },
  // {
  //   name: 'e-resep-page',
  //   label: 'EResep',
  //   icon: 'icon-mat-receipt',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../../eresep/EresepPage.vue')))
  // },
  // {
  //   name: 'upload-dokomen',
  //   label: 'Upload Dokumen',
  //   icon: 'icon-fa-folder-tree-solid',
  //   route: ['igd'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../layanan/uploaddokumen/IndexPage.vue')))
  // },
  // {
  //   name: 'e-dokumen-page',
  //   label: 'Dokumen RM & Billing',
  //   icon: 'icon-mat-print',
  //   route: ['igd', 'mpp', 'rekammedik'],
  //   comp: shallowRef(defineAsyncComponent(() => import('../../igd/layanan/dokumen/DokumenPage.vue')))
  // }
])

const data = localStorage.getItem('user')
const user = JSON.parse(data)

const route = useRoute()
const menu = ref()
const filteredMenus = ref([])
const drawer = ref(false)

function menuDiganti(val) {
  console.log('menu diganti', val)
  menu.value = val
}

onMounted(() => {
  // store.pasien = props.pasien
  const link = route?.path
  const pathSegments = link.split('/').filter(Boolean)
  filteredMenus.value = menus.value?.filter(menu => menu?.route?.some(r => pathSegments.includes(r))) || []
  menu.value = filteredMenus.value[0]
})
</script>

<style scoped>
.menu-card {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
</style>
