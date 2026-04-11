import { defineStore } from "pinia";
// import { date } from 'quasar'
import { api } from "src/boot/axios";
import { notifErrVue, notifSuccessVue } from "src/modules/utils";
import { useListPasienAnastesiStore } from "../master/pelayanan/listpasienanastesi";

export const useAskanPraIntraPascaAnestesiStore = defineStore(
  "askan-praintrapasca-anestesi-store",
  {
    state: () => ({
      loadingcari: false,
      loadingSave: false,
      loadinghapus: false,
      dialogPelayanan: false,
      items: [],
      pasien: {},
      itemsaskanpraanestesi: [],
      meta: {},
      form: {
        noreg: null,
        fase: "Pra",
        current: {
          id_item: "",
          data: "",
          masalah_kesehatan_anestesi: "",
          waktu: "",
          intervensi: "",
          implementasi: "",
          s: "",
          o: "",
          a: "",
          p: "",
          nama_ttd: "",
        },
        askan_data: [],
      },
      // form: {
      //   noreg: null,
      //   fase: '',
      //   askan_data: [{
      //     masalah_kesehatan_anestesi: null,
      //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
      //     intervensi: null,
      //     implementasi: null,
      //     evaluasi: {
      //       s: null,
      //       o: null,
      //       a: null,
      //       p: null,
      //     },
      //     nama_ttd: null,
      //   }]
      // },
      // formpasca: {
      //   noreg: null,
      //   fase: '',
      //   askan_data: {
      //     masalah_kesehatan_anestesi: null,
      //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
      //     intervensi: null,
      //     implementasi: null,
      //     evaluasi: {
      //       s: null,
      //       o: null,
      //       a: null,
      //       p: null,
      //     },
      //     nama_ttd: null,
      //   }
      // },
      // formintra: {
      //   noreg: null,
      //   fase: '',
      //   askan_data: {
      //     masalah_kesehatan_anestesi: null,
      //     waktu: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
      //     intervensi: null,
      //     implementasi: null,
      //     evaluasi: {
      //       s: null,
      //       o: null,
      //       a: null,
      //       p: null,
      //     },
      //     nama_ttd: null,
      //   }
      // },
      // form: {
      //   noreg: null,
      //   fase: "Pra",
      //   askan_data: [],
      // },
      formpasca: {
        noreg: null,
        fase: "Pasca",
        current: {
          id_item: "",
          data: "",
          masalah_kesehatan_anestesi: "",
          waktu: "",
          intervensi: "",
          implementasi: "",
          s: "",
          o: "",
          a: "",
          p: "",
          nama_ttd: "",
        },
        askan_data: [],
      },
      formintra: {
        noreg: null,
        fase: "Intra",
        current: {
          id_item: "",
          data: "",
          masalah_kesehatan_anestesi: "",
          waktu: "",
          intervensi: "",
          implementasi: "",
          s: "",
          o: "",
          a: "",
          p: "",
          nama_ttd: "",
        },
        askan_data: [],
      },
    }),
    actions: {
      async simpanData(faseAktif) {
        this.loadingSave = true;

        const source =
          faseAktif === "Pra"
            ? this.form
            : faseAktif === "Pasca"
              ? this.formpasca
              : this.formintra;

        try {
          if (!source.current.id_item) {
            source.current.id_item = crypto.randomUUID()
          }
          // 🚀 Payload hanya kirim data lama + current (TANPA inject dulu)
          const payload = {
            noreg: source.noreg,
            fase: source.fase,
            askan_data: [
              ...source.askan_data.map(item => ({
                ...item,
                id_item: item.id_item ?? crypto.randomUUID() // ✅ jaga data lama juga punya id
              })),
              ...(source.current?.data?.trim()
                ? [
                    {
                      id_item: source.current.id_item,
                      data: source.current.data,
                      masalah_kesehatan_anestesi:
                        source.current.masalah_kesehatan_anestesi,
                      waktu: source.current.waktu,
                      intervensi: source.current.intervensi,
                      implementasi: source.current.implementasi,
                      evaluasi: {
                        s: source.current.s,
                        o: source.current.o,
                        a: source.current.a,
                        p: source.current.p,
                      },
                      nama_ttd: source.current.nama_ttd,
                    },
                  ]
                : []),
            ],
          };

          console.log("PAYLOAD DIKIRIM:", payload);

          // 🚀 Tunggu backend
          const resp = await api.post(
            "v1/transaksi/askan-anestesi/simpan",
            payload,
          );

          // ✅ Baru replace dari response backend
          source.askan_data = resp.data.data.askan_data.map(item => ({
            ...item,
            id_item: item.id_item ?? crypto.randomUUID()
          }));
          this.items = resp.data.data.askan_data;

          // reset form
          source.current = {
            id_item: crypto.randomUUID(),

            data: "",
            masalah_kesehatan_anestesi: "",
            waktu: "",
            intervensi: "",
            implementasi: "",
            s: "",
            o: "",
            a: "",
            p: "",
            nama_ttd: "",
          };

          notifSuccessVue(resp?.data?.message);
        } catch (e) {
          notifErrVue(e.response?.data?.message || "Terjadi kesalahan");
        } finally {
          this.loadingSave = false;
        }
      },
      initresponse(val) {
        const target =
          val.fase === "Pra"
            ? this.form
            : val.fase === "Pasca"
              ? this.formpasca
              : this.formintra;

        target.noreg = val.noreg;
        target.fase = val.fase;

        target.askan_data = val.askan_data.map((item) => ({
          id_item: item.id_item ?? crypto.randomUUID(),
          data: item.data ?? "",
          masalah_kesehatan_anestesi: item.masalah_kesehatan_anestesi ?? "",
          waktu: item.waktu ?? "",
          intervensi: item.intervensi ?? "",
          implementasi: item.implementasi ?? "",
          s: item.evaluasi?.s ?? "",
          o: item.evaluasi?.o ?? "",
          a: item.evaluasi?.a ?? "",
          p: item.evaluasi?.p ?? "",
          nama_ttd: item.nama_ttd ?? "",
        }));
      },
      isiForm(val) {
        console.log("isiForm", val);

        // const mapAskan = (fase, target) => {
        //   const temp = val?.askan_anastesi?.find(i => i.fase === fase)
        //   if (!temp || !temp.askan_data?.length) return

        //   target.noreg = val.noreg
        //   target.fase = fase

        //   target.askan_data = temp.askan_data.map(item => ({
        //     id: Date.now() + Math.random(),
        //     data: item.data ?? '',
        //     masalah_kesehatan_anestesi: item.masalah_kesehatan_anestesi ?? '',
        //     waktu: item.waktu ?? '',
        //     intervensi: item.intervensi ?? '',
        //     implementasi: item.implementasi ?? '',
        //     s: item.evaluasi?.s ?? '',
        //     o: item.evaluasi?.o ?? '',
        //     a: item.evaluasi?.a ?? '',
        //     p: item.evaluasi?.p ?? '',
        //     nama_ttd: item.nama_ttd ?? ''
        //   }))
        // }

        // mapAskan('Pra', this.form)
        // mapAskan('Pasca', this.formpasca)
        // mapAskan('Intra', this.formintra)
      },
      async hapusData(index, faseAktif) {
        // console.log('hapusData', index)
        this.loadinghapus = true;

        const source =
          faseAktif === "Pra"
            ? this.form
            : faseAktif === "Pasca"
              ? this.formpasca
              : this.formintra;
        try {
          // const index = source.askan_data.findIndex(x => x.id_item === row.id_item)
          // console.log('index', index)
          // if (index === -1) return notifErrVue("Data tidak ditemukan")
          if (index < 0 || index >= source.askan_data.length) {
            return notifErrVue("Index tidak valid")
          }
          // Hapus berdasarkan index
          const updatedAskan = [...source.askan_data];
          updatedAskan.splice(index, 1);

          if (updatedAskan.length === 0) {
            await api.post("v1/transaksi/askan-anestesi/delete", {
              noreg: source.noreg,
              fase: source.fase,
            });

            source.askan_data = [];
          } else {
            const resp = await api.post("v1/transaksi/askan-anestesi/simpan", {
              noreg: source.noreg,
              fase: source.fase,
              askan_data: updatedAskan,
            });

            source.askan_data = resp.data.data.askan_data;
          }

          notifSuccessVue("Data berhasil dihapus");
        } catch (e) {
          notifErrVue(e.response?.data?.message || "Gagal hapus data");
        } finally {
          this.loadinghapus = false;
        }
      },
    },
  },
);
