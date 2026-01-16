<template>
  <q-page class="q-pa-md bg-grey-6">
    <div id="printMe" class="q-pa-md full-width full-height bg-white">
      <div class="text-weight-bold text-h6 text-center q-pb-md">Pengkajian Anestesi</div>
      <q-separator spaced style="border-top: 1px solid #000" />
      <div class="text-weight-bold q-pt-md">Pengkajian AMPLE</div>

      <!-- IDENTITAS   -->
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
                <div class="col-4 label">Umur</div>
                <div class="col-8">: {{ pasien.pasien?.usia }}</div>
              </div>
            </div>

            <!-- KANAN -->
            <div class="col-6">
              <div class="row q-mb-xs">
                <div class="col-5 label">NIK</div>
                <div class="col-7">: {{ pasien?.pasien?.nik }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">Diagnosis Medis</div>
                <div class="col-7">: {{ pasien?.diagnosa }}</div>
              </div>
              <div class="row q-mb-xs">
                <div class="col-5 label">DPJP</div>
                <div class="col-7">: {{ pasien?.dr_operator?.nama }}</div>
              </div>
            </div>
          </div>

          <q-separator spaced style="border-top: 1px solid #000" />

        </q-card-section>
      </q-card>

      <div class="text-weight-bold">* Allergies (A)</div>
      <div class="row items-center">
        <div class="col-3">
          > Riwayat alergi makanan
        </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.alergi.makanan.status" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.anamnesis.alergi.makanan.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">
          > Riwayat alergi Obat-obatan
        </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.alergi.obat.status" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.anamnesis.alergi.obat.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Riwayat Lainnya </div>
        <div class="col-9">
          <q-input v-model="store.anamnesis.alergi.lainnya.keterangan" label="Keterangan" dense type="text" autogrow />
        </div>
      </div>
      <div class="text-weight-bold q-mt-md">* Medication (M)</div>
      <div class="row items-center">
        <div class="col-3">> Obat anti hipertensi </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.medication.antihipertensi.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.medication.antihipertensi.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Obat antidiabetik </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.medication.antidiabetik.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.medication.antidiabetik.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Obat diuretik </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.medication.diuretik.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.medication.diuretik.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Obat antikoagulan </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.medication.antikoagulan.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.medication.antikoagulan.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Obat digitalis </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.medication.digitalis.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.medication.digitalis.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Obat Lainnya : </div>
        <div class="col-9">
          <q-input v-model="store.anamnesis.medication.lainnya.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>
      <div class="text-weight-bold q-mt-md">* Past Illness (P)</div>
      <div class="text-weight-bold"># Riwayat penyulit sebelumnya (pasien)</div>
      <div class="row items-center">
        <div class="col-3">> DM </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.dm.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.dm.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3">> Penyakit Jantung </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.jantung.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.jantung.status" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-3">> Penyakit Ginjal </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.ginjal.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.ginjal.status" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-3">> Penyakit Hipertensi </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.hipertensi.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.hipertensi.status" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-3">> Penyakit Paru-paru</div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.paru.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.paru.status" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-3">
          > Penyakit Lainnya :
        </div>
        <div class="col-9">
          <q-input v-model="store.anamnesis.past_illness.penyakit_lain.keterangan" dense type="text" autogrow />
        </div>

      </div>
      <div class="row q-mt-sm items-center">
        <div class="col-3"># Riwayat Penyakit Keluarga</div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.riwayat_keluarga" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.riwayat_keluarga" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3"># Riwayat Operasi </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.riwayat_operasi" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.riwayat_operasi" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-3"># Riwayat Anestesi </div>
        <div class="col-9"> :
          <q-radio v-model="store.anamnesis.past_illness.riwayat_anestesi" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.past_illness.riwayat_anestesi" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="text-weight-bold q-mt-md">* Last Meal (L)</div>

      <!-- NEONATUS -->
      <div class="q-mt-sm">
        ~ Neonatus
        <div class="row items-center">
          <div class="col-12 q-ml-xl">
            <div class="row items-center">
              <div class="col-2 q-pr-sm">
                Makanan padat
              </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-2 q-pr-sm">Clear Liquid </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.cair_jernih" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center">
              <div class="col-2 q-pr-sm">Susu Formula </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.susu_formula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-2 q-pr-sm">ASI </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.asi" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
        </div>
      </div>

      <!-- < 6 BULAN -->
      <div class="q-mt-md">
        ~ &lt; 6 Bulan
        <div class="row items-center">
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Makanan padat </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-2 q-pr-sm">Clear Liquid </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.cair_jernih" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Susu Formula </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.susu_formula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-2 q-pr-sm">ASI </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.asi" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6 - 36 BULAN -->
      <div class="q-mt-md">
        ~ 6 – 36 Bulan
        <div class="row items-center">
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Makanan padat </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-2 q-pr-sm">Clear Liquid </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.cair_jernih" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Susu Formula </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.susu_formula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-2 q-pr-sm">ASI </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.asi" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
        </div>
      </div>

      <!-- > 36 BULAN -->
      <div class="q-mt-md">
        ~ &gt; 36 Bulan
        <div class="row items-center">
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Makanan padat </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-2 q-pr-sm">Clear Liquid </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.cair_jernih" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Susu Formula </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.susu_formula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-2 q-pr-sm">ASI </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.asi" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
        </div>
      </div>

      <!-- DEWASA -->
      <div class="q-mt-md">
        ~ Dewasa
        <div class="row items-center">
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-2 q-pr-sm">Makanan padat </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-2 q-pr-sm">Clear Liquid </div>
              <div class="col-shrink">:</div>
              <div class="col-1">
                <q-input v-model="store.anamnesis.last_meal.cair_jernih" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-weight-bold q-mt-md">* Environment (E)</div>

      <div class="row q-mt-sm q-pl-md">
        <div class="col-4">
          Kebiasaan merokok :
          <q-radio v-model="store.anamnesis.environment.merokok.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.environment.merokok.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-4">
          Mengkonsumsi alkohol :
          <q-radio v-model="store.anamnesis.environment.alkohol.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.anamnesis.environment.alkohol.status" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="text-weight-bold">Pemeriksaan Fisik</div>
      <div class="q-pl-sm">~ Glasgow coma scale (GCS)</div>
      <div class="row q-col-gutter-sm q-pl-md">
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.gcs.e" label="E" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.gcs.m" label="M" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.gcs.v" label="V" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.gcs.t" label="T" dense /></div>
      </div>

      <div class="q-pl-sm q-mt-md">~ Kesadaran</div>
      <div class="row q-col-gutter-sm q-pl-sm">
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Composmentis"
            label="Composmentis" color="cyan" />
        </div>
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Apatis" label="Apatis"
            color="cyan" />
        </div>
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Delirium"
            label="Delirium" color="cyan" />
        </div>
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Somnolen"
            label="Somnolen" color="cyan" />
        </div>
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Stupor" label="Stupor"
            color="cyan" />
        </div>
        <div class="col-2"><q-radio v-model="store.pemeriksaan_fisik_umum.kesadaran" dense val="Koma" label="Koma"
            color="cyan" />
        </div>
      </div>

      <div class="text-weight-bold q-mt-md">* Tanda - tanda vital</div>
      <div class="row q-col-gutter-sm q-pl-md">
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.td" label="Tekanan darah (mmHg)"
            dense />
        </div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.nadi" label="Nadi / menit" dense />
        </div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.suhu" label="Suhu (°C)" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.map" label="MAP / mmHg" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.rr" label="RR / menit" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.bb" label="BB / kg" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.tb" label="TB / cm" dense /></div>
        <div class="col-3"><q-input v-model="store.pemeriksaan_fisik_umum.vital.nyeri"
            label="Skala Nyeri / (NRS/Wong Baker/VRS)" dense /></div>
        <div class="col-6"><q-input v-model="store.pemeriksaan_fisik_umum.vital.imt"
            label="IMT / (hasil perhitungan rumus IMT = Berat (kg) / (Tinggi (m) x Tinggi (m)))" dense /></div>
      </div>
      <div class="text-weight-bold q-mt-md">* Pemeriksaan 6B</div>
      <div class="text-weight-bold q-ml-md">B1 (Breathing)</div>
      <div class="q-ml-md">Penilaian sulit intubasi (LEMON)</div>
      <div class="q-ml-xl">i. Look externally (Wajah):
        <q-option-group v-model="store.pemeriksaan_jalan_napas.lemon.look_externally" :options="optlookexternaly"
          color="cyan" type="checkbox" inline />
      </div>
      <div class="q-ml-xl">ii. Evaluate Thyomental distance:</div>
      <div class="q-ml-xl q-pl-md">
        <div class="row items-center">
          <div class="col-3">
            Kemampuan membuka mulut ≥3 jari
          </div>
          <div class="col-7">
            : <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.mulut" val="Ya" label="Ya"
              color="cyan" /><q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.mulut" val="Tidak"
              label="Tidak" color="cyan" />
          </div>
        </div>
      </div>
      <div class="q-ml-xl q-pl-md">
        <div class="row items-center">
          <div class="col-3">
            Jarak Thyro – Mental ≥3 jari
          </div>
          <div class="col-7">
            : <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.thyro" val="Ya" label="Ya"
              color="cyan" />
            <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.thyro" val="Tidak" label="Tidak"
              color="cyan" />
          </div>
        </div>
      </div>
      <div class="q-ml-xl q-pl-md">
        <div class="row items-center">
          <div class="col-3">
            Jarak Hyoid – Tiroid ≥2 jari
          </div>
          <div class="col-7">
            : <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.hyoid" val="Ya" label="Ya"
              color="cyan" />
            <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.evaluate_332.hyoid" val="Tidak" label="Tidak"
              color="cyan" />
          </div>
        </div>
      </div>

      <div class="q-ml-xl">
        <div class="row items-center  ">
          <div class="col-3">iii. Mallampati Score:</div>
          <div class="col-9"><q-option-group v-model="store.pemeriksaan_jalan_napas.lemon.mallampati"
              :options="optMallapati" color="cyan" inline /></div>
        </div>

      </div>
      <div class="q-ml-xl">iv. Obstruction or obesity (Obstruksi Jalan Napas):
        <q-radio v-model="store.pemeriksaan_jalan_napas.obstruction" val="Ya" label="Ya" color="cyan" /><q-radio
          v-model="store.pemeriksaan_jalan_napas.obstruction" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl">v. Neck mobility:</div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Bentuk Leher</div>
        <div class="col-5">: <q-radio v-model="store.pemeriksaan_jalan_napas.bentuk_leher" val="Simetris"
            label="Simetris" color="cyan" /><q-radio v-model="store.pemeriksaan_jalan_napas.bentuk_leher"
            val="Asimetris" label="Asimetris" color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Leher pendek</div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.leher_pendek" val="Ya"
            label="Ya" color="cyan" /><q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.leher_pendek"
            val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Dapatkah pasien menggerakkan rahang ke depan (dagu menyentuh dada)?</div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.gerakan_rahang"
            val="Ya" label="Ya" color="cyan" /><q-radio
            v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.gerakan_rahang" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Dapatkah pasien melakukan ekstensi leher dan kepala?</div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.extensi_leher_kepala"
            val="Ya" label="Ya" color="cyan" /><q-radio
            v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.extensi_leher_kepala" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Dapatkah pasien melakukan rotasi leher dan kepala?</div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.rotasi_leher_kepala"
            val="Ya" label="Ya" color="cyan" /><q-radio
            v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.rotasi_leher_kepala" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Terdapat bekas luka/sikatrik di leher</div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.bekas_luka" val="Ya"
            label="Ya" color="cyan" /><q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.bekas_luka"
            val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-7">Apakah pasien menggunakan neck collar? </div>
        <div class="col-4">: <q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.neck_colar" val="Ya"
            label="Ya" color="cyan" /><q-radio v-model="store.pemeriksaan_jalan_napas.lemon.neck_mobility.neck_colar"
            val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-md">Penilaian sulit ventilasi (MOANS)</div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          i.Mask Seal (kumis/janggut lebat, kelainan wajah, deformitas, trauma)
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.mask_seal.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.mask_seal.status" val="Tidak" label="Tidak" color="cyan"
            :update:model-value="moans(1)" />
          <q-input v-if="store.pemeriksaan_jalan_napas.moans.mask_seal.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.moans.mask_seal.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          ii. Obesity (BMI > 26, leher pendek, lingkar leher besar)
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.obesity.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.obesity.status" val="Tidak" label="Tidak" color="cyan"
            :update:model-value="moans(2)" />
          <q-input v-if="store.pemeriksaan_jalan_napas.moans.obesity.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.moans.obesity.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          iii. Age >55
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.age.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.age.status" val="Tidak" label="Tidak" color="cyan"
            :update:model-value="moans(3)" />
          <q-input v-if="store.pemeriksaan_jalan_napas.moans.age.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.moans.age.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          iv. No teeth
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.no_teeth.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.no_teeth.status" val="Tidak" label="Tidak" color="cyan"
            :update:model-value="moans(4)" />
          <q-input v-if="store.pemeriksaan_jalan_napas.moans.no_teeth.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.moans.no_teeth.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          v. Stiff/snoring (riwayat mendengkur, OSA)
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.stiff_lungs.status" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.moans.stiff_lungs.status" val="Tidak" label="Tidak"
            color="cyan" :update:model-value="moans(5)" />
          <q-input v-if="store.pemeriksaan_jalan_napas.moans.stiff_lungs.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.moans.stiff_lungs.keterangan" label="Keterangan" dense type="text"
            autogrow />
        </div>
      </div>

      <div class="q-ml-md">Penilaian sulit pemasangan LMA (RODS)</div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-6">
          i. Restricted Mouth Opening: Jarak gigi seri atas dan bawah dengan lebar 3 jari
        </div>
        <div class="col-6">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.restricted_mouth" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.restricted_mouth" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md row items-center">
        <div class="col-4">
          ii. Obstruction/obesity
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Massa pada Palatume :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.palatume" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.palatume" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Massa pada Uvula :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.uvula" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.uvula" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Massa pada Faring :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.faring" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.faring" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Massa pada Laring :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.laring" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.laring" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Massa Epigolotis :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.epigolotis" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.epigolotis" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-2">
          Obesitas :
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.obesitas.status" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.obstruction.obesitas.status" val="Tidak" label="Tidak"
            color="cyan"
            :update:model-value="store.pemeriksaan_jalan_napas.rods.obstruction.obesitas.keterangan = ''" />
          <q-input v-if="store.pemeriksaan_jalan_napas.rods.obstruction.obesitas.status === 'Ya'"
            v-model="store.pemeriksaan_jalan_napas.rods.obstruction.obesitas.keterangan" label="Keterangan" dense
            type="text" autogrow />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md">iii. Disrupted or Distorted</div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-3">
          Kelainan tulang belakang leher :
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.disrupted_airway.kelainan" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.disrupted_airway.kelainan" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-3">
          Cedera pada leher :
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.disrupted_airway.cedera" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.disrupted_airway.cedera" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-md">iv. Stiff Lung or Cervical Spine</div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-4">
          Pengembangan dada kiri kanan simetris :
        </div>
        <div class="col-8">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.stiff_cervical.kanan_kiri" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.stiff_cervical.kanan_kiri" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-xl q-pl-xl row items-center">
        <div class="col-4">
          Pengembangan dada depan belakang simetris :
        </div>
        <div class="col-8">
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.stiff_cervical.depan_belakang" val="Ya" label="Ya"
            color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.rods.stiff_cervical.depan_belakang" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-md">Bentuk thorax:</div>
      <div class="q-ml-xl q-pl-md row items-center  ">
        <div class="col-3">
          Pola napas:
        </div>
        <div class="col-9">
          <q-option-group v-model="store.pemeriksaan_jalan_napas.fisik.pola_napas" :options="optpolanafas" color="cyan"
            type="checkbox" inline />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-3">
          Penggunaan otot bantu napas:
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.otot_bantu_napas" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.otot_bantu_napas" val="Tidak" label="Tidak"
            color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-3">
          Pernapasan cuping hidung:
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.cuping_hidung" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.cuping_hidung" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-3">Perkusi paru:</div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.perkusi_paru" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_jalan_napas.fisik.perkusi_paru" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md q-mb-md row items-center">
        <div class="col-3">
          Suara napas:
        </div>
        <div class="col-9">
          <q-option-group v-model="store.pemeriksaan_jalan_napas.fisik.suara_napas" :options="optsuaranapas"
            color="cyan" type="checkbox" inline />
        </div>
      </div>

      <div class="text-weight-bold q-ml-md ">B2 (Blood)</div>
      <div class="q-ml-md row items-center">
        <div class="col-2">
          Nyeri dada:
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.nyeri_dada" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.nyeri_dada" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-2">
          Konjungtiva:
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.konjungtiva" val="Anemis" label="Anemis" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.konjungtiva" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-2">
          Kulit Pucat:
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.kulit_pucat" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.kulit_pucat" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-2">
          CRT:
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.crt" val="< 2 detik" label="< 2 detik" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.crt" val="> 2 detik" label="> 2 detik" color="cyan" />
        </div>
      </div>
      <div class="q-ml-md row items-center">
        <div class="col-2">
          Pembesaran vena jugularis:
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.jvp" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.jvp" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-2 q-ml-md">Ictus cordis:
        </div>
        <div class="col-shrink q-mr-md">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.ictus_cordis" val="+" label="+" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.ictus_cordis" val="-" label="-" color="cyan" />
        </div>
        <div class="col-1 q-pr-sm">
          Pelebaran :
        </div>
        <div class="col-6 q-pl-sm">
          <q-input v-model="store.pemeriksaan_fisik_umum.b2.pelebaran" type="text" dense autogrow />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-2">Perdarahan:
        </div>
        <div class="col-shrink q-mr-md">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.perdarahan.status" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.perdarahan.status" val="Tidak" label="Tidak" color="cyan"
            @click="moans(6)" />
        </div>
        <div v-if="store.pemeriksaan_fisik_umum.b2.perdarahan.status === 'Ada'" class="col-auto q-pr-sm">
          Lokasi perdarahan :
        </div>
        <div class="col-6 q-pl-sm">
          <q-input v-model="store.pemeriksaan_fisik_umum.b2.perdarahan.lokasi" type="text" dense autogrow
            v-if="store.pemeriksaan_fisik_umum.b2.perdarahan.status === 'Ada'" />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-1 ">Akral : </div>
        <div class="col-11 ">
          <q-input v-model="store.pemeriksaan_fisik_umum.b2.akral" type="text" dense autogrow />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-3">Pulsasi pada dinding torak teraba:
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.pulsasi" val="Lemah" label="Lemah" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.pulsasi" val="Kuat" label="Kuat" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.pulsasi" val="Tidak teraba" label="Tidak teraba"
            color="cyan" />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-3 ">BJ I:
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bji" val="tunggal" label="tunggal" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bji" val="ganda" label="ganda" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bji" val="regular" label="regular" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bji" val="irreguler" label="irreguler" color="cyan" />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-3">BJ II:
        </div>
        <div class="col-9">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjii" val="tunggal" label="tunggal" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjii" val="ganda" label="ganda" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjii" val="regular" label="regular" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjii" val="irreguler" label="irreguler" color="cyan" />
        </div>
      </div>
      <div class="row items-center q-ml-md">
        <div class="col-3">Bunyi jantung tambahan:</div>
        <div class="col-3">BJ III
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjiii" val="+" label="+" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.bjiii" val="-" label="-" color="cyan" />
        </div>
        <div class="col-3">Gallop Rhythm
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.galloprhythm" val="+" label="+" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.galloprhythm" val="-" label="-" color="cyan" />
        </div>
        <div class="col-3">Murmur
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.murmur" val="+" label="+" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b2.murmur" val="-" label="-" color="cyan" />
        </div>
      </div>
      <div class="text-weight-bold q-ml-md ">B3 (Brain)</div>
      <div class=" q-ml-md"><q-option-group v-model="store.pemeriksaan_fisik_umum.b3.general" :options="optb3"
          color="cyan" type="checkbox" inline /></div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="col-2 text-weight-medium">
          Pupil
        </div>
        <div class="col-10">
          <q-option-group v-model="store.pemeriksaan_fisik_umum.b3.pupil" :options="optpupil" color="cyan"
            type="checkbox" inline />
        </div>
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="col-2 text-weight-medium">
          Reflek
        </div>
        <div class="col-10">
          <q-option-group v-model="store.pemeriksaan_fisik_umum.b3.reflek" :options="optreflek" color="cyan"
            type="checkbox" inline />
        </div>
      </div>
      <div class="text-weight-bold q-ml-md">B4 (Bladder)</div>

      <div class="q-ml-lg row items-center">
        <div class="col-2">
          Nyeri saat BAK
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.nyeriBAK" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.nyeriBAK" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-lg row items-center">
        <div class="col-2">
          Urine disertai darah
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.hematuria" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.hematuria" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-lg row items-center">
        <div class="col-2">
          Kateter
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.kateter" val="Ada" label="Ada" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.kateter" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-lg row items-center">
        <div class="col-2">
          Nyeri tekan pada Ginjal
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.nyeriGinjal" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.nyeriGinjal" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-lg row items-center">
        <div class="col-2">
          Pembesaran pada Ginjal
        </div>
        <div class="col-10">
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.pembesaranGinjal" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.pemeriksaan_fisik_umum.b4.pembesaranGinjal" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium col-shrink">
          Jumlah urine:
        </div>
        <q-input v-model="store.pemeriksaan_fisik_umum.b4.jumlahUrine" class="col-3" type="text" dense autogrow /> cc
      </div>


      <div class="text-weight-bold q-ml-md ">B5 (Bowel)</div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="col-shrink text-weight-medium">
          Bising usus :
        </div>

        <q-input v-model="store.pemeriksaan_fisik_umum.b5.bising_usus" class="col-3" type="text" dense
          autogrow />x/menit
      </div>
      <div class="q-ml-lg row items-center ">
        <div class="col-2">
          Mual:
        </div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Muntah:</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Nyeri menelan:</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Nyeri Perut:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b5.jumlahurine" type="text" dense autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Borborygmi :</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Distensi :</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Asites :</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="shifting dullness"
          label="shifting dullness" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="undulasi" label="undulasi"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Terpasang NGT :</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Ada" label="Ada" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b5.pembesaranpadaginjal" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="text-weight-bold q-ml-md ">B6 (Bone)</div>
      <div class="col-12">(1) Pemeriksaan tulang belakang</div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Kelainan tulang belakang:</div>

        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="Kyposis" label="Kyposis" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="Scoliosis" label="Scoliosis"
          color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="Lordosis" label="Lordosis"
          color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="Perlukaan" label="Perlukaan"
          color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="infeksi" label="infeksi" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.tulang_belakang" val="Fibrosis" label="Fibrosis"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-2">Mobilitas :</div>
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.mobilitas" val="leluasa" label="leluasa" color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.mobilitas" val="terbatas" label="terbatas" color="cyan" />
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          Lainnya :
        </div>
        <q-input v-model="store.pemeriksaan_fisik_umum.b6.lainnya" class="col-3" type="text" dense autogrow />
      </div>
      <div class="col-12 q-mt-sm">(2) Pemeriksaan Ekstremitas</div>
      <div class="q-mt-md">* Ekstermitas atas</div>
      <div class="q-ml-lg row items-center">Otot antar sisi kanan dan kiri :
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.otot" val="simetris" label="simetris"
          color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.otot" val="asimetris" label="asimetris"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1"> Jejas:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.jejas.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.jejas.keterangan" type="text" dense
          autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.jejas.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1"> Deformitas:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.deformitas.status" val="Ya"
          label="Ya" color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.deformitas.keterangan" type="text"
          dense autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.deformitas.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1">Fraktur:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.fraktur.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.fraktur.keterangan" type="text" dense
          autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.fraktur.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1">Atropi otot:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.atropi.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.atropi.keterangan" type="text" dense
          autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.atropi.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="q-mr-sm">
          IV line: terpasang di
        </div>
        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.iv_line" type="text" dense autogrow />
        , ukuran abocatch
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          ROM
        </div>
        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.rom" class="col-3" type="text" dense autogrow />
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          Lainnya:
        </div>
        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_atas.lainnya" class="col-3" type="text" dense
          autogrow />

      </div>
      <div class="q-mt-md">* Ekstermitas bawah</div>
      <div class="q-ml-lg">Otot antar sisi kanan dan kiri :
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.otot" val="simetris" label="simetris"
          color="cyan" />
        <q-radio v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.otot" val="asimetris" label="asimetris"
          color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1"> Jejas:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.jejas.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.jejas.keterangan" type="text" dense
          autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.jejas.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1"> Deformitas:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.deformitas.status" val="Ya"
          label="Ya" color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.deformitas.keterangan" type="text"
          dense autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.deformitas.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1">Fraktur:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.fraktur.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.fraktur.keterangan" type="text"
          dense autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.fraktur.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="col-1">Atropi otot:</div>
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.atropi.status" val="Ya" label="Ya"
          color="cyan" />
        <q-input class="col-3" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.atropi.keterangan" type="text" dense
          autogrow />
        <q-radio class="col-1" v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.atropi.status" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-lg row items-center">
        <div class="q-mr-sm">
          IV line: terpasang di
        </div>

        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.iv_line" type="text" dense autogrow />
        , ukuran abocatch
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          ROM
        </div>

        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.rom" class="col-3" type="text" dense autogrow />
      </div>
      <div class="q-ml-md row items-center no-wrap">
        <div class="q-mr-sm text-weight-medium">
          Lainnya:
        </div>

        <q-input v-model="store.pemeriksaan_fisik_umum.b6.exter_bawah.lainnya" class="col-3" type="text" dense
          autogrow />
      </div>
      <div class="q-mt-md text-right q-gutter-sm print-hide">
        <q-btn label="Simpan" color="red" @click="store.simpanData(pasien)" :loading="store.loadingSave"
          :disable="store.loadingSave" />
        <q-btn label="Cetak" color="red" v-print="printObj" />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { usePengkajianAnastesiStore } from 'src/stores/master/pelayanan/pengkajiananastesi'
import { watch } from 'vue'

const optMallapati = [
  { label: 'I', value: 'I' },
  { label: 'II', value: 'II' },
  { label: 'III', value: 'III' },
  { label: 'IV', value: 'IV' },
]
const optlookexternaly = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Edema', value: 'Edema' },
  { label: 'Luka pada wajah', value: 'Luka pada wajah' },
  { label: 'Kumis/jenggot', value: 'Kumis/jenggot' },
  { label: 'mikrognathia', value: 'mikrognathia' },
  { label: 'Gigi Palsu', value: 'Gigi Palsu' },
  { label: 'Gigi Goyang', value: 'Gigi Goyang' },
  { label: 'Gigi Maju', value: 'Gigi Maju' }
]
const optpolanafas = [
  { label: 'Eupnea', value: 'Eupnea' },
  { label: 'Bradypnea', value: 'Bradypnea' },
  { label: 'Tchypnea', value: 'Tchypnea' },
  { label: 'Apneat', value: 'Apnea' },
  { label: 'Hyperapnea', value: 'Hyperapnea' },
  { label: 'Cheyne-Stokes', value: 'Cheyne-Stokes' },
  { label: 'Boit`s', value: 'Boit`s' },
  { label: 'Kussmaul`s', value: 'Kussmaul`s' },
  { label: 'Apneustic', value: 'Apneustic' }
]
const optsuaranapas = [
  { label: 'Trakeal', value: 'Trakeal' },
  { label: 'bronchial', value: 'bronchial' },
  { label: 'bronkovesikular', value: 'bronkovesikular' },
  { label: 'vesikuler', value: 'vesikuler' },
  { label: 'ronchi', value: 'ronchi' },
  { label: 'wheezing', value: 'wheezing' },
  { label: 'stridor', value: 'stridor' },

]
const optb3 = [
  { label: 'gelisah', value: 'gelisah' },
  { label: 'kaku kuduk', value: 'kaku kuduk' },
  { label: 'kejang', value: 'kejang' },
  { label: 'tremor', value: 'tremor' },
  { label: 'nyeri kepala', value: 'nyeri kepala' },
]

