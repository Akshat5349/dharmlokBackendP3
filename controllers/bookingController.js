const bookingModel = require('../models/bookingModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');
const templeModel = require('../models/templeModel');
const dharamshalaModel = require('../models/dharamshalaModel');


module.exports = {
    createBooking : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                let booking = new bookingModel({
                    userId : user.id,
                    id : req.body.id,
                    type : req.body.type,
                    name : req.body.name,
                    email : req.body.email,
                    country : req.body.country,
                    description: req.body.description,
                    duration : req.body.duration,
                    date : req.body.date,
                    person: req.body.person,
                    phone: req.body.phone,
                })
                await booking.save(function(eor){
                    if(eor) res.status(200).json({success : false,message: 'Something went wrong '+ eor.message})
                    else res.status(200).json({success : true,message: booking})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllBooking  : async function(req, res) {
        try{
            var booking =  await bookingModel.find({type : req.body.type}).sort([['_id', -1]]).lean();
            if(booking.length > 0){
                for(var x = 0 ; x < booking.length ; x++){
                    var userDetails = await userModel.find({_id : booking[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    booking[x].userDetails = userDetails;
                    var templeDetails = await templeModel.findOne({_id : booking[x].id});
                    var dharmshalaDetails = await dharamshalaModel.findOne({_id : booking[x].id});
                    booking[x].templeDetails = templeDetails;
                    booking[x].dharmshalaDetails = dharmshalaDetails;
                }
            }
            res.status(200).json({success : true,message: booking})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getBookingById : async function(req, res) {
        try{
            const booking =  await bookingModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: booking})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteBooking  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                bookingModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Booking Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myBooking : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var booking =  await bookingModel.find({$and : [{userId : user.id},{type : req.body.type}]}).sort([['_id', -1]]).lean();
                    if(booking.length > 0){
                        for(var x = 0 ; x < booking.length ; x++){
                            var userDetails = await userModel.find({_id : booking[x].userId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                            booking[x].userDetails = userDetails;
                            var templeDetails = await templeModel.findOne({_id : booking[x].id});
                            var dharmshalaDetails = await dharamshalaModel.findOne({_id : booking[x].id});
                            booking[x].templeDetails = templeDetails;
                            booking[x].dharmshalaDetails = dharmshalaDetails;
                        }
                    }
                    res.status(200).json({success : true,message: booking})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBooking : function(req, res){
        let bookng;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    bookng =  await bookingModel.findOneAndUpdate({_id : req.body.id, userId : user.id}, 
                        {
                            name : req.body.name,
                            email : req.body.email,
                            country : req.body.country,
                            description: req.body.description,
                            duration : req.body.duration,
                            date : req.body.date,
                            person: req.body.person,
                            phone: req.body.phone,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: bookng})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}