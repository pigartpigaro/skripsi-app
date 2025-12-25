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
        <div class="row q-col-gutter-xl">

          <div class="col-3">
            > DM :
            <q-radio v-model="store.fpenyakit.dm" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fpenyakit.dm" val="Tidak" label="Tidak" color="cyan" />
          </div>

          <div class="col-3">
            > Penyakit Jantung :
            <q-radio v-model="store.fpenyakit.jantung" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fpenyakit.jantung" val="Tidak" label="Tidak" color="cyan" />
          </div>

          <div class="col-3">
            > Penyakit Ginjal :
            <q-radio v-model="store.fpenyakit.ginjal" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fpenyakit.ginjal" val="Tidak" label="Tidak" color="cyan" />
          </div>

          <div class="col-3">
            > Penyakit Hipertensi :
            <q-radio v-model="store.fpenyakit.hipertensi" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fpenyakit.hipertensi" val="Tidak" label="Tidak" color="cyan" />
          </div>

          <div class="col-3">
            > Penyakit Paru-paru :
            <q-radio v-model="store.fpenyakit.paru" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fpenyakit.paru" val="Tidak" label="Tidak" color="cyan" />
          </div>

          <div class="col-auto">
            > Penyakit Lainnya :
          </div>
          <div class="col">
            <q-input v-model="store.fpenyakit.lainnya" outlined dense style="width: 500px;" />
          </div>

        </div>
        <div class="row q-col-gutter-xl q-mt-sm">
          <div class="col-4">
            # Riwayat Penyakit Keluarga :
            <q-radio v-model="store.friwayat.keluarga" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.friwayat.keluarga" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-4">
            # Riwayat Operasi :
            <q-radio v-model="store.friwayat.operasi" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.friwayat.operasi" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-4">
            # Riwayat Anestesi :
            <q-radio v-model="store.friwayat.anestesi" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.friwayat.anestesi" val="Tidak" label="Tidak" color="cyan" />
          </div>
        </div>

        <div class="text-weight-bold q-mt-md">* Last Meal (L)</div>

        <!-- NEONATUS -->
        <div class="q-mt-sm">
          ~ Neonatus
          <div class="row items-center">

            <div class="col-1">Makanan padat :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.neonatuspadat" dense style="width: 80px" />
                <span class="q-ml-sm">Jam</span>
              </div>
            </div>

            <div class="col-1">Clear Liquid :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.neonatusclear" dense style="width: 80px" />
                <span class="q-ml-sm">Jam</span>
              </div>
            </div>

            <div class="col-1">Susu Formula :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.neonatusformula" dense style="width: 80px" />
                <span class="q-ml-sm">Jam</span>
              </div>
            </div>

            <div class="col-1">ASI :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.neonatusasi" dense style="width: 80px" />
                <span class="q-ml-sm">Jam</span>
              </div>
            </div>

          </div>
        </div>

        <!-- < 6 BULAN -->
        <div class="q-mt-md">
          ~ &lt; 6 Bulan
          <div class="row items-center q-mt-xs">
            <div class="col-1">Makanan padat :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.bayi6padat" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Clear Liquid :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.bayi6clear" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Susu Formula :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.bayi6formula" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">ASI :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.bayi6asi" dense style="width: 80px" /> Jam
              </div>
            </div>
          </div>
        </div>

        <!-- 6 - 36 BULAN -->
        <div class="q-mt-md">
          ~ 6 – 36 Bulan
          <div class="row items-center q-mt-xs">
            <div class="col-1">Makanan padat :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.balitapadat" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Clear Liquid :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.balitaclear" dense style="width: 80px" /> Jam
              </div>
            </div>
            <div class="col-1">Susu Formula :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.balitaformula" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">ASI :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.balitaasi" dense style="width: 80px" /> Jam
              </div>
            </div>
          </div>
        </div>

        <!-- > 36 BULAN -->
        <div class="q-mt-md">
          ~ &gt; 36 Bulan
          <div class="row items-center q-mt-xs">
            <div class="col-1">Makanan padat :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.anakpadat" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Clear Liquid :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.anakclear" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Susu Formula :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.anakformula" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">ASI :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.anakasi" dense style="width: 80px" /> Jam
              </div>
            </div>
          </div>
        </div>

        <!-- DEWASA -->
        <div class="q-mt-md">
          ~ Dewasa
          <div class="row items-center q-mt-xs">
            <div class="col-1">Makanan padat :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.dewasapadat" dense style="width: 80px" /> Jam
              </div>
            </div>

            <div class="col-1">Clear Liquid :</div>
            <div class="col-2">
              <div class="row items-center no-wrap">
                <q-input v-model="store.flastmeal.dewasaclear" dense style="width: 80px" /> Jam
              </div>
            </div>
          </div>
        </div>

        <div class="text-weight-bold q-mt-md">* Environment (E)</div>

        <div class="row q-mt-sm">
          <div class="col-4">
            Kebiasaan merokok :
            <q-radio v-model="store.fenvironment.merokok" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fenvironment.merokok" val="Tidak" label="Tidak" color="cyan" />
          </div>
          <div class="col-4">
            Mengkonsumsi alkohol :
            <q-radio v-model="store.fenvironment.alkohol" val="Ya" label="Ya" color="cyan" />
            <q-radio v-model="store.fenvironment.alkohol" val="Tidak" label="Tidak" color="cyan" />
          </div>
        </div>

      </q-card-section>
    </q-card>

    <!-- MEDICATION -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-weight-bold">Pemeriksaan Fisik</div>
      </q-card-section>
      <q-card-section>
        <div>~ Glasgow coma scale (GCS)</div>
        <div class="row q-col-gutter-sm">
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.e" label="E" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.m" label="M" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.v" label="V" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.t" label="T" dense /></div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>~ Kesadaran</div>
        <div class="row q-col-gutter-sm">
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Composmentis" label="Composmentis"
              color="cyan" />
          </div>
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Apatis" label="Apatis"
              color="cyan" />
          </div>
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Delirium" label="Delirium"
              color="cyan" />
          </div>
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Somnolen" label="Somnolen"
              color="cyan" />
          </div>
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Stupor" label="Stupor"
              color="cyan" />
          </div>
          <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Koma" label="Koma" color="cyan" />
          </div>
        </div>
        <div class="text-weight-bold q-mt-md">* Tanda - tanda vital</div>
        <div class="row q-col-gutter-sm">
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.tekanandarah" label="Tekanan darah (mmHg)" dense />
          </div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.nadi" label="Nadi / menit" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.suhu" label="Suhu (°C)" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.map" label="MAP / mmHg" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.rr" label="RR / menit" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.skalanyeri"
              label="Skala Nyeri / (NRS/Wong Baker/VRS)" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.bb" label="BB / kg" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.tb" label="TB / cm" dense /></div>
          <div class="3"><q-input v-model="store.fpemeriksaanfisik.imt"
              label="IMT / (hasil perhitungan rumus IMT = Berat (kg) / (Tinggi (m) x Tinggi (m)))" dense /></div>
        </div>
      </q-card-section>
    </q-card>


    <q-card-section class="row q-col-gutter-sm">
      <!-- <q-checkbox v-model="form.obat_hipertensi" label="Obat anti hipertensi" />
        <q-checkbox v-model="form.obat_diabetes" label="Obat antidiabetik" />
        <q-checkbox v-model="form.obat_diuretik" label="Obat diuretik" />
        <q-checkbox v-model="form.obat_antikoagulan" label="Obat antikoagulan" />
        <q-checkbox v-model="form.obat_lain" label="Obat lainnya" />
        <q-input v-if="form.obat_lain" v-model="form.obat_lain_ket" label="Keterangan obat lain" outlined dense
          class="col-12" /> -->
    </q-card-section>


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
