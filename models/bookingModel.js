const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	userId :{
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String
	},
	id : {
		required: false,
		type: String
	},
	type : {
		required: false,
		type: String
	},
	email : {
		required: false,
		type: String,
	},
	country : {
		required: false,
		type: String,
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	date : {
		required: false,
		type: String,
		default:''
	},
	duration : {
		required: false,
		type: Number,
		default:0
	},
	person : {
		required: false,
		type: Number,
		default:0
	},
	phone : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Booking'})

module.exports = mongoose.model('Booking',bookingSchema)
