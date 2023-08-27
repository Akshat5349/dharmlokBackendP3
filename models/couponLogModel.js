const mongoose = require('mongoose');

const couponLogSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	couponId : {
		required: false,
		type: String,
	},
	timeUsed : {
		required: false,
		type: Number,
        default: 0
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'CouponLog'})

module.exports = mongoose.model('CouponLog',couponLogSchema)
