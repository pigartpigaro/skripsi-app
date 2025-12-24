<template>
  <div class="login-form full-height column flex-center text-white q-pa-lg">
    <div class="form q-mb-sm">
      <div class="text-h6 judul-form">
        USER LOGIN
      </div>
    </div>
    <div class="q-my-md full-width">
      <q-form ref="myForm" class="q-pa-md" @submit="onSubmit">
        <q-input v-model="formlogin.login" color="white" label="Username" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" autocorrect="off" autocapitalize="off"
          autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Username</span>
          </template>
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input v-model="formlogin.password" color="white" label="Password" dark
          :rules="[val => !!val || 'Harap diisi terlebih dahulu']" :type="isPasw ? 'password' : 'text'"
          autocorrect="off" autocapitalize="off" autocomplete="chrome-off" spellcheck="false">
          <template #label>
            <!-- <span class="text-weight-bold text-deep-orange">You</span> -->
            <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Password</span>
          </template>
          <template #prepend>
            <q-icon name="key" />
          </template>
          <template #append>
            <q-icon :name="isPasw ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPasw = !isPasw" />
          </template>
        </q-input>
        <div class="row justify-between q-mt-lg">
          <q-btn push color="white" text-color="primary" label="Login" type="submit" :disable="storeAuth.loading">
            <template #loading>
              <q-spinner-hourglass class="on-right" />
              Loading...
            </template>
          </q-btn>


          <!-- <q-btn push color="white" text-color="primary" label="Register" type="button" @click="goToRegister()">
            <template #loading>
              <q-spinner-hourglass class="on-right" />
              Loading...
            </template>
          </q-btn> -->
          <div class="column flex-center cursor-pointer f-12" :class="hoverred ? 'text-red' : 'text-grey-4'"
            @mouseover="hoverred = true" @mouseleave="hoverred = false" @click="goToRegister()">
            <div>Don't have an account?</div>
            <div>Register Now</div>
          </div>
        </div>
      </q-form>
    </div>
    <div class="app-v text-grey-4">
      app versi v{{ appVersion }}
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import packageJson from '../../../../package.json'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
const $q = useQuasar()
const router = useRouter()
const appVersion = ref(packageJson.version || '0.0.1')
const isPasw = ref(true)
const hoverred = ref(false)
const myForm = ref(false)
const formlogin = ref({
  login: '',
  password: ''
})

const storeAuth = useAuthStore()
async function onSubmit() {
  console.count('LOGIN SUBMIT')
  try {
    await storeAuth.login(formlogin.value)
    router.push({ path: '/dashboard' })
    storeAuth.getprofil()
  } catch (err) {
    if (err?.status === 422 || err?.errors) {
      $q.notify({
        type: 'negative',
        message: 'Username atau password salah'
      })
    } else {
      $q.notify({
        type: 'negative',
        message: err.message || 'Login gagal'
      })
    }
  }
}



// function goToRegister() {
//   router.push({ name: 'login-mode', params: { mode: 'register' }, replace: true })

// }
function goToRegister() {
  router.replace({
    name: 'login',
    query: { mode: 'register' }
  })
}
</script>

<style lang="scss" scoped>
.app-v {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.q-field__native {

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 9999s ease-in-out 0s;
  }

  // &input:-internal-autofill-previewed,
  // &input:-internal-autofill-selected{
  //   -webkit-box-shadow: none;
  // }

}
</style>
