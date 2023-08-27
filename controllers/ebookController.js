const eBookModel = require('../models/ebookModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createEbook : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let ebook = new eBookModel({
                        userId : user.id,
                        name : req.body.name,
                        description : req.body.description,
                        category : req.body.category,
                        type : req.body.type,
                        PDFuploadUrl : req.body.PDFuploadUrl,
                        thumbNailImageUrl: req.body.thumbNailImageUrl,
                        language : req.body.language
                    })
                    ebook.save(function(eror){
                        if(eror) res.status(200).json({success : false,message: 'Something went wrong '+eror.message})
                        else res.status(200).json({success : true,message: ebook})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllEbook : async function(req, res) {
        var ebook
        try{
            if(req.body.category == '' && req.body.type == '' && req.body.language == ''){
                ebook =  await eBookModel.find({}).sort([['_id', -1]]);
            }
            else if(req.body.category == '' && req.body.type == ''){
                ebook =  await eBookModel.find({language : req.body.language, active : 1}).sort([['_id', -1]]);
            }
            else if(req.body.language == ''){
                ebook =  await eBookModel.find({$and: [{category : req.body.category, type : req.body.type}]}).sort([['_id', -1]]);
            }
            else{
                ebook =  await eBookModel.find({$and: [{category : req.body.category, type : req.body.type,language : req.body.language}]}).sort([['_id', -1]]);
                
            }
            res.status(200).json({success : true,message: ebook})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getEbookById : async function(req, res) {
        try{
            const ebook =  await eBookModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: ebook})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteEbook : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                eBookModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'EBook Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateEbook : function(req, res){
        let ebook;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    ebook =  await eBookModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                            description : req.body.description,
                            category : req.body.category,
                            type : req.body.type,
                            PDFuploadUrl : req.body.PDFuploadUrl,
                            language : req.body.language,
                            active : req.body.status,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: ebook})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    updateEbookStatus : function(req, res){
        let ebook;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    ebook =  await eBookModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active : req.body.status,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: ebook})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    }
}