const enquireModel = require('../models/enquireModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addEnquiry : function(req, res){
        try{
                let enquiry = new enquireModel({
                    name : req.body.name,
                    phone : req.body.phone,
                    serviceId : req.body.serviceId,
                    providerId : req.body.providerId,
                    city : req.body.city,
                    state : req.body.state,
                })
                enquiry.save(function (eor){
                    if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                    else res.status(200).json({success : true,message: enquiry})
                });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllEnquiry : async function(req, res) {
        try{
                var enquiry =  await enquireModel.find({}).sort([['_id', -1]]);
                res.status(200).json({success : true,message: enquiry})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}