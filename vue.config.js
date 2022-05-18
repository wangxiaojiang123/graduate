// vue中的proxy跨域

module.exports = {
	devServer: {
	    proxy: {  //配置跨域
			'/help/entry': {
			  target: 'http://localhost:3000',
			  changOrigin: true,
			  ws:true,
			  pathRewrite: {
				'^/help/entry': '' 
			  }
			},
			'/user': {
				target: 'http://localhost:3000',
				changOrigin: true,
				ws:true,
				pathRewrite: {
				  '^/user': '' 
				}
			  },
			'/api': {
				target: 'http://localhost:3000',  //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws:true,
				changOrigin: true,  //允许跨域
				pathRewrite: {
				/* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
					实际上访问的地址是：http://localhost:3000/core/getData/userInfo,因为重写了 /api
				*/
				//  /api代表网址为http://localhost:3000/api
				'^/api': '' 
				}
			},
		  
	    }
	  }
}