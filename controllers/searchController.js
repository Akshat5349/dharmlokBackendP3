const userModel = require('../models/user');
const templeModel = require('../models/templeModel');
const serviceModel = require('../models/addServiceModel');
const productModel = require('../models/productModel');
const eventModel = require('../models/eventModel');
const eBookModel = require('../models/ebookModel');
const dharshanModel = require('../models/dharshanModel');
const dharamshalaModel = require('../models/dharamshalaModel');
const balVidyaModel = require('../models/balVidyaModel');
const audioModel = require('../models/audioModel');
const { query } = require('express');


module.exports = {
    searchAll : async function(req, res) {
        try{
            var result;
            if(req.body.category == 'user'){
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.query, 'i')
                };
                result =  await userModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'temple'){
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.query, 'i')
                };
                result =  await templeModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'service'){
                queryString = {};
                queryString = {
                    services: new RegExp(req.body.query, 'i')
                };
                result =  await serviceModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'product'){
                queryString = {};
                queryString = {
                    title: new RegExp(req.body.query, 'i')
                };
                result =  await productModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'event'){
                queryString = {};
                queryString = {
                    title: new RegExp(req.body.query, 'i')
                };
                result =  await eventModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'ebook'){
                queryString = {};
                queryString = {
                    title: new RegExp(req.body.query, 'i')
                };
                result =  await eBookModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'dharshan'){
                queryString = {};
                queryString = {
                    title: new RegExp(req.body.query, 'i')
                };
                result =  await dharshanModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'dharamshala'){
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.query, 'i')
                };
                result =  await dharamshalaModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'balvidya'){
                queryString = {};
                queryString = {
                    name: new RegExp(req.body.query, 'i')
                };
                result =  await balVidyaModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
            else if(req.body.category == 'audio'){
                queryString = {};
                queryString = {
                    title : new RegExp(req.body.query, 'i')
                };
                result =  await audioModel.find(queryString).sort([['_id', -1]]);
                res.status(200).json({success : true,message: result})
            }
        }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
}