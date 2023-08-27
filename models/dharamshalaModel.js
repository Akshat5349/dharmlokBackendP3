const mongoose = require('mongoose');

const dharamshalaSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	bannerImageUrl : {
		required: false,
		type: String,
		default:''
	},
	city : {
		required: false,
		type: String,
		default:''
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	location : {
		required: false,
		type: String,
		default:''
	},
	name : {
		required: false,
		type: String,
		default:''
	},
	relatedImageUrl : {
		required: false,
		type: String,
		default:''
	},
	state : {
		required: false,
		type: String,
		default:''
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
},{collection : 'Dharamshala'})

module.exports = mongoose.model('Dharamshala',dharamshalaSchema)
