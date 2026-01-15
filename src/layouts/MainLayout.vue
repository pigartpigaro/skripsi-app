<template>
  <q-layout view="hHh LpR fFf">
    <app-loader v-if="auth.loading" />
    <!-- HEADER -->
    <q-header elevated class="header-gradient text-white">
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
    <q-drawer show-if-above bordered :mini="miniState" :mini-width="64" :width="220" @mouseover="miniState = false"
      @mouseleave="miniState = true">
      <q-scroll-area class="fit">
        <q-list padding class="column">

          <template v-for="menu in menus" :key="menu.id">

            <!-- MENU TANPA CHILD -->
            <q-item v-if="!menu.children.length" clickable v-ripple :to="menu.route">
              <q-item-section avatar>
                <q-icon color="primary" :name="menu.icon" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                <q-item-label>{{ menu.title }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- MENU DENGAN CHILD -->
            <q-expansion-item v-else :icon="menu.icon" :label="menu.title" expand-separator :default-opened="false"
              :expand-icon="miniState ? '' : 'keyboard_arrow_down'">
              <template #header>
                <q-item-section avatar>
                  <q-icon :name="menu.icon" color="primary" />
                </q-item-section>

                <q-item-section v-if="!miniState">
                  <q-item-label>{{ menu.title }}</q-item-label>
                </q-item-section>
              </template>
              <q-item v-for="child in menu.children" :key="child.id" clickable v-ripple :to="child.route"
                class="submenu-item">
                <q-item-section avatar v-if="!miniState" class="submenu-bullet" />
                <q-item-section v-if="!miniState">
                  <q-item-label>{{ child.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

          </template>

          <q-item clickable v-ripple @click="doLogout()">
            <q-item-section avatar>
              <q-icon color="primary" name="logout" />
            </q-item-section>
            <q-item-section avatar>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
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
import { useAuthStores } from 'src/stores/auth/auth'
import { useRouter } from 'vue-router'

const miniState = ref(true)
const user = JSON.parse(localStorage.getItem('user') || '{}')
let menus = []
if (!user.kode_jabatan) {
  menus = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'home',
      route: '/dashboard',
      name: 'dashboard',
      children: []
    },
    {
      id: 3,
      title: 'Pendaftaran',
      icon: 'person_add',
      route: '/pendaftaran',
      name: 'pendaftaran',
      children: [
        { id: 1, title: 'Pasien Baru', route: '/pendaftaran/pasienbaru', name: 'pendaftaran.pasienbaru' }
      ]
    },
    {
      id: 4,
      title: 'Pelayanan',
      icon: 'vaccines',
      route: '/pelayanan',
      name: 'pelayanan',
      children: [
        { id: 1, title: 'Anastesi', route: '/pelayanan/anastesi', name: 'pelayanan.anastesi' }
      ]
    },
    {
      id: 11,
      title: 'Logout',
      icon: 'logout',
      route: '/logout',
      name: 'logout',
      children: []
    }
  ]
} else {
  menus = [
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
        { id: 1, title: 'Dokter', route: '/master/dokter', name: 'master.dokter' },
        { id: 2, title: 'Pasien', route: '/master/pasien', name: 'master.pasien' },
        { id: 3, title: 'Pendidikan', route: '/master/pendidikan', name: 'master.pendidikan' },
        { id: 4, title: 'Agama', route: '/master/agama', name: 'master.agama' },
        { id: 5, title: 'Ruangan', route: '/master/ruangan', name: 'master.ruangan' },
        { id: 6, title: 'Pekerjaan', route: '/master/pekerjaan', name: 'master.pekerjaan' },
        { id: 7, title: 'Cara Masuk', route: '/master/cara-masuk', name: 'master.cara-masuk' },
        { id: 8, title: 'Asuransi', route: '/master/asuransi', name: 'master.asuransi' }
      ]
    },
    {
      id: 3,
      title: 'Pendaftaran',
      icon: 'person_add',
      route: '/pendaftaran',
      name: 'pendaftaran',
      children: [
        { id: 1, title: 'Pasien Baru', route: '/pendaftaran/pasienbaru', name: 'pendaftaran.pasienbaru' }
      ]
    },
    {
      id: 4,
      title: 'Pelayanan',
      icon: 'vaccines',
      route: '/pelayanan',
      name: 'pelayanan',
      children: [
        { id: 1, title: 'Anastesi', route: '/pelayanan/anastesi', name: 'pelayanan.anastesi' }
      ]
    },
    {
      id: 11,
      title: 'Logout',
      icon: 'logout',
      route: '/logout',
      name: 'logout',
      children: []
    }
  ]
}


const auth = useAuthStores()
const router = useRouter()
const doLogout = async () => {
  await auth.logout()
  router.replace({ name: 'login' })
}
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
  background: currentColor;
  display: inline-block;
}

.header-gradient {
  background: linear-gradient(135deg, #2ec4cc, #3498db);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.q-toolbar-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
