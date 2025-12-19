<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          EMARS
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered :width="200">
      <q-scroll-area class="fit">
        <q-list>
          <q-item>Menu</q-item>
          <!-- <q-expansion-item>
            <template #header>
              <q-item-section avatar>
                <q-icon name="source" />
              </q-item-section>
              <q-item-section>Data Sasiodagrafi Pasien</q-item-section>
            </template> -->
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'Data Sasiodagrafi Pasien'"
                @click="link = 'Data Sasiodagrafi Pasien'"
                active-class="submenu-link"
                to="/datasasiodagrafipasien"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Data Sasiodagrafi Pasien</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'Pengkajian Pre Anestesi'"
                @click="link = 'Pengkajian Pre Anestesi'"
                active-class="submenu-link"
                to="/pengkajianpreanestesi"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Pengkajian Pre Anestesi</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          <!-- </q-expansion-item> -->
          <q-expansion-item>
            <template #header>
              <q-item-section avatar>
                <q-icon name="storefront" />
              </q-item-section>
              <q-item-section>Transaksi</q-item-section>
            </template>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'saldo awal'"
                @click="link = 'saldo awal'"
                active-class="submenu-link"
                href="##"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Saldo Awal</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'panjar'"
                @click="link = 'panjar'"
                active-class="submenu-link"
                href="##"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>Panjar</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item
                clickable
                v-ripple
                :active="link === 'ls'"
                @click="link = 'ls'"
                active-class="submenu-link"
                href="##"
              >
                <q-item-section class="q-pl-md">
                  <q-item-label>LS</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
        <q-expansion-item>
          <template #header>
            <q-item-section avatar>
              <q-icon name="inventory" />
            </q-item-section>
            <q-item-section>Laporan</q-item-section>
          </template>
          <q-list>
            <q-item
              clickable
              v-ripple
              :active="link === 'rba'"
              @click="link = 'rba'"
              active-class="submenu-link"
            >
              <q-item-section>
                <q-item-label class="q-pl-md">RBA</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-expansion-item>
              <template #header>
                <q-item-section class="q-pl-md">BKU</q-item-section>
              </template>
              <q-item
                clickable
                v-ripple
                :active="link === 'bkuppk'"
                @click="link = 'bkuppk'"
                active-class="submenu-link"
              >
                <q-item-section class="q-pl-lg">
                  <q-item-label>BKU PPK</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                :active="link === 'bkupengeluaran'"
                @click="link = 'bkupengeluaran'"
                active-class="submenu-link"
              >
                <q-item-section class="q-pl-lg">
                  <q-item-label>BKU Pengeluaran</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                :active="link === 'bkuptk'"
                @click="link = 'bkuptk'"
                active-class="submenu-link"
              >
                <q-item-section class="q-pl-lg">
                  <q-item-label>BKU PTK</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
          <q-list>
            <q-expansion-item>
              <template #header>
                <q-item-section class="q-pl-md">BUKU Pembantu</q-item-section>
              </template>
              <q-item
                clickable
                v-ripple
                :active="link === 'bukubank'"
                @click="link = 'bukubank'"
                active-class="submenu-link"
                to="/bukubank"
              >
                <q-item-section class="q-pl-lg">
                  <q-item-label>Buku Bank Bend. Pengeluaran</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                :active="link === 'bukukas'"
                @click="link = 'bukukas'"
                active-class="submenu-link"
                to="/bukutunai"
              >
                <q-item-section class="q-pl-lg">
                  <q-item-label>Buku Kas Tunai Bend. Pengeluaran</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-expansion-item>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      link: ref('inbox')
    }
  }
}
</script>
