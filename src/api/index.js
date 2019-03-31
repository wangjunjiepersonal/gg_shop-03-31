/*与后台交互模块 （依赖已封装的ajax函数）
 * 如果匹配代理拦截 需要加上api
 */
import ajax from './ajax'
/**
 * 获取地址信息(根据经纬度获取用户的自身定位)
 * 获取食品列表
 * 获取商品列表(根据经纬度获取用户周边的商家)
 */
export const reqAddress = () => ajax('/address')

export const reqCategorys = () => ajax('/foodtype')

export const reqShops = () => ajax('/shoplist')

// 4、根据经纬度和关键字搜索商铺列表
//export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
export const reqSearchShop = () => ajax('/searchshops')

// 6、用户名密码登陆
//export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
export const reqPwdLogin = () => ajax('/pwdlogin')

// 7、发送短信验证码
//export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
export const reqSendCode = () => ajax('/sendcode')

// 8、手机号验证码登陆
//export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
export const reqSmsLogin = () => ajax('/smslogin')

// 9、根据会话获取用户信息
//export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
export const reqUserInfo = () => ajax('/userinfo')

// 10、用户登出
//export const reqLogout = () => ajax(BASE_URL+'/logout')
export const reqLogout = () => ajax('/logout')

// 获取商家信息
export const reqShopInfo = () => ajax('/info')

// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')

// 获取商家商品数组
export const reqShopGoods = () => ajax('/goods')