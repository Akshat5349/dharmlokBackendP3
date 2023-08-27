const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String
	},
	services : {
		required: false,
		type: String
	},
	type : {
		required: false,
		type: String,
	},
	description : {
		required: false,
		type: String,
	},
    price : {
		required: false,
		type: String,
	},
	city : {
		required: false,
		type: String,
	},
    state : {
		required: false,
		type: String,
	},
    imageUrl : {
		required: false,
		type: String,
	},
	active : {
		required: false,
		type: Number,
		default: 1
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'services'})


module.exports = mongoose.model('services',serviceSchema)
