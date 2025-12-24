<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-6">
      <q-btn-toggle
        v-model="store.tipePasien"
        class="btn-toggle-inset"
        unelevated
        color="primary"
        toggle-color="dark"
        toggle-text-color="white"
        :options="[
          { label: 'Pasien Lama', value: 'lama' },
          { label: 'Pasien Baru', value: 'baru' }
        ]"
      />

    </div>

    <div v-if="store.tipePasien === 'lama'" class="col-12 col-md-6" >
      <q-select v-model="store.form.nama" use-input outlined standout="bg-yellow-3" dense emit-value map-options
        option-value="norm" input-debounce="300" label="Cari Pasien" class="ellipsis-2-lines" :options="options"
        option-label="nama"
        :disable="store.loadingSave" :loading="store.loadingSave" @filter="filterFn"
        @clear="clearSearch" @update:model-value="updateModel">
        <template v-if="store.form.nama" #append>
          <q-icon name="cancel" class="cursor-pointer"
            @click.stop.prevent="clearSearch" />
        </template>
        <template v-else #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Tidak ditemukan
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-md-12">
      <q-input
        v-model="store.form.nama"
        outlined
        dense
        label="Nama Pasien"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
    </div>
    <div class="col-12 col-md-12">
      <q-input
        readonly
        v-model="store.form.norm"
        outlined
        dense
        label="Nomor Rekam Medis"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
    </div>
    <div class="col-12 col-md-12">
      <q-input
        v-model="store.form.nik"
        outlined
        dense
        label="Nomor Induk Kependudukan"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
    </div>
    <!-- <div class="row q-col-gutter-sm"> -->
    <div class="col-12 col-md-6">
      <app-input-date-human v-model="store.displaytanggal.tanggal" label="Tanggal Lahir" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglTransaksi" @set-display="displayTanggal" />
    </div>
    <div class="col-12 col-md-6">
      <q-input
        v-model="store.form.umur"
        outlined
        dense
        label="Umur"
        :disable="store.loadingSave"
        :loading="store.loadingSave"
      />
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
            v-model="store.form.kelamin"
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
          v-for="opt in selectpendidikan.items"
          :key="opt?.kode"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.form.pendidikan"
            :val="opt?.nama"
            :label="opt?.nama"
            dense
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <app-autocomplete label="Agama" v-model="store.form.agama" autocomplete="nama"
      option-value="nama" option-label="nama" outlined :disable="store.disabled"
      :source="selectagama.items" @update:model-value="(val) => console.log('val agama',val)" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.form.suku" outlined dense label="Suku"
      :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <app-autocomplete label="Pekerjaan" v-model="store.form.pekerjaan" autocomplete="nama"
      option-value="nama" option-label="nama" outlined :disable="store.disabled"
      :source="selectpekerjaan.items" @update:model-value="(val) => console.log('val pekerjaan',val)" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <app-autocomplete label="Status Perkawinan" v-model="store.form.status_perkawinan" autocomplete="value"
      option-value="value" option-label="label" outlined :disable="store.disabled"
      :source="store.statusPerkawinanOptions" @update:model-value="(val) => console.log('val status_perkawinan',val)" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <q-input v-model="store.form.tlp" outlined dense label="Telepon" type="text" inputmode="numeric" mask="####-####-####"
      :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <app-input-date-human v-model="store.displaytanggal.mrs" label="Tanggal MRS" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglMrs" @set-display="displayMrs" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <app-input-date-human :model="store.displaytanggal.pengkajian" label="Tanggal Pengkajian" outlined :rules="[val => !!val || 'Harap Diisi terlebih dahulu']" @db-model="tglPengkajian" @set-display="displayPengkajian" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.form.nama_asuransi" outlined dense label="Nama Asuransi"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.form.nomor_asuransi" outlined dense label="Nomor Asuransi"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <q-input v-model="store.form.alamat" type="textarea"
        rows="3" outlined dense label="Alamat Tempat Tinggal"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <q-input v-model="store.formkunjungan.diagnosa" type="textarea"
        rows="3" outlined dense label="Diagnosis Medis"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <q-input v-model="store.formkunjungan.rencana_tindakan" type="textarea"
        rows="3" outlined dense label="Rencana Tindakan DPJP"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.formkunjungan.ruang_ranap" outlined dense label="Ruang Rawat Inap"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-6 q-pt-md">
      <q-input v-model="store.formkunjungan.kelas" outlined dense label="Kelas Rawat Inap"
        :disable="store.loadingSave" :loading="store.loadingSave" />
    </div>
    <div class="col-12 col-md-12 q-pt-md">
      <div class="text-subtitle2 q-mb-sm">
        Cara Masuk RS :
      </div>

      <div class="q-pl-md row q-col-gutter-md">
        <div
          v-for="opt in selectcaramasuk.items"
          :key="opt?.kode"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formkunjungan.cara_masuk"
            :val="opt?.nama"
            :label="opt?.nama"
            dense
          />
        </div>
      </div>
    </div>

    <div class="col-12 col-md-12 q-pt-md">
      <div class="text-subtitle2 q-mb-sm">
        Melalui :
      </div>

      <div class="q-pl-md row q-col-gutter-md">
        <div
          v-for="opt in store.pintumasukOptions"
          :key="opt?.value"
          class="col-12 col-md-3"
        >
          <q-radio
            class="text-caption"
            v-model="store.formkunjungan.pintu_masuk"
            :val="opt?.value"
            :label="opt?.label"
            dense
          />
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-12 q-pt-md">
    <q-input v-model="store.formkunjungan.alergi" outlined dense label="Alergi"
      :disable="store.loadingSave" :loading="store.loadingSave" />
  </div>
  <div class="col-12 col-md-12 q-pt-md">
    <q-input v-model="store.formkunjungan.rs" outlined dense label="Rumah Sakit Asal"
      :disable="store.loadingSave" :loading="store.loadingSave" />
  </div>