const optpupil = [
  { label: 'isokor', value: 'isokor' },
  { label: 'unisokor', value: 'unisokor' },
  { label: 'midriasis', value: 'midriasis' },
  { label: 'miosis', value: 'miosis' },
  { label: 'tidak ada reaksi', value: 'tidak ada reaksi' },
]

const optreflek = [
  { label: 'normal', value: 'normal' },
  { label: 'abnormal', value: 'abnormal' },
  { label: 'parese', value: 'parese' },
  { label: 'plegi', value: 'plegi' },
]

const store = usePengkajianAnastesiStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function moans (val) {
  if (val === 1) {
    store.pemeriksaan_jalan_napas.moans.mask_seal.keterangan = ''
  } else if (val === 2) {
    store.pemeriksaan_jalan_napas.moans.obesity.keterangan = ''
  } else if (val === 3) {
    store.pemeriksaan_jalan_napas.moans.age.keterangan = ''
  } else if (val === 4) {
    store.pemeriksaan_jalan_napas.moans.no_teeth.keterangan = ''
  } else if (val === 5) {
    store.pemeriksaan_jalan_napas.moans.stiff_lungs.keterangan = ''
  } else if (val === 6) {
    store.pemeriksaan_fisik_umum.b2.perdarahan.lokasi = '' // lokasi pendarahan
  }
}
watch(() => props.pasien.pengkajian_pre_anastesi, val => {
  if (val?.anamnesis) store.anamnesis = val?.anamnesis
  if (val?.pemeriksaan_fisik_umum) store.pemeriksaan_fisik_umum = val?.pemeriksaan_fisik_umum
  if (val?.pemeriksaan_jalan_napas) store.pemeriksaan_jalan_napas = val?.pemeriksaan_jalan_napas
}, { immediate: true })
const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
