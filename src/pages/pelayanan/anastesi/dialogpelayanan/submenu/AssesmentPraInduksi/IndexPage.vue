<template>
  <!-- <pre>{{ props.pasien?.asessement_pra_induksi }}</pre> -->
  <q-page class="q-pa-md bg-grey-6">
    <div id="printMe" class="q-pa-md full-width full-height bg-white">
      <div class="text-weight-bold text-h6 text-center q-pb-md">Assesment Pra Induksi</div>
      <q-separator spaced style="border-top: 1px solid #000" />
      <q-form @submit="simpan" class="q-gutter-sm">
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm text-weight-medium">
            Tanggal:
          </div>
          <q-input v-model="store.form.tanggal" dense type="text" autogrow @db-model="setTo" @set-display="setToDisp">
            <template v-slot:append>
              <q-icon name="event">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="store.form.tanggal" mask="YYYY-MM-DD" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <app-input-date-human :model="store.tanggaldisplay.tgldari" label="Tanggal" dense autogrow @db-model="setTo"
          @set-display="setToDisp" /> -->
        </div>
        <div class="q-ml-md row q-mt-md items-center no-wrap">
          <div class="q-mr-sm text-weight-medium">
            Kesadaran:
          </div>
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            TD:
          </div>
          <q-input v-model="store.form.td" dense type="number" autogrow />
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            N:
          </div>
          <q-input v-model="store.form.n" dense type="number" autogrow />
          <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            RR:
          </div>
          <q-input v-model="store.form.rr" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Suhu:
          </div>
          <q-input v-model="store.form.suhu" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Saturasi O₂:
          </div>
          <q-input v-model="store.form.saturasi" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Gambaran EKG:
          </div>
          <q-input v-model="store.form.ekg" dense type="number" autogrow />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Pemasangan IV Line:
          </div>
          <q-radio v-model="store.form.iv_line" val="1" label="1 buah" />
          <q-radio v-model="store.form.iv_line" val="2" label="2 buah" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Cairan infus & darah:
          </div>
          <q-radio v-model="store.form.infus_darah" val="tidak" label="Tidak" />
          <q-radio v-model="store.form.infus_darah" val="siap" label="Siap" />
          <q-input dense v-if="store.form.infus_darah === 'siap'" v-model="store.form.
            jenis_infus_darah" placeholder="Jenis" class="q-ml-sm" style="max-width:200px" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Mesin Anastesi:
          </div>
          <q-radio v-model="store.form.mesin_anastesi" val="siap" label="Siap" />
          <q-radio v-model="store.form.mesin_anastesi" val="tidak" label="Tidak" />
        </div>

        <!-- GENERAL ANESTESI -->
        <div class="q-mt-md">
          <div class="text-weight-bold q-ml-md">Kesiapan Peralatan Anestesi</div>
          <div class="q-ml-md row items-center no-wrap">
            <div class="q-mr-sm">
              General Anestesi:
            </div>
            <q-radio v-model="store.form.ga" val="siap" label="Siap" />
            <q-radio v-model="store.form.ga" val="tidak" label="Tidak" />
          </div>
          <div class="q-ml-lg q-mt-sm">
            <q-input dense v-model="store.form.scope" label="Scope" />
            <q-input dense v-model="store.form.tube" label="Tube" />
            <q-input dense v-model="store.form.airway" label="Airway" />
            <q-input dense v-model="store.form.tape" label="Tape" />
            <q-input dense v-model="store.form.introducer" label="Introducer" />
            <q-input dense v-model="store.form.connector" label="Connector" />
            <q-input dense v-model="store.form.suction" label="Suction" />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Regional Anestesi:
          </div>
          <q-radio v-model="store.form.regionalanastesi" val="siap" label="Siap" />
          <q-radio v-model="store.form.regionalanastesi" val="tidak" label="Tidak" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Alat Yang disiapkan:
          </div>
          <q-radio v-model="store.form.alatyangdisiapkan" val="siap" label="Siap" />
          <q-radio v-model="store.form.alatyangdisiapkan" val="tidak" label="Tidak" />
        </div>
        <!-- <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm">
          Alat Yang disiapkan:
        </div>
        <q-radio v-model="store.form.ga" val="siap" label="Siap" />
        <q-radio v-model="store.form.ga" val="tidak" label="Tidak" />
      </div> -->
        <div class="q-ml-md row items-center no-wrap">
          <div class="col-2 q-mr-sm">
            Obat Anastesi:
          </div>
          <div class="col-9">
            <q-input dense v-model="store.form.obatanestesi" autogrow />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="col-2 q-mr-sm">
            Obat Emergency:
          </div>
          <div class="col-9">
            <q-input dense v-model="store.form.obatemergency" autogrow />
          </div>
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Penyakit Yang Diderita:
          </div>
          <q-radio v-model="store.form.penyakityangdiderita" val="tidak" label="Tidak" />
          <q-radio v-model="store.form.penyakityangdiderita" val="siap" label="Siap" />
          <q-input dense v-if="store.form.penyakityangdiderita === 'siap'"
            v-model="store.form.keteranganpenyakityangdiderita" placeholder="Jenis" class="q-ml-sm"
            style="max-width:200px" />
        </div>

        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Gigi Palsu:
          </div>
          <q-radio v-model="store.form.gigipalsu" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.gigipalsu" val="Ada, Permanen" label="Ada, Permanen" />
          <q-radio v-model="store.form.gigipalsu" val="Ada, Sudah Dilepas" label="Ada, Sudah Dilepas" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Alergi:
          </div>
          <q-radio v-model="store.form.alergi" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.alergi" val="Ada" label="Ada" />
          <q-input dense v-if="store.form.alergi === 'Ada'" v-model="store.form.keteranganalergi" placeholder="Jenis"
            class="q-ml-sm" style="max-width:200px" />
        </div>
        <div class="q-ml-md row items-center no-wrap">
          <div class="q-mr-sm">
            Lensa Kontak:
          </div>
          <q-radio v-model="store.form.lensakontak" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.lensakontak" val="Ada Sudah Dilepas" label="Ada Sudah Dilepas" />
          <q-input dense v-if="store.form.lensakontak === 'Ada'" v-model="store.form.keteranganlensakontak"
            placeholder="Jenis" class="q-ml-sm" style="max-width:200px" />
        </div>
        <div class="q-ml-md row items-center no-wrap ">
          <div class="q-mr-sm">
            Penggunaan Obat sebelumnya:
          </div>
          <q-radio v-model="store.form.penggunaanobatsebelumnya" val="Tidak Ada" label="Tidak Ada" />
          <q-radio v-model="store.form.penggunaanobatsebelumnya" val="Ada" label="Ada" />
          <div class="q-mr-sm">
            <q-input dense v-if="store.form.penggunaanobatsebelumnya === 'Ada'"
              v-model="store.form.keteranganpenggunaanobatsebelumnya" placeholder="Jelaskan" class="q-ml-md"
              style="width:500px" autogrow />
          </div>
        </div>

        <div class="q-ml-md row items-center q-mt-sm">
          <div class="col-auto">Catatan Lain</div>
          <div class="col-9">
            <q-input dense v-model="store.form.catatan" />
          </div>
        </div>

        <div class="q-mt-md text-right q-gutter-sm print-hide">
          <q-btn label="Simpan" type="submit" color="red" :loading="store.loadingSave" :disabled="store.loadingSave" />
          <q-btn label="Cetak" color="red" v-print="printObj" />
        </div>
      </q-form>
      <!-- </div> -->
    </div>
  </q-page>
