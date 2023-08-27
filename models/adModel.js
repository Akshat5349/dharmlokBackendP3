const mongoose = require('mongoose');


const adSchema = new mongoose.Schema({
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
		type: String
	},
	description : {
		required: false,
		type: String,
	},
    approved : {
		required: false,
		type: Number,
        default:0
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Ad'})


module.exports = mongoose.model('Ad',adSchema)
