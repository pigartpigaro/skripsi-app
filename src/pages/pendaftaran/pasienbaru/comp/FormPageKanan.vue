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
import { api } from 'src/boot/axios';
import { useKunjunganPasienStore } from 'src/stores/pendaftaran/pasienbaru/mainstore';
import { onMounted, ref } from 'vue';

const store = useKunjunganPasienStore()
const formRef = ref(null)
const options = ref([])
// const tahuns = ref([])
function simpan() {
  console.log('store.form sebelum simpan:', store.form);
  // store.simpanData().then(() => {
  //   formRef.value.resetValidation()
  // })
}

function updateModel(val) {
  const item = store.options.find(x => x.norm === val)
  console.log('item', item)
  store.form.norm = val
  store.form.tgl_lahir = item ? item.tgl_lahir : ''
  store.form.nama = item ? item.nama : ''
  store.form.alamat = item ? item.alamat : ''
  store.form.nik = item ? item.nik : ''
  store.form.kelamin = item ? item.kelamin : ''
  store.form.agama = item ? item.agama : ''
  store.form.pendidikan = item ? item.pendidikan : ''
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

  store.form.tgl_mrs = date.formatDate(val, 'YYYY-MM-DD')
}
function displayMrs(val) {
  store.displaytanggal.mrs = val
}
function tglPengkajian(val) {
  if (!val) return

  store.form.tgl_pengkajian = date.formatDate(val, 'YYYY-MM-DD')
}
function displayPengkajian(val) {
  store.displaytanggal.pengkajian = val
}
async function filterFn(val, update, abort) {
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

// async function filterFn(val, update) {
//   if (!val) {
//     update(() => {
//       options.value = store.akuns.map(a => ({
//         ...a,
//         label: `${a.kode} - ${a.nama}`,
//         value: a.kode
//       }))
//     })
//     return
//   }

//   if (val.length < 2) {
//     update(() => {
//       options.value = []
//     })
//     return
//   }

//   let allData = []
//   let page = 1
//   let hasMore = true

//   while (hasMore) {
//     try {
//       const resp = await api.get('v1/master/siasik/kegiatanblud/getbidang', {
//         params: {
//           q: val,
//           per_page: 100,
//           page: page
//         }
//       })

//       const data = resp.data.data || []

//       if (data.length > 0) {
//         allData = [...allData, ...data]
//         hasMore = resp.data.next_page_url !== null
//         page++
//       } else {
//         hasMore = false
//       }

//     } catch (e) {
//       console.error('Error load page:', e)
//       hasMore = false
//     }
//   }

//   update(() => {
//     options.value = allData.map(a => ({
//       ...a,
//       label: `${a.kode} - ${a.nama}`,
//       value: a.kode
//     }))

//     store.optionrekening = allData
//   })
// }

</script>
