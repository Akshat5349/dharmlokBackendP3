const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	imageUrl : {
		required: false,
		type: String,
		default : ''
	},
	title : {
		required: false,
		type: String,
		default : ''
	},
	description : {
		required: false,
		type: String,
		default : ''
	},
	link : {
		required: false,
		type: String,
		default : ''
	},
	phone : {
		required: false,
		type: String,
		default : ''
	},
	type : {
		required: false,
		type: String,
		default : ''
	},
	thoughtTitle : {
		required: false,
		type: String,
		default : ''
	},
	thoughtBody : {
		required: false,
		type: String,
		default : ''
	},
	date : {
		required: false,
		type: String,
		default : ''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'HomePage'})

module.exports = mongoose.model('HomePage',homeSchema)
