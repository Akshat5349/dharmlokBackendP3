const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	type : {
		required: false,
		type: String,	
	},
    ItemObject : {
		required: false,
		type: Object,
        default:''	
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'BookMarks'})

module.exports = mongoose.model('BookMarks',bookmarkSchema)
