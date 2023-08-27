const contactModel = require('../models/contactUsModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addContactUs : function(req, res){
        try{
            let contact = new contactModel({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                message : req.body.message,
            })
            contact.save(function (eor){
                if(eor) res.status(200).json({success : false,message: 'Successfully submitted'})
                else res.status(200).json({success : true,message: contact})
            });
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getContactUs : async function(req, res) {
        try{
            var contact =  await contactModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: contact})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}