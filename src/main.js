import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue3-cookies'

import App from './App.vue'
import router from './router'
import store from '@/stores'

import Default from '@/layouts/default.vue'
import Userpanel from '@/layouts/userpanel.vue'
import Adminpanel from '@/layouts/adminpanel.vue'

const app = createApp(App)

app.component("default-layout" , Default)
app.component("userpanel-layout" , Userpanel)
app.component("adminpanel-layout" , Adminpanel)

app.use(createPinia())
app.use(VueCookies);
app.use(router)
app.use(store)

app.mount('#app')
