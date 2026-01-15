<template>
  <q-page class="q-pa-md bg-white">

    <!-- JUDUL -->
    <div class="text-h6 text-center text-weight-bold q-mb-md">
      SCORE PASCA ANASTESI
    </div>

    <q-separator spaced />

    <!-- ================= ALDRETE SCORE ================= -->
    <div class="text-weight-bold q-mt-md">
      Aldrete Score Pasca General Anestesi
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th rowspan="2">Penilaian</th>
          <th rowspan="2">Kriteria</th>
          <th rowspan="2">Skor</th>
          <th colspan="6">Score</th>
        </tr>
        <tr>
          <th v-for="t in times" :key="'h' + t">{{ t }}'</th>
        </tr>
      </thead>

      <tbody>
        <!-- SIRKULASI -->
        <tr>
          <td rowspan="3">Sirkulasi</td>
          <td>TD ± 20 mmHg dari normal</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'s1' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].s1" />
          </td>
        </tr>
        <tr>
          <td>TD ± 20–50 mmHg dari normal</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'s2' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].s2" />
          </td>
        </tr>
        <tr>
          <td>TD &gt; 50 mmHg dari normal</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'s3' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].s3" />
          </td>
        </tr>

        <!-- KESADARAN -->
        <tr>
          <td rowspan="3">Kesadaran</td>
          <td>Sadar penuh</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'k1' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k1" />
          </td>
        </tr>
        <tr>
          <td>Respon terhadap panggilan</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'k2' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k2" />
          </td>
        </tr>
        <tr>
          <td>Tidak ada respon</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'k3' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k3" />
          </td>
        </tr>

        <!-- OKSIGEN -->
        <tr>
          <td rowspan="3">Oksigen</td>
          <td>SpO2 > 92% (dengan udara bebas)</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'k1' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k1" />
          </td>
        </tr>
        <tr>
          <td>SpO2 >90% (dengan supleman O2)</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'k2' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k2" />
          </td>
        </tr>
        <tr>
          <td>SpO2 <90% (dengan supleman O2)</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'k3' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k3" />
          </td>
        </tr>

        <!-- PERNAPASAN -->
        <tr>
          <td rowspan="3">Pernapasan</td>
          <td>Bisa tarik nafas dalam dan batuk</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'k1' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k1" />
          </td>
        </tr>
        <tr>
          <td>Dispneu atau limitasi bernafas</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'k2' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k2" />
          </td>
        </tr>
        <tr>
          <td>Apnea/tidak bernafas</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'k3' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k3" />
          </td>
        </tr>

        <!-- AKTIFITAS -->
        <tr>
          <td rowspan="3">Aktifitas</td>
          <td>Menggerakkan 4 eksternitas</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'k1' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k1" />
          </td>
        </tr>
        <tr>
          <td>Menggerakkan 2 eksternitas</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'k2' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k2" />
          </td>
        </tr>
        <tr>
          <td>Tidak mampu menggerakkan eksternitas</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'k3' + t">
            <q-input dense outlined type="text" v-model.number="aldrete[t].k3" />
          </td>
        </tr>

        <!-- TOTAL -->
        <tr class="total-row">
          <td colspan="3">Total</td>
          <td v-for="t in times" :key="'at' + t" class="center">
            {{ aldreteTotal(t) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-caption q-mt-xs">
      Pasien dapat pindah minimal skor <b>8</b>
    </div>

    <!-- ================= BROMAGE SCORE ================= -->
    <div class="text-weight-bold q-mt-xl">
      Bromage Score Pasca Regional Anestesi
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th rowspan="2">Kriteria</th>
          <th rowspan="2">Skor</th>
          <th colspan="6">Score</th>
        </tr>
        <tr>
          <th v-for="t in times" :key="'bh' + t">{{ t }}'</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Gerakan penuh dari tungkai</td>
          <td class="center">0</td>
          <td v-for="t in times" :key="'b0' + t">
            <q-input dense outlined type="text" v-model.number="bromage[t].b0" />
          </td>
        </tr>
        <tr>
          <td>Tidak mampu menghabiskan mengekstensi tungkai</td>
          <td class="center">1</td>
          <td v-for="t in times" :key="'b1' + t">
            <q-input dense outlined type="text" v-model.number="bromage[t].b1" />
          </td>
        </tr>
        <tr>
          <td>Tidak mampu merefleksi tungkai</td>
          <td class="center">2</td>
          <td v-for="t in times" :key="'b2' + t">
            <q-input dense outlined type="text" v-model.number="bromage[t].b2" />
          </td>
        </tr>
        <tr>
          <td>Tidak mampu merefleksi pergelangan kaki</td>
          <td class="center">3</td>
          <td v-for="t in times" :key="'b3' + t">
            <q-input dense outlined type="text" v-model.number="bromage[t].b3" />
          </td>
        </tr>

        <tr class="total-row">
          <td colspan="2">Skor saat dipindahkan</td>
          <td v-for="t in times" :key="'bt' + t" class="center">
            {{ bromageTotal(t) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-caption q-mt-xs">
      Pasien dapat dipindahkan skor ≤ 3
    </div>

    <!-- ================= STEWARD SCORE ================= -->
    <div class="text-weight-bold q-mt-xl">
      Steward Score GA Pada Anak
    </div>

    <table class="score-table q-mt-sm">
      <thead>
        <tr>
          <th>Penilaian</th>
          <th>Kriteria</th>
          <th>Score</th>
          <th>Hasil</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td rowspan="3">Kesadaran</td>
          <td>Bangun</td>
          <td class="center">2</td>
          <td rowspan="3" class="center">
            <q-input dense outlined type="text" v-model.number="steward.kesadaran" />
          </td>
        </tr>
        <tr>
          <td>Respon terhadap panggilan</td>
          <td class="center">1</td>
        </tr>
        <tr>
          <td>Tidak ada respon</td>
          <td class="center">0</td>
        </tr>

        <tr>
          <td rowspan="3">Respon</td>
          <td>Batuk / menangis</td>
          <td class="center">2</td>
          <td rowspan="3" class="center">
            <q-input dense outlined type="text" v-model.number="steward.respon" />
          </td>
        </tr>
        <tr>
          <td>Pertahankan jalan napas</td>
          <td class="center">1</td>
        </tr>
        <tr>
          <td>Perlu bantuan napas</td>
          <td class="center">0</td>
        </tr>

        <tr>
          <td rowspan="3">Motorik</td>
          <td>Gerak bertujuan</td>
          <td class="center">2</td>
          <td rowspan="3" class="center">
            <q-input dense outlined type="text" v-model.number="steward.motorik" />
          </td>
        </tr>
        <tr>
          <td>Gerak tanpa tujuan</td>
          <td class="center">1</td>
        </tr>
        <tr>
          <td>Tidak bergerak</td>
          <td class="center">0</td>
        </tr>

        <tr class="total-row">
          <td colspan="3">Total Score</td>
          <td class="center">{{ stewardTotal }}</td>
        </tr>
      </tbody>
    </table>

    <div class="text-caption q-mt-xs">
      Pasien dapat dipindahkan jika score ≥ 5
    </div>

  </q-page>
</template>

<script setup>
import { reactive, computed } from 'vue'

const times = ['5', '15', '30', '45', '60', '90']

// ALDRETE
const aldrete = reactive({})
times.forEach(t => {
  aldrete[t] = { s1: 0, s2: 0, s3: 0, k1: 0, k2: 0, k3: 0 }
})
const aldreteTotal = t =>
  Object.values(aldrete[t]).reduce((a, b) => a + (b || 0), 0)

// BROMAGE
const bromage = reactive({})
times.forEach(t => {
  bromage[t] = { b0: 0, b1: 0, b2: 0, b3: 0 }
})
const bromageTotal = t =>
  Object.values(bromage[t]).reduce((a, b) => a + (b || 0), 0)

// STEWARD
const steward = reactive({
  kesadaran: 0,
  respon: 0,
  motorik: 0
})
const stewardTotal = computed(() =>
  steward.kesadaran + steward.respon + steward.motorik
)
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
