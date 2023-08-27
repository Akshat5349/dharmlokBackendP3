const dharamshalaModel = require('../models/dharamshalaModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createDharamshala : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let dharamshala = new dharamshalaModel({
                        userId : user.id,
                        bannerImageUrl : req.body.bannerImageUrl,
                        city : req.body.city,
                        description : req.body.description,
                        location: req.body.location,
                        name : req.body.name,
                        relatedImageUrl : req.body.relatedImageUrl,
                        state: req.body.state,
                        language : req.body.language,
                        lattitude : req.body.lattitude,
                        longitude : req.body.longitude
                    })
                    dharamshala.save(function (eor){
                        if(eor) res.status(200).json({success : false,message: 'Something went wrong '+ eor.message})
                        else res.status(200).json({success : true,message: dharamshala})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllDharamshala  : async function(req, res) {
        var dharamshala 
        try{
            if(req.body.state == '' && req.body.city == '' && req.body.language == ''){
            dharamshala =  await dharamshalaModel.find({}).sort([['_id', -1]]);
            }
            else if(req.body.state != '' && req.body.city == ''){
                dharamshala =  await dharamshalaModel.find({$and : [{state : req.body.state},{language : req.body.language},{active : 1}]}).sort([['_id', -1]]);
            }
            else if(req.body.state == '' && req.body.city == ''){
                dharamshala =  await dharamshalaModel.find({language : req.body.language, active : 1}).sort([['_id', -1]]);
            }
            else{
                dharamshala =  await dharamshalaModel.find({$and : [{state : req.body.state},{city : req.body.city},{language : req.body.language},{active : 1}]}).sort([['_id', -1]]);
            }
            res.status(200).json({success : true,message: dharamshala})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getDharamshalaById : async function(req, res) {
        try{
            const dshala =  await dharamshalaModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: dshala})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteDharamshala  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                dharamshalaModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Dharamshala Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateDharamshala : function(req, res){
        let dharamshala;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    dharamshala =  await dharamshalaModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            bannerImageUrl : req.body.bannerImageUrl,
                            city : req.body.city,
                            description : req.body.description,
                            location: req.body.location,
                            name : req.body.name,
                            relatedImageUrl : req.body.relatedImageUrl,
                            state: req.body.state,
                            language : req.body.language,
                            active: req.body.status,
                            lattitude : req.body.lattitude,
                            longitude : req.body.longitude
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: dharamshala})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     },
     updateDharamshalaStatus : function(req, res){
        let dharamshala;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    dharamshala =  await dharamshalaModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active: req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: dharamshala})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}