const customerModel = require('../models/customerModel');
const jwt = require("jsonwebtoken");


module.exports = {
    createCustomer : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let customer = new customerModel({
                        userId : user.id,
                        name : req.body.name,
                        phone : req.body.phone,
                        email : req.body.email,
                        address: req.body.address,
                        city : req.body.city,
                        country : req.body.country,
                        pincode: req.body.pincode,
                    })
                    customer.save(function(eor){
                        if(eor) res.status(200).json({success : false ,message: 'Something went wrong '+eor.message})
                        else res.status(200).json({success : true,message: customer})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCustomer : async function(req, res) {
        try{
            const customer =  await customerModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: customer})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}