const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    devServer:{
      port:8089,
      open:true, //自动打开浏览器
      proxy: {
        '/openai': {
          target:'https://api.openai.com', // 你请求的第三方接口
          changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite:{  // 路径重写，
            '^/openai': ''  // 替换target中的请求地址，也就是说以后你在请求https://api.openai.com这个地址的时候直接写成/Api即可。
          }
        },
        '/chatai': {
          target:'https://chat.openai.com', 
          changeOrigin:true,
          ws: true,                       //是否代理 websockets
          secure: false,                   //是否https接口
          pathRewrite:{  
            '^/chatai': '' 
          }
        },
        '/backService': {
          target:'http://192.168.31.21:8080', 
          changeOrigin:true,
          ws: true,                       //是否代理 websockets
          secure: false,                   //是否https接口
          pathRewrite:{  
            '^/backService': '' 
          }
        }
      }
    }
  }
})
