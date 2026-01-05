<template>
  <q-page class="q-pa-md bg-grey-6">
    <div id="printMe" class="q-pa-md full-width full-height bg-white">
      <div class="text-weight-bold text-h6 text-center q-pb-md">Pengkajian Anestesi</div>
      <q-separator spaced style="border-top: 1px solid #000" />
      <div class="text-weight-bold q-pt-md">Pengkajian AMPLE</div>
      <div class="text-weight-bold">* Allergies (A)</div>
      <div class="row">
        <div class="col-12">> Riwayat alergi makanan :
          <q-radio v-model="store.falergi.makanan" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergi.makanan" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">> Riwayat alergi Obat-obatan :
          <q-radio v-model="store.falergi.obat" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergi.obat" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-2">> Riwayat Lainnya : </div>
        <div class="col-9">
          <q-input v-model="store.falergi.lainnya" label="Keterangan" dense type="text" autogrow />
        </div>
      </div>
      <div class="text-weight-bold q-mt-md">* Medication (M)</div>
      <div class="row ">
        <div class="col-12">> Obat anti hipertensi :
          <q-radio v-model="store.falergiobat.hipertensi" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergiobat.hipertensi" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">> Obat antidiabetik :
          <q-radio v-model="store.falergiobat.antidiabetik" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergiobat.antidiabetik" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">> Obat diuretik :
          <q-radio v-model="store.falergiobat.diuretik" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergiobat.diuretik" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">> Obat antikoagulan :
          <q-radio v-model="store.falergiobat.antikoagulan" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergiobat.antikoagulan" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">> Obat digitalis :
          <q-radio v-model="store.falergiobat.digitalis" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.falergiobat.digitalis" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-2">> Obat Lainnya : </div>
        <div class="col-8">
          <q-input v-model="store.falergiobat.lainnya" label="Keterangan" dense type="text" autogrow />
        </div>
      </div>
      <div class="text-weight-bold q-mt-md">* Past Illness (P)</div>
      <div class="text-weight-bold"># Riwayat penyulit sebelumnya (pasien)</div>
      <div class="row">
        <div class="col-12">
          > DM :
          <q-radio v-model="store.fpenyakit.dm" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fpenyakit.dm" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">
          > Penyakit Jantung :
          <q-radio v-model="store.fpenyakit.jantung" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fpenyakit.jantung" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-12">
          > Penyakit Ginjal :
          <q-radio v-model="store.fpenyakit.ginjal" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fpenyakit.ginjal" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-12">
          > Penyakit Hipertensi :
          <q-radio v-model="store.fpenyakit.hipertensi" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fpenyakit.hipertensi" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-12">
          > Penyakit Paru-paru :
          <q-radio v-model="store.fpenyakit.paru" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fpenyakit.paru" val="Tidak" label="Tidak" color="cyan" />
        </div>

        <div class="col-2">
          > Penyakit Lainnya :
        </div>
        <div class="col-9">
          <q-input v-model="store.fpenyakit.lainnya" dense type="text" autogrow />
        </div>

      </div>
      <div class="row q-mt-sm">
        <div class="col-12">
          # Riwayat Penyakit Keluarga :
          <q-radio v-model="store.friwayat.keluarga" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.friwayat.keluarga" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">
          # Riwayat Operasi :
          <q-radio v-model="store.friwayat.operasi" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.friwayat.operasi" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-12">
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
          <div class="col-12 q-ml-xl">
            <div class="row items-center">
              <div class="col-auto q-pr-sm">
                Makanan padat :
              </div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.neonatuspadat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-auto q-pr-sm">Clear Liquid :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.neonatusclear" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center">
              <div class="col-auto q-pr-sm">Susu Formula :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.neonatusformula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-auto q-pr-sm">ASI :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.neonatusasi" dense type="text" autogrow />
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
              <div class="col-auto q-pr-sm">Makanan padat :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.bayi6padat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-auto q-pr-sm">Clear Liquid :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.bayi6clear" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="co-auto q-pr-sm">Susu Formula :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.bayi6formula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-auto q-pr-sm">ASI :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.bayi6asi" dense type="text" autogrow />
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
              <div class="col-auto q-pr-sm">Makanan padat :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.balitapadat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-auto q-pr-sm">Clear Liquid :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.balitaclear" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-auto q-pr-sm">Susu Formula :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.balitaformula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-auto q-pr-sm">ASI :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.balitaasi" dense type="text" autogrow />
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
              <div class="col-auto q-pr-sm">Makanan padat :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.anakpadat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>

              <div class="col-auto q-pr-sm">Clear Liquid :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.anakclear" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
            </div>
          </div>
          <div class="col-12 q-ml-xl">
            <div class="row items-center q-mt-xs">
              <div class="col-auto q-pr-sm">Susu Formula :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.anakformula" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-auto q-pr-sm">ASI :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.anakasi" dense type="text" autogrow />
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
              <div class="col-auto q-pr-sm">Makanan padat :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.dewasapadat" dense type="text" autogrow />
              </div>
              <div class="col-1">Jam</div>
              <div class="col-auto q-pr-sm">Clear Liquid :</div>
              <div class="col-1">
                <q-input v-model="store.flastmeal.dewasaclear" dense type="text" autogrow />
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
          <q-radio v-model="store.fenvironment.merokok" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fenvironment.merokok" val="Tidak" label="Tidak" color="cyan" />
        </div>
        <div class="col-4">
          Mengkonsumsi alkohol :
          <q-radio v-model="store.fenvironment.alkohol" val="Ya" label="Ya" color="cyan" />
          <q-radio v-model="store.fenvironment.alkohol" val="Tidak" label="Tidak" color="cyan" />
        </div>
      </div>

      <div class="text-weight-bold">Pemeriksaan Fisik</div>
      <div class="q-pl-sm">~ Glasgow coma scale (GCS)</div>
      <div class="row q-col-gutter-sm q-pl-md">
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.e" label="E" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.m" label="M" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.v" label="V" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.t" label="T" dense /></div>
      </div>

      <div class="q-pl-sm q-mt-md">~ Kesadaran</div>
      <div class="row q-col-gutter-sm q-pl-sm">
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Composmentis" label="Composmentis"
            color="cyan" />
        </div>
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Apatis" label="Apatis" color="cyan" />
        </div>
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Delirium" label="Delirium"
            color="cyan" />
        </div>
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Somnolen" label="Somnolen"
            color="cyan" />
        </div>
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Stupor" label="Stupor" color="cyan" />
        </div>
        <div class="3"><q-radio v-model="store.fpemeriksaanfisik.kesadaran" val="Koma" label="Koma" color="cyan" />
        </div>
      </div>

      <div class="text-weight-bold q-mt-md">* Tanda - tanda vital</div>
      <div class="row q-col-gutter-sm q-pl-md">
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.tekanandarah" label="Tekanan darah (mmHg)" dense />
        </div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.nadi" label="Nadi / menit" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.suhu" label="Suhu (°C)" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.map" label="MAP / mmHg" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.rr" label="RR / menit" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.skalanyeri" label="Skala Nyeri / (NRS/Wong Baker/VRS)"
            dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.bb" label="BB / kg" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.tb" label="TB / cm" dense /></div>
        <div class="3"><q-input v-model="store.fpemeriksaanfisik.imt"
            label="IMT / (hasil perhitungan rumus IMT = Berat (kg) / (Tinggi (m) x Tinggi (m)))" dense /></div>
      </div>
      <div class="text-weight-bold q-mt-md">* Pemeriksaan 6B</div>
      <div class="text-weight-bold q-ml-md">B1 (Breathing)</div>
      <div class="q-ml-md">Penilaian sulit intubasi (LEMON)</div>
      <div class="q-ml-xl">i. Look externally (Wajah):
        <q-option-group v-model="store.f6b.lookexternaly" :options="optlookexternaly" color="cyan" type="checkbox"
          inline />
      </div>
      <div class="q-ml-xl">ii. Evaluate Thyomental distance:</div>
      <div class="q-ml-xl q-pl-md">Kemampuan membuka mulut ≥3 jari :<q-radio v-model="store.f6b.kemampuanmembukamulut"
          val="Ya" label="Ya" color="cyan" /><q-radio v-model="store.f6b.kemampuanmembukamulut" val="Tidak"
          label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Jarak Thyro – Mental ≥3 jari :<q-radio v-model="store.f6b.jaraktyhro" val="Ya"
          label="Ya" color="cyan" /><q-radio v-model="store.f6b.jaraktyhro" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Jarak Hyoid – Tiroid ≥2 jari :<q-radio v-model="store.f6b.hyoid" val="Ya" label="Ya"
          color="cyan" /><q-radio v-model="store.f6b.hyoid" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl">iii. Mallampati Score:
        <q-radio v-model="store.f6b.mallampati" val="I" label="I" color="cyan" /><q-radio v-model="store.f6b.mallampati"
          val="II" label="II" color="cyan" />
        <q-radio v-model="store.f6b.mallampati" val="III" label="III" color="cyan" /><q-radio
          v-model="store.f6b.mallampati" val="IV" label="IV" color="cyan" />
      </div>
      <div class="q-ml-xl">iv. Obstruction or obesity (Obstruksi Jalan Napas):
        <q-radio v-model="store.f6b.obstruksijalan" val="Ya" label="Ya" color="cyan" /><q-radio
          v-model="store.f6b.obstruksijalan" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl">v. Neck mobility:</div>
      <div class="q-ml-xl q-pl-md">Bentuk Leher : <q-radio v-model="store.f6b.bentukleher" val="Simetris"
          label="Simetris" color="cyan" /><q-radio v-model="store.f6b.bentukleher" val="Asimetris" label="Asimetris"
          color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Leher pendek : <q-radio v-model="store.f6b.leherpendek" val="Ya" label="Ya"
          color="cyan" /><q-radio v-model="store.f6b.leherpendek" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Dapatkah pasien menggerakkan rahang ke depan (dagu menyentuh dada)? <q-radio
          v-model="store.f6b.menggerakkanrahan" val="Ya" label="Ya" color="cyan" /><q-radio
          v-model="store.f6b.menggerakkanrahan" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Dapatkah pasien melakukan ekstensi leher dan kepala? <q-radio
          v-model="store.f6b.ekstensileherdankepala" val="Ya" label="Ya" color="cyan" /><q-radio
          v-model="store.f6b.ekstensileherdankepala" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Dapatkah pasien melakukan rotasi leher dan kepala? <q-radio
          v-model="store.f6b.rotasileherdankepala" val="Ya" label="Ya" color="cyan" /><q-radio
          v-model="store.f6b.rotasileherdankepala" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Terdapat bekas luka/sikatrik di leher <q-radio v-model="store.f6b.bekasluka" val="Ya"
          label="Ya" color="cyan" /><q-radio v-model="store.f6b.bekasluka" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">Apakah pasien menggunakan neck collar? <q-radio v-model="store.f6b.neckcollar"
          val="Ya" label="Ya" color="cyan" /><q-radio v-model="store.f6b.neckcollar" val="Tidak" label="Tidak"
          color="cyan" />
      </div>
      <div class="q-ml-md">Penilaian sulit ventilasi (MOANS)</div>
      <div class="q-ml-xl q-pl-md">i.Mask Seal (kumis/janggut lebat, kelainan wajah, deformitas, trauma) <q-radio
          v-model="store.f6b.maskseal" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.maskseal" val="Tidak" label="Tidak" color="cyan" :update:model-value="moans(1)" />
        <q-input v-if="store.f6b.maskseal === 'Ya'" v-model="store.f6b.keteranganmaskseal" label="Keterangan" dense
          type="text" autogrow />
      </div>
      <div class="q-ml-xl q-pl-md">ii. Obesity (BMI > 26, leher pendek, lingkar leher besar) <q-radio
          v-model="store.f6b.obesity" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.obesity" val="Tidak" label="Tidak" color="cyan" :update:model-value="moans(2)" />
        <q-input v-if="store.f6b.obesity === 'Ya'" v-model="store.f6b.keteranganobesity" label="Keterangan" dense
          type="text" autogrow />
      </div>
      <div class="q-ml-xl q-pl-md">iii. Age >55 <q-radio v-model="store.f6b.age" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.age" val="Tidak" label="Tidak" color="cyan" :update:model-value="moans(3)" />
        <q-input v-if="store.f6b.age === 'Ya'" v-model="store.f6b.keteranganage" label="Keterangan" dense type="text"
          autogrow />
      </div>
      <div class="q-ml-xl q-pl-md">iv. No teeth <q-radio v-model="store.f6b.notooth" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.notooth" val="Tidak" label="Tidak" color="cyan" :update:model-value="moans(4)" />
        <q-input v-if="store.f6b.notooth === 'Ya'" v-model="store.f6b.keteranganotooth" label="Keterangan" dense
          type="text" autogrow />
      </div>
      <div class="q-ml-xl q-pl-md">v. Stiff/snoring (riwayat mendengkur, OSA) <q-radio v-model="store.f6b.stiffsnoring"
          val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.stiffsnoring" val="Tidak" label="Tidak" color="cyan"
          :update:model-value="moans(5)" />
        <q-input v-if="store.f6b.stiffsnoring === 'Ya'" v-model="store.f6b.keteranganstiffsnoring" label="Keterangan"
          dense type="text" autogrow />
      </div>
      <div class="q-ml-md">Penilaian sulit pemasangan LMA (RODS)</div>
      <div class="q-ml-xl q-pl-md">i. Restricted Mouth Opening: Jarak gigi seri atas dan bawah dengan lebar 3 jari
        <q-radio v-model="store.f6b.restrictedmouthopening" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.restrictedmouthopening" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">ii. Obstruction/obesity</div>
      <div class="q-ml-xl q-pl-xl">Massa pada palatume :
        <q-radio v-model="store.f6b.massapadapalatume" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.massapadapalatume" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Massa pada uvula :
        <q-radio v-model="store.f6b.massapadauvula" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.massapadauvula" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Massa pada faring :
        <q-radio v-model="store.f6b.massapadafaring" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.massapadafaring" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Massa pada laring :
        <q-radio v-model="store.f6b.massapadalaring" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.massapadalaring" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Massa Epigolotis :
        <q-radio v-model="store.f6b.massaepiglotesis" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.massaepiglotesis" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Obesitas :
        <q-radio v-model="store.f6b.obesitas" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.obesitas" val="Tidak" label="Tidak" color="cyan"
          :update:model-value="store.f6b.keteranganobesitas = ''" />
        <q-input v-if="store.f6b.obesitas === 'Ya'" v-model="store.f6b.keteranganobesitas" label="Keterangan" dense
          type="text" autogrow />
      </div>
      <div class="q-ml-xl q-pl-md">iii. Disrupted or Distorted</div>
      <div class="q-ml-xl q-pl-xl">Kelainan tulang belakang leher :
        <q-radio v-model="store.f6b.kelainantulangbelakangleher" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.kelainantulangbelakangleher" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Cedera pada leher :
        <q-radio v-model="store.f6b.cederapadaleher" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.cederapadaleher" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-md">iv. Stiff Lung or Cervical Spine</div>
      <div class="q-ml-xl q-pl-xl">Pengembangan dada kiri kanan simetris :
        <q-radio v-model="store.f6b.pengembangandadakirikanansimetris" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.pengembangandadakirikanansimetris" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-xl q-pl-xl">Pengembangan dada depan belakang simetris :
        <q-radio v-model="store.f6b.pengembangandadadepanbelakangsimetris" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.pengembangandadadepanbelakangsimetris" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-md">Bentuk thorax:</div>
      <div class="q-ml-xl q-pl-md">Pola napas:
        <q-option-group v-model="store.f6b.polanafas" :options="optpolanafas" color="cyan" type="checkbox" inline />
      </div>
      <div class="q-ml-md">Penggunaan otot bantu napa:
        <q-radio v-model="store.f6b.penggunaanototbantunafas" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.penggunaanototbantunafas" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-md">Pernapasan cuping hidung:
        <q-radio v-model="store.f6b.pernapasancupinghidung" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.pernapasancupinghidung" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-md">Perkusi paru:
        <q-radio v-model="store.f6b.perkusiparu" val="Ya" label="Ya" color="cyan" />
        <q-radio v-model="store.f6b.perkusiparu" val="Tidak" label="Tidak" color="cyan" />
      </div>
      <div class="q-ml-md">Suara napas:
        <q-option-group v-model="store.f6b.suaranapas" :options="optsuaranapas" color="cyan" type="checkbox" inline />
      </div>

      <div class="q-mt-md text-right q-gutter-sm print-hide">
        <q-btn label="Simpan" color="red" />
        <q-btn label="Cetak" color="red" v-print="printObj" />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { usePengkajianAnastesiStore } from 'src/stores/master/pelayanan/pengkajiananastesi'

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
const store = usePengkajianAnastesiStore()
defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
function moans(val) {
  if (val === 1) {
    store.f6b.keteranganmaskseal = ''
  } else if (val === 2) {
    store.f6b.keteranganobesity = ''
  } else if (val === 3) {
    store.f6b.keteranganage = ''
  } else if (val === 4) {
    store.f6b.keteranganotooth = ''
  } else if (val === 5) {
    store.f6b.keteranganstiffsnoring = ''
  }
}

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
