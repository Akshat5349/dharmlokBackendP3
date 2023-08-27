const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
	userId : {
		required: false,
		type: String
	},
	name : {
		required: false,
		type: String,
	},
	description : {
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
		default:''
	},
	language : {
		required: false,
		type: String,
		default:''
	},
	PDFuploadUrl : {
		required: false,
		type: String,
		default: ''
	},
	thumbNailImageUrl : {
		required: false,
		type: String,
		default: ''
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
},{collection : 'EBook'})

module.exports = mongoose.model('EBook',ebookSchema)
