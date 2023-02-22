import { createApp } from "vue"

import Loading from './loading.vue'

export default {
  loading: null,
  install(Vue) {
    if (this.loading) {
      // 防止多次载入
      Vue.config.globalProperties.$loading = this.loading;
      return ;
    }
    let instance = createApp(Loading);
    let parent = document.createElement("div")
    let bodyDom = document.body
    // 这里需要注意，大概率app还没有mount，导致获取不到app节点，所以想挂载到app上，需要保证app已经创建。
    bodyDom.appendChild(parent)
    this.loading = instance.mount(parent)

    Vue.config.globalProperties.$loading = this.loading;
  }
};