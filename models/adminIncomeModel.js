const mongoose = require('mongoose');

const adminIncomeSchema = new mongoose.Schema({
	providerId : {
		required: false,
		type: String
	},
    orderId : {
		required: false,
		type: String
	},
    id : {
		required: false,
		type: String
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
},{collection : 'AdminIncome'})

module.exports = mongoose.model('AdminIncome',adminIncomeSchema)
