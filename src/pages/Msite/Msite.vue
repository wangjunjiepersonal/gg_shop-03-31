<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
	  <!-- 要使用slot="left"指定插入的插槽位置 -->
	  <router-link class="header_search" slot="left" to="/search">
	    <i class="iconfont icon-sousuo"></i>
	      </router-link>
	  <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
	    <span class="header_login_text" v-if="!userInfo._id">
		      	登录|注册
			</span>
		    <!--如果已经登录则显示一个icon-->
			<span class="header_login_text" v-else>
				<i class="iconfont icon-yonghuming"></i>
			</span>
	  </router-link>
	</HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for=" (item,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(data,index) in item" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+data.image_url">
              </div>
              <span>{{data.title}}</span>
            </a>
            
          </div>
          
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import {mapState} from 'vuex'
//引入swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
	data () {
	    return {
	      baseImageUrl: 'http://localhost:8080/static'
		}
	},
	mounted(){
		this.$store.dispatch('getCategorys')
		this.$store.dispatch('getShops')
	},
	computed:{
		...mapState(['address','categorys','userInfo']),
		//将轮播图的数据变为二维数组
		categorysArr(){
			const {categorys} = this
			const arr = []
			let minArr = []
			categorys.forEach(item => {
				if(minArr.length == 8){
					minArr = []
				}
				if (minArr.length == 0) {
					arr.push(minArr)
				}
				minArr.push(item)
			})
			return arr
		}
	},
	watch: {
		//监视state的数据categorys在页面渲染完毕之后再开启轮播图
	  categorys (value) { // categorys数组中有数据了
	    	// 但界面还没有异步更新
	    	this.$nextTick(() => {
					// 一旦完成界面更新, 立即执行回调
				    new Swiper('.swiper-container', {
				    	autoplay: true,
				    	pagination: {
				    	el: '.swiper-pagination',
				    	clickable: true
				    }
						})
			  })
	  }  	
	},
  components: {
    HeaderTop,
    ShopList
  }
}	
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
          width 100%
          .msite_header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            
</style>