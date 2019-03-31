import Vue from 'vue'
import Router from 'vue-router'
//导入路由组件
//import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings.vue'

//路由组件懒加载
// router/index.js文件中 改变引入方式 实现路由组件懒加载
// 此时的Msite返回路由组件的函数，只有请求对应的路由路径时(第一次)才会执行此函数并加载路由组件
const Msite = () => import('../pages/Msite/Msite.vue')

Vue.use(Router)

export default new Router({
	//去掉地址中的哈希#
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/msite',
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
		    showFooter: true
		  }
    },
    {
      path: '/order',
      component: Order,
      meta: {
		    showFooter: true
		  }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
		    showFooter: true
		  }
    },
    {
      path: '/search',
      component: Search,
      meta: {
		    showFooter: true
		  }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [{
				path: '/shop/goods',
				component: ShopGoods
			},
			{
        path: '/shop/ratings',
        component: ShopRatings
			},
			{
				path: '/shop/info',
        component: ShopInfo
			},
			{
        path: '',
        redirect: '/shop/goods'
			}]
    }
  ]
})
