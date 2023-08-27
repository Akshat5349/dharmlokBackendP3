const balVidyaModel = require('../models/balVidyaModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createBalVidya : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let balVidya = new balVidyaModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        category : req.body.category,
                        type : req.body.type,
                        linkType : req.body.linkType,
                        videoUrl : req.body.videoUrl,
                        url : req.body.url,
                        PDFuploadUrl : req.body.PDFuploadUrl,
                        thumbNailImageUrl: req.body.thumbNailImageUrl,
                        language : req.body.language
                    })
                    balVidya.save(function(eor){
                        if(eor) res.status(200).json({success : false ,message: 'Something went wrong '+ eor.message});
                        else res.status(200).json({success : true,message: balVidya})
                    });
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllBalVidya : async function(req, res) {
        try{
            var bal;
            if(req.body.name == '' && req.body.linkType == '' && req.body.category == '' && req.body.language == ''){
                bal =  await balVidyaModel.find({}).sort([['_id', -1]]);
            }
            else if(req.body.linkType != '' && req.body.language == ''){
                bal =  await balVidyaModel.find({linkType: req.body.linkType}).sort([['_id', -1]]);
            }
            else if(req.body.name == ''){
                bal =  await balVidyaModel.find({linkType: req.body.linkType, category : req.body.category, language : req.body.language, active : 1}).sort([['_id', -1]]);
            }
            // else if(req.body.name == '' && req.body.linkType == '' && req.body.category != ''){
            //     bal =  await balVidyaModel.find({category : req.body.category}).sort([['_id', -1]]);
            // }
            // else if(req.body.name != '' && req.body.linkType == '' && req.body.category == ''){
            //     bal =  await balVidyaModel.find({name : req.body.name}).sort([['_id', -1]]);
            // }
            // else if(req.body.name == '' && req.body.linkType != '' && req.body.category != ''){
            //     bal =  await balVidyaModel.find({linkType: req.body.linkType, category : req.body.category}).sort([['_id', -1]]);
            // }
            // else {
            //     bal =  await balVidyaModel.find({name : req.body.name, linkType: req.body.linkType, category : req.body.category}).sort([['_id', -1]]);
            // }
            else{
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.name, 'i'),
                    language : req.body.language
                };
                bal =  await balVidyaModel.find(queryString).sort([['_id', -1]]);
            }
            res.status(200).json({success : true,message: bal})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getBalVidyaById : async function(req, res) {
        try{
            const balVidya =  await balVidyaModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: balVidya})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteBalVidya : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                balVidyaModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Bal Vidya Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBalVidya : function(req, res){
        let balVidya;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    balVidya =  await balVidyaModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            category : req.body.category,
                            type : req.body.type,
                        linkType : req.body.linkType,
                        videoUrl : req.body.videoUrl,
                        url : req.body.url,
                            PDFuploadUrl : req.body.PDFuploadUrl,
                            thumbNailImageUrl: req.body.thumbNailImageUrl,
                            language : req.body.language,
                            active : req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: balVidya})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     },
     updateBalVidyaStatus : function(req, res){
        let balVidya;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    balVidya =  await balVidyaModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active : req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: balVidya})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}