</template>
<script setup>
import { date } from 'quasar';
import { api } from 'src/boot/axios';
import { useMasterAgamaStore } from 'src/stores/master/agama/mainstore';
import { useMasterCaraMasukStore } from 'src/stores/master/caramasuk/mainstore';
import { useMasterPekerjaanStore } from 'src/stores/master/pekerjaan/mainstore';
import { useMasterPendidikanStore } from 'src/stores/master/pendidikan/mainstore';
import { useKunjunganPasienStore } from 'src/stores/pendaftaran/pasienbaru/mainstore';
import { onMounted, ref } from 'vue';

const store = useKunjunganPasienStore()
const selectagama = useMasterAgamaStore()
const selectpekerjaan = useMasterPekerjaanStore()
const selectpendidikan = useMasterPendidikanStore()
const selectcaramasuk = useMasterCaraMasukStore()
const options = ref([])


function updateModel(val) {
  const item = store.options.find(x => x.norm === val)
  store.form.norm = val
  store.norm = val
  store.form.tgl_lahir = item ? item.tgl_lahir : ''
  store.form.nama = item ? item.nama : ''
  store.form.alamat = item ? item.alamat : ''
  store.form.nik = item ? item.nik : ''
  store.form.kelamin = item ? item.kelamin : ''
  store.form.agama = item ? item.agama : ''
  store.form.pendidikan = item ? item.pendidikan : ''
  store.form.pekerjaan = item ? item.pekerjaan : ''
  store.form.umur = item ? item.umur : ''
  store.form.suku = item ? item.suku : ''
  store.form.status_perkawinan = item ? item.status_perkawinan : ''
  store.form.tlp = item ? item.tlp : ''
  store.form.nama_asuransi = item ? item.nama_asuransi : ''
  store.form.nomor_asuransi = item ? item.nomor_asuransi : ''
}
const clearSearch = () => {
  store.form = {
    ...store.form,
    nama: '',
    norm: '',
    tgl_lahir: '',
    alamat: '',
    nik: '',
    kelamin: '',
    agama: '',
    pendidikan: '',
    umur: '',
    suku: '',
    status_perkawinan: '',
    tlp: '',
    nama_asuransi: '',
    nomor_asuransi: ''
  }
  options.value = []
}
function tglTransaksi(val) {
  if (!val) return

  store.form.tgl_lahir = date.formatDate(val, 'YYYY-MM-DD')
}
function displayTanggal(val) {
  store.displaytanggal.tanggal = val
}
function tglMrs(val) {
  if (!val) return

  store.formkunjungan.tgl_mrs = date.formatDate(val, 'YYYY-MM-DD')
}
function displayMrs(val) {
  store.displaytanggal.mrs = val
}
function tglPengkajian(val) {
  if (!val) return

  store.formkunjungan.tgl_pengkajian = date.formatDate(val, 'YYYY-MM-DD')
}
function displayPengkajian(val) {
  store.displaytanggal.pengkajian = val
}
async function filterFn(val, update) {
  // isLoading.value = true // Aktifkan loading saat filter dimulai

  // Jika input kosong, kembalikan semua opsi
  if (!val) {
    update(() => {
      options.value = store.options || []
      console.log('Options saat pencarian kosong:', options.value)
    })
    store.loading = false
    return
  }

  // Filter lokal
  const needle = val.toLowerCase()
  const localResults = store.options?.filter(
    (item) =>
      (item.norm?.toLowerCase().includes(needle) ||
        item.nama?.toLowerCase().includes(needle))
  ) || []

  console.log('Hasil filter lokal:', localResults)

  // Jika ada hasil lokal, gunakan itu
  if (localResults.length > 0) {
    update(() => {
      options.value = localResults
      console.log('Options dari filter lokal:', localResults)
    })
    store.loading = false
    return
  }

  // Jika input >= 2 karakter, cari ke server
  if (val.length >= 2) {
    let allData = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      try {
        const resp = await api.get('v1/master/pasien/get-list', {
          params: {
            q: val,
            per_page: 100,
            page: page,
          }
        })

        console.log(`filterFn: Data halaman ${page}:`, resp.data)

        if (resp.status === 200 && resp.data.data?.length) {
          allData = [...allData, ...resp.data.data]
          hasMore = resp.data.next_page_url !== null // Untuk SimplePaginator
          page++
        } else {
          hasMore = false
        }
      } catch (error) {
        console.error('Error saat mengambil halaman:', error)
        hasMore = false
      }
    }

    console.log('filterFn: Semua data dari server:', allData)

    // Update opsi berdasarkan hasil server
    update(() => {
      if (allData.length > 0) {
        options.value = allData
        store.options = allData // Update hanya jika ada hasil
      } else {
        options.value = [] // Kosongkan opsi untuk menampilkan "Tidak ditemukan"
      }
      console.log('Options setelah update:', options.value)
    })
  } else {
    // Untuk input pendek, gunakan hasil lokal
    update(() => {
      options.value = localResults
      console.log('Options untuk pencarian pendek:', localResults)
    })
  }

  store.loading = false // Matikan loading setelah selesai
}

onMounted(async () => {
  await selectagama.getData()
  await selectpekerjaan.getData()
  await selectpendidikan.getData()
  await selectcaramasuk.getData()
})


</script>
<style lang="scss">
.btn-toggle-inset {
  border-radius: 8px;
  background: #e0e0e0;
  padding: 4px;

  .q-btn {
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  /* tombol aktif → menjorok ke dalam */
  .q-btn--active {
    box-shadow:
      inset 2px 2px 6px rgba(0, 0, 0, 0.35),
      inset -2px -2px 6px rgba(255, 255, 255, 0.4);
    transform: translateY(1px);
  }
}

</style>
