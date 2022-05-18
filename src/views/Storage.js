export default{
	// 设置缓存
	set(key,value){
		window.sessionStorage.setItem(key,JSON.stringify(value));
	},
	// 获取缓存
	get(key){
		return JSON.parse(window.sessionStorage.getItem(key)) || [];
	}
}