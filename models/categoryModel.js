const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: true	
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Product'})

module.exports = mongoose.model('Categories',categorySchema)
