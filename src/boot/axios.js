import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
import { notifErr } from 'src/modules/utils'

/* ======================
   ENV
====================== */
const SERV = import.meta.env.VITE_API_URL
const WSHOST = import.meta.env.VITE_WSHOST
const WSPORT = 8190
const PATHIMG = import.meta.env.VITE_PATHIMG

const SERVER = `${SERV}`
const pathImg = `${PATHIMG}/storage/`

/* ======================
   AXIOS INSTANCE
====================== */
const api = axios.create({
  baseURL: SERVER,
  headers: {
    Accept: 'application/json'
  }
})

/* ======================
   REQUEST INTERCEPTOR
====================== */
api.interceptors.request.use(
  config => {
    const token = getLocalToken()
    console.log('AXIOS INTERCEPTOR TOKEN =>', token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }

    return config
  },
  error => Promise.reject(error)
)

/* ======================
   RESPONSE INTERCEPTOR
====================== */
api.interceptors.response.use(
  response => response,
  error => {
    try {
      if (error.response) {
        notifErr(error.response)
      } else if (error.message?.includes('413')) {
        notifErr({ status: 413, data: { message: 'The file is too large' } })
      } else {
        notifErr({ data: { message: "The server didn't respond." } })
      }
    } catch (e) {
      console.log('Axios interceptor error:', e)
    }

    return Promise.reject(error)
  }
)

/* ======================
   TOKEN HELPERS
====================== */
const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

const deleteToken = () => {
  delete api.defaults.headers.common.Authorization
}

/* ======================
   QUASAR BOOT
====================== */
export default boot(({ app }) => {
  console.log('BOOT AXIOS OK')

  // ⚠️ PAKAI INI SAJA
  app.config.globalProperties.$api = api

  app.config.globalProperties.$SERVER = SERVER
  app.config.globalProperties.$SERV = SERV
  app.config.globalProperties.$pathImg = pathImg
  app.config.globalProperties.$WSHOST = WSHOST
  app.config.globalProperties.$WSPORT = WSPORT
})

/* ======================
   EXPORT
====================== */
export {
  api,
  setToken,
  deleteToken,
  pathImg,
  SERV,
  SERVER,
  WSHOST,
  WSPORT
}
