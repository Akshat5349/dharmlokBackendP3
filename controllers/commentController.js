const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");


module.exports = {
    commentPost : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var comment = new commentModel({
                        userId : user.id,
                        postId : req.body.postId,
                        comment : req.body.comment,
                    })
                    comment.save(function(eor){
                        if(eor) res.status(200).json({success : true,message: 'Something went wrong '+ eor.message});
                        else{
                            let id = req.body.postId
                            postModel.findOneAndUpdate({_id : id }, {$inc : {comment : 1}}, {new : true}, function(error, response){
                                if (error) res.status(200).json({success : false ,message: 'Something went wrong'});
                                else res.status(200).json({success : true,message: comment});
                            });
                        }
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllComment : async function(req, res) {
        var comment,postUserDetail, commentUserDetails,postDetails;
        try{
            comment =  await  commentModel.find({}).sort([['_id', -1]]).lean();
            if(comment.length > 0){
                for(var x = 0; x < comment.length ; x++){
                    commentUserDetails = await userModel.find({_id : comment[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    postDetails = await postModel.findOne({postId : comment[x].postId}).sort([['_id', -1]]);
                    postUserDetail = await userModel.find({_id : postDetails.userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    comment[x].commentUserDetails = commentUserDetails;
                    comment[x].postDetails = postDetails;
                    comment[x].postUserDetail = postUserDetail;
                }
            }
            res.status(200).json({success : true, message: comment})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getPostComment : async function(req, res){
        try{
            var comments = await commentModel.find({postId : req.body.postId, approved : 1}).sort([['createdAt', -1]]).lean();
            if(comments != null){
                if(comments.length > 0){
                    for(var x = 0; x < comments.length ; x++){
                        commentUserDetails = await userModel.findOne({_id : comments[x].userId}).select("name").select("profileImageUrl");
                        comments[x].userName = commentUserDetails.name;
                        comments[x].profileImageUrl = commentUserDetails.profileImageUrl;
                    }
                }
            }
            res.status(200).json({success : true,message: comments})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    commentStatus : function(req, res){ 
        let comment;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    comment =  await  commentModel.findOneAndUpdate({_id : req.body.commentId}, {approved : req.body.approve},{
                        new: true
                    });
                res.status(200).json({success : true, message: comment})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    }
}