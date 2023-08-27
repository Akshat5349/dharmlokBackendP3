const biographyModel = require('../models/biographyModel');
const userModel = require('../models/user');
const addPhotoModel = require('../models/addPhotoModel');
const addVideoModel = require('../models/addVideoModel');
const serviceProviderModel = require('../models/serviceProviderModel');
const jwt = require("jsonwebtoken");
var request = require('request');
const orderModel = require('../models/orderModel');
const vendorIncomeModel = require('../models/vendorIncomeModel');
const creditModel = require('../models/creditModel');
const bcrypt = require("bcryptjs");

var aws = require('aws-sdk');

const awsConfig = { 
    accessKeyId: "AKIAYAR76KDVFMFGCW32",
    secretAccessKey: "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",
    region : "us-east-1"
}

const ses = new aws.SES(awsConfig)

const sendEmail = async (emailId, token) => {

    try{
        var params = {
            Source: "donotreply@dharmlok.com",
            Destination: {
                ToAddresses: [
                  emailId
                ],
              },
            Message : {
                Subject : {
                    Charset : "UTF-8",
                    Data : "Forget Password"
                },
                Body : {
                    Html : {
                        Charset : "UTF-8",
                        Data : `<html>
                        <body>
                            
                            <!-- © Dharmlok. All rights reserved. -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
                        <tbody>
                            <tr>
                                <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="background-color:#33160f;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
                                                                    <a href="#" style="text-decoration:none" target="_blank">
                                                                        <img alt="" border="0" src="https://dharmlok.com/assets/images/logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                                    <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Forgot password</h4>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                                    <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">We would like to inform you that someone has requested forgot password, if you haven’t done, no need to worry. If you have requested, please click on following link to reset your password:</p>
                                                                                    <!-- <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:left;padding:0;margin:0">Visit our website www.dharmlok.com and access features using your credentials that you have used while registration. </p> -->
                    
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" align="center">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="background-color: #e41032; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="https://www.dharmlok.com/#/login/forget-password?token=`+token+`" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Reset Password</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                            </tr>
                                                        
                                                        </tbody>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks">
                                                                    <a href="#facebook-link" style="display:inline-block" target="_blank" class="facebook">
                                                                        <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                                    </a>
                                                                    <a href="#twitter-link" style="display: inline-block;" target="_blank" class="twitter">
                                                                        <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                                    </a>
                                                                    <a href="#instagram-link" style="display: inline-block;" target="_blank" class="instagram">
                                                                        <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <!-- <tr>
                                                                <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                                                                    <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;Vespro Inc. | 800 Broadway, Suite 1500 | New York, NY 000123, USA.</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 0px 10px 20px;" align="center" valign="top" class="footerLinks">
                                                                    <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"> <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">View Web Version </a>&nbsp;|&nbsp; <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Email Preferences </a>&nbsp;|&nbsp; <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Privacy Policy</a>
                                                                    </p>
                                                                </td>
                                                            </tr> -->
                                                            <tr>
                                                                <td style="padding: 0px 10px 10px;" align="center" valign="top" class="footerEmailInfo">
                                                                    <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please contact us <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">contact@dharmlok.com.</a>
                                                                        <br> <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Unsubscribe</a> from our mailing lists</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks">
                                                                    <a href="#Play-Store-Link" style="display: inline-block;" target="_blank" class="play-store">
                                                                        <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/play-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120">
                                                                    </a>
                                                                    <a href="#App-Store-Link" style="display: inline-block;" target="_blank" class="app-store">
                                                                        <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/app-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                        </body>
                    </html>`
                    }
                } 
            }
        }
        await ses.sendEmail(params).promise();
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    userDetails : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.find({_id : req.body.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").select("kycApproved").select("address")
                    .select('city').select('state');
                    res.status(200).json({success : true,userDetails: userDetail})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myDetails : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userDetail = await userModel.find({_id : user.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("address")
                    .select("availability").select("kycApproved").select('city').select('state');
                    res.status(200).json({success : true,message: userDetail})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    changeUserStatus : function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let userStauts =  await userModel.findOneAndUpdate({_id : req.body.id}, {
                        active : req.body.active
                    },{
                        new: true
                    });
                    res.status(200).json({success : true, message: userStauts})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiography : async function(req, res){
        let userDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    userDetails =  await userModel.findOneAndUpdate({_id : user.id}, {
                        description : req.body.description,
                        profileImageUrl : req.body.profileImageUrl,
                        coverImageUrl : req.body.coverImageUrl,
                        category : req.body.category},{
                        new: true
                    });
                    res.status(200).json({success : true, message: userDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiographyVendor : async function(req, res){
        let vndrDetails;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    vndrDetails =  await userModel.findOneAndUpdate({_id : user.id}, {
                        name : req.body.name,
                        address : req.body.address,
                        profileImageUrl : req.body.profileImageUrl,
                        city : req.body.city,
                        state : req.body.state,
                    },{
                        new: true
                    });
                    res.status(200).json({success : true, message: vndrDetails})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateBiographyServiceProvider : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var details = await serviceProviderModel.findOne({userId : req.body.userId});
                    if(details == null){
                        var srvPvdrDetails =  new serviceProviderModel({
                            userId : req.body.userId,
                            name : req.body.name,
                            address : req.body.address,
                            buisnessName: req.body.buisnessName,
                            profileImageUrl: req.body.profileImageUrl,
                            gstNo: req.body.gstNo,
                            panNo: req.body.panNo,
                            aadhaarNo: req.body.aadhaarNo,
                            bankName: req.body.bankName,
                            IFSC: req.body.ifsc,
                            accountNo: req.body.accountNo,
                            panUrl: req.body.panUrl,
                            gstUrl: req.body.gstUrl,
                            aadhaarImageUrl: req.body.aadhaarImageUrl,
                            comment : req.body.comment
                        });
                        srvPvdrDetails.save(function (eor){
                            if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                            else res.status(200).json({success : true,message: srvPvdrDetails})
                        });
                    }
                    else{
                        var updatedDetails =  await serviceProviderModel.findOneAndUpdate({userId : req.body.userId}, {
                            name : req.body.name,
                            address : req.body.address,
                            buisnessName: req.body.buisnessName,
                            profileImageUrl: req.body.profileImageUrl,
                            gstNo: req.body.gstNo,
                            panNo: req.body.panNo,
                            aadhaarNo: req.body.aadhaarNo,
                            bankName: req.body.bankName,
                            IFSC: req.body.ifsc,
                            accountNo: req.body.accountNo,
                            panUrl: req.body.panUrl,
                            gstUrl: req.body.gstUrl,
                            aadhaarImageUrl: req.body.aadhaarImageUrl,
                            comment : req.body.comment
                        },{ 
                           new : true
                        });
                        res.status(200).json({success : true,message: updatedDetails})
                    }
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateVendorRank : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var vendorRank =  await userModel.findOneAndUpdate({_id : req.body.id}, {
                        rank : req.body.rank
                    },{ 
                       new : true
                    });
                    res.status(200).json({success : true, message: vendorRank})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateVendorAvailability : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var vendorRank =  await userModel.findOneAndUpdate({_id : req.body.id}, {
                        availability : req.body.availability
                    },{ 
                       new : true
                    });
                    res.status(200).json({success : true, message: vendorRank})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateVendorProfile : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                     var vendorProfile =  await userModel.findOneAndUpdate({_id : req.body.id}, {
                        name : req.body.name,
                        description : req.body.description,
                        coverImageUrl : req.body.coverImageUrl,
                        category : req.body.category,
                        address : req.body.address
                    },{ 
                        new: true
                    });
                    res.status(200).json({success : true, message: vendorProfile})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updatePassword : async function(req, res){
        try{
            jwt.verify(req.body.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: 'Token expired.'});
                else{
                    const salt = await bcrypt.genSalt(10);
                    var newPassword = await bcrypt.hash(req.body.password, salt);
                    await userModel.findOneAndUpdate({_id : user.id}, {
                        password : newPassword
                    },{ 
                        new: true
                    });
                    res.status(200).json({success : true, message: 'Successfully updated.'})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    myBiography : async function(req, res){ 
        try{
            let userDetail = await userModel.findOne({_id : req.body.id}).select("name").select("email").select("phone")
            .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank").select("availability").select("kycApproved");
            const images = await addPhotoModel.find({userId : user.id});
            const videos = await addVideoModel.find({userId : user.id});
            // var myIncome =  await vendorIncomeModel.findOne({providerId : req.body.id}).select('balance');
            // if(myIncome.length != null) {
            //     vendorDetails.totalIncome = myIncome.balance   
            // }
            // else{
            //     vendorDetails.totalIncome = 0
            // }
            res.status(200).json({success : true, biography: userDetail, photos : images.length, videos: videos.length})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    vendorBiography : async function(req, res){ 
        try{
            var vendorDetails = await userModel.findOne({_id : req.body.id}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("address").select("active").select('rank').select('city')
                    .select('state').select("availability").select("kycApproved").lean();
            //         var myIncome =  await vendorIncomeModel.findOne({providerId : req.body.id}).select('balance');
            // if(myIncome != null) {
            //     vendorDetails.totalIncome = myIncome.balance   
            // }
            // else{
            //     vendorDetails.totalIncome = 0
            // }
            //var creditAccount =  await creditModel.find({userId : req.body.id}).sort([['_id', -1]]).lean();
            var images = await addPhotoModel.find({userId : req.body.id});
            var videos = await addVideoModel.find({userId : req.body.id});
            // var providerDetails = await serviceProviderModel.find({userId : req.body.id});
            // vendorDetails.providerDetail = providerDetails
            //vendorDetails.paymentRecord = creditAccount
            res.status(200).json({success : true, biography:vendorDetails, photos : images.length, videos: videos.length})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserPhotos : async function(req, res){ 
        try{
            const images = await addPhotoModel.find({userId : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: images})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteUserPhoto : async function(req, res){ 
        try{
            addPhotoModel.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                else res.status(200).json({success : true, message: 'Photo Deleted'})
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteUserVideo : async function(req, res){ 
        try{
            addVideoModel.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                else res.status(200).json({success : true, message: 'Video Deleted'})
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserVideos : async function(req, res){ 
        try{
            const videos = await addVideoModel.find({userId : req.body.id}).sort([['_id', -1]]);
            res.status(200).json({success : true, message: videos})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserKycDetails : async function(req, res){ 
        try{
            const kycDetails = await serviceProviderModel.findOne({userId : req.body.id});
            res.status(200).json({success : true, message: kycDetails})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addPhoto : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let addPhoto = new addPhotoModel({
                        userId : user.id,
                        description : req.body.description,
                        title : req.body.title,
                        imageUrl : req.body.imageUrl,
                    })
                    addPhoto.save(function (eror){
                        if(eror) res.status(200).json({success : false, message: 'Something went wrong '+eror.message})
                        else res.status(200).json({success : true, message: addPhoto})
                    });
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addVideo : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let addVideo = new addVideoModel({
                        userId : user.id,
                        title : req.body.title,
                        description : req.body.description,
                        videoUrl : req.body.videoUrl,
                    })
                    addVideo.save(function (eor){
                        if(eor) res.status(200).json({success : false, message: 'Something went wrong '+eor.message})
                        else res.status(200).json({success : true, message: addVideo})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getPhoto : async function(req, res){ 
        try{
            const photoDetails = await addPhotoModel.findOne({_id : req.body.id});
            res.status(200).json({success : true, message: photoDetails})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getVideo : async function(req, res){ 
        try{
            const videoDetails = await addVideoModel.findOne({_id : req.body.id});
            res.status(200).json({success : true, message: videoDetails})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getTypeVendor : async function(req, res){ 
        var vendor;
        try{
             if(req.body.category == ''){
                vendor = await userModel.find({typeVendor : req.body.typeVendor}).select("name").select("email").select("phone")
                .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active').select("rank")
                .select("city").select("state").select("availability").select("kycApproved")
             }
             else{
                vendor = await userModel.find({$and : [{typeVendor : req.body.typeVendor},{category : req.body.category},{ active : 1}]}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select('typeVendor').select('userType').select('active').select("rank")
                    .select("city").select("state").select("availability").select("kycApproved")
                }
            res.status(200).json({success : true, message: vendor})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getallUsers : function(req, res){ 
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    const users = await userModel.find({userType : 'user'}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active").select("rank")
                    .sort([['_id', -1]]);
                    res.status(200).json({success : true, message: users})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByVendorName : async function(req, res){
        try{
            var users = await userModel.find({name: { $regex: '.*' + req.body.name + '.*' }, userType : 'vendor'}).sort([['rank', 'desc']]);
            res.status(200).json({success : true, message: users})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getPanchang : async function(req, res){
        try{
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();  
            var date = day + "/" + month + "/" + year;
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            var seconds = date_ob.getSeconds();
            var time = hours + ":" + minutes + ":" + seconds;
            request.get('http://api.panchang.click/v0.4/panchangapi?date='+date+'&time='+time+'&tz=5.5&userid=jinendr&authcode=94a3c560d624bea016680336a4d2d20b', function (error, response, body) {
                if(!error){
                    res.status(200).json({success : true, message: body})
                }
                else{
                    res.status(200).json({success : true, message: error})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    approveUserKyc : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var userUpdate =  await userModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            kycApproved : req.body.approved,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: userUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getUserLocation : async function(req, res){
        try{
            request.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+req.body.lat+','+req.body.lon+'&sensor=true&key=AIzaSyAk6Jv3vNxZ4MjhAZBACFvXDJ3ICOp2auk', function (error1, response1, latLon) {
                if(!error1){
                    //res.status(200).json({success : true, message: JSON.parse(latLon).results[0].address_components[4].long_name}) 
                    const addressComponents = JSON.parse(latLon).results[0].address_components;
                    const filteredArray = addressComponents.filter(
                        address_component => address_component.types.includes("locality")
                    );
                    res.status(200).json({success : true, message: filteredArray[0].long_name}) 
                }
                else{
                    res.status(400).json({success : false, message: error1})
                }
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    generateToken : async function(req, res){
        try{
            var user = await userModel.findOne({email : req.body.email}).select('_id')
            if(user){
                const payload = {id: user._id};
                jwt.sign(
                    payload,
                    "bootspider", {
                        expiresIn: '1d'
                    },
                    (err, token) => {
                        if (err) res.status(400).json({success : false,message: "Something went wrong"})
                        sendEmail(req.body.email, token)
                        res.status(200).json({success : true,message: "Email Sent"})
                    }
                );
            }
            else{
                res.status(400).json({success : false,message: "Invalid Email Id"})
            }
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}