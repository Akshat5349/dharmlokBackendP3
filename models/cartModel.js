const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
	},
	productId : {
		required: false,
		type: String,
	},
	providerId : {
		required: true,
		type: String
	},
	title : {
		required: true,
		type: String
	},
	description : {
		required: true,
		type: String,
	},
    price : {
		required: true,
		type: Number,
	},
    imageUrl : {
		required: false,
		type: String,
	},
	type : {
		required: false,
		type: String,
	},
	typeString : {
		required: false,
		type: String,
		default:''
	},
	pricePerUnit : {
		required: false,
		type: Number,
	},
	quantity : {
		required: true,
		type: Number,
		default:1
	},
    category : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'cart'})


module.exports = mongoose.model('cart',cartSchema)
