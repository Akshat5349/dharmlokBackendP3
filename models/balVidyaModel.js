const mongoose = require('mongoose');


const balVidyaSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: false
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
	linkType : {
		required: false,
		type: String,
		default:''
	},
	videoUrl : {
		required: false,
		type: String,
		default:''
	},
	url : {
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
},{collection : 'BalVidya'})


module.exports = mongoose.model('BalVidya',balVidyaSchema)
