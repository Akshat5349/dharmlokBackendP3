const bookmarkModel = require('../models/bookmarkModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');


module.exports = {
    addBookMark : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                if(user){
                    var bookmark = new bookmarkModel({
                        userId : user.id,
                        type : req.body.type,
                        ItemObject : req.body.ItemObject
                    })
                    bookmark.save(function(eor,data){
                        if(eor) res.status(400).json({success : false,message: 'Something went wrong '+ eor.message})
                        else res.status(200).json({success : true,message: bookmark})
                    });
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getBookMarks  : async function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else if(user != null){
                    var bookmark =  await bookmarkModel.find({userId : user.id}).sort([['_id', -1]]).lean();
                    res.status(200).json({success : true,message: bookmark})
                }
                else{
                    res.status(400).json({success : false,message: 'No User found'})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    checkBookmark : async function(req,res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else if(user != null){
                    var bookmark =  await bookmarkModel.find({userId : user.id}).sort([['_id', -1]]).lean();
                    console.log(req.body);
                    const find = bookmark.find(el=>el.userId=user.id&&el.ItemObject._id==req.body['object_id'])
                    if(find){
                        res.status(200).json({success : true,message: {isBookmark : true,id : find._id}})
                    }
                    else{
                        res.status(200).json({success : true,message: {isBookmark : false}})
                    }
                    
                }
                else{
                    res.status(400).json({success : false,message: {isBookmark : false}})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteBookMark  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                bookmarkModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Item Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}