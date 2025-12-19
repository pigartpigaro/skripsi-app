<template>
  <div class="q-pa-md column q-gutter-sm">
    <q-card
      v-for="item in data"
      :key="item.id"
      flat
      bordered
      class="q-pa-sm hoverable card-item"
    >
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-subtitle1">{{ item.name }}</div>
          <div class="text-caption text-grey">ID: {{ item.id }}</div>
        </div>
        <div class="row q-gutter-xs">
          <q-btn dense icon="edit" color="primary" round @click="editItem(item)" />
          <q-btn dense icon="delete" color="negative" round @click="deleteItem(item)" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' }
]

function editItem(item) {
  console.log('Edit clicked:', item)
}

function deleteItem(item) {
  console.log('Delete clicked:', item)
}
</script>

<style scoped>
.card-item {
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
