import { acceptHMRUpdate, defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const usePengkajianAnastesiStore = defineStore('pengkajian-anastesi-store', {
  state: () => ({
    loadingcari: false,
    loadingSave: false,
    dialogPelayanan: false,
    pasien: {},
    items: [],
    meta: {},
    anamnesis: {
      alergi: {
        makanan: { status: "",keterangan:'' },
        obat: { status: "",keterangan:'' },
        lainnya: { status: "" }
      },
      medication: {
        antihipertensi: { status: "",keterangan:'' },
        antidiabetik: { status: "",keterangan:'' },
        diuretik: { status: "",keterangan:'' },
        antikoagulan: { status: "",keterangan:'' },
        digitalis: { status: "",keterangan:'' },
        lainnya: { keterangan: "" }
      },
      past_illness: {
        dm: { status: "" },
        jantung: { status: "" },
        ginjal: { status: "" },
        hipertensi: { status: "" },
        paru: { status: "" },
        penyakit_lain: { keterangan: "" },
        riwayat_keluarga: { status: "",keterangan: '' },
        riwayat_operasi: { status: "",keterangan: '' },
        riwayat_anestesi: { status: "",keterangan: '' }
      },
      last_meal: {
        neonatus: { padat: "", cair_jernih: "", susu_formula: "", asi: "" },
        bayi_kurang_6_bulan: { padat: "", cair_jernih: "", susu_formula: "", asi: "" },
        balita: { padat: "", cair_jernih: "", susu_formula: "", asi: "" },
        anak: { padat: "", cair_jernih: "", susu_formula: "", asi: "" },
        dewasa: { padat: "", cair_jernih: "" }
      },
      environment: {
        merokok: { status: "" },
        alkohol: { status: "" }
      }
    },
    pemeriksaan_fisik_umum:{
      gcs: {
        e: "",
        m: "",
        v: "",
        t: ""
      },
      kesadaran:'',
      vital: {
        td: "",
        nadi: "",
        rr: "",
        suhu: "",
        map: "",
        nyeri: "",
        bb: "",
        tb: "",
        imt: ""
      },
      b2: {
        nyeri_dada: '',
        konjungtiva: '',
        kulit_pucat: '',
        crt: '',
        jvp: '',
        ictus_cordis: '',
        pelebaran: '',
        perdarahan: {status:'',lokasi:''},
        akral: '',
        pulsasi: '',
        bji: '',
        bjii: '',
        bjiii: '',
        galloprhythm: '',
        murmur: '',
      },
      b3:{
        general:[],
        pupil:[],
        reflek:[],
      },
      b4:{
        nyeriBAK: '',
        hematuria: '',
        kateter: '',
        nyeriGinjal: '',
        pembesaranGinjal: '',
        jumlahUrine: '',
      },
      b5:{
        bising_usus: '',
        mual: '',
        muntah:'',
        nyeris_telan: '',
        nyeri_perut:{status:'',keterangan:''},
        borborygmi:'',
        distensi:'',
        asites:'',
        ngt:'',
      },
      b6:{
        tulang_belakang:'',
        mobilitas:'',
        lainnya:'',
        exter_atas:{
          otot: '',
          jejas:{status:'',keterangan:''},
          deformitas:{status:'',keterangan:''},
          fraktur:{status:'',keterangan:''},
          atropi:{status:'',keterangan:''},
          iv_line:'',
          abocatch:'',
          rom:'',
          lainnya: ''
        },
        exter_bawah:{
          otot: '',
          jejas:{status:'',keterangan:''},
          deformitas:{status:'',keterangan:''},
          fraktur:{status:'',keterangan:''},
          atropi:{status:'',keterangan:''},
          iv_line:'',
          abocatch:'',
          rom:'',
          lainnya: ''
        },
      },
    },
    pemeriksaan_jalan_napas:{
      lemon: {
        look_externally: [],
        evaluate_332: {
          mulut:'',
          thyro:'',
          hyoid:''
        },
        mallampati: '',
        obstruction: '',
        neck_mobility: {
          bentuk_leher:'',
          leher_pendek:'',
          gerakan_rahang:'',
          extensi_leher_kepala:'',
          rotasi_leher_kepala:'',
          bekas_luka:'',
          neck_colar:'',
        }
      },
      moans: {
        mask_seal: { status: "", keterangan: "" },
        obesity: { status: "", keterangan: "" },
        age: { status: "", keterangan: "" },
        no_teeth: { status: "" , keterangan: ""},
        stiff_lungs: { status: "", keterangan: "" }
      },
      rods: {
        restricted_mouth: { status: "" },
        obstruction: {
          palatume :'',
          uvula :'',
          faring :'',
          laring :'',
          epigolotis :'',
          obesitas :{status: "", keterangan: ""},

         },
        disrupted_airway: {
          kelainan:'',
          cedera:'',
         },
        stiff_cervical: {
          kanan_kiri:'',
          depan_belakang:'',
         }
      },
      fisik:{
        pola_napas:[],
        otot_bantu_napas:'',
        cuping_hidung:'',
        perkusi_paru:'',
        suara_napas:[],
      }
    },

    falergi: {
      makanan: null,
      obat: null,
      lainnya: ''
    },
    falergiobat: {
      hipertensi: null,
      antidiabetik: null,
      diuretik: null,
      antikoagulan: null,
      digitalis: null,
      lainnya: ''
    },
    fpenyakit: {
      dm: null,
      jantung: null,
      ginjal: null,
      hipertensi: null,
      paru: null,
      lainnya: ''
    },
    friwayat: {
      keluarga: null,
      operasi: null,
      anestesi: null,
    },
    fenvironment: {
      merokok: null,
      alkohol: null,
    },
    fpemeriksaanfisik: {
      e: null,
      m: null,
      v: null,
      t: null,
      kesadaran: null,
      tekanandarah: null,
      nadi: null,
      suhu: null,
      map: null,
      rr: null,
      skalanyeri: null,
      bb: null,
      tb: null,
      imt: null,
    },
    flastmeal: {
      neonatuspadat: null,
      neonatusclear: null,
      neonatusformula: null,
      neonatusasi: null,
      bayi6padat: null,
      bayi6clear: null,
      bayi6formula: null,
      bayi6asi: null,
      balitapadat: null,
      balitaclear: null,
      balitaformula: null,
      balitaasi: null,
      anakpadat: null,
      anakclear: null,
      anakformula: null,
    },

    f6b: {
      b3:[],
      pupil:[],
      reflek:[],
      lookexternaly: [],
      jaraktyhro: null,
      kemampuanmembukamulut: null,
      hyoid: null,
      mallampati: null,
      obstruksijalan: null,
      bentukleher: null,
      leherpendek: null,
      menggerakkanrahan: null,
      ekstensileherdankepala: null,
      rotasileherdankepala: null,
      bekasluka: null,
      neckcollar: null,
      maskseal: null,
      keteranganmaskseal: null,
      obesity: null,
      keteranganobesity: null,
      age: null,
      keteranganage: null,
      notooth: null,
      keteranganotooth: null,
      stiffsnoring: null,
      keteranganstiffsnoring: null,
      restrictedmouthopening: null,
      massapadapalatume: null,
      massapadauvula: null,
      massapadafaring: null,
      massapadalaring: null,
      massaepiglotesis: null,
      obesitas: null,
      keteranganobesitas: null,
      kelainantulangbelakangleher: null,
      cederapadaleher: null,
      pengembangandadakirikanansimetris: null,
      pengembangandadadepanbelakangsimetris: null,
      polanafas: [],
      penggunaanototbantunafas: null,
      pernapasancupinghidung: null,
      perkusiparu: null,
      suaranapas: [],
    },


    formcari: {
      pekerjaan: ''
    }
  }),
  actions: {

    async simpanData(pasien) {
      this.loadingSave = true
      const form={
        noreg:pasien.noreg,
        anamnesis:this.anamnesis,
        pemeriksaan_fisik_umum:this.pemeriksaan_fisik_umum,
        pemeriksaan_jalan_napas:this.pemeriksaan_jalan_napas,
      }
      try {
        const resp = await api.post('v1/transaksi/pengkajian-pre-anastesi/simpan', form)

        if (resp.success === true) {
          this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message)
          this.loadingSave = false
          // this.initForm()

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
      finally{
        this.loadingSave=false
      }
    },
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengkajianAnastesiStore, import.meta.hot))

}
