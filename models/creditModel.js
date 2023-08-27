const mongoose = require('mongoose');


const creditSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
	},
	amount : {
		required: false,
		type: Number,
        default:0
	},
    transactionId:{
		required: false,
		type: String,
		default:'',
	},
    date:{
		required: false,
		type: String,
		default:'',
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Credit'})


module.exports = mongoose.model('Credit',creditSchema)
