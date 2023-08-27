const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
},{collection : 'Event Category'})

module.exports = mongoose.model('Event Category',eventSchema)
