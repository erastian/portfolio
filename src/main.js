import './assets/main.css'
import { createPinia } from "pinia";
import { createApp } from 'vue'

import App from './App.vue'
import router from './app/router/'

const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
