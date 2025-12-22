  <template>
  <q-header elevated class="bg-white text-dark">
    <q-toolbar class="q-px-md">

      <!-- LEFT: Title / Logo -->
      <q-toolbar-title class="text-weight-bold">
        MyApp
      </q-toolbar-title>

      <!-- CENTER: Search -->
      <q-input
        dense
        outlined
        v-model="keyword"
        placeholder="Cari data..."
        class="q-mx-md search-input"
        debounce="300"
        clearable
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- RIGHT: Actions -->
      <q-btn flat round icon="notifications" />
      <q-btn flat round icon="account_circle" />

    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, watch } from 'vue'

const keyword = ref('')

watch(keyword, (val) => {
  console.log('Search:', val)
  // emit ke parent / call API / filter list
})
</script>

<style scoped>
.search-input {
  width: 320px;
  max-width: 100%;
}

@media (max-width: 600px) {
  .search-input {
    width: 180px;
  }
}
</style>
