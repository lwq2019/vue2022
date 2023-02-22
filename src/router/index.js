
import {createRouter,createWebHistory} from "vue-router"
import store from '../store/index.js'
let routes = [
    {
        path: '/',
        name: 'App',
        component: () => import('../App.vue'),
    },
    // 登陆页面
    {
        path: "/pictureSearch", // 生成图片
        name: "pictureSearch",
        component: () => import('../components/picture/pictureSearch.vue')
    },
    {
        path: "/interlocution", // 问答
        name: "interlocution",
        component: () => import('../components/picture/interlocution.vue')
    },
    {
        path: "/signCommon",
        name: "signCommon",
        component: () => import('../components/login/signCommon.vue')
    },
];
let router = new createRouter({
    routes,
    mode: 'history',
    history:createWebHistory(),
    // 全局配置激活路由的class类名，处与活跃（动态）就会用上这个类名
    linkActiveClass: 'active'
})
// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
if (localStorage.getItem("token")) {
    store.commit("setToken", localStorage.getItem("token"));
  }
// router.beforeEach((to, from, next) => {
//     // 设置路由守卫，在进页面之前，判断有token，才进入页面
//     console.log(store.token)
//     if (store.token) {
//         next('/')
//     } else {
//         // 没有token就调用后端接口，跳转地址
//         // getAddress().then((res) => {
//         //   if (res.data.code === 200) {
//         //     location.href = res.data.data.redirectUri
//         //   }
//         // })
//     }
// });
export default router;