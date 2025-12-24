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
      <app-input-date-human v-model="store.displaytanggal.tanggal" label="Tanggal Lahir" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglTransaksi" @set-display="displayTanggal" />
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
          v-for="opt in store.agamaOptions"
          :key="opt?.value"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formpendamping.agama"
            :val="opt?.value"
            :label="opt?.label"
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
          v-for="opt in store.pendidikanOptions"
          :key="opt?.value"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formpendamping.pendidikan"
            :val="opt?.value"
            :label="opt?.label"
            dense
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <app-autocomplete label="Pekerjaan" v-model="store.formpendamping.pekerjaan" autocomplete="value"
      option-value="value" option-label="label" outlined :disable="store.disabled"
      :source="store.pekerjaanOptions" @update:model-value="(val) => console.log('val pekerjaan',val)" />
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
import { useKunjunganPasienStore } from 'src/stores/pendaftaran/pasienbaru/mainstore';
import { onMounted } from 'vue';

const store = useKunjunganPasienStore()

function tglTransaksi(val) {
  if (!val) return

  store.form.tgl_lahir = date.formatDate(val, 'YYYY-MM-DD')
}
function displayTanggal(val) {
  store.displaytanggal.tanggal = val
}

onMounted(async () => {


})
</script>
