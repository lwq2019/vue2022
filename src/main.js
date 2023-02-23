import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
// import '@/mock/index.js'
// import axios from '@/api/axiosInstance.js'
import axios from 'axios';
// import VueAxios from 'vue-axios'
import loading from '@/components/loading/index'

// 应用的入口文件
let app=createApp(App)
app.config.productionTip = false
axios.defaults.baseURL = "https://api.openai.com";
axios.interceptors.request.use(
	config => {
			config.headers['Content-Type'] = "application/json";
			config.headers["Access-Control-Allow-Origin"] = "*"
			config.headers.Authorization = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJodWppZTU4ODg4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiTkwifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLXRXTXpnczlqUnZmN2lDVVVnMG9VVGx3OCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNlNzlmOTQ2YWMwYjUxZDBhYzZmM2YyIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzExOTYwMSwiZXhwIjoxNjc4MzI5MjAxLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.1mCBArG1pQDqokfZ3WSksKpXtNKyx6X8zoSr6MSuspIA81LoxjyKc4Yj8PXTRlJt98C6cfA4vBp5PmpVhU26UrbNSqmG9hfNPnU1RfwA8HuGSlQF3Bc7fx8l-r6bBJ6hl1xiXuMrOKw8_HtW2OJE6qFp73Ab0dNOOFQAwu8px9bUuDohUlECEJ7wGVaRAKQZ0e0RC-W70bBCLcgp5Ts8YVyJ88VvkgEQ3ZXztGaNrdrdiJuMtV6VFH2MTTmHM-XxTQrhI0zLcfgkpbpDaarW26eLI7ieqI4w27TU4Ha2msiwfUYzrf_3YoZiUTUmdaickcaHnKaujMUxYDD5QYyK2g";
			if (config.url.indexOf('/openai/')==0){
				config.url = config.url.slice(7)
				config.baseURL = 'https://api.openai.com';
			} else if (config.url.indexOf('/backService/')==0){
				config.url = config.url.slice(11)
				config.baseURL = 'http://192.168.31.21:8080';
			}
			return config;
	},
	function(err) {
			console.log("失败信息" + err);
	}
);
app.provide('$axios', axios)
app.use(router).use(store).use(ElementPlus)
app.use(loading)
// app.use(VueAxios,axios)
app.mount('#app')

