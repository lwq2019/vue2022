import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
let API = axios.create({
	baseUrl:'https://api.openai.com/v1', //请求后端数据的基本地址，自定义
	timeout: 2000,                   //请求超时设置，单位ms
	// headers:{
	// 	"Content-Type":"application/json",
	// 	"OpenAI-Version":"2020-10-01",
	// 	"OpenAI-Organization":"user-bon0ajizfu0sytp8wpvyugkw",
	// 	"X-Request-ID":"c6a90bc7d88eeef3dce5db29450f5ef7",
	// 	"OpenAI-Processing-Ms":"5820",
	// 	"Access-Control-Allow-Origin":"*",
	// 	Authorization:"Bearer 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"
	// }
})
axios.defaults.headers.common['Content-Type'] = "application/json";
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJodWppZTU4ODg4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiTkwifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLXRXTXpnczlqUnZmN2lDVVVnMG9VVGx3OCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNlNzlmOTQ2YWMwYjUxZDBhYzZmM2YyIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NzExOTYwMSwiZXhwIjoxNjc4MzI5MjAxLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.1mCBArG1pQDqokfZ3WSksKpXtNKyx6X8zoSr6MSuspIA81LoxjyKc4Yj8PXTRlJt98C6cfA4vBp5PmpVhU26UrbNSqmG9hfNPnU1RfwA8HuGSlQF3Bc7fx8l-r6bBJ6hl1xiXuMrOKw8_HtW2OJE6qFp73Ab0dNOOFQAwu8px9bUuDohUlECEJ7wGVaRAKQZ0e0RC-W70bBCLcgp5Ts8YVyJ88VvkgEQ3ZXztGaNrdrdiJuMtV6VFH2MTTmHM-XxTQrhI0zLcfgkpbpDaarW26eLI7ieqI4w27TU4Ha2msiwfUYzrf_3YoZiUTUmdaickcaHnKaujMUxYDD5QYyK2g";
//API.request.headers.Authorization="Bearer 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"
//导出我们建立的axios实例模块，ES6 export用法
export default API