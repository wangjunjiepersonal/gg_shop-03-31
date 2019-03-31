<template>
	<section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
      	<!--表单开始-->
        <form @submit.prevent="login">
        	<!--短信验证-->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" 
              	class="get_verification" 
              	@click.prevent="getCode"
              	:class="{right_phone:rightPhone}">{{computeTime>0 ? `(${computeTime}s)已发送` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
          	<!--密码登录-->
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
              	<!--密码显示隐藏区域-->
                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                	<!--滑动切换块-->
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <!--图形验证码-->
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" 
                	src="./images/captcha.svg" 
                	alt="captcha" 
                	ref="captcha"
                	@click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
	
	export default {
		data () {
			return {
				phone:'',		//手机号
				code:'',		//短信验证码
				name:'',		//用户名
				pwd:'',			//登录密码
				captcha:'',	//图形验证码
				loginWay: true, // true代表短信登陆, false代表密码
				computeTime:0,
				showPwd:false,
				alertText: '', // 提示文本
	      alertShow: false, // 是否显示警告框
			}
		},
		methods:{
//			获取短信验证码
			async getCode () {
	     // 如果当前没有计时!this.computeTime等于this.computeTime === 0
	       if(!this.computeTime) {
	         // 启动倒计时
	         this.computeTime = 30
	         this.intervalId = setInterval(() => {
	           this.computeTime--
	           if(this.computeTime <= 0) {
	             // 停止计时
	             clearInterval(this.intervalId)
	           }
	         }, 1000)
	       }
	     // 发送ajax请求（向指定手机号发送验证码短信）
	     const result = await reqSendCode()
	     // 证明接口请求成功
	     this.showAlert('手机验证码是'+result.data.data)
		  	if(result.code===1) { // 手机号验证失败
	    	// 显示提示
	        this.showAlert(result.data.msg)
	        // 停止计时
	        if(this.computeTime) {
	        	this.computeTime = 0
	            clearInterval(this.intervalId)
	            this.intervalId = undefined
	        }
				}	 	
	   },
	   //显示弹窗
	   showAlert (alertText) {
				this.alertShow = true
				this.alertText = alertText
			},
			//关闭弹窗
			closeTip () {
				this.alertShow = false
				this.alertText = ''
			},
			//获取图形验证码
			getCaptcha(){
				const res = this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
				this.showAlert('重新请求图形验证码')
			},
	   //点击登录
	   async login () {
	   		let result
	   		if (this.loginWay) {
//	   			短信登录
	   			const {rightPhone,phone,code} = this
	   			if (!this.rightPhone) {
	   				//手机号不正确
	   				this.showAlert('手机号不正确')
	   				return
	   			}else if (!/^\d{6}$/.test(code)) {
	   				//验证码必须6位数字
	   				this.showAlert('验证码必须6位数字')  
	   				return
	   			}
	   			// 发送ajax请求（输入正确的手机号和验证码）
	   			result = await reqSmsLogin()
	   		}else{
	   			//账号登陆
	   			const {name,pwd,captha} = this
	   			if (!this.name) {
	   				//填写用户名
	   				this.showAlert('填写用户名')
	   				return
	   			}else if (!this.pwd) {
	   				 //填写密码
	   				this.showAlert('填写密码') 
	   				return
	   			}else if (!this.captcha)	{
	   				//填写图形验证码
	   				this.showAlert('填写图形验证码')
	   				return
	   			}
	   			// 发送ajax请求（输入正确的手机号和验证码）
	   			result = await reqPwdLogin()
	   		}
	   		//处理请求code
   				if (result.code === 0) {
   					//存储从后台获取的userinfo信息
   					const user = result.data
   					this.$store.dispatch('recordUser',user)
   					this.$router.replace('/profile')
   				}	else	{
   					//重新拉取图形验证码
   					this.getCaptcha()
   					const msg = result.data.msg
   					this.showAlert(msg)
   				}
   				//停止计时器
	   			if(this.computeTime) {
	        	this.computeTime = 0
	            clearInterval(this.intervalId)
	            this.intervalId = undefined
	        }	
	   }
		},
		computed: {
		  rightPhone () {
		    // 利用正则对手机号进行匹配，返回布尔值
		    return /^1\d{10}$/.test(this.phone)
		  }
		},
		components:{
			AlertTip
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
	.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                &.right_phone
                	color black
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                    	transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>