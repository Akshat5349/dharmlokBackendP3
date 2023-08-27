const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String
	},
	phone : {
		required: false,
		type: String,
		unique: true
	},
	email : {
		required: false,
		type: String,
	},
	address : {
		required: false,
		type: String,
		default:''
	},
	city : {
		required: false,
		type: String,
		default:''
	},
	country : {
		required: false,
		type: String,
		default:''
	},
	pincode : {
		required: false,
		type: String,
		default:''
	},
	orderId : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'comments'})

module.exports = mongoose.model('Customers',customerSchema)
