const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	userName : {
		required: false,
		type: String
	},
	userImage : {
		required: false,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	imageUrl : {
		required: false,
		type: String,
		default:''
	},
	videoUrl : {
		required: false,
		type: String,
		default:''
	},
	postType : {
		required: false,
		type: String,
	},
	like : {
		required: false,
		type: Number,
		default: 0
	},
	comment : {
		required: false,
		type: Number,
		default:0
	},
	userType : {
		required: false,
		type: Number,
		default:0 //0 for kathavachak and 1 for dharamguru
	},
	isLiked : {
		required: false,
		type: Boolean,
		default: false
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'posts'},)

module.exports = mongoose.model('posts',postSchema)
