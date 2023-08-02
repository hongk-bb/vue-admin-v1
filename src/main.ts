import './style.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import permission from './directives/permission'

import App from './App.vue'
import router from './router'

import icons from './global/register-icons'

import 'nprogress/nprogress.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(icons)
app.use(permission)

app.mount('#app')
