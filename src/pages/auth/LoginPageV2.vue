<template>
  <q-page class="fullscreen">
    <!-- <app-loader
      v-if="store.loading"
      class="dimmed"
    /> -->
    <div class="top-page">
      <BoxAnimation class="absolute" />
      <BgAnimation class="z--" />
      <div class="inner-top-page column flex-center">
        <!-- <LoginMode class="login-form" :mode="route.params.mode" :loading="store.loading" /> -->
         <LoginMode
            class="login-form"
            :mode="mode"
            :loading="store.loading"
          />
      </div>

      <!-- <bgAnimation /> -->
    </div>
    <div class="bot column flex-center">
      <div class="text-subtitle">
        EMARS app by Udumbarainformatika
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { comput } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import BgAnimation from './comp/BgAnimation.vue'
import BoxAnimation from './comp/BoxAnimation.vue'
import LoginMode from './v2/LoginMode.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// import { useIdentityStore } from 'src/stores/auth/identity'
// import { channelLogin } from 'src/modules/sockets'

// const ids = useIdentityStore()
const store = useAuthStore()
const route = useRoute()
const mode = computed(() =>
  route.query.mode === 'register' ? 'register' : 'form-login'
)
// channelLogin.subscribed(() => {
//   // console.log('subscribed login!!!')
// }).listen('.login-qr', (e) => {
//   // console.log('listen', e)
//   const msg = e.message
//   const browser = msg.data
//   const match = ids.qrCode === browser
//   if (match) {
//     // console.log('matches !!!')
//     login(msg.email, msg.token)
//   }
// })

// function login(email, token) {
//   // console.log('email', email)
//   const formData = new FormData()
//   formData.append('email', email)
//   store.loginQr(formData)
// }

</script>

<style lang="scss" scoped>
$grad: #187DC1;

* {
  margin: 0;
  padding: 0;
}

.top-page {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, $secondary 0%, $primary 100%);

  .inner-top-page {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

}

.login-form {
  width: 50%;
  // margin-top: 40px;
  z-index: 2;
}

@media(max-width:800px) {
  .login-form {
    width: 90%;
    // margin-top: 40px;
    z-index: 2;
  }
}

.bot {
  position: absolute;
  width: 100%;
  height: 5vh;
  bottom: 0;
  background-color: transparent;
}

.z-- {
  z-index: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 10vh;
}
</style>
