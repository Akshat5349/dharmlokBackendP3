const mongoose = require('mongoose');

const audioPlaylistSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	name : {
		required: false,
		type: String,
		unique: true
	},
	imageUrl : {
		required: false,
		type: String,
	},
	category :{
		required : false,
		type : String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Audio Playlist'})

module.exports = mongoose.model('Audio Playlist',audioPlaylistSchema)
