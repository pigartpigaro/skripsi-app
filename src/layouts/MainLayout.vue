<template>
  <q-layout view="hHh LpR fFf">

    <!-- HEADER -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center q-gutter-sm">
          <q-avatar size="32px">
            <img :src="logo" />
          </q-avatar>
          <span>Emars App</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- LEFT DRAWER -->
    <q-drawer
      show-if-above
      bordered
      :mini="miniState"
      :mini-width="64"

      :width="220"
      @mouseover="miniState = false"
      @mouseleave="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list padding>

          <template v-for="menu in menus" :key="menu.id">

            <!-- MENU TANPA CHILD -->
            <q-item
              v-if="!menu.children.length"
              clickable
              v-ripple
              :to="menu.route"
            >
              <q-item-section avatar>
                <q-icon :name="menu.icon" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                <q-item-label>{{ menu.title }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- MENU DENGAN CHILD -->
            <q-expansion-item
              v-else
              :icon="menu.icon"
              :label="menu.title"
              expand-separator
              :default-opened="false"
              :expand-icon="miniState ? '' : 'keyboard_arrow_down'"
            >
              <q-item
                v-for="child in menu.children"
                :key="child.id"

                clickable
                v-ripple
                :to="child.route"
                class="submenu-item"
              >
                <q-item-section avatar v-if="!miniState" class="submenu-bullet" />
                <q-item-section v-if="!miniState">
                  <q-item-label>{{ child.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script setup>
import { ref } from 'vue'
import logo from 'src/assets/images/udumbara2.png'

const miniState = ref(true)

const menus = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'home',
    route: '/dashboard',
    name: 'dashboard',
    children: []
  },
  {
    id: 2,
    title: 'Master',
    icon: 'layers',
    route: '/master',
    name: 'master',
    children: [
      {
        id: 1,
        title: 'Dokter',
        route: '/master/dokter',
        name: 'master.dokter'
      },
      {
        id: 2,
        title: 'Pasien',
        route: '/master/pasien',
        name: 'master.pasien'
      },
      {
        id: 3,
        title: 'Pendidikan',
        route: '/master/pendidikan',
        name: 'master.pendidikan'
      },
      {
        id: 4,
        title: 'Agama',
        route: '/master/agama',
        name: 'master.agama'
      },
      {
        id: 5,
        title: 'Ruangan',
        route: '/master/ruangan',
        name: 'master.ruangan'
      },
      {
        id: 6,
        title: 'Penanggung Jawab',
        route: '/master/penanggung-jawab',
        name: 'master.penanggung-jawab'
      },
      {
        id: 7,
        title: 'Pekerjaan',
        route: '/master/pekerjaan',
        name: 'master.pekerjaan'
      },
      {
        id: 8,
        title: 'Cara Masuk',
        route: '/master/cara-masuk',
        name: 'master.cara-masuk'
      },
      {
        id: 9,
        title: 'Asuransi',
        route: '/master/asuransi',
        name: 'master.asuransi'
      }
    ]
  }
]
</script>
<style scoped>
.submenu-item {
  padding-left: 40px;
}

.submenu-bullet {
  min-width: 10px;
  max-width: 10px;
}

.submenu-bullet::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #555;
  display: inline-block;
}
</style>
