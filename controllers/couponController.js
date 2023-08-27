const couponModel = require('../models/couponModel');
const couponLogModel = require('../models/couponLogModel');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");


module.exports = {
    addCoupon : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var coupon =  await couponModel.findOne({codeName : req.body.codeName});
                    if(coupon == null){
                        var couponAdd = new couponModel({
                            codeName : req.body.codeName,
                            discount : req.body.discount,
                            validTill : req.body.validTill,
                            userLimit : req.body.userLimit,
                        })
                        couponAdd.save(function(eor){
                            if(eor) res.status(400).json({success : false ,message: 'Something went wrong '+eor.message})
                            else res.status(200).json({success : true,message: coupon})
                        });
                    }
                    else{
                        if(coupon.status == 0){
                            var couponAdd = new couponModel({
                                codeName : req.body.codeName,
                                discount : req.body.discount,
                                validTill : req.body.validTill,
                                userLimit : req.body.userLimit,
                            })
                            couponAdd.save(function(eor){
                                if(eor) res.status(400).json({success : false ,message: 'Something went wrong '+eor.message})
                                else res.status(200).json({success : true,message: coupon})
                            });
                        }
                        else res.status(400).json({success : false ,message: 'Coupon name already used. Please change status of previous to add new.'})
                    }
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCoupons : async function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const coupon =  await couponModel.find({}).sort([['_id', -1]]);
                    res.status(200).json({success : true,message: coupon})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    applyCoupon : async function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var coupon =  await couponModel.findOne({codeName : req.body.codeName});
                if(coupon != null){
                    res.status(200).json({success : true,message: coupon})
                }
                else{
                    res.status(400).json({success : false,message: 'No Coupon Found'})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateCouponStatus : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var coupon =  await couponModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            status : req.body.status,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: coupon})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateCouponDetails : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var coupon =  await couponModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            discount : req.body.discount,
                            validTill : req.body.validTill,
                            userLimit : req.body.userLimit,
                            timesUsed : req.body.timesUsed
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: coupon})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteCoupon : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                coupon.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Coupon Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getCouponUsage : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var coupon = await couponModel.find({_id : req.body.id});
                    var couponDetail =  await couponLogModel.find({couponId : req.body.id}).lean();
                    if(couponDetail != null){
                        for(var x = 0; x < couponDetail.length; x++){
                            var userDetail = await userModel.findOne({_id : couponDetail[x].userId}).select("name").select("email").select("phone")
                            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('address')
                            .sort([['_id', -1]]);
                            couponDetail[x].userDetail = userDetail
                        }
                    }
                    res.status(200).json({success : true,coupon: coupon, couponDetail : couponDetail}) 
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}