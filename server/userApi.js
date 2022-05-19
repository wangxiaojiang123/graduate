//api.js (参考)
var models = require('./db.js')
var express = require('express')
var router = express.Router()

// 注册用户
router.post('/register', (req, res) => {
	let params = req.body
	let users = new models.User({
		username: params.name,
		password: params.password,
		repass: params.password,
		phone: params.phone,
	})
	users.save().then((result) => {
		// console.log(result)
		res.send(result)
	})
})
router.post('/register/user', (req, res) => {
	models.User.find().then((result) => {
		res.send(result)
	})
})

// 登录
router.post('/login', (req, res) => {
	let params = req.body
	// console.log(params)
	models.User.find({ phone: params.phone }).then((result) => {
		res.send(result)
	})
})

// 密码、修改
router.post('/forget', (req, res) => {
	let params = req.body
	// console.log(params)
	models.User.update(
		{ password: params.pass },
		{ $set: { password: params.newpass, repass: params.newpass } }
	).then((result) => {
		res.send(true)
	})
})

// 将商品加入对应账号中
router.post('/addGoods', (req, res) => {
	let params = req.body
	// console.log(params)
	let goods = new models.Goods({
		username: params.name,
		phone: params.phone,
		addressDetail: params.addressDetail,
		addressname: params.addressname,
		addresstel: params.addresstel,
		condition: params.condition,
		date: params.date,
		description: params.description,
		deviceName: params.deviceName,
		deviceNum: params.deviceNum,
		devtype: params.devtype,
		fee: params.fee,
		lists: params.lists,
		nowTime: params.nowTime,
		pic: params.pic,
		randomNum: params.randomNum,
		types: params.types,
		condition: params.condition,
	})
	goods.save().then((result) => {
		res.send(true)
	})
})
// 查找商品
router.post('/findGoods', (req, res) => {
	let params = req.body
	if (params.phone) {
		models.Goods.find({ phone: params.phone }).then((result) => {
			res.send(result)
		})
	} else {
		models.Goods.find().then((result) => {
			res.send(result)
		})
	}
})
// 取消订单
router.post('/cancelGoods', (req, res) => {
	let params = req.body
	models.Goods.updateOne(
		{ randomNum: params.goods },
		{ condition: '已取消' }
	).then((result) => {
		res.send(true)
	})
	// models.Goods.updateOne({"randomNum":params.goods},{"condition":"服务中"}).then((result)=>{res.send(true)})
	// models.Goods.updateOne({"randomNum":params.goods},{"condition":"已验收"}).then((result)=>{
	//     res.send(true)})
})
//修改订单
router.post('/updateGoods', (req, res) => {
	let params = req.body
	if (params.condition === '待派单') {
		models.Goods.updateOne(
			{ randomNum: params.goods },
			{ condition: '服务中' }
		).then((result) => {
			res.send(true)
		})
	} else if (params.condition === '服务中') {
		models.Goods.updateOne(
			{ randomNum: params.goods },
			{ condition: '已验收' }
		).then((result) => {
			res.send(true)
		})
	}

	// models.Goods.updateOne({"randomNum":params.goods},{"condition":"服务中"}).then((result)=>{res.send(true)})
	// models.Goods.updateOne({"randomNum":params.goods},{"condition":"已验收"}).then((result)=>{
	//     res.send(true)})
})

module.exports = router
