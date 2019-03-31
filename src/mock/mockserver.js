/*
 *	使用mock.js提供mock数据接口
 *	返回的接口
 * 	
 * */
	 import Mock from 'mockjs'
	 import data from './data.json'
	 import address from './address.json'
	 import searchshops from './searchshops.json'
	 import foodtype from './foodtype.json'
	 import shoplist from './shoplist.json'
	 import sendcode from './sendcode.json'
	 import pwdlogin from './pwdlogin.json'
	 import smslogin from './smslogin.json'
	 import logout from './logout.json'
	 
	 //设计返回的接口
	 Mock.mock('/address',{data:address})
	 Mock.mock('/foodtype',{data:foodtype})
	 Mock.mock('/shoplist',{data:shoplist})
	 Mock.mock('/searchshops',{code:0,data:searchshops.data})
	 Mock.mock('/pwdlogin',{code:0,data:pwdlogin.data})
	 Mock.mock('/sendcode',{code:0,data:sendcode.data})
	 Mock.mock('/smslogin',{code:0,data:smslogin.data})
	 Mock.mock('/userinfo',{data:shoplist})
	 Mock.mock('/logout',{code:0,data:logout.data})
	 
	 
	 Mock.mock('/goods',{code:0,data:data.goods})
	 Mock.mock('/ratings',{code:0,data:data.ratings})
	 Mock.mock('/info',{code:0,data:data.info})
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
