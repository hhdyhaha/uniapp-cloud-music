import App from './App'
//引入store
import store from './store'
// #ifndef VUE3
import Vue from 'vue'

import ZAudio from '@/components/uniapp-zaudio' //HbuilderX插件导入方式, import可能需要修改目录名哦
// import ZAudio from 'uniapp-zaudio' // npm引用方式

let zaudio = new ZAudio({
  continuePlay: true, //续播
  autoPlay: true, //自动播放 部分浏览器不支持
});
Vue.prototype.$zaudio = zaudio; //挂载vue原型链上

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif