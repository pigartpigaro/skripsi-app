<template>
  <!-- <pre>{{ props.pasien?.asessement_pra_induksi }}</pre> -->
  <q-page class="q-pa-md bg-grey-6">
    <div id="printData" class="q-pa-md full-width full-height bg-white">
      <q-card flat class="q-mb-xs">
        <q-card-section class="text-center">
          <div class="text-h6 text-weight-bold">LAPORAN ANASTESI</div>
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
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien.pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Tgl Pemeriksaan</div>
                <div class="col-7">: {{ pasien.pasien?.tgl_mrs }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Ruang</div>
                <div class="col-7">: {{ pasien.pasien?.ruang_ranap }}</div>
              </div>
            </div>
          </div>

        </q-card-section>
      </q-card>
      <q-separator spaced style="border-top: 1px solid #000" />
      <q-form @submit="simpan" class="q-gutter-sm">
        <div class="text-weight-bold q-mb-xs">Infus – Tempat dan Ukuran</div>
        <div class="q-ml-md">
          <div class="q-ml-xs row items-center no-wrap">
            <div class="q-mr-sm">
              1.
            </div>
            <q-input v-model="store.form.infus_tempat_ukuran.atas" dense type="text" autogrow />
            <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
          </div>
          <div class="q-ml-xs row items-center no-wrap">
            <div class="q-mr-sm">
              2.
            </div>
            <q-input v-model="store.form.infus_tempat_ukuran.bawah" dense type="text" autogrow />
            <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
          </div>
        </div>

        <!-- POSISI PASIEN -->
        <div class="text-weight-bold q-mt-md">Posisi Pasien</div>
        <div class="row q-gutter-sm q-ml-md">
          <q-option-group v-model="store.form.posisi_pasien.atas" :options="posisi1" type="checkbox" :key="p"
            :label="label" inline dense />
        </div>
        <div class="row q-gutter-sm q-ml-md">
          <q-option-group v-model="store.form.posisi_pasien.bawah" :options="posisi2" type="checkbox" :key="p"
            :label="label" inline dense />
        </div>
        <!-- PREMEDIKASI -->
        <div class="text-weight-bold q-mt-md">Premedikasi</div>
        <div class="q-ml-md column q-gutter-sm">
          <div class="row items-center">
            <div class="col-12">
              <q-input dense v-model="store.form.premedikasi.oral" type="text" label="Oral" class="q-ml-sm" autogrow />
            </div>
            <div class="col-12">
              <q-input dense v-model="store.form.premedikasi.iv" type="text" label="IV" class="q-ml-sm" autogrow />
            </div>
            <div class="col-12">
              <q-input dense v-model="store.form.premedikasi.im" type="text" label="IM" class="q-ml-sm" autogrow />
            </div>
          </div>
        </div>
        <!-- INDUKSI -->
        <div class="text-weight-bold q-mt-md">Induksi</div>
        <div class="q-ml-md column q-gutter-sm">
          <div class="row items-center">
            <div class="col-12">
              <q-input dense type="text" v-model="store.form.induksi.inhalasi" label="Inhalasi" class="q-ml-sm"
                autogrow />
            </div>
          </div>
          <div class="row items-center">
            <div class="col-12">
              <q-input dense type="text" v-model="store.form.induksi.intravena" label="Intravena" class="q-ml-sm"
                autogrow />
            </div>
          </div>
        </div>

        <!-- ASA -->
        <div class="text-weight-bold q-mt-md">Klasifikasi ASA</div>
        <div class="row q-gutter-lg q-ml-md">
          <q-option-group v-model="store.form.klasifikasi_asa" :options="opsiASA" type="checkbox" inline dense />
        </div>

        <!-- AIRWAY -->
        <div class="text-weight-bold q-mt-md">Tata Laksana Jalan Napas</div>
        <div class="q-ml-md">
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Face Mask : No
            </div>
            <q-input v-model="store.form.tata_laksana_jalan_napas.face_mask" dense type="text" autogrow />Oro /
            Nasopharing
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              ETT : No
            </div>
            <q-input v-model="store.form.tata_laksana_jalan_napas.ett" dense type="text" autogrow />
            Jenis Kinkin
            <q-checkbox class="q-pl-md" label="Nonkinkin" val="Nonkinkin"
              v-model="store.form.tata_laksana_jalan_napas.nonkinkin" dense />
            <q-checkbox label="Fiksasi" class="q-pl-md" val="Fiksasi" dense
              v-model="store.form.tata_laksana_jalan_napas.fiksasi" />
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.cm" />cm
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              LMA : No
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.lma" />
            Jenis
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.jenis" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Trakeostomi :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.trakeostomi" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Bronkoskopi Fiberoptik :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.bronkospifiberoptik" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Glidescope :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tata_laksana_jalan_napas.glidescope" />
          </div>
        </div>

        <!-- INTUBASI -->
        <div class="text-weight-bold q-mt-md">Intubasi</div>
        <div class="row q-gutter-sm q-ml-md">
          <q-option-group v-model="store.form.intubasi" :options="intubasi1" type="checkbox" inline dense />

        </div>
        <!-- <div class="row q-gutter-sm q-ml-md q-mt-xs">
          <q-checkbox v-for="i in intubasi2" :key="i" :label="i" dense />
        </div> -->

        <!-- VENTILASI -->
        <div class="text-weight-bold q-mt-md">Ventilasi</div>
        <div class="row q-gutter-md q-ml-md">
          <q-checkbox label="Spontan" dense val="Spontan" v-model="store.form.ventilasi.spontan" />
          <q-checkbox label="Kendali" dense val="Kendali" v-model="store.form.ventilasi.kendali" />
          <q-checkbox label="Ventilator" dense val="Ventilator" v-model="store.form.ventilasi.ventilator" />
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              TV :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.ventilasi.tv" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              RR :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.ventilasi.rr" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              PEEP :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.ventilasi.peep" />
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Konversi :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.ventilasi.konversi" />
          </div>
        </div>


        <!-- REGIONAL -->
        <div class="text-weight-bold q-mt-md">Regional Anestesi</div>
        <div class="row q-gutter-md q-ml-md">
          <q-checkbox label="Spinal Anestesi" dense val="Spinal Anastesi"
            v-model="store.form.regional_anestesi.spinalanastesi" />
          <q-checkbox label="Epidural Anestesi" dense val="Epidural Anastesi"
            v-model="store.form.regional_anestesi.epiduralanastesi" />
          <q-checkbox label="Lain-lain :" dense val="Lain-lain" v-model="store.form.regional_anestesi.lainnya" />
          <q-input dense type="text" v-model="store.form.regional_anestesi.lainnya_text" autogrow />
        </div>

        <div class="q-ml-lg q-mt-xs"><q-input dense type="text" autogrow label="Lokasi :"
            v-model="store.form.regional_anestesi.lokasi" /></div>
        <div class="q-ml-lg q-mt-xs"><q-input dense type="text" autogrow label="Jenis Jarum / No :"
            v-model="store.form.regional_anestesi.jenisjarum" /></div>
        <div class="q-ml-lg q-mt-xs"><q-input dense type="text" autogrow label="Obat :"
            v-model="store.form.regional_anestesi.obat" /></div>

        <div class="row q-gutter-lg q-ml-xs q-mt-xs">
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Hasil :
            </div>
            <q-checkbox label="Total" dense val="Total" v-model="store.form.regional_anestesi.hasil_total" />
            <q-checkbox label="Partial" dense val="Partial" v-model="store.form.regional_anestesi.hasil_partial" />
            <q-checkbox label="Gagal" dense val="Gagal" v-model="store.form.regional_anestesi.hasil_gagal" />
          </div>
        </div>
        <div class="row q-gutter-lg q-ml-xs q-mt-xs">
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Komplikasi :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.komplikasi_anestesi" />
          </div>
        </div>
        <div class="row">
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Tanggal Mulai :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tanggal_mulai">
              <template v-slot:append>
                <q-icon name="event">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                    class="q-gutter-md row items-start">
                    <q-date v-model="store.form.tanggal_mulai" mask="YYYY-MM-DD HH:mm" />
                    <q-time v-model="store.form.tanggal_mulai" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Tanggal Selesai :
            </div>
            <q-input dense type="text" autogrow v-model="store.form.tanggal_selesai">
              <template v-slot:append>
                <q-icon name="event">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                    class="q-gutter-md row items-start">
                    <q-date v-model="store.form.tanggal_selesai" mask="YYYY-MM-DD HH:mm" />
                    <q-time v-model="store.form.tanggal_selesai" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row items-center no-wrap">
            <div class="q-mr-sm">
              Lama :
            </div>
            {{ lama }}
          </div>
        </div>
        <div class="q-mt-md text-right q-gutter-sm print-hide">
          <q-btn label="Simpan" type="submit" color="red" :loading="store.loadingSave" :disabled="store.loadingSave" />
          <q-btn label="Cetak" color="red" v-print="printObj" />
        </div>
      </q-form>
      <q-separator class="q-mt-md q-mb-md" />
      <table class="monitor-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Waktu</th>
            <th>Operasi</th>
            <th>Anestesi</th>
            <th>Sistole</th>
            <th>Diastole</th>
            <th>Nadi</th>
            <th>SpO₂</th>
            <th>RR</th>
            <th>Mode Ventilator</th>
            <th>EKG</th>
            <th>Suhu</th>
            <th>EtCO₂</th>
            <th>N₂O / O₂</th>
            <th>Flow %</th>
            <th>Gas Anestesi</th>
            <th>MAC %</th>
            <th>Obat</th>
            <th>Cairan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><q-input /></td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
      <!-- </div> -->
    </div>


  </q-page>
</template>
<script setup>
import { useLaporananastesiStore } from 'src/stores/transaksi/laporananastesi';
import { computed, onMounted } from 'vue';

const store = useLaporananastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
})

