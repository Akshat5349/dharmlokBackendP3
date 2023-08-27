const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user');


module.exports = {
    addToCart : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var cart = new cartModel({
                    userId : user.id,
                    productId : req.body.productId,
                    providerId : req.body.providerId,
                    title : req.body.title,
                    type : req.body.type,
                    description : req.body.description,
                    price: req.body.price,
                    imageUrl : req.body.imageUrl,
                    pricePerUnit : req.body.pricePerUnit,
                    category: req.body.category,
                    quantity: req.body.quantity
                })
                await cart.save(function(eor){
                    if(eor) res.status(200).json({success : false,message: 'Something went wrong '+ eor.message})
                    else res.status(200).json({success : true,message: cart})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getCartItems  : async function(req, res) {
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                if(user){
                    var cart =  await cartModel.find({userId : user.id}).sort([['_id', -1]]);
                    res.status(200).json({success : true,message: cart})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteCartItem  : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                cartModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Item Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateCart : function(req, res){
        var cart;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    cart =  await cartModel.findOneAndUpdate({userId : user.id, productId : req.body.id}, 
                        {
                            quantity: req.body.quantity
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: cart})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
     }
}