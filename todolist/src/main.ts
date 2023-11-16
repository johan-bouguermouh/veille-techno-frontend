import './assets/main.css'
import Multiselect from 'vue-multiselect'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('multi-select', Multiselect)
