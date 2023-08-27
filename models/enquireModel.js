const mongoose = require('mongoose');

const enquiryScheme = new mongoose.Schema({
	name : {
		required: false,
		type: String
	},
    phone : {
		required: false,
		type: String
	},
    serviceId : {
		required: false,
		type: String,
	},
	providerId : {
		required: false,
		type: String
	},
	city : {
		required: false,
		type: String,
	},
	state : {
		required: false,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Enquiry'})

module.exports = mongoose.model('Enquiry',enquiryScheme)
