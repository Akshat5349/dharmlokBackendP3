const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String,
		required : true
	},
	postId : {
		required: true,
		type: String,
		required: true
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'like'})

likeSchema.index({
	userId: 1,
	postId: 1,
  }, 
  {
	unique: true,
  });

module.exports = mongoose.model('like',likeSchema)
