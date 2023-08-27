const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
		unique:false
	},	
	postId : {
		required: false,
		type: String,
		unique:false
	},
	comment : {
		required: false,
		type: String,
		unique:false
	},
	approved:{
		required: false,
		type: Number,
		default:0,
		unique:false
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'comments'})


module.exports = mongoose.model('comments',commentSchema)
