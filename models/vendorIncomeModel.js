const mongoose = require('mongoose');

const vendorIncomeSchema = new mongoose.Schema({
	providerId : {
		required: true,
		type: String
	},
	id : {
		required: false,
		type: String,	
	},
	balance : {
		required: false,
		type: Number,
        default:0	
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Vendor Income'})

module.exports = mongoose.model('Vendor Income',vendorIncomeSchema)
