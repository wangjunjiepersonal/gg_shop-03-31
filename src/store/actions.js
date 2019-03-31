// Action:通过操作mutation间接更新state的多个方法的对象
// 注意要引入api接口函数
import {reqAddress, reqCategorys, reqShops,reqLogout,reqShopInfo,reqShopRatings,reqShopGoods,reqSearchShop} from '../api'
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
export default {
 // 异步获取地址
 async getAddress ({commit, state}) {
   // 从state状态中获取到经纬度用来设置reqAddress的参数（看接口文档）
   const geohash = state.latitude + ',' + state.longitude
   
   // 1. 发送异步ajax请求 由于自己mock的数据 所以不加参数了
   const result = await reqAddress()
   // 2. 根据结果提交一个mutation
   commit(RECEIVE_ADDRESS, {address: result.data.data})
 },
 // 异步获取分类列表
 async getCategorys ({commit}) {
   const result = await reqCategorys()
   commit(RECEIVE_CATEGORYS, {categorys: result.data.data})
 },
 // 异步获取商家列表
 async getShops ({commit, state}) {
   // 对象的解构赋值
   const {latitude, longitude} = state
   // 注意参数的顺序 由于自己mock的数据 所以不加参数了
   const result = await reqShops()
   commit(RECEIVE_SHOPS, {shops: result.data.data})
 },
 // 同步记录用户信息 
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
 // 异步登出 
  async logout ({commit}) {
		const result = await reqLogout()
			if (result.code === 0) {commit(RESET_USER_INFO)}
		},
	// 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
      console.log(info)
    }
  },

  // 异步获取商家评价列表
  async getShopRatings ({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods ({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      callback && callback()
    }
  },
  // action中同步更新food中的count值
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  //同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 异步获取商家商品列表的action
	async searchShops ({commit}) {
	  //const geohash = state.latitude + ',' + state.longitude
	  const result = await reqSearchShop()
	  if (result.code === 0) {
	    const searchShops = result.data
	    commit(RECEIVE_SEARCH_SHOPS, {searchShops})
	  }
	}
}