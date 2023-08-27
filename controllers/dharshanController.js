const dharshanModel = require('../models/dharshanModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createDharshan : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let dharshan = new dharshanModel({
                        userId : user.id,
                        title : req.body.title,
                        description : req.body.description,
                        url : req.body.url,
                        type : req.body.type,
                        category : req.body.category
                    })
                    dharshan.save(function (eor){
                        if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                        else res.status(200).json({success : true,message: dharshan})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllDharshan : async function(req, res) {
        try{
            var dharshan;
            if(req.body.category == ''){
                dharshan =  await dharshanModel.find({}).sort([['rank', -1]]);
            }
            else{
                dharshan =  await dharshanModel.find({category : req.body.category}).sort([['rank', -1]]);
            }
            res.status(200).json({success : true,message: dharshan})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getDharshanById : async function(req, res) {
        try{
            const dharshan =  await dharshanModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: dharshan})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteDharshan : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                dharshanModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Dharshan Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateDharshan : function(req, res){
        let dharshan;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    dharshan =  await dharshanModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            title : req.body.title,
                            description : req.body.description,
                            url : req.body.url,
                            type : req.body.type,
                            category : req.body.category
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: dharshan})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    updateDharshanRank : function(req, res){
        let dharshan;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    dharshan =  await dharshanModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            rank : req.body.rank
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: dharshan})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    }
}