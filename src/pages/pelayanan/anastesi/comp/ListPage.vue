<template>
  <div>

    <!-- LOADING -->
    <div v-if="props?.loading" class="column flex-center text-primary" style="min-height:400px">
      <q-spinner-dots size="40px" />
      <div class="text-caption q-mt-sm">Memuat data pasien...</div>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!props?.items?.length" class="column flex-center text-grey-7" style="min-height:400px">
      <q-icon name="folder_off" size="60px" />
      <div class="text-subtitle1 q-mt-sm">No Data Available</div>
    </div>

    <!-- LIST -->
    <q-list v-else separator class="bg-white rounded-borders shadow-1">

      <q-item v-for="(row, i) in props.items" :key="i" class="modern-row hover-shake">

        <!-- AVATAR -->
        <q-item-section avatar>
          <q-avatar size="50px" class="shadow-2">
            <img :src="getAvatar(row.kelamin)" />
          </q-avatar>
        </q-item-section>

        <!-- LEFT SIDE (BIODATA LENGKAP) -->
        <q-item-section class="col-5">

          <div class="text-weight-bold text-dark">
            {{ row.nama }}
            <span class="text-grey-6">({{ row.norm }})</span>
            || NIK: {{ row.nik }}
          </div>

          <div class="text-caption text-grey-8">
            {{ row.kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }} ||
            {{ humanDate(row.tgl_lahir) }} ||
            {{ hitungUmur(row.tgl_lahir) }} Tahun ||
            Status: {{ row.status_perkawinan }}
          </div>

          <div class="text-caption text-grey-7">
            Alamat: {{ row.alamat }} Desa {{ row.desa }}
            Kec {{ row.kecamatan }}
          </div>

          <div class="text-caption text-grey-7">
            {{ row.kabupaten }} {{ row.provinsi }} {{ row.negara }}
          </div>

          <div class="text-caption text-grey-7">
            No Telp: {{ row.tlp }}
          </div>

          <div class="text-caption text-grey-7">
            Pekerjaan: {{ row.pekerjaan }} ||
            Pendidikan: {{ row.pendidikan }}
          </div>

        </q-item-section>

        <!-- RIGHT SIDE (MEDIS LENGKAP) -->
        <q-item-section class="col-5">

          <div class="text-weight-bold text-negative">
            {{ row.diagnosa }}
          </div>

          <div class="text-caption text-dark">
            MRS: {{ humanDate(row.tgl_mrs) }} ||
            Pengkajian: {{ humanDate(row.tgl_pengkajian) }}
            {{ row.jam_pengkajian }}
          </div>

          <div class="text-caption text-dark">
            Alergi: {{ row.alergi }}
          </div>

          <div class="text-caption text-grey-7">
            Ruang: {{ row.ruang_ranap }} {{ row.rs }}
          </div>

          <div class="text-caption text-primary text-weight-medium">
            Rencana Tindak Lanjut: {{ row.rencana_tindakan }}
          </div>

          <div class="text-caption text-grey-7">
            Cara Masuk: {{ row.cara_masuk }} ||
            Pintu Masuk: {{ row.pintu_masuk }}
          </div>

          <div class="q-mt-xs q-gutter-xs">
            <q-badge color="red" outline dense>
              {{ row.dokter_operator }}
            </q-badge>

            <q-badge color="primary" outline dense>
              {{ row.dokter_anastesi }}
            </q-badge>

            <q-badge color="teal" outline dense>
              {{ row.penata_anastesi }}
            </q-badge>
          </div>

        </q-item-section>

        <!-- ACTION -->
        <q-item-section side>
          <q-btn flat round icon="edit" color="primary" @click="emits('rinci', row)">
            <q-tooltip>Edit Data</q-tooltip>
          </q-btn>
        </q-item-section>

      </q-item>

    </q-list>

  </div>
</template>
<script setup>
import { humanDate } from 'src/modules/formatter'

const props = defineProps({
  items: {
    type: Array,
    default: () => ([])
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['rinci'])

function hitungUmur(tglLahir) {
  const today = new Date()
  const birthDate = new Date(tglLahir)

  let umur = today.getFullYear() - birthDate.getFullYear()
  const bulan = today.getMonth() - birthDate.getMonth()

  if (bulan < 0 || (bulan === 0 && today.getDate() < birthDate.getDate())) {
    umur--
  }

  return umur
}

const getAvatar = (kelamin) => {
  if (kelamin === 'L') {
    return 'https://api.dicebear.com/7.x/personas/svg?seed=male'
  }
  if (kelamin === 'P') {
    return 'https://api.dicebear.com/7.x/avataaars/svg'
  }
  return 'https://api.dicebear.com/7.x/personas/svg?seed=unknown'
}

</script>
<style scoped>
.modern-row {
  transition: all 0.2s ease;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.modern-row:hover {
  background-color: #f4f7fb;
}

/* Hover effect */
.hover-shake:hover {
  background-color: #f4f7fb;
  animation: shakeX 0.3s ease-in-out;
}

/* Keyframes goyang kanan-kiri halus */
@keyframes shakeX {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-3px);
  }

  50% {
    transform: translateX(3px);
  }

  75% {
    transform: translateX(-2px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
