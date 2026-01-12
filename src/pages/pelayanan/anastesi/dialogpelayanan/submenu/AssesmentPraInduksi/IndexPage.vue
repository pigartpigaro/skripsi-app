<template>
  <q-page class="q-pa-md bg-grey-6">
    <div id="printMe" class="q-pa-md full-width full-height bg-white">
      <div class="text-weight-bold text-h6 text-center q-pb-md">Assesment Pra Induksi</div>
      <q-separator spaced style="border-top: 1px solid #000" />

      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          Tanggal:
        </div>
        <q-input v-model="store.form.tanggal" dense type="text" autogrow>
          <template v-slot:append>
            <q-icon name="event">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="store.form.tanggal" mask="DD MMMM YYYY" />
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
        <q-input v-model="store.form.td" dense type="text" autogrow />
        <!-- <q-input v-model="store.form.kesadaran" dense type="text" autogrow /> -->
      </div>

      <!-- VITAL SIGN -->
      <div class="q-ml-md row items-center no-wrap">
        <div class="row items-center q-mb-xs">
          <div class="col-3">N</div>
          <div class="col-9">
            <q-input dense v-model="store.form.nadi" suffix="x / menit" />
          </div>
        </div>
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="row items-center q-mb-xs">
          <div class="col-3">RR</div>
          <div class="col-9">
            <q-input dense v-model="store.form.rr" suffix="x / menit" />
          </div>
        </div>
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="row items-center q-mb-xs">
          <div class="col-3">Suhu</div>
          <div class="col-9">
            <q-input dense v-model="store.form.suhu" suffix="°C" />
          </div>
        </div>
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="row items-center q-mb-xs">
          <div class="col-3">Saturasi O2</div>
          <div class="col-9">
            <q-input dense v-model="store.form.spo2" suffix="%" />
          </div>
        </div>
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="row items-center q-mb-xs">
          <div class="col-3">Gambaran EKG</div>
          <div class="col-9">
            <q-input dense v-model="store.form.ekg" />
          </div>
        </div>
      </div>
    </div>
    <div class="q-ml-md row items-center no-wrap">
      <!-- IV LINE -->
      <div class="q-mt-md">
        <div class="row items-center">
          <div class="col-3">Pemasangan IV Line</div>
          <div class="col-9">
            <q-radio v-model="store.form.ivline" val="1" label="1 buah" />
            <q-radio v-model="store.form.ivline" val="2" label="2 buah" />
          </div>
        </div>
      </div>

      <!-- CAIRAN & DARAH -->
      <div class="row items-center q-mt-sm">
        <div class="col-3">Cairan infus & darah</div>
        <div class="col-9">
          <q-radio v-model="store.form.cairan" val="tidak" label="Tidak" />
          <q-radio v-model="store.form.cairan" val="siap" label="Siap" />
          <q-input dense v-if="store.form.cairan === 'siap'" v-model="store.form.jenis_cairan" placeholder="Jenis"
            class="q-ml-sm" style="max-width:200px" />
        </div>
      </div>

      <!-- MESIN ANESTESI -->
      <div class="row items-center q-mt-sm">
        <div class="col-3">Mesin Anestesi</div>
        <div class="col-9">
          <q-radio v-model="store.form.mesin" val="siap" label="Siap" />
          <q-radio v-model="store.form.mesin" val="tidak" label="Tidak" />
        </div>
      </div>

      <!-- GENERAL ANESTESI -->
      <div class="q-mt-md">
        <div class="text-weight-bold">General Anestesi</div>

        <q-radio v-model="store.form.ga" val="siap" label="Siap" />
        <q-radio v-model="store.form.ga" val="tidak" label="Tidak" />

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

      <!-- REGIONAL ANESTESI -->
      <div class="q-mt-md">
        <div class="text-weight-bold">Regional Anestesi</div>

        <q-radio v-model="store.form.ra" val="siap" label="Siap" />
        <q-radio v-model="store.form.ra" val="tidak" label="Tidak" />

        <q-input dense v-model="store.form.alat_ra" label="Alat yang disiapkan" class="q-ml-lg" />
      </div>

      <!-- OBAT -->
      <!-- <div class="q-mt-md">
        <div class="text-weight-bold">Obat Anestesi</div>
        <q-input dense v-for="n in 3" :key="'oa' + n" v-model="store.form.obat_anestesi[n]" />
      </div> -->

      <!-- <div class="q-mt-md">
        <div class="text-weight-bold">Obat Emergency</div>
        <q-radio v-model="store.form.obat_emergency" val="siap" label="Siap" />
        <q-radio v-model="store.form.obat_emergency" val="tidak" label="Tidak" />
        <q-input dense v-for="n in 3" :key="'oe' + n" v-model="store.form.obat_emergency_list[n]" />
      </div> -->

      <!-- RIWAYAT -->
      <div class="q-mt-md">
        <div class="row items-center">
          <div class="col-3">Penyakit</div>
          <div class="col-9">
            <q-radio v-model="store.form.penyakit" val="tidak" label="Tidak" />
            <q-radio v-model="store.form.penyakit" val="ada" label="Ada" />
            <q-input dense v-if="store.form.penyakit === 'ada'" class="q-ml-sm" />
          </div>
        </div>
      </div>

      <div class="row items-center q-mt-sm">
        <div class="col-3">Catatan Lain</div>
        <div class="col-9">
          <q-input dense v-model="store.form.catatan" />
        </div>
      </div>


      <div class="q-mt-md text-right q-gutter-sm print-hide">
        <q-btn label="Simpan" color="red" />
        <q-btn label="Cetak" color="red" v-print="printObj" />
      </div>
    </div>
  </q-page>
</template>
<script setup>

import { useAssesmentPraInduksiStore } from 'src/stores/transaksi/assesmenprainduksi';

const store = useAssesmentPraInduksiStore()
function setTo(val) {
  store.params.from = val
}

function setToDisp(val) {
  store.tanggaldisplay.tgldari = val
}

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
