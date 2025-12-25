<template>
  <q-page class="q-pa-md bg-grey-2">

    <!-- PASIEN INFO -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-weight-bold text-h6 text-center">Pengkajian Anestesi</div>
      </q-card-section>
    </q-card>

    <!-- AMPLE -->
    <q-card class="q-mb-sm">
      <q-card-section class="text-weight-bold">
        <div class="text-weight-bold">Pengkajian AMPLE</div>
      </q-card-section>

      <q-card-section>
        <div class="text-weight-bold">* Allergies (A)</div>
        <div class="row q-col-gutter-xl ">
          <div class="col-3">> Riwayat alergi makanan :
            <q-radio v-model="store.falergi.makanan" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergi.makanan" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-3">> Riwayat alergi Obat-obatan :
            <q-radio v-model="store.falergi.obat" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergi.obat" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-auto">> Riwayat Lainnya : </div>
          <div class="col">
            <q-input v-model="store.falergi.lainnya" label="Keterangan" outlined dense style="width: 500px;" />
          </div>
        </div>
        <div class="text-weight-bold">* Medication (M)</div>
        <div class="row q-col-gutter-xl ">
          <div class="col-3">> Obat anti hipertensi :
            <q-radio v-model="store.falergiobat.hipertensi" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergiobat.hipertensi" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-3">> Obat antidiabetik :
            <q-radio v-model="store.falergiobat.antidiabetik" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergiobat.antidiabetik" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-3">> Obat diuretik :
            <q-radio v-model="store.falergiobat.diuretik" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergiobat.diuretik" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-3">> Obat antikoagulan :
            <q-radio v-model="store.falergiobat.antikoagulan" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergiobat.antikoagulan" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-3">> Obat digitalis :
            <q-radio v-model="store.falergiobat.digitalis" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.falergiobat.digitalis" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-auto">> Obat Lainnya : </div>
          <div class="col">
            <q-input v-model="store.falergiobat.lainnya" label="Keterangan" outlined dense style="width: 500px;" />
          </div>
        </div>
        <div class="text-weight-bold">* Past Illness (P)</div>
        <div class="text-weight-bold"># Riwayat penyulit sebelumnya (pasien)</div>

      </q-card-section>
    </q-card>

    <!-- MEDICATION -->
    <q-card class="q-mb-md">

      <q-card-section class="text-weight-bold"></q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <!-- <q-checkbox v-model="form.obat_hipertensi" label="Obat anti hipertensi" />
        <q-checkbox v-model="form.obat_diabetes" label="Obat antidiabetik" />
        <q-checkbox v-model="form.obat_diuretik" label="Obat diuretik" />
        <q-checkbox v-model="form.obat_antikoagulan" label="Obat antikoagulan" />
        <q-checkbox v-model="form.obat_lain" label="Obat lainnya" />
        <q-input v-if="form.obat_lain" v-model="form.obat_lain_ket" label="Keterangan obat lain" outlined dense
          class="col-12" /> -->
      </q-card-section>
    </q-card>

    <!-- LAST MEAL -->
    <q-card class="q-mb-md">
      <q-card-section class="text-weight-bold">Last Meal</q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <!-- <q-input v-model="form.makan_padat_jam" label="Makanan padat (jam)" outlined dense />
        <q-input v-model="form.clear_liquid_jam" label="Clear liquid (jam)" outlined dense />
        <q-input v-model="form.asi_jam" label="ASI (jam)" outlined dense />
        <q-input v-model="form.susu_formula_jam" label="Susu formula (jam)" outlined dense /> -->
      </q-card-section>
    </q-card>

    <!-- VITAL SIGN -->
    <q-card class="q-mb-md">
      <q-card-section class="text-weight-bold">Tanda Vital</q-card-section>
      <q-card-section class="row q-col-gutter-sm">
        <!-- <q-input v-model="form.td" label="Tekanan darah (mmHg)" outlined dense />
        <q-input v-model="form.nadi" label="Nadi / menit" outlined dense />
        <q-input v-model="form.suhu" label="Suhu (°C)" outlined dense />
        <q-input v-model="form.rr" label="RR / menit" outlined dense />
        <q-input v-model="form.bb" label="Berat badan (Kg)" outlined dense />
        <q-input v-model="form.tb" label="Tinggi badan (Cm)" outlined dense /> -->
      </q-card-section>
    </q-card>

    <!-- B1 BREATHING -->
    <q-card class="q-mb-md">
      <q-card-section class="text-weight-bold">B1 - Breathing</q-card-section>
      <q-card-section>
        <!-- <q-checkbox v-model="form.sulit_intubasi" label="Sulit intubasi (LEMON)" />
        <q-checkbox v-model="form.obstruksi_jalan_napas" label="Obstruksi jalan napas" />
        <q-select v-model="form.pola_napas" :options="['Eupnea', 'Bradypnea', 'Tachypnea', 'Apnea']" label="Pola napas"
          outlined dense /> -->
      </q-card-section>
    </q-card>

    <!-- ACTION -->
    <q-card>
      <q-card-actions align="right">
        <q-btn color="primary" label="Simpan Pengkajian" @click="simpan" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>
import { usePengkajianAnastesiStore } from 'src/stores/master/pelayanan/pengkajiananastesi'

const store = usePengkajianAnastesiStore()
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

function simpan() {
  console.log('DATA FORM:', form)
}
</script>