const posisi1 = [
  { label: 'Supine', value: 'supine' },
  { label: 'Lithotomy', value: 'lithotomy' },
  { label: 'Prone', value: 'prone' },
  { label: 'Jack Knife', value: 'jack_knife' },
  { label: 'Knee Chest', value: 'knee_chest' },
  { label: 'Kidney', value: 'kidney' },
  { label: 'Fowler', value: 'fowler' },
  { label: 'Wilson Frame', value: 'wilson_frame' }
]

const posisi2 = [
  { label: 'Trendelenburg', value: 'trendelenburg' },
  { label: 'Reverse Trendelenburg', value: 'reverse_trendelenburg' },
  { label: 'Lateral', value: 'lateral' },
  { label: 'KA', value: 'ka' },
  { label: 'KI', value: 'ki' },
  { label: 'Fracture Table', value: 'fracture_table' }
]

const opsiASA = [
  { label: 'I', value: 'I' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
  { label: 'V', value: 'V' },
  { label: 'VI', value: 'VI' },
  { label: 'E', value: 'E' }
]

function simpan() {
  console.log('xxxxxx', props.pasien?.noreg)
  store.form.noreg = props.pasien?.noreg
  store.simpanData()
}

const intubasi1 = [
  { label: 'Sesudah Tidur', value: 'sesudah_tidur' },
  { label: 'Blind', value: 'blind' },
  { label: 'Oral', value: 'oral' },
  { label: 'Nasal', value: 'nasal' },
  { label: 'Ka', value: 'ka' },
  { label: 'Ki', value: 'ki' },
  { label: 'Trakeostomi', value: 'trakeostomi' },
  { label: 'Sulit Ventilasi', value: 'sulit_ventilasi' },
  { label: 'Sulit Intubasi', value: 'sulit_intubasi' },
  { label: 'Dengan Stilet', value: 'dengan_stilet' },
  { label: 'Cuff', value: 'cuff' },
  { label: 'Level ETT', value: 'level_ett' },
  { label: 'Pack', value: 'pack' }
]

const lama = computed(() => {
  const mulai = store.form.tanggal_mulai
  const selesai = store.form.tanggal_selesai

  if (!mulai || !selesai) return ''

  const tMulai = new Date(mulai).getTime()
  const tSelesai = new Date(selesai).getTime()

  const diffMs = tSelesai - tMulai
  if (diffMs <= 0) return '0'

  const menit = Math.floor(diffMs / 60000)
  const jam = Math.floor(menit / 60)
  const sisaMenit = menit % 60

  return `${jam} jam ${sisaMenit} menit`
})

onMounted(() => {
  store.isiForm(props.pasien)
})
</script>
<style scoped>
.line {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 100%;
  min-width: 200px;
  margin-left: 6px;
}

.line-sm {
  display: inline-block;
  border-bottom: 1px solid #000;
  width: 60px;
  margin: 0 6px;
}

.monitor-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.monitor-table th {
  border: 1px solid #ccc;
  padding: 6px 4px;
  text-align: center;
  font-weight: 600;
  background: #f5f7fa;
  white-space: nowrap;
}

.monitor-table th:nth-child(1),
.monitor-table th:nth-child(2) {
  position: sticky;
  left: 0;
  background: #eef2f7;
  z-index: 2;
}

.monitor-table th:nth-child(2) {
  left: 40px;
}
</style>
