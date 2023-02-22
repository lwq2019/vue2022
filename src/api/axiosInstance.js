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
axios.defaults.headers.common['Authorization'] = "Bearer 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";
//API.request.headers.Authorization="Bearer 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"
//导出我们建立的axios实例模块，ES6 export用法
export default API