</template>
<script setup>

import { useAssesmentPraInduksiStore } from 'src/stores/transaksi/assesmenprainduksi';
import { onMounted } from 'vue';

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useAssesmentPraInduksiStore()
function setTo(val) {
  store.form.tanggal = val
}

function setToDisp(val) {
  store.tanggaldisplay.tanggal = val
}

function simpan() {
  store.form.noreg = props.pasien.noreg
  store.simpanData()
}

onMounted(() => {
  store.form.noreg = props.pasien.noreg
  const rinci = props.pasien?.asessement_pra_induksi
  store.form.td = rinci?.td
  store.form.n = rinci?.n
  store.form.rr = rinci?.rr
  store.form.suhu = rinci?.suhu
  store.form.saturasi = rinci?.saturasi
  store.form.ekg = rinci?.ekg
  store.form.iv_line = rinci?.iv_line
  store.form.infus_darah = rinci?.infus_darah
  store.form.jenis_infus_darah = rinci?.jenis_infus_darah
  store.form.mesin_anastesi = rinci?.mesin_anastesi
  store.form.ga = rinci?.ga
  store.form.scope = rinci?.scope
  store.form.tube = rinci?.tube
  store.form.airway = rinci?.airway
  store.form.tape = rinci?.tape
  store.form.introducer = rinci?.introducer
  store.form.connector = rinci?.connector
  store.form.suction = rinci?.suction
  store.form.regionalanastesi = rinci?.regionalanastesi
  store.form.alatyangdisiapkan = rinci?.alatyangdisiapkan
  store.form.obatanestesi = rinci?.obatanestesi
  store.form.obatemergency = rinci?.obatemergency
  store.form.penyakityangdiderita = rinci?.penyakityangdiderita
  store.form.keteranganpenyakityangdiderita = rinci?.keteranganpenyakityangdiderita
  store.form.gigipalsu = rinci?.gigipalsu
  store.form.alergi = rinci?.alergi
  store.form.keteranganalergi = rinci?.keteranganalergi
  store.form.lensakontak = rinci?.lensakontak
  store.form.keteranganlensakontak = rinci?.keteranganlensakontak
  store.form.penggunaanobatsebelumnya = rinci?.penggunaanobatsebelumnya
  store.form.keteranganpenggunaanobatsebelumnya = rinci?.keteranganpenggunaanobatsebelumnya
  store.form.catatan = rinci?.catatan

})

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
