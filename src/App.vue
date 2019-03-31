<template>
  <div id="app">
    
    <!--//路由显示标签  所有的路由组件都显示在上面-->
    <router-view></router-view>
    <footerguide v-show="$route.meta.showFooter"></footerguide>
  </div>
 
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'	
export default {
	data(){
		return{
			
		}
	},
	async mounted () {
    // 通过this.$store.dispatch 方法触发调用Action
    this.$store.dispatch('getAddress')
    
	},
	components:{
		footerguide:FooterGuide
	},
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
