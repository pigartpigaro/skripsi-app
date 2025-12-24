<template>
  <div>
    <div v-if="props?.loading === true" class="column flex-center text-white" style="min-height:400px">
      <q-spinner-dots color="primary" size="30px" />
    </div>
    <div v-else-if="!props?.items?.length" class="column flex-center text-dark" style="min-height:400px">
      No Data Available
    </div>
    <q-list v-else bordered class="bg-grey-1 rounded-borders q-pa-xs" separator>
      <q-item v-for="(row, i) in props.items" :key="i" v-ripple class="q-py-sm q-px-md list-item-modern">
        <!-- AVATAR -->
        <q-item-section avatar>
          <q-avatar size="42px">
            <img :src="getAvatar(row.kelamin)" />
          </q-avatar>
        </q-item-section>

        <!-- NAMA -->
        <q-item-section>
          <div class="text-weight-medium text-dark">
            {{ row.nama }} ({{ row.norm }}) || NIK: {{ row.nik }}
          </div>
          <div class="text-caption text-grey-9">
            {{ row.kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }} || {{ humanDate(row.tgl_lahir) }} || {{
              hitungUmur(row.tgl_lahir) }} Tahun || StatusPerkawinan : {{ row.status_perkawinan }}
          </div>
          <div class="text-caption text-grey-6">
            Alamat: {{ row.alamat }} Desa {{ row.desa }} Kec {{ row.kecamatan }}
          </div>
          <div class="text-caption text-grey-6">
            {{ row.kabupaten }} {{ row.provinsi }} {{ row.negara }}
          </div>
          <div class="text-caption text-grey-6">
            No Telp: {{ row.tlp }}
          </div>
          <div class="text-caption text-grey-6">
            Pekerjaan: {{ row.pekerjaan }} || Pendidikan: {{ row.pendidikan }}
          </div>
        </q-item-section>

        <q-item-section>
          <div class="text-weight-medium text-weight-bold text-red">
            {{ row.diagnosa }}
          </div>
          <div class="text-caption text-dark">
            MRS: {{ humanDate(row.tgl_mrs) }} || Pengkajian: {{ humanDate(row.tgl_pengkajian) }} {{ row.jam_pengkajian
            }}
          </div>
          <div class="text-caption text-dark">
            Alergi: {{ row.alergi }}
          </div>
          <div class="text-caption text-grey-6">
            Ruang: {{ row.ruang_ranap }} {{ row.rs }}
          </div>
          <div class="text-caption text-dark text-weight-bold">
            Rencana Tindak Lanjut: {{ row.rencana_tindakan }}
          </div>
          <div class="text-caption text-grey-6">
            Cara Masuk: {{ row.cara_masuk }} || Pintu Masuk: {{ row.pintu_masuk }}
          </div>
          <div>
            <q-badge outline :color="row.status === 'Aktif' ? 'red' : 'green'">{{ row.status }}</q-badge>
          </div>
        </q-item-section>

        <!-- ACTION -->
        <q-item-section side>
          <q-btn flat round size="sm" icon="edit" color="primary" @click="emits('rinci', row)">
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
.list-item-modern {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.list-item-modern:hover {
  background-color: #f5f7fa;
  transform: translateY(-1px);
}
</style>
