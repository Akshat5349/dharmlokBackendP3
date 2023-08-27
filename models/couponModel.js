const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
	codeName : {
		required: true,
		type: String
	},
	discount : {
		required: false,
		type: Number,
	},
	status : {
		required: false,
		type: Number,
        default: 1
	},
    validTill : {
		required: false,
		type: String,
	},
    userLimit : {
		required: false,
		type: Number,
	},
    timesUsed : {
        type: Number,
        required: false,
        default:0
    },
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Coupon'})

module.exports = mongoose.model('Coupon',couponSchema)
