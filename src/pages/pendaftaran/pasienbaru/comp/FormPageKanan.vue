<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-12" >
      <q-input
        v-model="store.formpendamping.nama"
        outlined
        dense
        label="Nama"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
    </div>
    <div class="col-12 col-md-6">
      <app-input-date-human v-model="store.displaytanggal.tgl_lahir" label="Tanggal Lahir" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglLahir" @set-display="displayTanggal" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <div class="text-subtitle2 q-mb-sm">
        Jenis Kelamin :
      </div>

      <div class="q-pl-md row q-col-gutter-md">
        <div
          v-for="opt in store.kelaminOptions"
          :key="opt?.value"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formpendamping.kelamin"
            :val="opt?.value"
            :label="opt?.label"
            dense
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.formpendamping.tlp" outlined dense label="Telepon" type="text" inputmode="numeric" mask="####-####-####"
      :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <div class="text-subtitle2 q-mb-sm">
        Agama :
      </div>

      <div class="q-pl-md row q-col-gutter-md">
        <div
          v-for="opt in selectagama.items"
          :key="opt?.kode"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formpendamping.agama"
            :val="opt?.nama"
            :label="opt?.nama"
            dense
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <div class="text-subtitle2 q-mb-sm">
        Pendidikan :
      </div>

      <div class="q-pl-md row q-col-gutter-md">
        <div
          v-for="opt in selectpendidikan.items"
          :key="opt?.kode"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formpendamping.pendidikan"
            :val="opt?.nama"
            :label="opt?.nama"
            dense
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <app-autocomplete label="Pekerjaan" v-model="store.formpendamping.pekerjaan" autocomplete="nama"
      option-value="nama" option-label="nama" outlined :disable="store.disabled"
      :source="selectpekerjaan.items" @update:model-value="(val) => console.log('val pekerjaan',val)" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.formpendamping.suku" outlined dense label="Suku"
      :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>

    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.formpendamping.hubungan_dengan_pasien" outlined dense label="Hubungan Dengan Pasien"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>

    <div class="col-12 col-md-12 q-pt-md">
      <q-input v-model="store.formpendamping.alamat" type="textarea"
        rows="3" outlined dense label="Alamat Tempat Tinggal"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
  </div>
</template>
<script setup>

// import { api } from 'src/boot/axios';
import { date } from 'quasar';
import { useMasterAgamaStore } from 'src/stores/master/agama/mainstore';
import { useMasterPekerjaanStore } from 'src/stores/master/pekerjaan/mainstore';
import { useMasterPendidikanStore } from 'src/stores/master/pendidikan/mainstore';
import { useKunjunganPasienStore } from 'src/stores/pendaftaran/pasienbaru/mainstore';
import { onMounted } from 'vue';

const store = useKunjunganPasienStore()
const selectagama = useMasterAgamaStore()
const selectpekerjaan = useMasterPekerjaanStore()
const selectpendidikan = useMasterPendidikanStore()
function tglLahir(val) {
  if (!val) return

  store.form.tgl_lahir = date.formatDate(val, 'YYYY-MM-DD')
}
function displayTanggal(val) {
  store.displaytanggal.tgl_lahir = val
}

onMounted(async () => {
  await selectagama.getData()
  await selectpekerjaan.getData()
  await selectpendidikan.getData()

})
</script>
