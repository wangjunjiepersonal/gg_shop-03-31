/*
vuex 的 mutations 模块从 mutations-types中获取  actions中调用 mutations中的方法
*/
import Vue from 'vue'
import {RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	RESET_USER_INFO,
	RECEIVE_INFO,
	RECEIVE_RATINGS,
	RECEIVE_GOODS,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART,
	RECEIVE_SEARCH_SHOPS
} from './mutation-types'

/*
 *	[方法名](state,{param}){}
 * 	通过mutations改变stata中的数据 
 * 	改变stata中存储的address 对象 让其接收后台获取的值
 * 	改变stata中存储的categorys 数组 让其接收后台获取的值
 * 	改变stata中存储的shops 数组 让其接收后台获取的值
 * */ 
export default {
	[RECEIVE_ADDRESS](state, {address}) {
		state.address = address
	},
	[RECEIVE_CATEGORYS](state, {categorys}) {
		state.categorys = categorys
	},
	[RECEIVE_SHOPS](state, {shops}) {
		state.shops = shops
	},
	[RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
    console.log(1)
	},
	[RESET_USER_INFO] (state) {
    state.userInfo = {}
 },
	[RECEIVE_INFO] (state, {info}) {
	  state.info = info
	},
	
	[RECEIVE_RATINGS] (state, {ratings}) {
	  state.ratings = ratings
	},
	[RECEIVE_GOODS] (state, {goods}) {
	  state.goods = goods
	},
	[INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) { // 第一次增加
      // food.count = 1  // 这样新增的属性没有数据绑定
      /*
      对象
      属性名
      属性值
       */
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      //将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
	[DECREMENT_FOOD_COUNT] (state, {food}) {
	    if (food.count) { // 只有有值才去减
	      food.count--
	      if (food.count === 0) {
	      	state.cartFoods.splice(state.cartFoods.indexOf(food),1)
	      }
	    }
	 },
	// 注意CLEAR_CART的mutation不能仅仅把catFoods数组清空，还要先清空goods里food的count
	[CLEAR_CART] (state) {
    // 清除food中的count
    state.cartFoods.forEach(food => { food.count = 0 })
    // 移除购物车中所有购物项
    state.cartFoods = []
  },
	[RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  }  
}
	