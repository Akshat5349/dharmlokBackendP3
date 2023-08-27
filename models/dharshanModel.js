const mongoose = require('mongoose');


const dharshanSchema = new mongoose.Schema({
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
		type: String
	},
	url : {
		required: false,
		type: String,
	},
	category : {
		required: false,
		type: String,
	},
	type : {
		required: false,
		type: String,
	},
	rank : {
		required: false,
		type: Number,
		default: -1
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Dharshan'})


module.exports = mongoose.model('Dharshan',dharshanSchema)
