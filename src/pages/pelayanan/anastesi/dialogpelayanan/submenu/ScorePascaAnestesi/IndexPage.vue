<template>
  <q-page class="q-pa-md bg-white">

    <div class="text-h6 text-center text-weight-bold q-mb-md">
      SCORE PASCA ANESTESI
    </div>

    <q-separator spaced />

    <!-- ================= ALDRETE ================= -->
    <div class="text-weight-bold q-mt-md">
      Aldrete Score Pasca General Anestesi
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th rowspan="2">Penilaian</th>
          <th rowspan="2">Kriteria</th>
          <th rowspan="2">Skor</th>
          <th colspan="6">Menit</th>
        </tr>
        <tr>
          <th v-for="t in times" :key="t">{{ t }}'</th>
        </tr>
      </thead>

      <tbody>
        <!-- LOOP KATEGORI -->
        <template v-for="cat in aldreteKategori" :key="cat.key">
          <tr v-for="(opt, i) in cat.opsi" :key="cat.key + i">
            <td v-if="i === 0" :rowspan="cat.opsi.length">{{ cat.label }}</td>
            <td>{{ opt.label }}</td>
            <td class="center">{{ opt.val }}</td>
            <td v-for="t in times" :key="cat.key + t + opt.val" class="center">
              <q-radio dense checked-icon="task_alt" unchecked-icon="panorama_fish_eye" v-model="aldrete[t][cat.key]"
                :val="opt.val" />
            </td>
          </tr>
        </template>

        <tr class="total-row">
          <td colspan="3">Total</td>
          <td v-for="t in times" :key="'tot' + t" class="center">
            {{ aldreteTotal(t) }}
            <div class="text-caption" :class="aldreteTotal(t) >= 8 ? 'text-positive' : 'text-negative'">
              {{ aldreteTotal(t) >= 8 ? '✔ Boleh pindah' : '✖ Belum' }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ================= BROMAGE ================= -->
    <div class="text-weight-bold q-mt-xl">
      Bromage Score Pasca Regional Anestesi
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th rowspan="2">Kriteria</th>
          <th rowspan="2">Skor</th>
          <th colspan="6">Menit</th>
        </tr>
        <tr>
          <th v-for="t in times" :key="'bh' + t">{{ t }}'</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in bromageOpsi" :key="b.val">
          <td>{{ b.label }}</td>
          <td class="center">{{ b.val }}</td>
          <td v-for="t in times" :key="'b' + t + b.val" class="center">
            <q-radio dense checked-icon="task_alt" unchecked-icon="panorama_fish_eye" v-model="bromage[t]"
              :val="b.val" />
          </td>
        </tr>

        <tr class="total-row">
          <td colspan="2">Skor saat dipindahkan</td>
          <td v-for="t in times" :key="'bt' + t" class="center">
            {{ bromage[t] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ================= STEWARD ================= -->
    <div class="text-weight-bold q-mt-xl">
      Steward Score GA Pada Anak
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th>Penilaian</th>
          <th>Kriteria</th>
          <th>Skor</th>
          <th>Hasil</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="cat in stewardKategori" :key="cat.key">
          <tr v-for="(opt, i) in cat.opsi" :key="cat.key + i">
            <!-- Penilaian -->
            <td v-if="i === 0" :rowspan="cat.opsi.length">
              {{ cat.label }}
            </td>

            <!-- Kriteria -->
            <td>{{ opt.label }}</td>

            <!-- Skor -->
            <td class="center">{{ opt.val }}</td>

            <!-- Hasil (radio per row, bukan numpuk) -->
            <td class="center">
              <q-radio dense checked-icon="task_alt" unchecked-icon="panorama_fish_eye" v-model="steward[cat.key]"
                :val="opt.val" />
            </td>
          </tr>
        </template>

        <tr class="total-row">
          <td colspan="3">Total Score</td>
          <td class="center">{{ stewardTotal }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-end q-my-lg">

      <q-btn v-if="Object.keys(adaData)?.length > 0" class="q-mr-lg" label="Hapus" no-caps color="negative"
        @click="hapus()" :loading="loading" :disable="loading" />
      <q-btn label="Simpan" no-caps color="primary" @click="simpan()" :loading="loading" :disable="loading" />
    </div>
  </q-page>
</template>
<script setup>
import { Dialog } from 'quasar'
import { api } from 'src/boot/axios'
import { reactive, computed, ref, onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const times = ['5', '15', '30', '45', '60', '90']

/* ================= ALDRETE ================= */
const aldrete = reactive({})
times.forEach(t => {
  aldrete[t] = {
    sirkulasi: null,
    kesadaran: null,
    oksigen: null,
    pernapasan: null,
    aktivitas: null
  }
})

const aldreteKategori = [
  {
    key: 'sirkulasi',
    label: 'Sirkulasi',
    opsi: [
      { label: 'TD ±20 mmHg dari normal', val: 2 },
      { label: 'TD ±20–50 mmHg dari normal', val: 1 },
      { label: 'TD >50 mmHg dari normal', val: 0 }
    ]
  },
  {
    key: 'kesadaran',
    label: 'Kesadaran',
    opsi: [
      { label: 'Sadar penuh', val: 2 },
      { label: 'Respon panggilan', val: 1 },
      { label: 'Tidak respon', val: 0 }
    ]
  },
  {
    key: 'oksigen',
    label: 'Oksigen',
    opsi: [
      { label: 'SpO₂ >92% udara bebas', val: 2 },
      { label: 'SpO₂ >90% O₂', val: 1 },
      { label: 'SpO₂ <90% O₂', val: 0 }
    ]
  },
  {
    key: 'pernapasan',
    label: 'Pernapasan',
    opsi: [
      { label: 'Tarik nafas & batuk', val: 2 },
      { label: 'Dispneu', val: 1 },
      { label: 'Apnea', val: 0 }
    ]
  },
  {
    key: 'aktivitas',
    label: 'Aktivitas',
    opsi: [
      { label: 'Gerak 4 ekstremitas', val: 2 },
      { label: 'Gerak 2 ekstremitas', val: 1 },
      { label: 'Tidak bergerak', val: 0 }
    ]
  }
]

const aldreteTotal = t =>
  Object.values(aldrete[t]).reduce((a, b) => a + (b ?? 0), 0)

/* ================= BROMAGE ================= */
const bromage = reactive({})
times.forEach(t => bromage[t] = null)

const bromageOpsi = [
  { label: 'Gerakan penuh tungkai', val: 0 },
  { label: 'Tidak mampu ekstensi tungkai', val: 1 },
  { label: 'Tidak mampu refleksi tungkai', val: 2 },
  { label: 'Tidak mampu refleksi pergelangan kaki', val: 3 }
]

/* ================= STEWARD ================= */
const steward = reactive({
  kesadaran: null,
  respon: null,
  motorik: null
})

const stewardKategori = [
  {
    key: 'kesadaran',
    label: 'Kesadaran',
    opsi: [
      { label: 'Bangun', val: 2 },
      { label: 'Respon panggilan', val: 1 },
      { label: 'Tidak respon', val: 0 }
    ]
  },
  {
    key: 'respon',
    label: 'Respon',
    opsi: [
      { label: 'Batuk / menangis', val: 2 },
      { label: 'Pertahankan jalan napas', val: 1 },
      { label: 'Perlu bantuan napas', val: 0 }
    ]
  },
  {
    key: 'motorik',
    label: 'Motorik',
    opsi: [
      { label: 'Gerak bertujuan', val: 2 },
      { label: 'Gerak tanpa tujuan', val: 1 },
      { label: 'Tidak bergerak', val: 0 }
    ]
  }
]

const stewardTotal = computed(() =>
  (steward.kesadaran ?? 0) + (steward.respon ?? 0) + (steward.motorik ?? 0)
)
const loading = ref(false)
function simpan () {
  loading.value = true
  const form = {
    noreg: props.pasien?.noreg,
    aldrete_score: aldrete,
    bromage_score: bromage,
    steward_score: steward
  }
  // console.log('pas', form)
  return new Promise(resolve => {
    api.post('v1/transaksi/score-pasca-anastesi/simpan', form)
      .then(res => {
        loading.value = false
        getData()
        resolve(res)
      })
  })
}
const resetAldrete = () => {
  times.forEach(t => {
    aldrete[t] = {
      sirkulasi: null,
      kesadaran: null,
      oksigen: null,
      pernapasan: null,
      aktivitas: null
    }
  })
}
const resetBromage = () => {
  times.forEach(t => {
    bromage[t] = null
  })
}
const resetSteward = () => {
  steward.kesadaran = null
  steward.respon = null
  steward.motorik = null
}
function loadData (data) {
  resetAldrete()
  resetBromage()
  resetSteward()

  // ===== ALDRETE =====
  Object.entries(data.aldrete_score || {}).forEach(([t, val]) => {
    if (aldrete[t]) {
      Object.assign(aldrete[t], val)
    }
  })

  // ===== BROMAGE =====
  Object.entries(data.bromage_score || {}).forEach(([t, val]) => {
    if (bromage[t] !== undefined) {
      bromage[t] = val
    }
  })

  // ===== STEWARD =====
  Object.assign(steward, data.steward_score || {})
}
const adaData = ref({})
function getData () {
  const param = { params: { noreg: props.pasien?.noreg } }
  return new Promise(resolve => {
    api.get('v1/transaksi/score-pasca-anastesi/get-data', param)
      .then(res => {
        adaData.value = res.data
        loadData(res.data)
        resolve(res)
      })
  })
}
function hapus () {
  Dialog.create({
    title: 'Hapus Data',
    message: 'Apakah anda yakin ingin menghapus data ini?',
    cancel: true
  })
    .onOk(() => {
      const form = { noreg: props.pasien?.noreg }
      return new Promise(resolve => {
        api.post('v1/transaksi/score-pasca-anastesi/delete', form)
          .then(res => {
            getData()
            resolve(res)
          })
      })
    })
}
onMounted(() => {
  getData()
})
</script>
<style scoped>
.score-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.score-table th,
.score-table td {
  border: 1px solid #000;
  padding: 6px;
}

.score-table th {
  text-align: center;
  font-weight: bold;
}

.center {
  text-align: center;
}

.total-row {
  font-weight: bold;
  background: #f5f5f5;
}
</style>
