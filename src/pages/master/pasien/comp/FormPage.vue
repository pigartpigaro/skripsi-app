<template>
  <q-form ref="formRef" @submit="simpan" class="q-gutter-sm q-pa-sm">
    <div>
      <q-input v-model="store.form.nama" outlined dense label="Nama"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div >
      <q-input v-model="store.form.nik" outlined dense label="Identitas Kependudukan (KTP)"
        :disable="store.loadingSave" :loading="store.loadingSave" inputmode="numeric" :rules="[
        val => !!val || 'Harap diisi',
        val => /^\d+$/.test(val) || 'Hanya angka',
      ]" />
    </div>
    <div>
      <app-input-date-human  ref="reftanggal" :model="store.displaytanggal.tanggal" label="Tanggal Lahir" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglTransaksi" @set-display="displayTanggal" />
    </div>
    <div class="q-py-sm">
      Jenis Kelamin ? :
      <q-radio class="q-pl-sm q-pr-lg" v-for="item in store.kelaminOptions" :key="item?.value" :label="item?.label"
        v-model="store.form.kelamin" :val="item?.value" dense size="sm" :disable="store.disabled" />
    </div>
    <div>
      <app-autocomplete label="Agama" v-model="store.form.agama" autocomplete="value"
        option-value="value" option-label="label" outlined :disable="store.disabled"
        :source="store.agamaOptions" @update:model-value="(val) => console.log('val agama',val)" />
    </div>
    <div>
      <q-input v-model="store.form.suku" outlined dense label="Suku"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <app-autocomplete label="Pendidikan" v-model="store.form.pendidikan" autocomplete="value"
        option-value="value" option-label="label" outlined :disable="store.disabled"
        :source="store.pendidikanOptions" @update:model-value="(val) => console.log('val pendidikan',val)" />
    </div>
    <div>
      <app-autocomplete label="Pekerjaan" v-model="store.form.pekerjaan" autocomplete="value"
        option-value="value" option-label="label" outlined :disable="store.disabled"
        :source="store.pekerjaanOptions" @update:model-value="(val) => console.log('val pekerjaan',val)" />
    </div>
    <div>
      <app-autocomplete label="Status Perkawinan" v-model="store.form.status_perkawinan" autocomplete="value"
        option-value="value" option-label="label" outlined :disable="store.disabled"
        :source="store.statusPerkawinanOptions" @update:model-value="(val) => console.log('val status_perkawinan',val)" />
    </div>
    <div>
      <q-input v-model="store.form.tlp" outlined dense label="Telepon" type="text" inputmode="numeric" mask="####-####-####"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.nama_asuransi" outlined dense label="Nama Asuransi"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.nomor_asuransi" outlined dense label="Nomor Asuransi"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.negara" outlined dense label="Negara"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.provinsi" outlined dense label="Provinsi"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.kabupaten" outlined dense label="Kabupaten/Kota"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.kecamatan" outlined dense label="Kecamatan"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.desa" outlined dense label="Desa"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div>
      <q-input v-model="store.form.alamat" type="textarea"
        rows="3" outlined dense label="Alamat"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>

    <q-separator class="q-my-lg" />
    <div class="text-right">
      <q-btn label="Simpan" type="submit" color="primary" :loading="store.loadingSave" />
    </div>
  </q-form>
</template>
<script setup>

// import { api } from 'src/boot/axios';
import { date } from 'quasar';
import { useMasterPasienStore } from 'src/stores/master/pasien/mainstore';
import { onMounted, ref } from 'vue';

const store = useMasterPasienStore()
const formRef = ref(null)
const reftanggal = ref(null)
function simpan() {
  console.log('store.form sebelum simpan', store.form)
  store.simpanData().then(() => {
    formRef.value.resetValidation()
  })
}

function tglTransaksi(val) {
  if (!val) return

  store.form.tgl_lahir = date.formatDate(val, 'YYYY-MM-DD')
}
function displayTanggal(val) {
  store.displaytanggal.tanggal = val
}


onMounted(() => {
  // if (store.form.tgl_lahir) {
  //   console.log('store.form.tgl_lahir', store.form.tgl_lahir)
  //   // set display dari iso
  //   store.displaytanggal.tanggal = date.formatDate(
  //     store.form.tgl_lahir,
  //     'DD MMMM YYYY'
  //   )
  //   console.log('store.displaytanggal.tanggal', store.displaytanggal.tanggal)
  // }
  // init()
  // await store.getPegawai()
  // store.optionrekening = store.akuns

  // options.value = store.akuns.map(a => ({
  //   ...a,
  //   label: `${a.kode} - ${a.nama}`,
  //   value: a.kode
  // }))

  // store.optionrekening = []
  // await store.getRekening()
  // options.value = store.akuns

})

</script>
