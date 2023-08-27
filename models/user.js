const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name : {
		required: true,
		type: String
	},
	phone : {
		required: true,
		type: String,
		unique: true
	},
	email : {
		required: true,
		type: String,
		unique: true
	},
	userType : {
		required: false,
		type: String,
	},
	typeVendor : {
		required: false,
		type: String,
		default:''
	},
	profileImageUrl : {
		required: false,
		type: String,
		default: '1662632016476.webp'
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	coverImageUrl : {
		required: false,
		type: String,
		default:'1662565875921.webp'
	},
	category : {
		required: false,
		type: String,
		default:''
	},
	password :{
		required: true,
		type: String,
	},
	address : {
		required: false,
		type: String,
		default:''
	},
	city : {
		required: false,
		type: String,
		default:''
	},
	state : {
		required: false,
		type: String,
		default:''
	},
	country : {
		required: false,
		type: String,
		default:''
	},
	social : {
		required: false,
		type: Number,
		default: 0 
	},
	active :{
		required : false,
		type: Number,
		default:1
	},
	rank :{
		required : false,
		type: Number,
		default: -1
	},
	pincode : {
		required: false,
		type: String,
		default:''
	},
	availability :{
		required : false,
		type: Number,
		default: 0
	},
	kycApproved :{
		required : false,
		type: Number,
		default: 0
	},
	subscription:{
		required : false,
		type:String,
		default: "none"
	},
	plan_id :{
		required : false,
		type:String,
		default: "none"
	},
	bookAccess :{
		required : false,
		type:Boolean,
		default : false 
	},
	videoAccess :{
		required : false,
		type:Boolean,
		default : false 
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
})

module.exports = mongoose.model('users',userSchema)
