const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: false
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Service Category'})

module.exports = mongoose.model('Service Category',serviceCategorySchema)
