<template>
  <q-page class="q-pa-md bg-white">
    <div id="printData">
      <div class="q-text-weight-bold text-h6 text-center q-pb-md bg-white">ASKAN PASCA ANESTESI</div>
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
      <q-form @submit="simpan">
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            Masalah Kesehatan Anestesi :
          </div>
          <div class="col-10">
            <q-input v-model="store.formpasca.askan_data.masalah_kesehatan_anestesi" dense type="text" autogrow />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            Waktu :
          </div>
          <div class="col-10">
            <q-input dense type="text" autogrow v-model="store.formpasca.askan_data.waktu">
              <template v-slot:append>
                <q-icon name="event">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                    class="q-gutter-md row items-start">
                    <q-date v-model="store.formpasca.askan_data.waktu" mask="YYYY-MM-DD HH:mm" />
                    <q-time v-model="store.formpasca.askan_data.waktu" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            Intervensi :
          </div>
          <div class="col-10">
            <q-input dense type="text" autogrow v-model="store.formpasca.askan_data.intervensi" />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            Implementasi :
          </div>
          <div class="col-10">
            <q-input dense type="text" autogrow v-model="store.formpasca.askan_data.implementasi" />
          </div>
        </div>
        <div class="q-pt-lg q-pb-lg">Evaluasi</div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            S :
          </div>
          <div class="col-10">
            <q-input v-model="store.formpasca.askan_data.s" type="text" autogrow />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            O :
          </div>
          <div class="col-10">
            <q-input v-model="store.formpasca.askan_data.o" dense type="text" autogrow />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            A :
          </div>
          <div class="col-10">
            <q-input dense v-model="store.formpasca.askan_data.a" type="text" autogrow />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            P :
          </div>
          <div class="col-10">
            <q-input v-model="store.formpasca.askan_data.p" dense type="text" autogrow />
          </div>
        </div>
        <div class="row no-wrap items-center q-mb-sm">
          <div class="col-2">
            Nama TTD :
          </div>
          <div class="col-10">
            <q-input v-model="store.formpasca.askan_data.nama_ttd" dense type="text" autogrow />
          </div>
        </div>
        <div class="q-mt-md text-right q-gutter-sm print-hide">
          <q-btn label="Simpan" type="submit" color="red" :loading="store.loadingSave" :disabled="store.loadingSave" />
          <q-btn label="Cetak" color="red" v-print="printObj" />
        </div>
      </q-form>
    </div>
  </q-page>

</template>
<script setup>
import { useAskanPraAnestesiStore } from 'src/stores/transaksi/askanpraanastesi';
import { computed, onMounted } from 'vue';

const store = useAskanPraAnestesiStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
})
function simpan() {
  store.formpasca.noreg = props.pasien.noreg
  store.formpasca.fase = 'Pasca'
  store.simpanData()
}

const printObj = computed(() => ({
  id: '#printData',
  popTitle: '',
  preview: false
}))

onMounted(() => {
  store.isiForm(props.pasien)
})
</script>
<style scoped>
.print-only,
.ttd-print {
  display: none;
}

@media print {
  .text-h6 {
    padding-left: 5mm;
    padding-right: 5mm;
  }

  body {
    background: white !important;
  }

  .print-only,
  .ttd-print {
    display: block !important;
  }

  .no-print,
  .q-btn,
  .q-card-actions {
    display: none !important;
  }

  #printData {
    width: 100%;
    padding: 0;
    /* ⬅️ padding dipindah ke @page */
    box-sizing: border-box;
    font-size: 12px;
  }

  .q-card {
    box-shadow: none !important;
    border: none !important;
  }

  .ttd-line {
    width: 200px;
    border-bottom: 1px solid #000;
  }
}

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
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

/* Header */
.monitor-table thead th {
  position: sticky;
  top: 0;
  z-index: 5;
  background: linear-gradient(180deg, #f8fafc, #eef2f7);
  color: #334155;
  font-weight: 600;
  text-align: center;
  padding: 8px 6px;
  border-bottom: 1px solid #dbe1e8;
  white-space: nowrap;
}

/* Body */
.monitor-table tbody td {
  padding: 6px 4px;
  border-bottom: 1px solid #eef2f7;
  text-align: center;
  vertical-align: middle;
}

/* Input row */
.monitor-table tbody tr.print-hide {
  background: #f8fafc;
  position: sticky;
  top: 36px;
  z-index: 4;
}

/* Hover row */
.monitor-table tbody tr:not(.print-hide):hover {
  background: #f1f5f9;
}

/* First column (No) sticky */
.monitor-table th:first-child,
.monitor-table td:first-child {
  position: sticky;
  left: 0;
  background: #f8fafc;
  z-index: 6;
  min-width: 40px;
}

/* Action column sticky */
.monitor-table th:last-child,
.monitor-table td:last-child {
  position: sticky;
  right: 0;
  background: #f8fafc;
  z-index: 6;
}

/* q-input inside table */
.monitor-table .q-field--dense .q-field__control {
  height: 26px;
  min-height: 26px;
}

.monitor-table .q-field__control {
  padding: 0 6px;
  font-size: 11px;
}

/* Button */
.monitor-table .q-btn {
  min-width: 28px;
  min-height: 28px;
}

/* Print */
@media print {
  .print-hide {
    display: none !important;
  }
}
</style>
