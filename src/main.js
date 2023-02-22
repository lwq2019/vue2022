import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
// import '@/mock/index.js'
import axios from '@/api/axiosInstance.js'
import loading from '@/components/loading/index'

// 应用的入口文件
let app=createApp(App)
axios.defaults.baseURL = "/api/";
app.config.globalProperties.$axios=axios
app.use(router).use(store).use(ElementPlus)
app.use(loading)
app.mount('#app')

