<template>
	<div>
		<div class="goods">
			<!--左侧-->
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li class="menu-item" v-for="(good,index) in goods" 
						:key="index" 
						@click="clickMenuItem(index)"
						:class="{current: index===currentIndex}">
						<span class="text bottom-border-1px">
							<img class="icon" :src="good.icon" v-if="good.icon">
							{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<!--右侧-->
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul ref="foodsUl">
					<li class="food-list-hook" v-for="(good,index) in goods" :key="index">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" 
								@click="showFood(food)"
								v-for="(food,index) in good.foods" 
								:key="index">
								<div class="icon">
									<img width="57" height="57"	:src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售 {{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="food"></CartControl>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<ShopCart></ShopCart>
		</div>
		<Food :food="food" ref="food"></Food>	
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import BScroll from 'better-scroll'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	import Food from '../../../components/Food/Food.vue'
	import ShopCart from '../../../components/ShopCart/ShopCart.vue'
	export default {
		data(){
			return{
				scrollY:0,  //滑动的距离
				tops:[],		//每个li标签的高度	
				food:{}			//传给弹出组件的数据
			}
		},
		mounted(){
			// 使用 axios 请求 mockjs 提供的接口
    	this.$store.dispatch('getShopGoods',() => {
    		this.$nextTick(() => { // 列表数据更新显示后执行
	        this._initScroll()
	        this._initTops()
	      })
    	})
		},
		methods:{
			_initScroll(){
				//初始化better-scroll
				new BScroll('.menu-wrapper', {
          click: true
        })
       	this.foodsScroll = new BScroll('.foods-wrapper', {
        	probeType: 2,
          click: true
        })
        //右侧列表绑定scroll监听
        this.foodsScroll.on('scroll',({x,y})=>{
        	
        	this.scrollY = Math.abs(y)
        })
        //右侧滚动结束监听
        this.foodsScroll.on('scrollEnd',({x,y})=>{
        	
        	this.scrollY = Math.abs(y)
        })
			},
			_initTops(){
				// 1. 初始化tops
				const tops = []
				let top = 0
			     // 第一个li的top为0
				tops.push(top)
				// 2. 收集
				// 在foods列表下找到所有分类的li
				const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
			     Array.prototype.slice.call(lis).forEach(li => {
			     	top += li.clientHeight
			     	tops.push(top)
			     })
			
			     // 3. 更新数据
			     this.tops = tops
			},
			clickMenuItem(index){
				//点击左侧按钮时 找到被点击的当前按钮的索引 获取值 将这个值先更新scrollY 然后更新scrollTo
				const Y = this.tops[index]
				this.scrollY = Y
				this.foodsScroll.scrollTo(0,-Y,300)
			},
			showFood(food){
				//显示点击的food
				this.food = food
				//调用子组件food中的方法 实现切换显示
				this.$refs.food.toggleShow()
			}
		},
		computed: {
	    ...mapState(['goods']),
	    currentIndex(){
	    	//计算得到当前分类的下标
	    	const {scrollY,tops} = this
	    	//计算scroll在tops数组的哪个区间内 将这个区间的索引返回
	    	const index = tops.findIndex((top,index) => {
	    		//console.log(scrollY)
	    		return scrollY >= top && scrollY < tops[index+1]
	    		
	    	})
	    	return index
	    }
	 },
	 components:{
	 	CartControl,
	 	Food,
	 	ShopCart
	 }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #ccc
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
