const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
	userId : {
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
	approved : {
		required: false,
		type: Number,
		default:0
	},
	active : {
		required: false,
		type: Number,
		default:1
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'products'})


module.exports = mongoose.model('products',productSchema)
