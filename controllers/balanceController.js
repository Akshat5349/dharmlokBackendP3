const redeemBalance = require('../models/redeemWallet');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');
const creditModel = require('../models/creditModel');
const vendorIncomeModel = require('../models/vendorIncomeModel');


module.exports = {
    createRequest : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var myBalance =  await vendorIncomeModel.findOne({providerId : req.body.userId});
                    if(myBalance != null){
                        if(myBalance.balance * 0.8 >= req.body.withDrawal){
                            let wallet = new redeemBalance({
                                userId : req.body.userId,
                                name : req.body.name,
                                balance : req.body.balance,
                                withDrawal : req.body.withDrawal,
                            })
                            wallet.save(function (eor){
                                if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                                else res.status(200).json({success : true,message: wallet})
                            });
                        }
                        else{
                            res.status(400).json({success : false,message: 'Wallet balance is less than requested amount'})
                        } 
                    }
                    else{
                        res.status(400).json({success : false,message: 'No balance to withdraw'})
                    } 
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllRequest : async function(req, res) {
        try{
            var userDetails, wallet;
            wallet =  await redeemBalance.find({}).sort([['_id', -1]]).lean();
            if(wallet.length > 0){
                for(var x = 0 ; x < wallet.length ; x++){
                    userDetails = await userModel.find({_id : wallet[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    wallet[x].userDetails = userDetails;
                }
            }
            res.status(200).json({success : true,message: wallet})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addDetailsCredit : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var IncomeDetails =  await vendorIncomeModel.findOne({providerId : req.body.id});
                    if(IncomeDetails){
                        if(req.body.amount <= IncomeDetails.balance){
                            vendorIncomeModel.findOneAndUpdate({providerId : req.body.id}, 
                                {$inc : {balance : -req.body.amount}}, function(errIncreaseIncome, response){
                                    if(errIncreaseIncome){
                                        res.status(400).json({success : false,message: 'Something went wrong in updating vendor Balance'})
                                    }
                                    else{
                                        let creditAccount = new creditModel({
                                            userId : req.body.id,
                                            amount : req.body.amount,
                                            transactionId : req.body.transactionId,
                                            date : req.body.date,
                                        })
                                        creditAccount.save(function  async (eor){
                                            if(eor) res.status(400).json({success : false,message: 'Something went wrong '+eor.message})
                                            else {
                                                res.status(200).json({success : true,message: creditAccount})
                                            }
                                        });
                                    }
                            });
                        }
                        else{
                            res.status(400).json({success : false,message: 'Vendor Balance is less than amount'})
                        }
                    }
                    else{
                        res.status(400).json({success : false,message: 'No Details found'})
                    }  
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCreditList : async function(req, res) {
        try{
            var creditAccount;
            creditAccount =  await creditModel.find({}).sort([['_id', -1]]).lean();
            if(creditAccount.length > 0){
                for(var x = 0 ; x < creditAccount.length ; x++){
                    var userDetails = await userModel.findOne({_id : creditAccount[x].userId}).select("name").select("email").select("phone")
                    .select("profileImageUrl").select("description").select("coverImageUrl").select("category").select("userType").select("typeVendor").select("active");
                    creditAccount[x].userDetails = userDetails;
                }
            }
            res.status(200).json({success : true,message: creditAccount})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}