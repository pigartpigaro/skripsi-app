import Print from 'vue3-print-nb'
import VueApexCharts from 'vue3-apexcharts'
import JsonExcel from 'vue-json-excel3'
// import '../modules/wacom/q.js'
// import WacomGSS from '../modules/wacom/sdkstu'

// import VuePdf from 'vue3-pdfjs'

export default async ({ app }) => {
  // app.use(WacomGSS)
  app.use(Print)
  app.use(VueApexCharts)
  app.component('DownloadExcel', JsonExcel)
  // app.use(VuePdf)
}
