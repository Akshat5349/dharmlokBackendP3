const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	title : {
		required: false,
		type: String
	},
	description : {
		required: false,
		type: String,
	},
	bookingURL:{
		required:false,
		type: String,
	},
    place : {
		required: false,
		type: String,
	},
    type : {
		required: false,
		type: String,
	},
	location : {
		required: false,
		type: String,
		default:''
	},
	cost : {
		required: false,
		type: Number,
		default:0
	},
    bannerImageUrl : {
		required: false,
		type: String,
	},
    relatedImageUrl : {
		required: false,
		type: String,
	},
	approved:{
		required: false,
		type: Number,
		default:0
	},
	locationUrl : {
		required: false,
		type: String,
	},
	fromDate : {
		required: false,
		type: String,
	},
	toDate : {
		required: false,
		type: String,
	},
	fromTime : {
		required: false,
		type: String,
	},
	toTime : {
		required: false,
		type: String,
	},
	views : {
		required: false,
		type: Number,
		default:0
	},
	active : {
		required: false,
		type: Number,
		default:1
	},
	category : {
		required: false,
		type: String,
	},
	address : {
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
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'events'})


module.exports = mongoose.model('events',eventSchema)
