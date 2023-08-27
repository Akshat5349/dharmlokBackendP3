const mongoose = require('mongoose');

const eventViewSchema = new mongoose.Schema({
	userId : {
		required: true,
		type: String
	},
	eventId : {
		required: false,
		type: String
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'Event_Views'})

eventViewSchema.index({ userId: 1, eventId: 1}, { unique: true });

module.exports = mongoose.model('Event_Views',eventViewSchema)
