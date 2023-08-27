const homeModel = require('../models/homeModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addHomePage : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let home = new homeModel({
                        userId : user.id,
                        imageUrl : req.body.imageUrl,
                        title : req.body.title,
                        description : req.body.description,
                        link : req.body.link,
                        phone : req.body.phone,
                        type: req.body.type,
                        thoughtTitle : req.body.thoughtTitle,
                        thoughtBody : req.body.thoughtBody,
                        date: req.body.date
                    })
                    home.save();
                    res.status(200).json({success : true,message: home})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getHomePageDetails : async function(req, res) {
        try{
            var home =  await homeModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: home})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getHomePageDetailsById : async function(req, res) {
        try{
            var homeDetail =  await homeModel.find({_id : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: homeDetail})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    updateHomePageDetails : async function(req, res) {
        let homePage;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    homePage =  await homeModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            imageUrl : req.body.imageUrl,
                            title : req.body.title,
                            description : req.body.description,
                            link : req.body.link,
                            phone : req.body.phone,
                            type: req.body.type,
                            thoughtTitle : req.body.thoughtTitle,
                            thoughtBody : req.body.thoughtBody,
                            date: req.body.date
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: homePage})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteHome : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                homeModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Deleted Success'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}