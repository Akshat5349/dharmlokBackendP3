const adModel = require('../models/adModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');


module.exports = {
    createAd : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let ad = new adModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        phone : req.body.phone,
                    })
                    ad.save(function (eor){
                        if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                        else res.status(200).json({success : true,message: ad})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllAd : async function(req, res) {
        try{
            var userDetails, ad;
            if(req.body.userId == ''){
                ad =  await adModel.find({}).sort([['_id', -1]]).lean();
            }
            else{
                ad =  await adModel.find({userId : req.body.id}).sort([['_id', -1]]).lean();
            }
            if(ad.length > 0){
                for(var x = 0 ; x < ad.length ; x++){
                    userDetails = await userModel.find({_id : ad[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    ad[x].userDetails = userDetails;
                }
            }
            res.status(200).json({success : true,message: ad})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAdById : async function(req, res) {
        try{
            const ad =  await adModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: ad})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteAd : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                adModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Ad Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAd : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var ad =  await adModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            phone : req.body.phone
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: ad})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}