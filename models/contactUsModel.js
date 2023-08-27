const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
	name : {
		required: false,
		type: String,	
	},
    email : {
		required: false,
		type: String,
	},
    phone : {
		required: false,
		type: String,
	},
    message : {
		required: false,
		type: String,	
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Contact_Us'})

module.exports = mongoose.model('Contact_Us',contactUsSchema)
