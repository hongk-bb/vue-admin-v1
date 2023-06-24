import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import icons from './global/register-icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(icons)

app.mount('#app')
