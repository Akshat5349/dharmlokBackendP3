const mongoose = require('mongoose');


const audioSchema = new mongoose.Schema({
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
		type: String
	},
	category : {
		required: false,
		type: String,
	},
	playlist : {
		required: false,
		type: String,
		default:''
	},  
    bannerImageUrl : {
		required: false,
		type: String,
	},
    audioUrl : {
		required: false,
		type: String,
    
	},  
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Audio'})


module.exports = mongoose.model('Audio',audioSchema)
