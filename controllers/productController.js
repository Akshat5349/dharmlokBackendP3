const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const jwt = require("jsonwebtoken");
const { query } = require('express');


module.exports = {
    addProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let product = new productModel({
                        userId : user.id,
                        title : req.body.title,
                        type : req.body.type,
                        description : req.body.description,
                        price: req.body.price,
                        imageUrl : req.body.imageUrl,
                        pricePerUnit : req.body.pricePerUnit,
                        category: req.body.category,
                    })
                    product.save();
                    res.status(200).json({success : true,message: product})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    productDetail : async function(req, res){
        var product = await productModel.find({_id : req.body.productId}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: product}) 
    },
    getAllProduct : async function(req, res){
        var product;
        if(req.body.list == '0000'){
            product = await productModel.find({}).sort([['_id', 'desc']]);
        }
        else if(req.body.list == ''){
            product = await productModel.find({approved : 1}).sort([['_id', 'desc']]);
        }
        res.status(200).json({success : true,message: product})
    },
    myProduct : async function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({userId : user.id}).sort([['_id', 'desc']]);
                res.status(200).json({success : true,message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    deleteProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                productModel.findByIdAndDelete({_id : req.body.id, userId : user.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Product Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },

    updateProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var productUpdate =  await productModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            title : req.body.title,
                            type : req.body.type,
                            description : req.body.description,
                            price: req.body.price,
                            imageUrl : req.body.imageUrl,
                            pricePerUnit : req.body.pricePerUnit,
                            category: req.body.category,
                            active: req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: productUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },

    updateProductStatus : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var productUpdate =  await productModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            active: req.body.status
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: productUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateProductQuantity : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var productUpdate =  await productModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            quantity : req.body.quantity,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: productUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    addCategories : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let category = new categoryModel({
                        userId : user.id,
                        name : req.body.name,
                    })
                    category.save();
                    res.status(200).json({success : true,message: category})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var category = await categoryModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: category})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var categoryName = await categoryModel.findOne({_id : req.body.id }).select('name');
                if(categoryName != null){
                    var product = await productModel.find({category : categoryName.name });
                    if(product != null){
                        res.status(400).json({success : false, message: 'Product available in this category. Please delete product before deleting category'})
                    }
                    else{
                        categoryModel.findByIdAndDelete({_id : req.body.id} , function(errorDelete, response){
                            if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                            else res.status(200).json({success : true, message: 'Category Deleted'})
                        });
                    }
                }  
                
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    
    searchByCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({category: { $regex: '.*' + req.body.category + '.*' } }).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    searchByType : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var product = await productModel.find({type: { $regex: '.*' + req.body.type + '.*' } }).sort([['_id', 'desc']]);
                res.status(200).json({success : true, message: product})
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    search : async function(req, res){
        var product = await productModel.find({$or: [{title: { $regex: '.*' + req.body.title + '.*' }},
                            {category: { $regex: '.*' + req.body.category + '.*' }},
                            {type: { $regex: '.*' + req.body.type + '.*' }}]}).sort([['_id', 'desc']]);
        res.status(200).json({success : true, message: product})
    },
    filterProduct : async function(req, res){
        try{
            var product;
            if(req.body.query == ''){
                if(req.body.category == '' && req.body.type == ''){
                    product = await productModel.find({ price: { $gte:req.body.priceMin, $lte: req.body.priceMax }}).sort([['_id', 'desc']]);
                }
                else if(req.body.category != ''  && req.body.type == ''){
                    product = await productModel.find({$and : [{ category : req.body.category},{ price: { $gte:req.body.priceMin, $lte: req.body.priceMax }}]}).sort([['_id', 'desc']]);
                }
                else if(req.body.category == '' && req.body.type != '' ){
                    product = await productModel.find({$and : [{ type : req.body.type},{ price: { $gte:req.body.priceMin, $lte: req.body.priceMax }}]}).sort([['_id', 'desc']]);
                }
            }
            else {
                queryString = {};
                queryString = {
                    title: new RegExp(req.body.query, 'i')
                };
                product = await productModel.find(queryString).sort([['_id', 'desc']]);
            }
            res.status(200).json({success : true, message: product})
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    approveProduct : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    var productUpdate =  await productModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            approved : req.body.approved,
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: productUpdate})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
}