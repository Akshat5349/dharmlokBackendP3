const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	bannerImageUrl : {
		required: false,
		type: String
	},
	city : {
		required: false,
		type: String,
	},
	description : {
		required: false,
		type: String,
	},
	location : {
		required: false,
		type: String,
	},
	name : {
		required: false,
		type: String,
	},
	relatedImageUrl : {
		required: false,
		type: String,
	},
	state : {
		required: false,
		type: String,
	},
	lattitude : {
		required: false,
		type: String,
		default : ''
	},
	longitude : {
		required: false,
		type: String,
		default : ''
	},
	category : {
		required: false,
		type: String,
		default:''
	},
	language : {
		required: false,
		type: String,
		default:''
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
},{collection : 'temple'},)

module.exports = mongoose.model('temple',templeSchema)
