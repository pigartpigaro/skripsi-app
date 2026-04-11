<template>
  <q-page class="q-pa-md bg-grey-2">
    <div id="printData">

      <!-- JUDUL -->
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">ASKAN INTRA ANESTESI</div>
        </q-card-section>
      </q-card>

      <!-- IDENTITAS -->
      <q-card flat class="q-mb-xs print-only">
        <q-card-section>

          <div class="row q-col-gutter-xl">
            <!-- KIRI -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-4 label">Nama</div>
                <div class="col-8">: {{ pasien?.pasien?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">No RM</div>
                <div class="col-8">: {{ pasien?.pasien?.norm }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">NIK</div>
                <div class="col-8">: {{ pasien.pasien?.nik }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">Sifat Operasi</div>
                <div class="col-8">: {{ pasien.status }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-4 label">Jam Pengkajian</div>
                <div class="col-8">: {{ pasien.jam_pengkajian }}</div>
              </div>
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien.pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Dokter Operator</div>
                <div class="col-7">: {{ pasien.dr_operator?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Dokter Anestesi</div>
                <div class="col-7">: {{ pasien.dr_anastesi?.nama }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Penata Anestesi</div>
                <div class="col-7">: {{ pasien.penata_anastesi }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tindakan Medis</div>
                <div class="col-7">: {{ pasien.tindakan_operasi }}</div>
              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>
      <q-card flat class="q-mb-xs">
        <q-card-section>
          <q-table flat bordered dense :rows="store.formintra.askan_data" :columns="columns" row-key="id" hide-bottom
            :rows-per-page-options="[0]">

            <template #top-row>

              <!-- ============================= -->
              <!-- BARIS INPUT (HANYA SEKALI) -->
              <!-- ============================= -->
              <q-tr class="bg-grey-2 no-print">

                <q-td>
                  <q-input dense v-model="store.formintra.current.data" />
                </q-td>

                <q-td>
                  <q-input dense v-model="store.formintra.current.masalah_kesehatan_anestesi" />
                </q-td>

                <q-td>
                  <q-input dense v-model="store.formintra.current.waktu" mask="##:##" fill-mask>
                    <q-popup-proxy transition-show="scale" transition-hide="scale" cover fit>
                      <q-time v-model="store.formintra.current.waktu" format24h minimal square>
                        <div class="row justify-end q-pa-xs">
                          <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-input>
                </q-td>

                <q-td>
                  <q-input dense autogrow v-model="store.formintra.current.intervensi" />
                </q-td>

                <q-td>
                  <q-input dense autogrow v-model="store.formintra.current.implementasi" />
                </q-td>

                <q-td>
                  <q-input dense label="S" v-model="store.formintra.current.s" />
                  <q-input dense label="O" v-model="store.formintra.current.o" />
                  <q-input dense label="A" v-model="store.formintra.current.a" />
                  <q-input dense label="P" v-model="store.formintra.current.p" />
                </q-td>

                <q-td>
                  <q-input dense v-model="store.formintra.current.nama_ttd" />
                </q-td>
                <q-td>

                </q-td>

              </q-tr>
            </template>

            <template #body="props">
              <q-tr :props="props">

                <q-td class="text-wrap" style="white-space: normal;">{{ props.row.data
                }}</q-td>
                <q-td class="text-wrap" style="white-space: normal;">{{ props.row.masalah_kesehatan_anestesi }}</q-td>
                <q-td class="text-wrap" style="white-space: normal;">{{ props.row.waktu }}</q-td>
                <q-td class="text-wrap" style="white-space: normal;">{{ props.row.intervensi }}</q-td>
                <q-td class="text-wrap" style="white-space: normal;">{{ props.row.implementasi }}</q-td>

                <q-td>
                  <div><b>S:</b> {{ props.row.s }}</div>
                  <div><b>O:</b> {{ props.row.o }}</div>
                  <div><b>A:</b> {{ props.row.a }}</div>
                  <div><b>P:</b> {{ props.row.p }}</div>
                </q-td>

                <q-td>{{ props.row.nama_ttd }}</q-td>

                <q-td>
                  <q-btn dense flat icon="delete" color="red" @click="store.hapusData(props.pageIndex, 'Intra')"
                    :loading="store.loadinghapus" class="no-print" />
                </q-td>

              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <!-- <q-card-section>

          <q-table flat bordered dense :rows="store.formintra.askan_data" :columns="columns" row-key="id" hide-bottom>
            <template #body-cell-data="props">
              <q-td>
                <q-input dense v-model="props.row.data" />
              </q-td>
            </template>
            <template #body-cell-masalah_kesehatan_anestesi="props">
              <q-td>
                <q-input dense v-model="props.row.masalah_kesehatan_anestesi" />
              </q-td>
            </template>

            <template #body-cell-waktu="props">
              <q-td>
                <q-input dense v-model="props.row.waktu" mask="##:##" fill-mask>
                  <q-popup-proxy transition-show="scale" transition-hide="scale" cover fit>
                    <q-time v-model="props.row.waktu" format24h minimal square>
                      <div class="row justify-end q-pa-xs">
                        <q-btn label="OK" color="primary" flat v-close-popup />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-input>

              </q-td>
            </template>

            <template #body-cell-intervensi="props">
              <q-td>
                <q-input dense autogrow v-model="props.row.intervensi" />
              </q-td>
            </template>

            <template #body-cell-implementasi="props">
              <q-td>
                <q-input dense autogrow v-model="props.row.implementasi" />
              </q-td>
            </template>

            <template #body-cell-evaluasi="props">
              <q-td>
                <q-input dense label="S : " v-model="props.row.s" />
                <q-input dense label="O : " v-model="props.row.o" />
                <q-input dense label="A : " v-model="props.row.a" />
                <q-input dense label="P : " v-model="props.row.p" />
              </q-td>
            </template>

            <template #body-cell-nama_ttd="props">
              <q-td>
                <q-input dense v-model="props.row.nama_ttd" />
              </q-td>
            </template>
          </q-table>
          <q-btn flat icon="add" label="Tambah Data" class="q-mt-sm" @click="tambahBaris" />
        </q-card-section> -->
      </q-card>
      <!-- PERTIMBANGAN Anastesi -->



    </div>

    <!-- ACTION -->
    <q-card flat>
      <q-card-actions align="right">
        <q-btn color="primary" :loading="store.loadingSave" label="Simpan" @click="simpan" />
        <q-btn color="yellow-9" label="Cetak" v-print="printObj" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>
<script setup>
import { date } from 'quasar'
import { useAskanPraIntraPascaAnestesiStore } from 'src/stores/transaksi/askanpraanastesi'
import { computed, onMounted, watch } from 'vue'

const store = useAskanPraIntraPascaAnestesiStore()
const props = defineProps({
  pasien: { type: Object, default: null }
})
const columns = [
  { name: 'data', label: 'Data', field: 'data', align: 'left' },
  { name: 'masalah_kesehatan_anestesi', label: 'Masalah Kesehatan Anestesi', field: 'masalah_kesehatan_anestesi', align: 'left' },
  { name: 'waktu', label: 'Waktu', field: 'waktu', align: 'left' },
  { name: 'intervensi', label: 'Intervensi', field: 'intervensi', align: 'left' },
  { name: 'implementasi', label: 'Implementasi', field: 'implementasi', align: 'left' },
  { name: 'evaluasi', label: 'Evaluasi (SOAP)', field: 'evaluasi', align: 'left' },
  { name: 'nama_ttd', label: 'Nama TTD', field: 'nama_ttd', align: 'left' }
]
function newAskanRow() {
  return {
    id_item: crypto.randomUUID(),
    data: '',
    masalah_kesehatan_anestesi: '',
    waktu: date.formatDate(Date.now(), 'HH:mm'),
    intervensi: '',
    implementasi: '',
    s: '',
    o: '',
    a: '',
    p: '',
    nama_ttd: ''
  }
}
function tambahBaris() {
  if (!Array.isArray(store.formintra.askan_data)) {
    store.formintra.askan_data = []
  }

  // clone dari baris terakhir (UX lebih enak)
  const last = store.formintra.askan_data.at(-1)

  store.formintra.askan_data.push(
    last
      ? { ...JSON.parse(JSON.stringify(last)), id: Date.now() + Math.random() }
      : newAskanRow()
  )
}
function simpan() {
  store.formintra.noreg = props.pasien?.noreg
  store.formintra.fase = 'Intra'
  store.simpanData('Intra')
}

onMounted(() => {
  store.formintra.fase = 'Intra'
  // if (!store.formintra.askan_data.length) {
  //   store.formintra.askan_data.push(newAskanRow())
  // }
})

watch(
  () => props.pasien,
  (val) => {
    if (!val) return

    console.log('WATCH PASIEN TRIGGERED', val)
    if (store.formintra.askan_data?.length > 0) return
    // ===============================
    // INTRA ANESTESI
    // ===============================
    const intra = val?.askan_anastesi?.find(
      i => i.fase === 'Intra'
    )

    if (intra?.askan_data?.length) {
      store.formintra.noreg = val.noreg
      store.formintra.fase = 'Intra'

      store.formintra.askan_data = intra.askan_data.map(item => ({
        id_item: item.id_item ?? crypto.randomUUID(),
        data: item.data ?? '',
        masalah_kesehatan_anestesi: item.masalah_kesehatan_anestesi ?? '',
        waktu: item.waktu ?? '',
        intervensi: item.intervensi ?? '',
        implementasi: item.implementasi ?? '',
        s: item.evaluasi?.s ?? '',
        o: item.evaluasi?.o ?? '',
        a: item.evaluasi?.a ?? '',
        p: item.evaluasi?.p ?? '',
        nama_ttd: item.nama_ttd ?? ''
      }))
    }
  },
  {
    immediate: true,
  }
)
const printObj = computed(() => ({
  id: '#printData',
  popTitle: 'Askan Intra Anestesi',
  preview: false,
  extraCss: '',
  extraHead: '',
  beforeOpenCallback() {
    console.log('wait...')
  },
  openCallback() {
    console.log('opened')
  },
  closeCallback() {
    console.log('closePrint')
  }
}))
</script>
<style>
.print-only {
  display: none;
}

.q-table td,
.q-table th {
  vertical-align: top !important;
}

@media print {
  @page {
    size: A4;
    margin: 15mm;
    padding: 5mm;
  }

  .print-only {
    display: block;
  }

  body {
    background: white !important;
  }

  /* Area yang dicetak */
  #printData {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    font-size: 12px;
  }

  /* Hilangkan shadow/card */
  .q-card {
    box-shadow: none !important;
    border: none !important;
  }

  /* Tombol tidak ikut tercetak */
  .q-btn,
  .q-card-actions {
    display: none !important;
  }
}
</style>
