<template>
  <q-list bordered class="menu-list">

    <q-item v-for="(item, i) in menus" :key="i" clickable v-ripple class="menu-item" :active="menu === item"
      active-class="menu-item--active" @click="emits('menuClick', item)">
      <!-- ICON -->
      <q-item-section avatar>
        <q-avatar size="32px" :class="menu === item ? 'avatar-active' : 'avatar-inactive'">
          <q-icon :name="item.icon" size="16px" />
        </q-avatar>
      </q-item-section>

      <!-- LABEL -->
      <q-item-section>
        <div class="menu-label" :class="menu === item ? 'text-white' : 'text-black'">
          {{ item.label }}
        </div>
      </q-item-section>

    </q-item>

  </q-list>
</template>


<script setup>
const emits = defineEmits(['menuClick'])

defineProps({
  menus: {
    type: Array,
    default: () => []
  },
  menu: {
    type: Object,
    default: null
  },
  pasien: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.menu-list {
  background: transparent;
  border-radius: 12px;
}

/* ITEM */
.menu-item {
  border-radius: 10px;
  margin: 6px;
  padding: 6px;
  transition: all 0.15s ease;
  background: #ffffff;
  /* ⬅️ NON-AKTIF PUTIH */
}

/* HOVER */
.menu-item:hover {
  background: #f2f2f2;
}

/* ACTIVE */
.menu-item--active {
  background: #1976d2 !important;
  /* ⬅️ AKTIF BIRU */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* ICON */
.avatar-inactive {
  background: #e0e0e0;
  color: #000000;
}

.avatar-active {
  background: #ffffff;
  color: #1976d2;
}

/* TEXT */
.menu-label {
  font-size: 13px;
  font-weight: 600;
}
</style>
