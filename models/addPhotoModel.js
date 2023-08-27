const mongoose = require('mongoose');


const addPhotoSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	title : {
		required: false,
		type: String
	},
	imageUrl : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Photos'})

module.exports = mongoose.model('Photos',addPhotoSchema)
