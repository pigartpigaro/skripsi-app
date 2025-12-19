import { defineStore } from 'pinia'

export const usePekerjaanStore = defineStore('pekerjaan', {
  state: () => ({
    loading: false,
    params: {
      q: null
    },
    form: {
      pekerjaan: null
    }
  }),
  actions: {
    search (val) {
      this.params.q = val
    },
    refresh () {
      this.params.q = null
    }
  }
})
