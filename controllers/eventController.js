const eventModel = require('../models/eventModel');
const eventViewModel = require('../models/eventViewModel');
const eventCategoryModel = require('../models/eventCategoryModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');


module.exports = {
    addEvent : function(req, res){
        console.log(req.body);
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let event = new eventModel({
                        userId : user.id,
                        title : req.body.title,
                        description : req.body.description,
                        bookingURL : req.body.bookingURL,
                        place : req.body.place,
                        type: req.body.type,
                        location: req.body.location,
                        category: req.body.category,
                        fromDate: req.body.fromDate,
                        toDate: req.body.toDate,
                        fromTime: req.body.fromTime,
                        toTime: req.body.toTime,
                        bannerImageUrl : req.body.bannerImageUrl,
                        relatedImageUrl : req.body.relatedImageUrl,
                        location : req.body.location,
                        cost : req.body.cost,
                        address: req.body.address,
                        lattitude : req.body.lattitude,
                        longitude : req.body.longitude
                    })
                    event.save(function(errorSaving){
                        if(errorSaving) res.status(200).json({success : false,message: 'Something went wrong '+ errorSaving.message})
                        else res.status(200).json({success : true,message: event})
                    });
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myEvents : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const event = await eventModel.find({userId : user.id});
                    res.status(200).json({success : true, event: event, total : event.length})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getEvents : async function(req, res){
        let events;
        let currentDate = new Date().toISOString();
        try{
            events =  await  eventModel.find({category : req.body.category,"toDate": { $gte: currentDate }}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: events})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllEvents : async function(req, res){
        var events,userDetails;
        let currentDate = new Date().toISOString();
        try{
            events =  await  eventModel.find({"toDate": { $gte: currentDate }}).sort([['_id', -1]]).lean();
            if(events.length > 0){
                for(var x = 0 ; x < events.length ; x++){
                    var userDetails = await userModel.find({_id : events[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    events[x].userDetails = userDetails;
                }
            }
            res.status(200).json({success : true, message: events})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getEventDetail : async function(req, res) {
        var events;
        try{
            events =  await  eventModel.find({_id : req.body.id}).sort([['_id', -1]]).lean();
            if(req.body.userId != ''){
                let eventView = new eventViewModel({
                    userId : req.body.userId,
                    eventId : req.body.id
                })
                eventView.save(function(errorSaving){
                    if(errorSaving) {
                        eventModel.findOneAndUpdate({_id : req.body.id},{$inc : {views : 1}}, function(errCoupon, response){});
                        events.view = false
                    }
                    else{
                        events.view = true
                    }
                });
            }
            res.status(200).json({success : true, message: events})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    eventStatus : function(req, res){
        let event;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    event =  await  eventModel.findOneAndUpdate({_id : req.body.eventId}, {approved : req.body.approve},{
                        new: true
                    });
                res.status(200).json({success : true, message: event})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteEvent : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eventModel.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Event Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },

    updateEvent : function(req, res){
        let eventUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    eventUpdate =  await eventModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            title : req.body.title,
                            description : req.body.description,
                            bookingURL : req.body.bookingURL,
                            place : req.body.place,
                            type: req.body.type,
                            location: req.body.location,
                            category: req.body.category,
                            fromDate: req.body.fromDate,
                            toDate: req.body.toDate,
                            fromTime: req.body.fromTime,
                            toTime: req.body.toTime,
                            bannerImageUrl : req.body.bannerImageUrl,
                            relatedImageUrl : req.body.relatedImageUrl,
                            location : req.body.location,
                            cost : req.body.cost,
                            active: req.body.status,
                            address: req.body.address,
                            lattitude : req.body.lattitude,
                            longitude : req.body.longitude
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: eventUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let eventCat = new eventCategoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    eventCat.save(
                        function(errorEventCategory){
                            if(errorEventCategory) res.status(200).json({success : false,message: 'Something went wrong '+errorEventCategory})
                            else res.status(200).json({success : true,message: eventCat})
                        }
                    );
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var eventCat = await eventCategoryModel.find({}).sort([['_id', 'asc']]);
        res.status(200).json({success : true,message: eventCat})
    },
    deleteCategory : function(req, res){
        try{

            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eventCategoryModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Category Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateEventViewStatus : function(req, res){
        let eventUpdate;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    eventUpdate =  await eventModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active: req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: eventUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}