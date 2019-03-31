// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

//加载过滤器
import './fiters'
//解决300mm点击延迟问题
import FastClick from 'fastclick'
FastClick.attach(document.body);
/* eslint-disable no-new */

//图片懒加载及配置
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
	loading
})

//加载mock模拟数据
import './mock/mockServer.js'

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
