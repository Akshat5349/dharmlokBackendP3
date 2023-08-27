const mongoose = require('mongoose');


const balanceWithdrawal = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
	},
	name : {
		required: false,
		type: String,
	},
	balance : {
		required: false,
		type: Number,
	},
    withDrawal:{
		required: false,
		type: Number,
		default:0,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Withdrawal'})


module.exports = mongoose.model('Withdrawal',balanceWithdrawal)
