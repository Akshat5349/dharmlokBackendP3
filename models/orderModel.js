const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
	},
	orderId : {
		required: false,
		type: String,
	},
	title : {
		required: false,
		type: String,
	},
    id : {//product service or event id
		required: false,
		type: String,
	},
	providerId : {
		required: false,
		type: String,
	},
    amount : {
		required: true,
		type: Number,
	},
	quantity : {
		required: false,
		type: Number,
		default:1
	},
	type : {
		required: false,
		type: String,
		default:''
	},
    paymentStatus : {
		required: true,
		type: Number,
        default: 0
	},
	paymentId : {
		required: false,
		type: String,
		default:''
	},
	customerId : {
		required: false,
		type: String,
	},
	approved : {
		required: false,
		type: Number,
		default: 0
	},
    createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'PaymentOrder'})

module.exports = mongoose.model('PaymentOrder',orderSchema)
