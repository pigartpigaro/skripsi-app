import { acceptHMRUpdate, defineStore } from 'pinia'
import { date } from 'quasar'
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

    async simpanData() {
      this.loadingSave = true
      try {
        const resp = await api.post('v1/master/pekerjaan/save', this.form)

        if (resp.success === true) {
          this.items.unshift(resp?.data?.data)
          notifSuccessVue(resp?.data?.message)
          this.loadingSave = false
          this.initForm()

        }
      } catch (error) {
        console.log(error)
        this.loadingSave = false
        notifErrVue(error?.response?.data?.message)
      }
    },
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePengkajianAnastesiStore, import.meta.hot))

}
